import { useState, useEffect, useCallback } from "react";
import { BadgeCheck, MapPin, CreditCard, MessageSquareQuote, ZoomIn, X, ChevronLeft, ChevronRight } from "lucide-react";
import whatsappProof from "../../imports/proof-whatsapp-chat.png";
import binanceProof from "../../imports/proof-binance-payment.png";
import telegramProof from "../../imports/proof-telegram-delivery.png";

const proofs = [
  {
    img: binanceProof,
    label: "Bukti Pembayaran",
    sublabel: "Binance USDT — Selesai",
    badge: "Payment Confirmed",
  },
  {
    img: whatsappProof,
    label: "Konfirmasi WhatsApp",
    sublabel: "Klien mengirim bukti transfer via WA",
    badge: "WhatsApp Verified",
  },
  {
    img: telegramProof,
    label: "Pengiriman via Telegram",
    sublabel: "Source code dikirim langsung",
    badge: "Instant Delivery",
  },
];

export function TrustProofIndonesia() {
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);

  const close = useCallback(() => setLightboxIdx(null), []);
  const prev = useCallback(() => setLightboxIdx(i => i !== null ? (i - 1 + proofs.length) % proofs.length : null), []);
  const next = useCallback(() => setLightboxIdx(i => i !== null ? (i + 1) % proofs.length : null), []);

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
    <section id="proof-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">

      {/* ── Header ── */}
      <div className="mb-10">
        <div className="flex items-center gap-2 mb-4">
          <span className="inline-flex items-center gap-1.5 bg-red-600/20 border border-red-500/40 text-red-400 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">
            <span className="text-base leading-none">🇮🇩</span>
            Verified Indonesian Client
          </span>
        </div>
        <h2 className="text-2xl md:text-3xl font-bold text-white flex flex-wrap items-center gap-3 mb-2">
          <span className="text-3xl md:text-4xl">🇮🇩</span>
          <span>
            Bukti Pembelian &amp; Pengiriman Instan
            <span className="text-red-400"> — Klien Indonesia</span>
          </span>
        </h2>
        <p className="text-gray-400 text-sm md:text-base max-w-2xl">
          Pembayaran dilakukan melalui <span className="text-yellow-400 font-semibold">Binance USDT</span>,
          dan source code langsung dikirim via <span className="text-emerald-400 font-semibold">Telegram</span> setelah konfirmasi.
        </p>
      </div>

      {/* ── Location + Currency info strip ── */}
      <div className="flex flex-wrap gap-3 mb-10">
        <div className="flex items-center gap-2 bg-slate-800/70 border border-white/10 rounded-xl px-4 py-2.5">
          <MapPin className="w-4 h-4 text-red-400 flex-shrink-0" />
          <span className="text-sm font-bold text-red-300">Pembelian dari Jakarta, Indonesia</span>
        </div>
        <div className="flex items-center gap-2 bg-slate-800/70 border border-yellow-500/20 rounded-xl px-4 py-2.5">
          <CreditCard className="w-4 h-4 text-yellow-400 flex-shrink-0" />
          <span className="text-sm text-gray-300">
            Transaksi via <span className="font-bold text-yellow-400">USDT</span>
            <span className="text-gray-400"> (≈ Rp 16.300 / USDT)</span>
          </span>
        </div>
        <div className="flex items-center gap-2 bg-slate-800/70 border border-emerald-500/20 rounded-xl px-4 py-2.5">
          <BadgeCheck className="w-4 h-4 text-emerald-400 flex-shrink-0" />
          <span className="text-sm font-bold text-emerald-400">Verified Purchase from Indonesia</span>
        </div>
      </div>

      {/* ── Indonesian testimonial card ── */}
      <div className="mb-10 relative bg-gradient-to-r from-red-950/40 to-slate-900/60 border border-red-500/30 rounded-2xl p-5 md:p-6">
        <div className="flex items-start gap-4">
          <MessageSquareQuote className="w-8 h-8 text-red-400 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-white font-semibold text-base md:text-lg leading-relaxed mb-2">
              "Sangat puas! Source code langsung dikirim via Telegram setelah pembayaran.
              Penjual terpercaya dari <span className="text-red-400">NetCodeShop</span>."
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <span className="text-gray-400 text-sm">— Klien Terverifikasi</span>
              <span className="flex items-center gap-1 bg-red-600/20 border border-red-500/30 text-red-400 text-xs font-bold px-2.5 py-0.5 rounded-full">
                🇮🇩 Jakarta, Indonesia
              </span>
              <span className="flex items-center gap-1 text-xs text-emerald-400">
                <BadgeCheck className="w-3.5 h-3.5" />
                Verified Buyer
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* ── Screenshot proofs grid ── */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {proofs.map((p, i) => (
          <div
            key={i}
            className="group bg-slate-800/60 border border-white/10 rounded-2xl overflow-hidden hover:border-red-500/40 transition-colors"
          >
            {/* Clickable screenshot */}
            <div
              className="relative bg-slate-900/80 overflow-hidden cursor-zoom-in"
              style={{ maxHeight: 320 }}
              onClick={() => setLightboxIdx(i)}
              role="button"
              aria-label={`Lihat ${p.label} ukuran penuh`}
            >
              <img
                src={p.img}
                alt={p.label}
                className="w-full object-contain object-top transition-transform duration-300 group-hover:scale-[1.03]"
                style={{ maxHeight: 320 }}
              />
              {/* Hover zoom hint */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-center justify-center">
                <div className="opacity-0 group-hover:opacity-100 transition-opacity bg-black/70 rounded-full p-3">
                  <ZoomIn className="w-6 h-6 text-white" />
                </div>
              </div>
              {/* Overlay badge */}
              <div className="absolute top-3 left-3">
                <span className="flex items-center gap-1 bg-emerald-600/90 text-white text-xs font-bold px-2.5 py-1 rounded-full shadow-lg">
                  <BadgeCheck className="w-3 h-3" />
                  {p.badge}
                </span>
              </div>
              {/* Indonesia flag badge */}
              <div className="absolute top-3 right-3">
                <span className="bg-slate-900/80 border border-white/10 text-xs px-2 py-1 rounded-full text-white font-medium">
                  🇮🇩 Indonesia
                </span>
              </div>
            </div>

            {/* Caption */}
            <div
              className="px-4 py-3 border-t border-white/5 cursor-pointer hover:bg-white/5 transition-colors"
              onClick={() => setLightboxIdx(i)}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white font-bold text-sm">{p.label}</p>
                  <p className="text-gray-400 text-xs mt-0.5">{p.sublabel}</p>
                </div>
                <ZoomIn className="w-4 h-4 text-gray-500 flex-shrink-0" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ── Bottom trust strip ── */}
      <div className="mt-8 flex flex-wrap justify-center gap-6 text-sm text-gray-400">
        <span className="flex items-center gap-1.5">
          <BadgeCheck className="w-4 h-4 text-emerald-400" />
          Bukti nyata dari klien Indonesia
        </span>
        <span className="flex items-center gap-1.5">
          <BadgeCheck className="w-4 h-4 text-emerald-400" />
          Pembayaran terverifikasi di Binance
        </span>
        <span className="flex items-center gap-1.5">
          <BadgeCheck className="w-4 h-4 text-emerald-400" />
          Pengiriman instan via Telegram
        </span>
      </div>

      {/* ── Lightbox ── */}
      {lightboxIdx !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm"
          onClick={close}
        >
          {/* Close */}
          <button
            className="absolute top-4 right-4 z-10 bg-white/10 hover:bg-white/20 rounded-full p-2 text-white transition-colors"
            onClick={close}
            aria-label="Tutup"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Prev */}
          <button
            className="absolute left-4 z-10 bg-white/10 hover:bg-white/20 rounded-full p-3 text-white transition-colors"
            onClick={e => { e.stopPropagation(); prev(); }}
            aria-label="Sebelumnya"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Image */}
          <div
            className="relative max-w-lg w-full mx-16 flex flex-col items-center gap-4"
            onClick={e => e.stopPropagation()}
          >
            <img
              src={proofs[lightboxIdx].img}
              alt={proofs[lightboxIdx].label}
              className="max-h-[80vh] w-auto rounded-2xl shadow-2xl object-contain"
            />
            {/* Caption */}
            <div className="text-center">
              <p className="text-white font-bold text-base">{proofs[lightboxIdx].label}</p>
              <p className="text-gray-400 text-sm">{proofs[lightboxIdx].sublabel}</p>
            </div>
            {/* Dot indicators */}
            <div className="flex gap-2">
              {proofs.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setLightboxIdx(i)}
                  className={`w-2 h-2 rounded-full transition-colors ${i === lightboxIdx ? "bg-white" : "bg-white/30 hover:bg-white/60"}`}
                  aria-label={`Gambar ${i + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Next */}
          <button
            className="absolute right-4 z-10 bg-white/10 hover:bg-white/20 rounded-full p-3 text-white transition-colors"
            onClick={e => { e.stopPropagation(); next(); }}
            aria-label="Berikutnya"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Keyboard hint */}
          <p className="absolute bottom-4 left-1/2 -translate-x-1/2 text-xs text-white/30 pointer-events-none">
            ← → to navigate · Esc to close
          </p>
        </div>
      )}

    </section>
  );
}
