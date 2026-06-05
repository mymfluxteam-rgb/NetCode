import { useState, useRef, useEffect, FormEvent } from "react";
import { Send, Bot, User, Loader2, MessageSquare, Copy, Check, ExternalLink } from "lucide-react";

const CLOUDFLARE_WORKER_URL = "https://netcodeshop-chatbot.mymauthtool.workers.dev";

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

export function Chat() {
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
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

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
      const res = await fetch(CLOUDFLARE_WORKER_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text, history }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Server error");
      setMessages((prev) => [...prev, { role: "model", text: data.reply }]);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Unknown error";
      setError(message);
    } finally {
      setLoading(false);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
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
    <div className="flex flex-col h-[calc(100vh-4rem)]">
      {/* Header */}
      <div className="bg-slate-900/80 backdrop-blur-md border-b border-white/10 px-4 py-4">
        <div className="max-w-3xl mx-auto flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-purple-600 flex items-center justify-center flex-shrink-0">
            <Bot className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-white font-semibold text-lg leading-tight">NetCodeShop Support</h1>
            <p className="text-green-400 text-xs flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-green-400 inline-block animate-pulse" />
              Online — Customer Service 24/7
            </p>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-6 space-y-4">
        <div className="max-w-3xl mx-auto space-y-4">
          {messages.map((msg, i) => {
            const matched = msg.role === "model" && i > 0 ? getMatchedProducts(msg.text) : [];
            const isCopied = copiedIndex === i;
            return (
              <div key={i} className="space-y-2">
                <div className={`flex gap-3 ${msg.role === "user" ? "flex-row-reverse" : "flex-row"}`}>
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                      msg.role === "user" ? "bg-blue-600" : "bg-purple-600"
                    }`}
                  >
                    {msg.role === "user" ? (
                      <User className="w-4 h-4 text-white" />
                    ) : (
                      <Bot className="w-4 h-4 text-white" />
                    )}
                  </div>

                  <div className={`flex flex-col gap-1 max-w-[75%] ${msg.role === "user" ? "items-end" : "items-start"}`}>
                    <div
                      className={`rounded-2xl px-4 py-3 text-sm leading-relaxed whitespace-pre-wrap shadow ${
                        msg.role === "user"
                          ? "bg-blue-600 text-white rounded-tr-sm"
                          : "bg-slate-800/90 text-gray-100 border border-white/10 rounded-tl-sm"
                      }`}
                    >
                      {msg.text}
                    </div>

                    {/* Copy button — on all messages except the initial greeting */}
                    {i > 0 && (
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
                    )}
                  </div>
                </div>

                {/* Product cards */}
                {matched.length > 0 && (
                  <div className="pl-11 space-y-2">
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
            <div className="pl-11 flex flex-wrap gap-2 pt-1">
              {SUGGESTIONS.map((q) => (
                <button
                  key={q}
                  onClick={() => send(q)}
                  className="text-sm px-3 py-1.5 rounded-full border border-purple-500/50 text-purple-300 hover:bg-purple-600 hover:text-white hover:border-purple-600 transition-colors text-left"
                >
                  {q}
                </button>
              ))}
            </div>
          )}

          {/* Typing indicator */}
          {loading && (
            <div className="flex gap-3 flex-row">
              <div className="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center flex-shrink-0">
                <Bot className="w-4 h-4 text-white" />
              </div>
              <div className="bg-slate-800/90 border border-white/10 rounded-2xl rounded-tl-sm px-4 py-3 flex items-center gap-2">
                <Loader2 className="w-4 h-4 text-purple-400 animate-spin" />
                <span className="text-gray-400 text-sm">Responding…</span>
              </div>
            </div>
          )}

          {/* Error */}
          {error && (
            <div className="bg-red-900/40 border border-red-500/30 text-red-300 text-sm rounded-xl px-4 py-3 max-w-lg">
              ⚠️ {error}
            </div>
          )}

          <div ref={bottomRef} />
        </div>
      </div>

      {/* Input Bar */}
      <div className="bg-slate-900/80 backdrop-blur-md border-t border-white/10 px-4 py-4">
        <form onSubmit={handleSubmit} className="max-w-3xl mx-auto flex gap-3 items-center">
          <div className="flex-1 relative">
            <MessageSquare className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type a message..."
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
