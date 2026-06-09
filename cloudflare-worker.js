/**
 * NetCodeShop — Cloudflare Worker
 * Multi-stage AI fallback chatbot with history trimming + KV cache-first.
 *
 * Priority chain: Gemini → Groq → OpenRouter → Mistral → DeepSeek → Cohere → xAI → Anyscale
 *
 * SECRETS (Cloudflare Dashboard → Workers → Settings → Variables & Secrets):
 *   GEMINI_API_KEY, GROQ_API_KEY, OPENROUTER_API_KEY, MISTRAL_API_KEY,
 *   DEEPSEEK_API_KEY, COHERE_API_KEY, XAI_API_KEY, ANYSCALE_API_KEY
 *
 * KV NAMESPACE (wrangler.toml → [[kv_namespaces]]):
 *   binding = "AI_CACHE"  — see wrangler.toml for setup instructions
 */

// ---------------------------------------------------------------------------
// CORS — wildcard so any origin (netcodeshop.shop, replit.app, etc.) works
// ---------------------------------------------------------------------------
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, HEAD, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
  "Access-Control-Max-Age": "86400",
};

// ---------------------------------------------------------------------------
// Cache config
// ---------------------------------------------------------------------------
const CACHE_TTL_SECONDS = 60 * 60 * 24 * 7; // 7 days
// Stop words stripped before bag-of-words fingerprinting
const STOP_WORDS = new Set([
  "a","an","the","is","are","was","were","be","been","being",
  "have","has","had","do","does","did","will","would","could",
  "should","may","might","can","to","of","in","on","at","for",
  "and","or","but","so","if","i","my","me","you","your","we",
  "what","how","why","when","where","which","who","please",
  "help","tell","show","give","need","want","know",
]);

// ---------------------------------------------------------------------------
// Cache helpers
// ---------------------------------------------------------------------------

/**
 * Produces a stable, lowercase, punctuation-stripped key from raw text.
 * Used for exact-match lookups.
 */
function normalizeKey(text) {
  return "q:" + text
    .toLowerCase()
    .trim()
    .replace(/[?!.,;:'"()[\]{}<>\/\\]/g, "")
    .replace(/\s+/g, " ")
    .slice(0, 480); // KV keys max 512 bytes; leave room for prefix
}

/**
 * Produces a key from the *sorted* set of meaningful words.
 * "MiFix Pro price?" and "price of MiFix Pro" both map to the same key.
 */
function bagKey(text) {
  const words = text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, "")
    .split(/\s+/)
    .filter((w) => w.length > 1 && !STOP_WORDS.has(w))
    .sort();
  return "bag:" + [...new Set(words)].join("_").slice(0, 480);
}

/**
 * Check KV for a cached answer.
 * Tries the exact-normalized key first, then the bag-of-words key.
 * Returns { answer, cacheKey } on hit, or null on miss.
 */
async function checkCache(kv, message) {
  if (!kv) return null;

  const nk = normalizeKey(message);
  const hit = await kv.get(nk);
  if (hit) return { answer: hit, cacheKey: nk };

  const bk = bagKey(message);
  if (bk === "bag:") return null; // no meaningful words after stop-word removal
  const hit2 = await kv.get(bk);
  if (hit2) return { answer: hit2, cacheKey: bk };

  return null;
}

/**
 * Write both the exact and bag keys to KV.
 * Called via ctx.waitUntil() so it never delays the response.
 */
async function writeCache(kv, message, answer) {
  if (!kv || !answer) return;
  const opts = { expirationTtl: CACHE_TTL_SECONDS };
  const nk = normalizeKey(message);
  const bk = bagKey(message);
  const writes = [kv.put(nk, answer, opts)];
  if (bk !== "bag:") writes.push(kv.put(bk, answer, opts));
  await Promise.all(writes);
}

// ---------------------------------------------------------------------------
// How many past messages to keep (prevents oversized payloads).
// ---------------------------------------------------------------------------
const HISTORY_LIMIT = 6;

// ---------------------------------------------------------------------------
// System prompt (website context + strict rules)
// ---------------------------------------------------------------------------
const SYSTEM_PROMPT = `သင်သည် "NetCodeShop" ဝက်ဘ်ဆိုက်၏ တရားဝင် Customer Service Chatbot ဖြစ်သည်။

[ဝက်ဘ်ဆိုက် အချက်အလက် / WEBSITE INFORMATION]
NetCodeShop (netcodeshop.shop) သည် premium source code marketplace တစ်ခုဖြစ်ပြီး developer များနှင့် လုပ်ငန်းများအတွက် အရည်အသွေးမြင့် source code များကို ဝယ်ယူနိုင်ရာ platform တစ်ခုဖြစ်သည်။

ထုတ်ကုန်များ (Products):
- MiFix Pro: Android device repair နှင့် flashing tool
- Qualcomm Flashing Tool: Qualcomm chipset အတွက် professional flashing software
- Android Service Tool: Android device များ ပြုပြင်ရန် comprehensive service tool
- MTK Auth Bypass Tool: MediaTek chipset devices အတွက် authentication bypass tool
- License Key System: Software license management system
- ISP Programmer Tool: ISP (In-System Programming) device programmer tool

ဝန်ဆောင်မှုများ (Services):
- ဝယ်ယူပြီးနောက် Instant Delivery (ချက်ချင်း download link ရရှိနိုင်)
- Expert Customer Support (ကျွမ်းကျင်သော technical team ၏ ထောက်ကူမှု)
- Well-documented source code (မှတ်တမ်းတင်ထားသော source code)
- Secure & Licensed products (လုံခြုံမှုနှင့် license ရှိသော ထုတ်ကုန်များ)
- Multiple payment options

ဆက်သွယ်ရန် (Contact): netcodeshop.shop

[တင်းကျပ်သောစည်းမျဉ်းများ / STRICT RULES]
၁။ သင်သည် အထက်တွင် ဖော်ပြထားသော [ဝက်ဘ်ဆိုက် အချက်အလက်] ကို အခြေခံ၍ တိကျမှန်ကန်စွာ ဖြေဆိုရမည်။
၂။ ပေးထားသောအချက်အလက်တွင် မပါဝင်သောအရာများကို မိမိ၏ မှတ်ချက် ဖန်တီး၍ မဖြေဆိုရ။ မသိပါက ယဉ်ကျေးစွာ "ထိုအချက်အလက်ကို မသိပါ၊ ကျေးဇူးပြု၍ သက်ဆိုင်ရာ customer service သို့ ဆက်သွယ်ပါ" ဟုသာ ပြောဆိုရမည်။
၃။ ဝက်ဘ်ဆိုက်နှင့် မဆိုင်သောမေးခွန်းများ (ဥပမာ - ကမ္ဘာ့သမိုင်း၊ သင်္ချာ၊ ချက်ပြုတ်နည်း၊ နိုင်ငံရေး၊ သိပ္ပံ) ကို လုံးဝ မဖြေဆိုရ။
၄။ မဆိုင်သောမေးခွန်းများဖြစ်ပါက "ကျွန်တော်/ကျွန်မသည် NetCodeShop ဝက်ဘ်ဆိုက်ကိုသာ ကူညီနိုင်သော Chatbot ဖြစ်၍ ဤမေးခွန်းကို မဖြေနိုင်ပါ" ဟု တိုတောင်းရှင်းလင်းစွာ ငြင်းဆန်ရမည်။
၅။ Client မေးသောဘာသာစကားနှင့် မည်သည့်ဘာသာဖြင့် မေးမြန်းသည်ဖြစ်စေ ထိုဘာသာစကားဖြင့်သာ တုံ့ပြန်ရမည်။ (Always reply in the same language the user uses.) အမြဲတမ်း ယဉ်ကျေးသိမ်မွေ့စွာ တုံ့ပြန်ရမည်။`;

// ---------------------------------------------------------------------------
// History helpers
// ---------------------------------------------------------------------------

/**
 * Slice history to the most recent HISTORY_LIMIT entries and strip any
 * duplicate of the current message that may have already been appended
 * by the frontend before sending.
 */
function trimHistory(rawHistory, currentMessage) {
  let hist = Array.isArray(rawHistory) ? rawHistory : [];
  if (hist.length > 0) {
    const last = hist[hist.length - 1];
    if (last.role === "user" && last.text === currentMessage) {
      hist = hist.slice(0, -1);
    }
  }
  return hist.slice(-HISTORY_LIMIT);
}

/**
 * Build an OpenAI-compatible messages array.
 */
function buildOaiMessages(history, message) {
  return [
    { role: "system", content: SYSTEM_PROMPT },
    ...history.map((h) => ({
      role: h.role === "model" ? "assistant" : "user",
      content: h.text,
    })),
    { role: "user", content: message },
  ];
}

/**
 * Build a Gemini-compatible contents array.
 * Gemini REQUIRES the array to start with a "user" turn and alternate
 * user ↔ model. We drop any leading model messages to satisfy this.
 */
function buildGeminiContents(history, message) {
  let contents = history.map((h) => ({
    role: h.role === "model" ? "model" : "user",
    parts: [{ text: h.text }],
  }));

  while (contents.length > 0 && contents[0].role === "model") {
    contents.shift();
  }

  contents.push({ role: "user", parts: [{ text: message }] });

  return contents;
}

// ---------------------------------------------------------------------------
// Provider chain — in priority order
// ---------------------------------------------------------------------------
function buildProviders(env, history, message) {
  const oai = buildOaiMessages(history, message);
  const geminiContents = buildGeminiContents(history, message);

  return [
    // ── 1. Gemini (PRIMARY) ──────────────────────────────────────────────────
    {
      name: "Gemini",
      key: env.GEMINI_API_KEY,
      call: async () => {
        const res = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${env.GEMINI_API_KEY}`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              system_instruction: { parts: [{ text: SYSTEM_PROMPT }] },
              contents: geminiContents,
              generationConfig: { temperature: 0.4, maxOutputTokens: 1024 },
            }),
          }
        );
        return { res, parse: (json) => json.candidates[0].content.parts[0].text };
      },
    },

    // ── 2. Groq (SECONDARY) ──────────────────────────────────────────────────
    {
      name: "Groq",
      key: env.GROQ_API_KEY,
      call: async () => {
        const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${env.GROQ_API_KEY}`,
          },
          body: JSON.stringify({
            model: "llama-3.3-70b-versatile",
            messages: oai,
            temperature: 0.4,
            max_tokens: 1024,
          }),
        });
        return { res, parse: (json) => json.choices[0].message.content };
      },
    },

    // ── 3. OpenRouter (TERTIARY) ─────────────────────────────────────────────
    {
      name: "OpenRouter",
      key: env.OPENROUTER_API_KEY,
      call: async () => {
        const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${env.OPENROUTER_API_KEY}`,
            "HTTP-Referer": "https://netcodeshop.shop",
            "X-Title": "NetCodeShop Chatbot",
          },
          body: JSON.stringify({
            model: "google/gemini-flash-1.5-free",
            messages: oai,
            temperature: 0.4,
            max_tokens: 1024,
          }),
        });
        return { res, parse: (json) => json.choices[0].message.content };
      },
    },

    // ── 4. Mistral ───────────────────────────────────────────────────────────
    {
      name: "Mistral",
      key: env.MISTRAL_API_KEY,
      call: async () => {
        const res = await fetch("https://api.mistral.ai/v1/chat/completions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${env.MISTRAL_API_KEY}`,
          },
          body: JSON.stringify({
            model: "mistral-small-latest",
            messages: oai,
            temperature: 0.4,
            max_tokens: 1024,
          }),
        });
        return { res, parse: (json) => json.choices[0].message.content };
      },
    },

    // ── 5. DeepSeek ──────────────────────────────────────────────────────────
    {
      name: "DeepSeek",
      key: env.DEEPSEEK_API_KEY,
      call: async () => {
        const res = await fetch("https://api.deepseek.com/v1/chat/completions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${env.DEEPSEEK_API_KEY}`,
          },
          body: JSON.stringify({
            model: "deepseek-chat",
            messages: oai,
            temperature: 0.4,
            max_tokens: 1024,
          }),
        });
        return { res, parse: (json) => json.choices[0].message.content };
      },
    },

    // ── 6. Cohere ────────────────────────────────────────────────────────────
    {
      name: "Cohere",
      key: env.COHERE_API_KEY,
      call: async () => {
        const res = await fetch("https://api.cohere.com/v1/chat", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${env.COHERE_API_KEY}`,
          },
          body: JSON.stringify({
            model: "command-r-plus",
            preamble: SYSTEM_PROMPT,
            chat_history: history.map((h) => ({
              role: h.role === "model" ? "CHATBOT" : "USER",
              message: h.text,
            })),
            message,
            temperature: 0.4,
            max_tokens: 1024,
          }),
        });
        return { res, parse: (json) => json.text };
      },
    },

    // ── 7. xAI / Grok ────────────────────────────────────────────────────────
    {
      name: "xAI",
      key: env.XAI_API_KEY,
      call: async () => {
        const res = await fetch("https://api.x.ai/v1/chat/completions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${env.XAI_API_KEY}`,
          },
          body: JSON.stringify({
            model: "grok-2-1212",
            messages: oai,
            temperature: 0.4,
            max_tokens: 1024,
          }),
        });
        return { res, parse: (json) => json.choices[0].message.content };
      },
    },

    // ── 8. Anyscale ──────────────────────────────────────────────────────────
    {
      name: "Anyscale",
      key: env.ANYSCALE_API_KEY,
      call: async () => {
        const res = await fetch("https://api.endpoints.anyscale.com/v1/chat/completions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${env.ANYSCALE_API_KEY}`,
          },
          body: JSON.stringify({
            model: "meta-llama/Llama-3-70b-instruct",
            messages: oai,
            temperature: 0.4,
            max_tokens: 1024,
          }),
        });
        return { res, parse: (json) => json.choices[0].message.content };
      },
    },
  ];
}

// ---------------------------------------------------------------------------
// Fallback trigger conditions
// ---------------------------------------------------------------------------
function shouldFallback(status) {
  return status === 429 || status === 401 || status === 403 || status >= 500;
}

// ---------------------------------------------------------------------------
// Main handler
// ---------------------------------------------------------------------------
export default {
  async fetch(request, env, ctx) {
    // CORS preflight — must be first
    if (request.method === "OPTIONS") {
      return new Response(null, { status: 204, headers: corsHeaders });
    }

    if (request.method !== "POST") {
      return new Response(JSON.stringify({ error: "Method not allowed" }), {
        status: 405,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Parse request body
    let body;
    try {
      body = await request.json();
    } catch {
      return new Response(JSON.stringify({ error: "Invalid JSON body" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const { message, history: rawHistory = [], useProvider } = body;

    if (!message || typeof message !== "string" || !message.trim()) {
      return new Response(JSON.stringify({ error: "message is required" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // ── Cache-First Check ────────────────────────────────────────────────────
    // Only cache single-turn questions (no active conversation history).
    // Cached answers are context-free, so we skip cache when history is present
    // to avoid giving an out-of-context reply mid-conversation.
    const history = trimHistory(rawHistory, message);
    const kv = env.AI_CACHE || null;

    if (history.length === 0 && kv) {
      const cached = await checkCache(kv, message);
      if (cached) {
        return new Response(
          JSON.stringify({
            success: true,
            provider: "cache",
            answer: cached.answer,
            cached: true,
          }),
          { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
    }
    // ────────────────────────────────────────────────────────────────────────

    // Build the full chain, then optionally filter to a single provider
    let providers = buildProviders(env, history, message);
    if (useProvider && typeof useProvider === "string") {
      const target = useProvider.toLowerCase();
      const filtered = providers.filter((p) => p.name.toLowerCase() === target);
      if (filtered.length > 0) providers = filtered;
    }

    const errors = [];

    for (const provider of providers) {
      if (!provider.key) {
        errors.push({ provider: provider.name, reason: "API key not configured" });
        continue;
      }

      let res, parse;
      try {
        ({ res, parse } = await provider.call());
      } catch (err) {
        errors.push({ provider: provider.name, reason: "Network error: " + err.message });
        continue;
      }

      if (!res.ok) {
        const errText = await res.text().catch(() => String(res.status));
        errors.push({ provider: provider.name, status: res.status, reason: errText.slice(0, 200) });
        if (shouldFallback(res.status)) continue;
        continue;
      }

      let json;
      try {
        json = await res.json();
      } catch (err) {
        errors.push({ provider: provider.name, reason: "Failed to parse response: " + err.message });
        continue;
      }

      let answer;
      try {
        answer = parse(json);
      } catch (err) {
        errors.push({ provider: provider.name, reason: "Failed to extract reply: " + err.message });
        continue;
      }

      if (!answer || typeof answer !== "string" || !answer.trim()) {
        errors.push({ provider: provider.name, reason: "Empty reply from provider" });
        continue;
      }

      // ── Save to cache in the background (never delays the response) ─────────
      // Only cache single-turn questions (no conversation history).
      if (history.length === 0 && kv) {
        ctx.waitUntil(writeCache(kv, message, answer));
      }
      // ────────────────────────────────────────────────────────────────────────

      return new Response(
        JSON.stringify({ success: true, provider: provider.name, answer, cached: false }),
        { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // All providers exhausted
    return new Response(
      JSON.stringify({
        success: false,
        error: "All AI providers failed. Please try again later.",
        details: errors,
      }),
      { status: 503, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  },
};
