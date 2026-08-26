# NetCodeShop Website

## Overview
NetCodeShop is a premium source-code marketplace landing site (originally designed in Figma). It's a React + Vite single-page app with Tailwind CSS and Radix UI components.

## Stack
- **Frontend:** React 18 + Vite 6 + TypeScript, Tailwind CSS v4, Radix UI, Framer Motion (`motion`), Three.js.

## Running
- `npm run dev` — starts the Vite dev server on port 5000 (bound to the "Start application" workflow).
- `npm run build` — production build to `dist/`.

## Notes / open items
- The repo also ships a GitHub Pages deploy workflow (`.github/workflows/`) as an alternate deployment target from the original repo; it is unused on Replit. The Replit deployment config in `.replit` (autoscale, `npm run build` + `node ./dist/index.cjs`) was auto-generated at import and hasn't been verified.
