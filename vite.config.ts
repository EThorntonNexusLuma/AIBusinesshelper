import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/AIBusinesshelper/', // MUST match the repo name on GitHub
  plugins: [react()],
  build: {
    outDir: 'dist',
    assetsDir: 'static',
    emptyOutDir: true, // Clean output directory before build
    rollupOptions: {
      output: {
        // Ensure consistent asset naming
        assetFileNames: 'static/[name]-[hash][extname]',
        chunkFileNames: 'static/[name]-[hash].js',
        entryFileNames: 'static/[name]-[hash].js'
      }
    }
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3001',
        changeOrigin: true,
      }
    }
  }
})
