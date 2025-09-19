// vite.config.ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  // 👇 MUST match your repo name on GitHub
  base: '/AIBusinesshelper/',
  plugins: [react()],
})
