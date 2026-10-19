import path from 'node:path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { viteSingleFile } from 'vite-plugin-singlefile'

// Relative base so dist/ works from any host or sub-folder. By default all JS, CSS and
// fonts are inlined into index.html so the build also opens by double-clicking it
// (browsers block external module scripts on file://). `npm run build:split` keeps
// separate, lazily loaded chunks for hosting.
export default defineConfig(({ mode }) => ({
  base: './',
  plugins: [react(), tailwindcss(), mode !== 'split' && viteSingleFile()],
  resolve: {
    alias: { '@': path.resolve(__dirname, './src') },
  },
  build: {
    chunkSizeWarningLimit: 3000,
  },
}))
