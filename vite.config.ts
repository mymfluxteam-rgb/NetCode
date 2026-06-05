import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'

function figmaAssetResolver() {
  return {
    name: 'figma-asset-resolver',
    resolveId(id: string) {
      if (id.startsWith('figma:asset/')) {
        const filename = id.replace('figma:asset/', '')
        return new URL(`./src/assets/${filename}`, import.meta.url).pathname
      }
    },
  }
}

export default defineConfig({
  base: '/',
  plugins: [
    figmaAssetResolver(),
    react(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      '@': new URL('./src', import.meta.url).pathname,
      '@assets': new URL('./attached_assets', import.meta.url).pathname,
    },
  },
  assetsInclude: ['**/*.svg', '**/*.csv'],
  server: {
    host: '0.0.0.0',
    port: 5000,
    allowedHosts: true,
  },
})
