---
name: NetCodeShop project setup
description: Notes on the imported NetCodeShop Vite/React site and its chat widget dependency on AI provider secrets.
---

The chat widget (server/chat-handler.js, mounted via vite.config.ts middleware at /api/chat) tries providers in a fixed order and needs at least one of GROQ_API_KEY, GEMINI_API_KEY, DEEPSEEK_API_KEY, OPENROUTER_API_KEY, MISTRAL_API_KEY, COHERE_API_KEY, XAI_API_KEY, or ANYSCALE_API_KEY to respond.

**Why:** None were configured at import time; the rest of the site works without any of them, so don't block basic setup on getting a key.

**How to apply:** If asked to make the chatbot work, check which of these secrets exist before assuming none are set (a prior session or the user may have added one since).
