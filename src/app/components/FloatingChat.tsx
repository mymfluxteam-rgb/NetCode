import { useState, useRef, useEffect, FormEvent } from "react";
import { Bot, X, Send, User, Loader2, MessageSquare, Minimize2, Copy, Check, ExternalLink } from "lucide-react";
import { useNavigate } from "react-router";

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
    description: "Android device repair & flashing tool.",
    url: "https://netcodeshop.shop",
    badge: "Android",
  },
  {
    name: "Qualcomm Flashing Tool",
    keywords: ["qualcomm", "qualcomm flashing"],
    description: "Flashing software for Qualcomm chipset devices.",
    url: "https://netcodeshop.shop",
    badge: "Qualcomm",
  },
  {
    name: "Android Service Tool",
    keywords: ["android service", "android service tool"],
    description: "Comprehensive Android device repair tool.",
    url: "https://netcodeshop.shop",
    badge: "Android",
  },
  {
    name: "MTK Auth Bypass Tool",
    keywords: ["mtk", "auth bypass", "mtk auth", "mediatek"],
    description: "Authentication bypass for MediaTek chipsets.",
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
      className="flex items-center gap-2 bg-slate-700/60 hover:bg-slate-700 border border-white/10 hover:border-purple-500/50 rounded-lg px-3 py-2 transition-all group"
    >
      <div className="w-7 h-7 rounded-md bg-purple-600/30 border border-purple-500/30 flex items-center justify-center flex-shrink-0">
        <Bot className="w-3.5 h-3.5 text-purple-400" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-1.5 mb-0.5">
          <span className="text-white text-xs font-semibold leading-tight truncate">{product.name}</span>
          <span className="text-[10px] px-1 py-0.5 rounded-full bg-purple-600/30 text-purple-300 flex-shrink-0">{product.badge}</span>
        </div>
        <p className="text-gray-400 text-[10px] leading-tight truncate">{product.description}</p>
      </div>
      <ExternalLink className="w-3 h-3 text-gray-500 group-hover:text-purple-400 flex-shrink-0 transition-colors" />
    </a>
  );
}

export function FloatingChat() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [dotVisible, setDotVisible] = useState(true);
  const [showSuggestions, setShowSuggestions] = useState(true);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "model",
      text: "Hello! I am NetCodeShop's Customer Service. How can I help you today?",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) {
      setDotVisible(false);
      bottomRef.current?.scrollIntoView({ behavior: "smooth" });
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [open, messages, loading]);

  // Client-side provider chain: Gemini → Groq → OpenRouter
  // Each call targets a single provider via `useProvider`.
  // If the worker returns a non-success response, we throw so the next
  // provider in the chain is tried.
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

    // Frontend fallback chain — tries each provider in order.
    const providerChain = ["gemini", "groq", "deepseek", "xai", "mistral", "anyscale"];
    let answer: string | null = null;
    let lastError = "All providers failed. Please try again later.";

    for (const provider of providerChain) {
      try {
        answer = await callWorker(text, history, provider);
        break; // success — stop trying
      } catch (err: unknown) {
        lastError = err instanceof Error ? err.message : `${provider} failed`;
      }
    }

    if (answer) {
      setMessages((prev) => [...prev, { role: "model", text: answer as string }]);
    } else {
      setError(lastError);
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
    <>
      {/* Chat Panel */}
      {open && (
        <div
          className="fixed bottom-24 right-5 z-50 w-[340px] sm:w-[380px] flex flex-col rounded-2xl shadow-2xl border border-white/10 overflow-hidden bg-slate-900"
          style={{ height: "500px" }}
        >
          {/* Header */}
          <div className="bg-slate-800 border-b border-white/10 px-4 py-3 flex items-center gap-3 flex-shrink-0">
            <div className="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center flex-shrink-0">
              <Bot className="w-4 h-4 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-white text-sm font-semibold leading-tight">NetCodeShop Support</p>
              <p className="text-green-400 text-xs flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400 inline-block animate-pulse" />
                Online — Customer Service 24/7
              </p>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="text-gray-400 hover:text-white transition-colors p-1 rounded-lg hover:bg-white/10"
              aria-label="Close chat"
            >
              <Minimize2 className="w-4 h-4" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-3 py-4 space-y-3 bg-slate-950/60">
            {messages.map((msg, i) => {
              const matched = msg.role === "model" && i > 0 ? getMatchedProducts(msg.text) : [];
              const isCopied = copiedIndex === i;
              return (
                <div key={i} className="space-y-1.5">
                  <div className={`flex gap-2 ${msg.role === "user" ? "flex-row-reverse" : "flex-row"}`}>
                    <div
                      className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${
                        msg.role === "user" ? "bg-blue-600" : "bg-purple-600"
                      }`}
                    >
                      {msg.role === "user" ? (
                        <User className="w-3 h-3 text-white" />
                      ) : (
                        <Bot className="w-3 h-3 text-white" />
                      )}
                    </div>

                    <div className={`flex flex-col gap-1 max-w-[78%] ${msg.role === "user" ? "items-end" : "items-start"}`}>
                      <div
                        className={`rounded-xl px-3 py-2 text-xs leading-relaxed whitespace-pre-wrap ${
                          msg.role === "user"
                            ? "bg-blue-600 text-white rounded-tr-sm"
                            : "bg-slate-800 text-gray-100 border border-white/10 rounded-tl-sm"
                        }`}
                      >
                        {msg.text}
                      </div>

                      {/* Copy button — all messages except initial greeting */}
                      {i > 0 && (
                        <button
                          onClick={() => handleCopy(i)}
                          className={`flex items-center gap-1 text-[10px] px-1.5 py-0.5 rounded-md transition-all ${
                            isCopied
                              ? "text-green-400 bg-green-900/20"
                              : "text-gray-600 hover:text-gray-300 hover:bg-white/5"
                          }`}
                          title={msg.role === "model" ? "Copy Q&A" : "Copy message"}
                        >
                          {isCopied ? (
                            <><Check className="w-2.5 h-2.5" /> Copied</>
                          ) : (
                            <><Copy className="w-2.5 h-2.5" /> {msg.role === "model" ? "Copy Q&A" : "Copy"}</>
                          )}
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Product cards */}
                  {matched.length > 0 && (
                    <div className="pl-8 space-y-1.5">
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
              <div className="pl-8 flex flex-wrap gap-1.5 pt-1">
                {SUGGESTIONS.map((q) => (
                  <button
                    key={q}
                    onClick={() => send(q)}
                    className="text-xs px-2.5 py-1.5 rounded-full border border-purple-500/50 text-purple-300 hover:bg-purple-600 hover:text-white hover:border-purple-600 transition-colors text-left"
                  >
                    {q}
                  </button>
                ))}
              </div>
            )}

            {loading && (
              <div className="flex gap-2">
                <div className="w-6 h-6 rounded-full bg-purple-600 flex items-center justify-center flex-shrink-0">
                  <Bot className="w-3 h-3 text-white" />
                </div>
                <div className="bg-slate-800 border border-white/10 rounded-xl rounded-tl-sm px-3 py-2 flex items-center gap-1.5">
                  <Loader2 className="w-3 h-3 text-purple-400 animate-spin" />
                  <span className="text-gray-400 text-xs">Responding…</span>
                </div>
              </div>
            )}

            {error && (
              <div className="bg-red-900/40 border border-red-500/30 text-red-300 text-xs rounded-lg px-3 py-2">
                ⚠️ {error}
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <form
            onSubmit={handleSubmit}
            className="flex gap-2 items-center px-3 py-3 border-t border-white/10 bg-slate-800 flex-shrink-0"
          >
            <div className="flex-1 relative">
              <MessageSquare className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-500 pointer-events-none" />
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type a message..."
                disabled={loading}
                className="w-full bg-slate-700 border border-white/10 text-white placeholder-gray-500 rounded-lg pl-8 pr-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition disabled:opacity-50"
              />
            </div>
            <button
              type="submit"
              disabled={!input.trim() || loading}
              className="bg-purple-600 hover:bg-purple-700 disabled:opacity-40 disabled:cursor-not-allowed text-white rounded-lg w-9 h-9 flex items-center justify-center flex-shrink-0 transition-colors"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>
      )}

      {/* Floating Button — navigates to AI Assistant page */}
      <button
        onClick={() => navigate("/ai-assistant")}
        className="fixed bottom-5 right-5 z-50 w-14 h-14 rounded-full bg-purple-600 hover:bg-purple-700 text-white shadow-2xl flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95"
        aria-label="Open AI Assistant"
      >
        <Bot className="w-6 h-6" />

        {dotVisible && (
          <span className="absolute top-0.5 right-0.5 flex h-3.5 w-3.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-red-500 border-2 border-purple-600" />
          </span>
        )}
      </button>
    </>
  );
}
