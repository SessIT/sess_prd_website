import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],

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
