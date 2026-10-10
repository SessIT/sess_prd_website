// Converts images imported in src/ to resized WebP and points the imports at them.
//   npm run optimize-images
// - New `import x from './foo.png'` imports are converted to foo.webp and rewritten.
// - If you replace an original (foo.png/.jpg) later, re-run: any .webp older than
//   its original is regenerated.
// Originals are kept; only the .webp files end up in the build.
const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const src = path.join(__dirname, '..', 'src');
const files = [];
(function walk(d) {
  for (const f of fs.readdirSync(d)) {
    const p = path.join(d, f);
    if (fs.statSync(p).isDirectory()) walk(p);
    else if (/\.(jsx?|tsx?)$/.test(f)) files.push(p);
  }
})(src);

const IMPORT = /(from\s+|import\s*\(\s*)(['"])(\.[^'"]+\.(?:png|jpe?g|webp))\2/gi;

// Longest side in px — roughly 2x the largest size each image is displayed at.
function maxSize(abs, width) {
  const n = path.basename(abs).toLowerCase();
  if (/whatsapp|chatbot|^file\.|icon/.test(n) && width <= 600) return 160;
  if (/sess_logo_png|sess-123logo|rg-logo/.test(n)) return 640;
  if (/sess_logo_white/.test(n)) return 480;
  if (/itbg|labview|design-team|popup|login-bg|plc\./.test(n)) return 1000;
  if (abs.includes(`${path.sep}product${path.sep}`)) return 1200;
  return 1600;
}

const originalFor = (webp) =>
  ['.png', '.jpg', '.jpeg', '.PNG', '.JPG', '.JPEG']
    .map((ext) => webp.replace(/\.webp$/i, ext))
    .find((p) => fs.existsSync(p));

async function toWebp(original, out) {
  const img = sharp(original);
  const { width } = await img.metadata();
  const max = maxSize(original, width);
  await img
    .resize({ width: max, height: max, fit: 'inside', withoutEnlargement: true })
    .webp({ quality: 80, alphaQuality: 90, effort: 5 })
    .toFile(out);
}

(async () => {
  const seen = new Set();
  let converted = 0;
  let rewritten = 0;
  for (const file of files) {
    const code = fs.readFileSync(file, 'utf8');
    const specs = [...code.matchAll(IMPORT)].map((m) => m[3]);
    for (const spec of specs) {
      const abs = path.resolve(path.dirname(file), spec);
      const webp = abs.replace(/\.(png|jpe?g|webp)$/i, '.webp');
      if (seen.has(webp)) continue;
      seen.add(webp);
      const original = /\.webp$/i.test(abs) ? originalFor(abs) : abs;
      if (!original || !fs.existsSync(original)) continue;
      if (fs.existsSync(webp) && fs.statSync(webp).mtimeMs >= fs.statSync(original).mtimeMs) continue;
      await toWebp(original, webp);
      converted++;
    }
    const next = code.replace(IMPORT, (m, a, q, spec) => {
      if (/\.webp$/i.test(spec)) return m;
      const webp = path.resolve(path.dirname(file), spec).replace(/\.(png|jpe?g)$/i, '.webp');
      return fs.existsSync(webp) ? a + q + spec.replace(/\.(png|jpe?g)$/i, '.webp') + q : m;
    });
    if (next !== code) {
      fs.writeFileSync(file, next);
      rewritten++;
    }
  }
  console.log(`optimize-images: ${converted} converted, ${rewritten} files updated`);
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
