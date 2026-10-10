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
const withSeo = (html, pathname, extra = '') =>
  html.replace(SEO_BLOCK, `<!--seo:start-->
    ${seoTags(pathname)}${extra}
    <!--seo:end-->`)

// ─────────────────────────────────────────────────────────
// Route preloads
// Pages are lazy-loaded, so without hints the browser only discovers a
// page's JS (and its hero image) after the main bundle has run. For each
// route we add <link rel="modulepreload"> for that page's chunks and CSS,
// and on the homepage a high-priority preload for the LCP hero image.
// The route → page map is read from App.jsx so it can't drift.
// ─────────────────────────────────────────────────────────
const HOME_LCP_IMAGE = /^assets\/prd1-[\w-]+\.webp$/

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

      const write = (file, route, seoPath = route) => {
        const tags = modules[route] ? preloadTags(bundle, modules[route], entryFiles) : []
        if (route === '/' && lcp) tags.unshift(`<link rel="preload" as="image" href="/${lcp}" fetchpriority="high" />`)
        const extra = tags.length ? '\n    ' + tags.join('\n    ') : ''
        fs.writeFileSync(path.join(outDir, file), withSeo(html, seoPath, extra))
      }

      for (const route of Object.keys(SEO_CONFIG)) {
        write(route === '/' ? 'index.html' : `${route.slice(1)}.html`, route)
      }
      write('404.html', '*', '/__not-found__')
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
