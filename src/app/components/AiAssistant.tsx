import { useState, useRef, useEffect, FormEvent } from "react";
import { Send, Bot, User, Loader2, MessageSquare, Copy, Check, ExternalLink, Sparkles, Zap } from "lucide-react";

const CLOUDFLARE_WORKER_URL = import.meta.env.PROD
  ? "https://chatbot.netcodeshop.shop"
  : "/api/chat";

interface Message {
  role: "user" | "model";
  text: string;
}

interface Product {
  name: string;
  description: string;
  keywords: string[];
  url: string;
  badge: string;
}

const PRODUCTS: Product[] = [
  {
    name: "MiFix Pro",
    keywords: ["mifix", "mifix pro"],
    description: "Professional Android device repair & flashing tool.",
    url: "https://netcodeshop.shop",
    badge: "Android",
  },
  {
    name: "Qualcomm Flashing Tool",
    keywords: ["qualcomm", "qualcomm flashing"],
    description: "Professional flashing software for Qualcomm chipset devices.",
    url: "https://netcodeshop.shop",
    badge: "Qualcomm",
  },
  {
    name: "Android Service Tool",
    keywords: ["android service", "android service tool"],
    description: "Comprehensive service tool for Android device repair.",
    url: "https://netcodeshop.shop",
    badge: "Android",
  },
  {
    name: "MTK Auth Bypass Tool",
    keywords: ["mtk", "auth bypass", "mtk auth", "mediatek"],
    description: "Authentication bypass tool for MediaTek chipset devices.",
    url: "https://netcodeshop.shop",
    badge: "MTK",
  },
  {
    name: "License Key System",
    keywords: ["license key", "license key system", "license system"],
    description: "Complete software license management system.",
    url: "https://netcodeshop.shop",
    badge: "Software",
  },
  {
    name: "ISP Programmer Tool",
    keywords: ["isp programmer", "isp tool", "isp programming"],
    description: "In-System Programming device programmer tool.",
    url: "https://netcodeshop.shop",
    badge: "Hardware",
  },
];

const SUGGESTIONS = [
  "What products do you sell?",
  "How does delivery work?",
  "What payment methods are accepted?",
  "Do you offer after-sales support?",
];

function getMatchedProducts(text: string): Product[] {
  const lower = text.toLowerCase();
  return PRODUCTS.filter((p) => p.keywords.some((kw) => lower.includes(kw)));
}

function ProductCard({ product }: { product: Product }) {
  return (
    <a
      href={product.url}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-3 bg-slate-700/60 hover:bg-slate-700 border border-white/10 hover:border-purple-500/50 rounded-xl px-4 py-3 transition-all group"
    >
      <div className="w-9 h-9 rounded-lg bg-purple-600/30 border border-purple-500/30 flex items-center justify-center flex-shrink-0">
        <Bot className="w-4 h-4 text-purple-400" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-0.5">
          <span className="text-white text-sm font-semibold leading-tight truncate">{product.name}</span>
          <span className="text-xs px-1.5 py-0.5 rounded-full bg-purple-600/30 text-purple-300 flex-shrink-0">{product.badge}</span>
        </div>
        <p className="text-gray-400 text-xs leading-tight truncate">{product.description}</p>
      </div>
      <ExternalLink className="w-4 h-4 text-gray-500 group-hover:text-purple-400 flex-shrink-0 transition-colors" />
    </a>
  );
}

const GREETING = "Hello! I am NetCodeShop's AI Assistant. How can I help you today?";

export function AiAssistant() {
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [greetingText, setGreetingText] = useState("");
  const [greetingDone, setGreetingDone] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      i++;
      setGreetingText(GREETING.slice(0, i));
      if (i >= GREETING.length) {
        clearInterval(interval);
        setGreetingDone(true);
        setShowSuggestions(true);
      }
    }, 30);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading, greetingText]);

  async function callWorker(
    text: string,
    history: { role: string; text: string }[],
    provider: string
  ): Promise<string> {
    const res = await fetch(CLOUDFLARE_WORKER_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: text, history, useProvider: provider }),
    });
    const data = await res.json();
    if (!res.ok || !data.success) throw new Error(data.error || `${provider} failed`);
    return data.answer as string;
  }

  async function send(text: string) {
    if (!text.trim() || loading) return;
    setShowSuggestions(false);

    const newUserMsg: Message = { role: "user", text };
    const updatedMessages = [...messages, newUserMsg];
    setMessages(updatedMessages);
    setInput("");
    setLoading(true);
    setError(null);

    const history = updatedMessages.slice(0, -1).map((m) => ({
      role: m.role,
      text: m.text,
    }));

    try {
      const answer = await callWorker(text, history, "");
      setMessages((prev) => [...prev, { role: "model", text: answer }]);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "All providers failed. Please try again later.");
    }

    setLoading(false);
    setTimeout(() => inputRef.current?.focus(), 50);
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    send(input.trim());
  }

  function handleCopy(index: number) {
    const botMsg = messages[index];
    const userMsg = index > 0 ? messages[index - 1] : null;
    const textToCopy =
      userMsg?.role === "user"
        ? `Q: ${userMsg.text}\n\nA: ${botMsg.text}`
        : botMsg.text;
    navigator.clipboard.writeText(textToCopy);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  }

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col">
      {/* Hero Header */}
      <div className="relative overflow-hidden bg-gradient-to-b from-slate-900 to-slate-950 border-b border-white/10">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[200px] bg-purple-600/10 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-3xl mx-auto px-4 py-10 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-600 to-purple-800 flex items-center justify-center shadow-lg shadow-purple-900/40">
              <Sparkles className="w-7 h-7 text-white" />
            </div>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2 tracking-tight">
            AI Assistant
          </h1>
          <p className="text-gray-400 text-sm sm:text-base max-w-md mx-auto">
            Ask me anything about our products, pricing, delivery, or support — I'm here 24/7.
          </p>
          <div className="flex items-center justify-center gap-4 mt-4">
            <span className="flex items-center gap-1.5 text-xs text-green-400">
              <span className="w-2 h-2 rounded-full bg-green-400 inline-block animate-pulse" />
              Online now
            </span>
            <span className="flex items-center gap-1.5 text-xs text-purple-400">
              <Zap className="w-3.5 h-3.5" />
              Powered by NetCodeShop
            </span>
          </div>
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col max-w-3xl w-full mx-auto px-4 py-6 gap-4 overflow-y-auto">
        <div className="space-y-4">

          {/* Animated greeting */}
          <div className="space-y-2">
            <div className="flex gap-3 flex-row">
              <div className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 shadow-md bg-gradient-to-br from-purple-500 to-purple-700">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <div className="flex flex-col gap-1 max-w-[75%] items-start">
                <span className="text-xs font-medium mb-0.5 text-purple-400">AI Assistant</span>
                <div className="rounded-2xl px-4 py-3 text-sm leading-relaxed whitespace-pre-wrap shadow bg-slate-800/90 text-gray-100 border border-white/10 rounded-tl-sm">
                  {greetingText}
                  {!greetingDone && (
                    <span className="inline-block w-0.5 h-4 bg-purple-400 ml-0.5 animate-pulse align-middle" />
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Subsequent messages */}
          {messages.map((msg, i) => {
            const matched = msg.role === "model" ? getMatchedProducts(msg.text) : [];
            const isCopied = copiedIndex === i;
            return (
              <div key={i} className="space-y-2">
                <div className={`flex gap-3 ${msg.role === "user" ? "flex-row-reverse" : "flex-row"}`}>
                  <div
                    className={`w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 shadow-md ${
                      msg.role === "user"
                        ? "bg-blue-600"
                        : "bg-gradient-to-br from-purple-500 to-purple-700"
                    }`}
                  >
                    {msg.role === "user" ? (
                      <User className="w-4 h-4 text-white" />
                    ) : (
                      <Sparkles className="w-4 h-4 text-white" />
                    )}
                  </div>

                  <div className={`flex flex-col gap-1 max-w-[75%] ${msg.role === "user" ? "items-end" : "items-start"}`}>
                    <span className={`text-xs font-medium mb-0.5 ${msg.role === "user" ? "text-blue-400" : "text-purple-400"}`}>
                      {msg.role === "user" ? "You" : "AI Assistant"}
                    </span>
                    <div
                      className={`rounded-2xl px-4 py-3 text-sm leading-relaxed whitespace-pre-wrap shadow ${
                        msg.role === "user"
                          ? "bg-blue-600 text-white rounded-tr-sm"
                          : "bg-slate-800/90 text-gray-100 border border-white/10 rounded-tl-sm"
                      }`}
                    >
                      {msg.text}
                    </div>

                    <button
                      onClick={() => handleCopy(i)}
                      className={`flex items-center gap-1 text-xs px-2 py-1 rounded-lg transition-all ${
                        isCopied
                          ? "text-green-400 bg-green-900/20"
                          : "text-gray-500 hover:text-gray-300 hover:bg-white/5"
                      }`}
                      title={msg.role === "model" ? "Copy Q&A" : "Copy message"}
                    >
                      {isCopied ? (
                        <><Check className="w-3 h-3" /> Copied</>
                      ) : (
                        <><Copy className="w-3 h-3" /> {msg.role === "model" ? "Copy Q&A" : "Copy"}</>
                      )}
                    </button>
                  </div>
                </div>

                {matched.length > 0 && (
                  <div className="pl-12 space-y-2">
                    {matched.map((p) => (
                      <ProductCard key={p.name} product={p} />
                    ))}
                  </div>
                )}
              </div>
            );
          })}

          {/* Suggested questions */}
          {showSuggestions && !loading && (
            <div className="pl-12 flex flex-wrap gap-2 pt-1">
              {SUGGESTIONS.map((q, idx) => (
                <button
                  key={q}
                  onClick={() => send(q)}
                  className="chip-fade-in text-sm px-3 py-1.5 rounded-full border border-purple-500/50 text-purple-300 hover:bg-purple-600 hover:text-white hover:border-purple-600 transition-colors text-left"
                  style={{ animationDelay: `${idx * 100}ms` }}
                >
                  {q}
                </button>
              ))}
            </div>
          )}

          {/* Typing indicator */}
          {loading && (
            <div className="flex gap-3 flex-row">
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-purple-500 to-purple-700 flex items-center justify-center flex-shrink-0">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <div className="bg-slate-800/90 border border-white/10 rounded-2xl rounded-tl-sm px-4 py-3 flex items-center gap-2">
                <Loader2 className="w-4 h-4 text-purple-400 animate-spin" />
                <span className="text-gray-400 text-sm">Responding…</span>
              </div>
            </div>
          )}

          {error && (
            <div className="bg-red-900/40 border border-red-500/30 text-red-300 text-sm rounded-xl px-4 py-3 max-w-lg">
              ⚠️ {error}
            </div>
          )}

          <div ref={bottomRef} />
        </div>
      </div>

      {/* Sticky Input Bar */}
      <div className="sticky bottom-0 bg-slate-950/90 backdrop-blur-md border-t border-white/10 px-4 py-4">
        <form onSubmit={handleSubmit} className="max-w-3xl mx-auto flex gap-3 items-center">
          <div className="flex-1 relative">
            <MessageSquare className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask the AI Assistant anything..."
              disabled={loading}
              className="w-full bg-slate-800 border border-white/10 text-white placeholder-gray-500 rounded-xl pl-10 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition disabled:opacity-50"
            />
          </div>
          <button
            type="submit"
            disabled={!input.trim() || loading}
            className="bg-purple-600 hover:bg-purple-700 disabled:opacity-40 disabled:cursor-not-allowed text-white rounded-xl w-11 h-11 flex items-center justify-center flex-shrink-0 transition-colors"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
}
