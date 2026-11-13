// Developer signature tool.
//
// The website carries an encrypted authorship signature (AES-256-GCM, key
// derived from a secret passphrase with scrypt). It is stored in:
//   - <meta name="build-signature"> in index.html (every prerendered page)
//   - data-build on the footer copyright line (src/framework/Footer.jsx)
// Without the passphrase the value is unreadable random text.
//
// Usage:
//   node scripts/dev-signature.mjs encrypt "<passphrase>" "<text>"
//   node scripts/dev-signature.mjs decrypt "<passphrase>" "<signature>"
//   node scripts/dev-signature.mjs verify  "<passphrase>"   (reads index.html)
//
// The passphrase file (developer-signature.key.local) is git-ignored and never
// deployed — keep a copy somewhere safe; the signature can't be read without it.
import { scryptSync, randomBytes, createCipheriv, createDecipheriv } from 'node:crypto';
import { readFileSync } from 'node:fs';

const b64u = (buf) => buf.toString('base64url');
const unb64u = (s) => Buffer.from(s, 'base64url');

function encrypt(pass, text) {
  const salt = randomBytes(16);
  const iv = randomBytes(12);
  const key = scryptSync(pass, salt, 32);
  const c = createCipheriv('aes-256-gcm', key, iv);
  const ct = Buffer.concat([c.update(text, 'utf8'), c.final()]);
  return ['v1', b64u(salt), b64u(iv), b64u(c.getAuthTag()), b64u(ct)].join('.');
}

function decrypt(pass, sig) {
  const [v, salt, iv, tag, ct] = sig.trim().split('.');
  if (v !== 'v1') throw new Error('Unknown signature format');
  const key = scryptSync(pass, unb64u(salt), 32);
  const d = createDecipheriv('aes-256-gcm', key, unb64u(iv));
  d.setAuthTag(unb64u(tag));
  return Buffer.concat([d.update(unb64u(ct)), d.final()]).toString('utf8');
}

const [cmd, pass, arg] = process.argv.slice(2);
try {
  if (cmd === 'encrypt' && pass && arg) console.log(encrypt(pass, arg));
  else if (cmd === 'decrypt' && pass && arg) console.log(decrypt(pass, arg));
  else if (cmd === 'verify' && pass) {
    const html = readFileSync(new URL('../index.html', import.meta.url), 'utf8');
    const m = html.match(/<meta name="build-signature" content="([^"]+)"/);
    if (!m) throw new Error('No build-signature meta tag in index.html');
    console.log(decrypt(pass, m[1]));
  } else {
    console.log('Usage: node scripts/dev-signature.mjs encrypt|decrypt|verify <passphrase> [text|signature]');
    process.exit(1);
  }
} catch (e) {
  console.error('Failed:', e.message.includes('auth') ? 'wrong passphrase or damaged signature' : e.message);
  process.exit(1);
}
