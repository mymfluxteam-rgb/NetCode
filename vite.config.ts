import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'

function figmaAssetResolver() {
  return {
    name: 'figma-asset-resolver',
    resolveId(id: string) {
      if (id.startsWith('figma:asset/')) {
        const filename = id.replace('figma:asset/', '')
<<<<<<< HEAD
        return new URL(`./src/assets/${filename}`, import.meta.url).pathname
=======
        return `/src/assets/${filename}`
>>>>>>> e886d91ab2c24084e5191e2eca20814b20c5de97
      }
      return null
    },
  }
}

export default defineConfig({
<<<<<<< HEAD
  base: '/',
=======
  
  base: '/', 
>>>>>>> e886d91ab2c24084e5191e2eca20814b20c5de97
  plugins: [
    figmaAssetResolver(),
    react(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
<<<<<<< HEAD
      '@': new URL('./src', import.meta.url).pathname,
      '@assets': new URL('./attached_assets', import.meta.url).pathname,
=======
      '@': '/src',
      '@assets': '/attached_assets',
>>>>>>> e886d91ab2c24084e5191e2eca20814b20c5de97
    },
  },
  assetsInclude: ['**/*.svg', '**/*.csv'],
  server: {
    host: '0.0.0.0',
    port: 5000,
    allowedHosts: true,
  },
})
  },
})
