/**
 * NetCodeShop — Cloudflare Worker
 * AI Chatbot with automatic fallback across 8 providers.
 *
 * SETUP (Wrangler CLI):
 *   wrangler secret put GROQ_API_KEY
 *   wrangler secret put GEMINI_API_KEY
 *   wrangler secret put DEEPSEEK_API_KEY
 *   wrangler secret put OPENROUTER_API_KEY
 *   wrangler secret put MISTRAL_API_KEY
 *   wrangler secret put COHERE_API_KEY
 *   wrangler secret put XAI_API_KEY
 *   wrangler secret put ANYSCALE_API_KEY
 *
 * Or add them via: Cloudflare Dashboard → Workers → Settings → Variables & Secrets
 */

// ---------------------------------------------------------------------------
// CORS
// ---------------------------------------------------------------------------
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, HEAD, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
  "Access-Control-Max-Age": "86400",
};

// ---------------------------------------------------------------------------
// System prompt builder
// Combines the website content + strict rules so the AI stays on-topic.
// ---------------------------------------------------------------------------
function buildSystemPrompt(websiteContent) {
  const base = `သင်သည် "NetCodeShop" ဝက်ဘ်ဆိုက်၏ တရားဝင် Customer Service Chatbot ဖြစ်သည်။

[ဝက်ဘ်ဆိုက် အချက်အလက် / WEBSITE INFORMATION]
${websiteContent || `NetCodeShop (netcodeshop.shop) သည် premium source code marketplace တစ်ခုဖြစ်ပြီး developer များနှင့် လုပ်ငန်းများအတွက် အရည်အသွေးမြင့် source code များကို ဝယ်ယူနိုင်ရာ platform တစ်ခုဖြစ်သည်။

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

ဆက်သွယ်ရန် (Contact): netcodeshop.shop`}

[တင်းကျပ်သောစည်းမျဉ်းများ / STRICT RULES]
၁။ သင်သည် အထက်တွင် ဖော်ပြထားသော [ဝက်ဘ်ဆိုက် အချက်အလက်] ကို အခြေခံ၍ တိကျမှန်ကန်စွာ ဖြေဆိုရမည်။
၂။ ပေးထားသောအချက်အလက်တွင် မပါဝင်သောအရာများကို မိမိ၏ မှတ်ချက် ဖန်တီး၍ မဖြေဆိုရ။ မသိပါက ယဉ်ကျေးစွာ "ထိုအချက်အလက်ကို မသိပါ၊ ကျေးဇူးပြု၍ သက်ဆိုင်ရာ customer service သို့ ဆက်သွယ်ပါ" ဟုသာ ပြောဆိုရမည်။
၃။ ဝက်ဘ်ဆိုက်နှင့် မဆိုင်သောမေးခွန်းများ (ဥပမာ - ကမ္ဘာ့သမိုင်း၊ သင်္ချာ၊ ချက်ပြုတ်နည်း၊ နိုင်ငံရေး၊ သိပ္ပံ) ကို လုံးဝ မဖြေဆိုရ။
၄။ မဆိုင်သောမေးခွန်းများဖြစ်ပါက "ကျွန်တော်/ကျွန်မသည် NetCodeShop ဝက်ဘ်ဆိုက်ကိုသာ ကူညီနိုင်သော Chatbot ဖြစ်၍ ဤမေးခွန်းကို မဖြေနိုင်ပါ" ဟု တိုတောင်းရှင်းလင်းစွာ ငြင်းဆန်ရမည်။
၅။ Client မေးသောဘာသာစကားနှင့် မည်သည့်ဘာသာဖြင့် မေးမြန်းသည်ဖြစ်စေ ထိုဘာသာစကားဖြင့်သာ တုံ့ပြန်ရမည်။ (Always reply in the same language the user uses.) အမြဲတမ်း ယဉ်ကျေးသိမ်မွေ့စွာ တုံ့ပြန်ရမည်။`;
  return base;
}

// ---------------------------------------------------------------------------
// Provider definitions
// Each entry describes how to call that provider and parse its response.
// ---------------------------------------------------------------------------
function buildProviders(env, systemPrompt, history, message) {
  // OpenAI-compatible message array (used by most providers)
  const oaiMessages = [
    { role: "system", content: systemPrompt },
    ...history.map((h) => ({
      role: h.role === "model" ? "assistant" : "user",
      content: h.text,
    })),
    { role: "user", content: message },
  ];

  return [
    // ── 1. Groq ──────────────────────────────────────────────────────────────
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
            messages: oaiMessages,
            temperature: 0.4,
            max_tokens: 1024,
          }),
        });
        return { res, parse: async (json) => json.choices[0].message.content };
      },
    },

    // ── 2. Google Gemini ─────────────────────────────────────────────────────
    {
      name: "Gemini",
      key: env.GEMINI_API_KEY,
      call: async () => {
        const geminiContents = [
          ...history.map((h) => ({
            role: h.role === "model" ? "model" : "user",
            parts: [{ text: h.text }],
          })),
          { role: "user", parts: [{ text: message }] },
        ];
        const res = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${env.GEMINI_API_KEY}`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              system_instruction: { parts: [{ text: systemPrompt }] },
              contents: geminiContents,
              generationConfig: { temperature: 0.4, maxOutputTokens: 1024 },
            }),
          }
        );
        return {
          res,
          parse: async (json) => json.candidates[0].content.parts[0].text,
        };
      },
    },

    // ── 3. DeepSeek ──────────────────────────────────────────────────────────
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
            messages: oaiMessages,
            temperature: 0.4,
            max_tokens: 1024,
          }),
        });
        return { res, parse: async (json) => json.choices[0].message.content };
      },
    },

    // ── 4. OpenRouter ─────────────────────────────────────────────────────────
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
            messages: oaiMessages,
            temperature: 0.4,
            max_tokens: 1024,
          }),
        });
        return { res, parse: async (json) => json.choices[0].message.content };
      },
    },

    // ── 5. Mistral ───────────────────────────────────────────────────────────
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
            messages: oaiMessages,
            temperature: 0.4,
            max_tokens: 1024,
          }),
        });
        return { res, parse: async (json) => json.choices[0].message.content };
      },
    },

    // ── 6. Cohere ────────────────────────────────────────────────────────────
    {
      name: "Cohere",
      key: env.COHERE_API_KEY,
      call: async () => {
        // Cohere uses a different chat format
        const cohereHistory = history.map((h) => ({
          role: h.role === "model" ? "CHATBOT" : "USER",
          message: h.text,
        }));
        const res = await fetch("https://api.cohere.com/v1/chat", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${env.COHERE_API_KEY}`,
          },
          body: JSON.stringify({
            model: "command-r-plus",
            preamble: systemPrompt,
            chat_history: cohereHistory,
            message,
            temperature: 0.4,
            max_tokens: 1024,
          }),
        });
        return { res, parse: async (json) => json.text };
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
            messages: oaiMessages,
            temperature: 0.4,
            max_tokens: 1024,
          }),
        });
        return { res, parse: async (json) => json.choices[0].message.content };
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
            messages: oaiMessages,
            temperature: 0.4,
            max_tokens: 1024,
          }),
        });
        return { res, parse: async (json) => json.choices[0].message.content };
      },
    },
  ];
}

// ---------------------------------------------------------------------------
// Determine whether we should fall through to the next provider
// ---------------------------------------------------------------------------
function shouldFallback(status) {
  return status === 429 || status === 401 || status === 403 || status >= 500;
}

// ---------------------------------------------------------------------------
// Main handler
// ---------------------------------------------------------------------------
export default {
  async fetch(request, env) {
    if (request.method === "OPTIONS") {
      return new Response(null, { status: 204, headers: corsHeaders });
    }

    if (request.method !== "POST") {
      return new Response(JSON.stringify({ error: "Method not allowed" }), {
        status: 405,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    let body;
    try {
      body = await request.json();
    } catch {
      return new Response(JSON.stringify({ error: "Invalid JSON body" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const { message, history = [], websiteContent } = body;

    if (!message || typeof message !== "string") {
      return new Response(JSON.stringify({ error: "message is required" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const systemPrompt = buildSystemPrompt(websiteContent);
    const providers = buildProviders(env, systemPrompt, history, message);

    const errors = [];

    for (const provider of providers) {
      // Skip providers with no API key configured
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

      if (!res.ok && shouldFallback(res.status)) {
        const errText = await res.text().catch(() => res.status.toString());
        errors.push({ provider: provider.name, status: res.status, reason: errText.slice(0, 200) });
        continue;
      }

      if (!res.ok) {
        const errText = await res.text().catch(() => res.status.toString());
        errors.push({ provider: provider.name, status: res.status, reason: errText.slice(0, 200) });
        continue;
      }

      let json;
      try {
        json = await res.json();
      } catch (err) {
        errors.push({ provider: provider.name, reason: "Failed to parse JSON response: " + err.message });
        continue;
      }

      let answer;
      try {
        answer = await parse(json);
      } catch (err) {
        errors.push({ provider: provider.name, reason: "Failed to extract reply: " + err.message });
        continue;
      }

      if (!answer) {
        errors.push({ provider: provider.name, reason: "Empty reply from provider" });
        continue;
      }

      return new Response(
        JSON.stringify({ success: true, provider: provider.name, answer }),
        { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // All providers failed
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
