import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import fs from 'node:fs'
import path from 'node:path'
import { SEO_CONFIG, BASE_URL, resolveSeo } from './src/seo/seoConfig.js'

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

const SEO_BLOCK = /<!--seo:start-->[\s\S]*?<!--seo:end-->/
const withSeo = (html, pathname) =>
  html.replace(SEO_BLOCK, `<!--seo:start-->\n    ${seoTags(pathname)}\n    <!--seo:end-->`)

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

function seoPrerender() {
  let outDir = 'dist'
  return {
    name: 'seo-prerender',
    configResolved(config) {
      outDir = path.resolve(config.root, config.build.outDir)
    },
    // Dev server + the built dist/index.html get the homepage tags.
    transformIndexHtml: (html) => withSeo(html, '/'),
    closeBundle() {
      const indexFile = path.join(outDir, 'index.html')
      if (!fs.existsSync(indexFile)) return
      const html = fs.readFileSync(indexFile, 'utf8')
      for (const route of Object.keys(SEO_CONFIG)) {
        if (route === '/') continue
        fs.writeFileSync(path.join(outDir, `${route.slice(1)}.html`), withSeo(html, route))
      }
      fs.writeFileSync(path.join(outDir, '404.html'), withSeo(html, '/__not-found__'))
      fs.writeFileSync(path.join(outDir, 'sitemap.xml'), buildSitemap())
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
