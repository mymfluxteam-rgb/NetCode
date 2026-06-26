import { useState, useEffect, useCallback } from "react";
import { Zap, Monitor, ShieldCheck, Clock, CheckCircle, X, ChevronLeft, ChevronRight } from "lucide-react";
import chat1 from "../../imports/support-anydesk-chat1.png";
import chat2 from "../../imports/support-anydesk-chat2.png";

const supportChats = [
  { img: chat1, caption: "Client encountered a setup error — NetCodeShop responded immediately and offered remote access" },
  { img: chat2, caption: "AnyDesk session connected — issue resolved, client confirmed \"Success\"" },
];

const cards = [
  {
    icon: Zap,
    color: "blue",
    title: "Instant Issue Reporting",
    english: "Fast Response",
    description:
      "Ran into an error or setup problem? Ping us immediately via WhatsApp or Telegram. Our team responds within minutes — not days.",
    points: [
      "24/7 WhatsApp & Telegram support",
      "Real-time error diagnosis",
      "Step-by-step guidance provided",
    ],
  },
  {
    icon: Monitor,
    color: "purple",
    title: "Remote Support via AnyDesk",
    english: "Direct PC Access",
    description:
      "We log directly into your PC via AnyDesk or UltraViewer and fix environment, IDE, or dependency issues hands-on — no guesswork.",
    points: [
      "Direct remote access to your machine",
      "Fix IDE, environment & dependencies",
      "Compatible with AnyDesk & UltraViewer",
    ],
  },
  {
    icon: ShieldCheck,
    color: "indigo",
    title: "100% Success Guarantee",
    english: "Verified & Guaranteed",
    description:
      "We don't just sell code — we make sure it runs perfectly on your machine. Verified by hundreds of successful remote support sessions.",
    points: [
      "We don't stop until it works",
      "Hundreds of successful remote sessions",
      "Every project personally verified",
    ],
  },
];

const colorMap: Record<string, { ring: string; icon: string; badge: string; glow: string; point: string }> = {
  blue:   { ring: "border-blue-500/30",   icon: "bg-blue-500/15 text-blue-400",   badge: "bg-blue-500/10 text-blue-300 border-blue-500/20",   glow: "shadow-blue-500/10",   point: "text-blue-400" },
  purple: { ring: "border-purple-500/30", icon: "bg-purple-500/15 text-purple-400", badge: "bg-purple-500/10 text-purple-300 border-purple-500/20", glow: "shadow-purple-500/10", point: "text-purple-400" },
  indigo: { ring: "border-indigo-500/30", icon: "bg-indigo-500/15 text-indigo-400", badge: "bg-indigo-500/10 text-indigo-300 border-indigo-500/20", glow: "shadow-indigo-500/10", point: "text-indigo-400" },
};

export function TechSupportSection() {
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);

  const close = useCallback(() => setLightboxIdx(null), []);
  const prev = useCallback(() => setLightboxIdx(i => i !== null ? (i - 1 + supportChats.length) % supportChats.length : null), []);
  const next = useCallback(() => setLightboxIdx(i => i !== null ? (i + 1) % supportChats.length : null), []);

  useEffect(() => {
    if (lightboxIdx === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [lightboxIdx, close, prev, next]);

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">

      {/* ── Header ── */}
      <div className="text-center mb-14">
        <div className="inline-flex items-center gap-2 bg-blue-600/15 border border-blue-500/30 text-blue-400 text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-widest mb-5">
          <Clock className="w-3.5 h-3.5" />
          24/7 Technical Support
        </div>
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
          24/7 Technical Support &amp;{" "}
          <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Instant Solutions
          </span>
        </h2>
        <p className="text-gray-400 text-base md:text-lg max-w-2xl mx-auto">
          Running into errors or setup issues after purchase? Don't worry.{" "}
          <span className="text-white font-medium">The NetCodeShop team</span> is ready to help you anytime.
        </p>
      </div>

      {/* ── 3-column cards ── */}
      <div className="grid md:grid-cols-3 gap-6 mb-14">
        {cards.map((card) => {
          const c = colorMap[card.color];
          const Icon = card.icon;
          return (
            <div
              key={card.title}
              className={`relative bg-slate-800/50 border ${c.ring} rounded-2xl p-6 shadow-xl ${c.glow} hover:shadow-2xl transition-shadow`}
            >
              {/* Subtle top glow bar */}
              <div className={`absolute top-0 left-6 right-6 h-px ${card.color === "blue" ? "bg-gradient-to-r from-transparent via-blue-500/50 to-transparent" : card.color === "purple" ? "bg-gradient-to-r from-transparent via-purple-500/50 to-transparent" : "bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent"}`} />

              {/* Icon */}
              <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl ${c.icon} mb-5`}>
                <Icon className="w-6 h-6" />
              </div>

              {/* Badge */}
              <span className={`inline-block text-xs font-semibold border rounded-full px-2.5 py-0.5 mb-3 ${c.badge}`}>
                {card.english}
              </span>

              {/* Title & description */}
              <h3 className="text-white font-bold text-lg mb-2">{card.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed mb-5">{card.description}</p>

              {/* Bullet points */}
              <ul className="space-y-2">
                {card.points.map((pt) => (
                  <li key={pt} className="flex items-start gap-2 text-sm">
                    <CheckCircle className={`w-4 h-4 mt-0.5 flex-shrink-0 ${c.point}`} />
                    <span className="text-gray-300">{pt}</span>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>

      {/* ── Real support chat proof ── */}
      <div className="bg-slate-800/40 border border-white/10 rounded-2xl p-6 md:p-8">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div>
            <p className="text-xs font-bold text-blue-400 uppercase tracking-widest mb-1">Real Proof</p>
            <h3 className="text-white font-bold text-xl">
              Real Support Chat — AnyDesk Session
            </h3>
            <p className="text-gray-400 text-sm mt-1">
              Actual conversation between the NetCodeShop team and a client. Issue fully resolved in a single session.
            </p>
          </div>
          <div className="flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-bold px-4 py-2 rounded-full">
            <CheckCircle className="w-4 h-4" />
            Resolved — "Success"
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          {supportChats.map((chat, i) => (
            <div
              key={i}
              className="group relative bg-slate-900/60 border border-white/8 rounded-xl overflow-hidden cursor-zoom-in"
              onClick={() => setLightboxIdx(i)}
            >
              <img
                src={chat.img}
                alt={chat.caption}
                className="w-full object-contain object-top transition-transform duration-300 group-hover:scale-[1.02]"
                style={{ maxHeight: 340 }}
              />
              {/* Hover overlay */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/25 transition-colors flex items-center justify-center">
                <div className="opacity-0 group-hover:opacity-100 transition-opacity bg-black/70 rounded-full p-3">
                  <Monitor className="w-5 h-5 text-white" />
                </div>
              </div>
              {/* Caption bar */}
              <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 to-transparent px-4 py-3">
                <p className="text-white text-xs font-medium leading-snug">{chat.caption}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Lightbox ── */}
      {lightboxIdx !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm"
          onClick={close}
        >
          <button
            className="absolute top-4 right-4 z-10 bg-white/10 hover:bg-white/20 rounded-full p-2 text-white transition-colors"
            onClick={close}
            aria-label="Close"
          >
            <X className="w-6 h-6" />
          </button>
          <button
            className="absolute left-4 z-10 bg-white/10 hover:bg-white/20 rounded-full p-3 text-white transition-colors"
            onClick={e => { e.stopPropagation(); prev(); }}
            aria-label="Previous"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <div
            className="relative max-w-sm w-full mx-16 flex flex-col items-center gap-4"
            onClick={e => e.stopPropagation()}
          >
            <img
              src={supportChats[lightboxIdx].img}
              alt={supportChats[lightboxIdx].caption}
              className="max-h-[80vh] w-auto rounded-2xl shadow-2xl object-contain"
            />
            <p className="text-center text-gray-300 text-sm px-4">{supportChats[lightboxIdx].caption}</p>
            <div className="flex gap-2">
              {supportChats.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setLightboxIdx(i)}
                  className={`w-2 h-2 rounded-full transition-colors ${i === lightboxIdx ? "bg-white" : "bg-white/30 hover:bg-white/60"}`}
                />
              ))}
            </div>
          </div>
          <button
            className="absolute right-4 z-10 bg-white/10 hover:bg-white/20 rounded-full p-3 text-white transition-colors"
            onClick={e => { e.stopPropagation(); next(); }}
            aria-label="Next"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
          <p className="absolute bottom-4 left-1/2 -translate-x-1/2 text-xs text-white/30 pointer-events-none">
            ← → to navigate · Esc to close
          </p>
        </div>
      )}

    </section>
  );
}
