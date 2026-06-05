import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const systemInstruction = `သင်သည် "NetCodeShop" ဝက်ဘ်ဆိုက်၏ တရားဝင် Customer Service Chatbot ဖြစ်သည်။

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

let ai;

function getAI() {
  if (!ai) {
    if (!process.env.GEMINI_API_KEY) {
      throw new Error('GEMINI_API_KEY environment variable is not set.');
    }
    ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
  }
  return ai;
}

app.post('/api/chat', async (req, res) => {
  try {
    const { message, history = [] } = req.body;

    if (!message || typeof message !== 'string') {
      return res.status(400).json({ error: 'Message is required.' });
    }

    const client = getAI();

    const chat = client.chats.create({
      model: 'gemini-2.5-flash',
      config: { systemInstruction },
      history: history.map((h) => ({
        role: h.role,
        parts: [{ text: h.text }],
      })),
    });

    const response = await chat.sendMessage({ message });

    res.json({ reply: response.text });
  } catch (err) {
    console.error('Gemini API error:', err.message);
    if (err.message.includes('GEMINI_API_KEY')) {
      return res.status(500).json({ error: 'API key is not configured. Please set GEMINI_API_KEY in Secrets.' });
    }
    res.status(500).json({ error: 'Failed to get response from Gemini. Please try again.' });
  }
});

app.get('/api/health', (_req, res) => res.json({ status: 'ok' }));

const PORT = process.env.API_PORT || 3001;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`NetCodeShop API server running on port ${PORT}`);
});
