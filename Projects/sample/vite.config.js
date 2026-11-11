import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import fs from 'node:fs'
import path from 'node:path'
import { SEO_CONFIG, BASE_URL, ORGANIZATION, resolveSeo } from './src/seo/seoConfig.js'

// ─────────────────────────────────────────────────────────
// SEO prerender
// The app is a client-side SPA, so every URL used to return the same
// <head> (homepage title + canonical). Crawlers that don't run JS and
// social apps (WhatsApp, LinkedIn, Facebook) only ever saw that.
// This plugin fills the <!--seo:start--><!--seo:end--> block in
// index.html per route and writes dist/<route>.html (+ dist/404.html).
// public/.htaccess serves those files for the matching clean URL.
// ─────────────────────────────────────────────────────────
const esc = (s) =>
  String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

function seoTags(pathname) {
  const s = resolveSeo(pathname)
  const robots = s.noindex ? 'noindex, follow' : 'index, follow, max-image-preview:large'
  return [
    `<title>${esc(s.title)}</title>`,
    `<meta name="description" content="${esc(s.description)}" />`,
    `<meta name="keywords" content="${esc(s.keywords)}" />`,
    `<meta name="robots" content="${robots}" />`,
    s.noindex ? '' : `<link rel="canonical" href="${s.url}" />`,
    `<meta property="og:title" content="${esc(s.title)}" />`,
    `<meta property="og:description" content="${esc(s.description)}" />`,
    `<meta property="og:url" content="${s.url}" />`,
    `<meta property="og:image" content="${s.image}" />`,
    `<meta property="og:image:secure_url" content="${s.image}" />`,
    `<meta property="og:image:alt" content="${esc(s.title)}" />`,
    `<meta name="twitter:title" content="${esc(s.title)}" />`,
    `<meta name="twitter:description" content="${esc(s.description)}" />`,
    `<meta name="twitter:image" content="${s.image}" />`,
    `<script type="application/ld+json" id="seo-jsonld">${JSON.stringify(s.jsonLd).replace(/</g, '\\u003c')}</script>`,
  ].filter(Boolean).join('\n    ')
}

// Static body for crawlers/SEO checkers that don't run JS: the page's <h1>,
// headings and links to every page and our social profiles. It sits inside
// #root, so React replaces it on mount; visually hidden so it never flashes.
const HIDDEN = 'position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border:0'

function staticBody(pathname) {
  const s = resolveSeo(pathname)
  const link = (route) => `<li><a href="${route}">${esc(SEO_CONFIG[route].name)}</a></li>`
  const routes = Object.keys(SEO_CONFIG)
  const products = routes.filter((r) => SEO_CONFIG[r].product)
  const company = routes.filter((r) => !SEO_CONFIG[r].product)
  const o = ORGANIZATION
  const a = o.address
  return `
      <div style="${HIDDEN}">
        <h1>${esc(s.h1)}</h1>
        <p>${esc(s.description)}</p>
        <nav aria-label="Site">
          <h2>Environmental Test Chambers</h2>
          <ul>${products.map(link).join('')}</ul>
          <h2>Company</h2>
          <ul>${company.map(link).join('')}</ul>
        </nav>
        <h2>Contact ${esc(o.name)}</h2>
        <address>${esc(`${a.streetAddress}, ${a.addressLocality}, ${a.addressRegion} ${a.postalCode}, India`)} ·
          <a href="tel:${o.telephone.replace(/-/g, '')}">${o.telephone}</a> ·
          <a href="mailto:${o.email}">${o.email}</a></address>
        <h2>Follow SESS</h2>
        <ul>${o.sameAs.map((u) => `<li><a href="${u}" rel="noopener" target="_blank">${esc(new URL(u).hostname.replace(/^www\./, ''))}</a></li>`).join('')}</ul>
      </div>
    `
}

const SEO_BLOCK = /<!--seo:start-->[\s\S]*?<!--seo:end-->/
const ROOT_BLOCK = /<div id="root">(?:<!--body:start-->[\s\S]*?<!--body:end-->)?<\/div>/
const withSeo = (html, pathname, extra = '') =>
  html
    .replace(SEO_BLOCK, `<!--seo:start-->
    ${seoTags(pathname)}${extra}
    <!--seo:end-->`)
    .replace(ROOT_BLOCK, `<div id="root"><!--body:start-->${staticBody(pathname)}<!--body:end--></div>`)

// ─────────────────────────────────────────────────────────
// Route preloads
// Pages are lazy-loaded, so without hints the browser only discovers a
// page's JS (and its hero image) after the main bundle has run. For each
// route we add <link rel="modulepreload"> for that page's chunks and CSS,
// and on the homepage a high-priority preload for the LCP hero image.
// The route → page map is read from App.jsx so it can't drift.
// ─────────────────────────────────────────────────────────
const HOME_LCP_IMAGE = /^assets\/SESS_batterytestchamberbanner_Homepage-[\w-]+\.webp$/
const HOME_LCP_IMAGE_SM = /^assets\/SESS_batterytestchamberbanner_Homepage_mobile-[\w-]+\.webp$/
// Must match HERO_SIZES in src/framework/HeroSlider.jsx
const HOME_LCP_SIZES = '(max-width: 767px) calc(100vw - 4rem), 680px'

// ─────────────────────────────────────────────────────────
// Homepage hero shell
// The hero used to appear only after the main bundle (~150 KB) and the Home
// chunk had run — 4–6s of "element render delay" on mobile. This static copy
// of the first slide (light theme) is painted straight from the HTML, so the
// LCP image shows at first paint. It sits outside #root, absolutely over the
// spot the real hero takes, and HeroSlider removes it as it mounts.
// Markup mirrors slides[0] in src/framework/HeroSlider.jsx and the header
// spacer in src/framework/Header.jsx — keep them in sync.
// ─────────────────────────────────────────────────────────
function heroShell(lcp, lcpSm) {
  const minH = 'min-height:calc(100vh - 100px)'
  const orb = (pos, bg, cls) =>
    `<div class="${cls}" style="position:absolute;${pos};width:288px;height:288px;border-radius:50%;filter:blur(48px);opacity:0.20;background:${bg}"></div>`
  // Hidden until the inline script after it runs, i.e. until the whole shell
  // is parsed: a paint mid-parse showed the text column without the image
  // column and the row then grew (CLS 0.07–0.33).
  return `<div id="hero-shell" style="position:absolute;top:0;left:0;right:0;z-index:1;visibility:hidden">
      <div aria-hidden="true" class="h-[calc(40px+68px)] sm:h-[calc(40px+76px)] lg:h-[calc(40px+80px)]"></div>
      <section style="position:relative;width:100%;overflow:hidden;${minH};background:var(--bg-subtle)">
        <div class="relative flex items-center w-full overflow-hidden" style="${minH};background:var(--bg-subtle)">
          <div class="absolute inset-0 z-0" style="background:linear-gradient(270deg, var(--color-neutral-50), var(--color-neutral-100), var(--color-neutral-0), var(--color-neutral-50))"></div>
          <div class="absolute inset-0 z-0 pointer-events-none overflow-hidden">
            ${orb('top:2.5rem;right:5rem', 'var(--color-primary-200)', 'sess-orb-a')}
            ${orb('bottom:2.5rem;left:6rem', 'var(--color-secondary-100)', 'sess-orb-b')}
          </div>
          <div class="relative z-10 flex flex-col md:flex-row items-center w-full max-w-[1760px] mx-auto">
            <div class="w-full md:w-[45%] flex flex-col justify-center px-8 md:px-16 py-10 md:py-0 lg:pl-24">
              <div>
                <div class="flex items-center gap-3 mb-6">
                  <span class="min-w-0" style="font-family:var(--font-body);font-size:var(--text-sm);font-weight:var(--font-weight-semibold);letter-spacing:var(--tracking-wider);text-transform:uppercase;color:var(--color-primary-500)">Battery Test Chamber</span>
                  <div style="flex:1;height:1px;background:var(--color-neutral-300)"></div>
                </div>
                <h2 class="text-center mb-5" style="color:var(--color-neutral-900);font-family:var(--font-display);font-weight:var(--font-weight-bold);font-size:clamp(var(--text-2xl), 3vw, var(--text-3xl));line-height:var(--leading-tight)">"Industrial-Grade Battery Validation Starts Here."</h2>
                <p class="text-center leading-relaxed mb-6 max-w-sm mx-auto" style="font-size:var(--text-sm);color:var(--color-neutral-500);line-height:var(--leading-relaxed)">Our chambers replicate real-world stress to ensure battery systems meet the highest safety and reliability standards.</p>
                <div class="flex justify-center">
                  <a href="/battery-test-chamber" style="display:inline-flex;align-items:center;gap:var(--space-3);padding:var(--space-3) var(--space-5);border-radius:var(--border-radius-full);background:var(--color-primary-700);color:var(--color-neutral-0);font-size:var(--text-xs);font-weight:var(--font-weight-semibold);text-transform:uppercase;letter-spacing:var(--tracking-widest);text-decoration:none">Learn More<span class="sr-only"> about the Battery Test Chamber</span><svg aria-hidden="true" width="12" height="12" viewBox="0 0 448 512" fill="currentColor"><path d="M190.5 66.9l22.2-22.2c9.4-9.4 24.6-9.4 33.9 0L441 239c9.4 9.4 9.4 24.6 0 33.9L246.6 467.3c-9.4 9.4-24.6 9.4-33.9 0l-22.2-22.2c-9.5-9.5-9.3-25 .4-34.3L311.4 296H24c-13.3 0-24-10.7-24-24v-32c0-13.3 10.7-24 24-24h287.4L190.9 101.2c-9.8-9.3-10-24.8-.4-34.3z"/></svg></a>
                </div>
              </div>
            </div>
            <div class="w-full md:w-[55%] flex items-center justify-center px-8 py-10 md:py-0">
              <img src="/${lcp}"${lcpSm ? ` srcset="/${lcpSm} 640w, /${lcp} 900w" sizes="${HOME_LCP_SIZES}"` : ''} alt="Battery Test Chamber" width="900" height="765" fetchpriority="high" decoding="sync" class="w-full h-auto max-w-lg xl:max-w-xl object-contain drop-shadow-xl" style="max-height:100vh" />
            </div>
          </div>
        </div>
      </section>
    </div>
    <script>(function(){var s=document.getElementById('hero-shell');try{if(localStorage.getItem('theme')==='dark')return s.remove()}catch(e){}s.style.visibility='visible'})()</script>`
}

function routeModules(root) {
  const app = fs.readFileSync(path.join(root, 'src/App.jsx'), 'utf8')
  const lazy = {}
  for (const m of app.matchAll(/const (\w+) = lazy\(\(\) => import\(['"]([^'"]+)['"]\)\)/g)) {
    lazy[m[1]] = path.resolve(root, 'src', m[2])
  }
  const routes = {}
  for (const m of app.matchAll(/<Route\s+path=["']([^"']+)["']\s+element=\{<(\w+)/g)) {
    if (lazy[m[2]]) routes[m[1]] = lazy[m[2]]
  }
  return routes
}

function preloadTags(bundle, modulePath, entryFiles) {
  const noExt = (id) => id && path.normalize(id).replace(/\.[jt]sx?$/, '')
  const chunk = Object.values(bundle).find((c) => c.type === 'chunk' && noExt(c.facadeModuleId) === path.normalize(modulePath))
  if (!chunk) return []
  const js = new Set()
  const css = new Set()
  const visit = (c) => {
    if (!c || js.has(c.fileName) || entryFiles.has(c.fileName)) return
    js.add(c.fileName)
    c.viteMetadata?.importedCss?.forEach((f) => css.add(f))
    c.imports.forEach((f) => visit(bundle[f]))
  }
  visit(chunk)
  return [
    ...[...css].map((f) => `<link rel="stylesheet" href="/${f}" />`),
    ...[...js].map((f) => `<link rel="modulepreload" crossorigin href="/${f}" />`),
  ]
}

// sitemap.xml is generated from SEO_CONFIG so it never drifts from the routes.
function sitemapPriority(route) {
  if (route === '/') return ['1.0', 'weekly']
  if (route === '/products' || SEO_CONFIG[route].product) return ['0.9', 'monthly']
  if (['/about', '/services', '/contact'].includes(route)) return ['0.8', 'monthly']
  if (['/sitemap', '/privacy-policy', '/terms-and-conditions'].includes(route)) return ['0.3', 'yearly']
  return ['0.6', 'monthly']
}

function buildSitemap() {
  const today = new Date().toISOString().slice(0, 10)
  const urls = Object.keys(SEO_CONFIG).map((route) => {
    const [priority, freq] = sitemapPriority(route)
    return `  <url><loc>${BASE_URL}${route}</loc><lastmod>${today}</lastmod><changefreq>${freq}</changefreq><priority>${priority}</priority></url>`
  })
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join('\n')}\n</urlset>\n`
}

// Windows can briefly lock a just-written file (Defender scan, a preview
// server or editor reading dist/) and writeFileSync then fails with
// UNKNOWN/EBUSY/EPERM. Retry for up to ~2s before giving up.
function writeFileRetry(file, data) {
  for (let attempt = 0; ; attempt++) {
    try {
      return fs.writeFileSync(file, data)
    } catch (err) {
      if (attempt >= 20 || !['UNKNOWN', 'EBUSY', 'EPERM', 'EACCES'].includes(err.code)) throw err
      Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, 100)
    }
  }
}

function seoPrerender() {
  let outDir = 'dist'
  let root = '.'
  let bundle = null
  return {
    name: 'seo-prerender',
    configResolved(config) {
      root = config.root
      outDir = path.resolve(config.root, config.build.outDir)
    },
    // Dev server gets the homepage tags; the build rewrites every page below.
    transformIndexHtml: (html) => withSeo(html, '/'),
    writeBundle(_options, output) {
      bundle = output
    },
    closeBundle() {
      const indexFile = path.join(outDir, 'index.html')
      if (!fs.existsSync(indexFile) || !bundle) return
      const html = fs.readFileSync(indexFile, 'utf8')
      const entryFiles = new Set()
      const entry = Object.values(bundle).find((c) => c.type === 'chunk' && c.isEntry)
      const collect = (c) => {
        if (!c || entryFiles.has(c.fileName)) return
        entryFiles.add(c.fileName)
        c.imports.forEach((f) => collect(bundle[f]))
      }
      collect(entry)
      const modules = routeModules(root)
      const lcp = Object.keys(bundle).find((f) => HOME_LCP_IMAGE.test(f))
      const lcpSm = Object.keys(bundle).find((f) => HOME_LCP_IMAGE_SM.test(f))

      const write = (file, route, seoPath = route) => {
        const tags = modules[route] ? preloadTags(bundle, modules[route], entryFiles) : []
        if (route === '/' && lcp) {
          const srcset = lcpSm ? ` imagesrcset="/${lcpSm} 640w, /${lcp} 900w" imagesizes="${HOME_LCP_SIZES}"` : ''
          tags.unshift(`<link rel="preload" as="image" href="/${lcp}"${srcset} fetchpriority="high" />`)
        }
        const extra = tags.length ? '\n    ' + tags.join('\n    ') : ''
        let out = withSeo(html, seoPath, extra)
        if (route === '/' && lcp) out = out.replace('<!--body:end--></div>', `<!--body:end--></div>\n    ${heroShell(lcp, lcpSm)}`)
        // Inline our own stylesheets (~25 KB gzipped): a render-blocking CSS
        // request cost a full round trip before first paint on mobile.
        out = out.replace(/<link rel="stylesheet"(?: crossorigin)? href="\/(assets\/[^"]+\.css)"\s*\/?>/g, (tag, f) =>
          bundle[f]?.source ? `<style data-href="/${f}">${String(bundle[f].source).replace(/<\/style/gi, '<\\/style')}</style>` : tag)
        writeFileRetry(path.join(outDir, file), out)
      }

      for (const route of Object.keys(SEO_CONFIG)) {
        write(route === '/' ? 'index.html' : `${route.slice(1)}.html`, route)
      }
      write('404.html', '*', '/__not-found__')
      writeFileRetry(path.join(outDir, 'sitemap.xml'), buildSitemap())
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), seoPrerender()],

  // Include PDF files as static assets (imported as URL strings)
  assetsInclude: ['**/*.pdf'],

  // ─────────────────────────────────────────────────────────
  // PRODUCTION FIX for pdfjs-dist
  // Exclude pdfjs-dist from Vite's esbuild pre-bundler.
  // Without this, esbuild merges the Worker file into the
  // main bundle, causing the Worker to fail to load in prod.
  // ─────────────────────────────────────────────────────────
  optimizeDeps: {
    exclude: ['pdfjs-dist'],
  },
})
