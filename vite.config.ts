import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import type { IncomingMessage, ServerResponse } from 'node:http'

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

function chatApiPlugin() {
  return {
    name: 'chat-api',
    async configureServer(server: any) {
      const { handleChat } = await import('./server/chat-handler.js')

      server.middlewares.use(
        '/api/chat',
        async (req: IncomingMessage, res: ServerResponse) => {
          res.setHeader('Content-Type', 'application/json')

          if (req.method === 'OPTIONS') {
            res.writeHead(204)
            res.end()
            return
          }

          if (req.method !== 'POST') {
            res.writeHead(405)
            res.end(JSON.stringify({ error: 'Method not allowed' }))
            return
          }

          let body: any
          try {
            const chunks: Buffer[] = []
            for await (const chunk of req as any) chunks.push(chunk)
            body = JSON.parse(Buffer.concat(chunks).toString())
          } catch {
            res.writeHead(400)
            res.end(JSON.stringify({ error: 'Invalid JSON body' }))
            return
          }

          const { message, history, websiteContent } = body

          if (!message || typeof message !== 'string') {
            res.writeHead(400)
            res.end(JSON.stringify({ error: 'message is required' }))
            return
          }

          try {
            const result = await handleChat({ message, history, websiteContent })
            res.writeHead(result.success ? 200 : 503)
            res.end(JSON.stringify(result))
          } catch (err: any) {
            res.writeHead(500)
            res.end(JSON.stringify({ success: false, error: err.message || 'Internal error' }))
          }
        }
      )
    },
  }
}

export default defineConfig({
  base: '/',
  plugins: [
    figmaAssetResolver(),
    chatApiPlugin(),
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
