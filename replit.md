# NetCodeShop Website

## Overview
NetCodeShop is a premium source-code marketplace landing site (originally designed in Figma). It's a React + Vite single-page app with Tailwind CSS, Radix UI components, and a small AI-powered customer-service chat widget.

## Stack
- **Frontend:** React 18 + Vite 6 + TypeScript, Tailwind CSS v4, Radix UI, Framer Motion (`motion`), Three.js.
- **Backend:** A tiny chat API (`server/chat-handler.js`) is mounted as Vite dev-server middleware at `/api/chat` (see `vite.config.ts`). It tries multiple AI providers in order (Groq, Gemini, DeepSeek, OpenRouter, Mistral, Cohere, xAI, Anyscale) based on whichever API key secrets are present.

## Running
- `npm run dev` — starts the Vite dev server on port 5000 (bound to the "Start application" workflow).
- `npm run build` — production build to `dist/`.

## Notes / open items
- The "AI Assistant" chat widget requires at least one of these secrets to actually respond: `GROQ_API_KEY`, `GEMINI_API_KEY`, `DEEPSEEK_API_KEY`, `OPENROUTER_API_KEY`, `MISTRAL_API_KEY`, `COHERE_API_KEY`, `XAI_API_KEY`, `ANYSCALE_API_KEY`. None are currently set — the rest of the site works fine without them. Ask to have one added if you want the chatbot working.
- The repo also ships a `cloudflare-worker.js` and `wrangler.toml`, plus a GitHub Pages deploy workflow (`.github/workflows/`) — these are alternate deployment targets from the original repo and are unused on Replit; the Replit deployment config in `.replit` (autoscale, `npm run build` + `node ./dist/index.cjs`) was auto-generated at import and hasn't been verified.
