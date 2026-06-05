/**
 * NetCodeShop — Cloudflare Worker
 * Handles Gemini API calls server-side with CORS support.
 *
 * SETUP:
 *  1. Copy this file into the Cloudflare Workers dashboard editor
 *     (or deploy via Wrangler CLI: `wrangler deploy`)
 *  2. In the Workers dashboard → Settings → Variables → Secrets,
 *     add a secret named:  GEMINI_API_KEY = <your key>
 *  3. Copy your Worker URL (e.g. https://netcodeshop-chat.YOUR.workers.dev)
 *     and paste it into Chat.tsx / FloatingChat.tsx as CLOUDFLARE_WORKER_URL.
 */

const GEMINI_MODEL = "gemini-2.5-flash";
const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent`;

const SYSTEM_INSTRUCTION = `သင်သည် "NetCodeShop" ဝက်ဘ်ဆိုက်၏ တရားဝင် Customer Service Chatbot ဖြစ်သည်။

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

ဆက်သွယ်ရန် (Contact):
- ဝက်ဘ်ဆိုက်: netcodeshop.shop
- Contact page မှ message ပေးပို့နိုင်သည်

[တင်းကျပ်သောစည်းမျဉ်းများ / STRICT RULES]
၁။ သင်သည် အထက်တွင် ဖော်ပြထားသော [ဝက်ဘ်ဆိုက် အချက်အလက်] ကို အခြေခံ၍ တိကျမှန်ကန်စွာ ဖြေဆိုရမည်။
၂။ ပေးထားသောအချက်အလက်တွင် မပါဝင်သောအရာများကို မိမိ၏ မှတ်ချက် ဖန်တီး၍ မဖြေဆိုရ။ မသိပါက ယဉ်ကျေးစွာ "ထိုအချက်အလက်ကို မသိပါ၊ ကျေးဇူးပြု၍ သက်ဆိုင်ရာ customer service သို့ ဆက်သွယ်ပါ" ဟုသာ ပြောဆိုရမည်။
၃။ ဝက်ဘ်ဆိုက်နှင့် မဆိုင်သောမေးခွန်းများ (ဥပမာ - ကမ္ဘာ့သမိုင်း၊ သင်္ချာ၊ ချက်ပြုတ်နည်း၊ နိုင်ငံရေး၊ သိပ္ပံ) ကို လုံးဝ မဖြေဆိုရ။
၄။ မဆိုင်သောမေးခွန်းများဖြစ်ပါက "ကျွန်တော်/ကျွန်မသည် NetCodeShop ဝက်ဘ်ဆိုက်ကိုသာ ကူညီနိုင်သော Chatbot ဖြစ်၍ ဤမေးခွန်းကို မဖြေနိုင်ပါ" ဟု တိုတောင်းရှင်းလင်းစွာ ငြင်းဆန်ရမည်။
၅။ Client မေးသောဘာသာစကားနှင့် မည်သည့်ဘာသာဖြင့် မေးမြန်းသည်ဖြစ်စေ (ဥပမာ — ဗမာဘာသာ၊ အင်္ဂလိပ်ဘာသာ) ထိုဘာသာစကားဖြင့်သာ တုံ့ပြန်ရမည်။ (Always reply in the same language that the user uses to ask the question.) အမြဲတမ်း ယဉ်ကျေးသိမ်မွေ့စွာ တုံ့ပြန်ရမည်။`;

// Allowed origins — add your production domain here
const ALLOWED_ORIGINS = [
  "https://netcodeshop.shop",
  "https://www.netcodeshop.shop",
];

function corsHeaders(origin) {
  const allowed =
    ALLOWED_ORIGINS.includes(origin) ||
    (origin && origin.endsWith(".replit.app")) ||
    (origin && origin.endsWith(".replit.dev"))
      ? origin
      : ALLOWED_ORIGINS[0];

  return {
    "Access-Control-Allow-Origin": allowed,
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Max-Age": "86400",
  };
}

export default {
  async fetch(request, env) {
    const origin = request.headers.get("Origin") || "";
    const cors = corsHeaders(origin);

    // Handle CORS preflight
    if (request.method === "OPTIONS") {
      return new Response(null, { status: 204, headers: cors });
    }

    // Only allow POST
    if (request.method !== "POST") {
      return new Response(JSON.stringify({ error: "Method not allowed" }), {
        status: 405,
        headers: { ...cors, "Content-Type": "application/json" },
      });
    }

    // Parse body
    let body;
    try {
      body = await request.json();
    } catch {
      return new Response(JSON.stringify({ error: "Invalid JSON body" }), {
        status: 400,
        headers: { ...cors, "Content-Type": "application/json" },
      });
    }

    const { message, history = [] } = body;

    if (!message || typeof message !== "string") {
      return new Response(JSON.stringify({ error: "message is required" }), {
        status: 400,
        headers: { ...cors, "Content-Type": "application/json" },
      });
    }

    if (!env.GEMINI_API_KEY) {
      return new Response(
        JSON.stringify({ error: "GEMINI_API_KEY secret is not configured." }),
        {
          status: 500,
          headers: { ...cors, "Content-Type": "application/json" },
        }
      );
    }

    // Build Gemini request contents from history + new message
    const contents = [
      ...history.map((h) => ({
        role: h.role === "model" ? "model" : "user",
        parts: [{ text: h.text }],
      })),
      { role: "user", parts: [{ text: message }] },
    ];

    // Call Gemini REST API
    let geminiRes;
    try {
      geminiRes = await fetch(`${GEMINI_API_URL}?key=${env.GEMINI_API_KEY}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          system_instruction: {
            parts: [{ text: SYSTEM_INSTRUCTION }],
          },
          contents,
          generationConfig: {
            temperature: 0.4,
            maxOutputTokens: 1024,
          },
        }),
      });
    } catch (err) {
      return new Response(
        JSON.stringify({ error: "Failed to reach Gemini API: " + err.message }),
        {
          status: 502,
          headers: { ...cors, "Content-Type": "application/json" },
        }
      );
    }

    if (!geminiRes.ok) {
      const errText = await geminiRes.text();
      return new Response(
        JSON.stringify({ error: "Gemini API error: " + errText }),
        {
          status: geminiRes.status,
          headers: { ...cors, "Content-Type": "application/json" },
        }
      );
    }

    const geminiData = await geminiRes.json();
    const reply =
      geminiData?.candidates?.[0]?.content?.parts?.[0]?.text ||
      "Sorry, I could not generate a response. Please try again.";

    return new Response(JSON.stringify({ reply }), {
      status: 200,
      headers: { ...cors, "Content-Type": "application/json" },
    });
  },
};
