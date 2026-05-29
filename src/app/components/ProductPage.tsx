import { useParams, useNavigate } from "react-router";
import { useState, useEffect, useCallback } from "react";
import { ArrowLeft, Star, Download, CheckCircle2, Tag, X, ZoomIn, ChevronLeft, ChevronRight, PlayCircle, Github } from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { sourceCodeItems } from "./BuySourceCode";
import whatsappQr from "../../imports/whatsapp-qr.png";

function FacebookIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-7 h-7 fill-current" xmlns="http://www.w3.org/2000/svg">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}

function TelegramIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-7 h-7 fill-current" xmlns="http://www.w3.org/2000/svg">
      <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
    </svg>
  );
}

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-7 h-7 fill-current" xmlns="http://www.w3.org/2000/svg">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
    </svg>
  );
}

export function ProductPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const product = sourceCodeItems.find((item) => item.id === Number(id));

  const allImages = product
    ? product.images && product.images.length > 0
      ? product.images
      : product.image
      ? [product.image]
      : []
    : [];

  const [activeIdx, setActiveIdx] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIdx, setLightboxIdx] = useState(0);

  const closeLightbox = useCallback(() => setLightboxOpen(false), []);

  const lightboxPrev = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      setLightboxIdx((i) => (i - 1 + allImages.length) % allImages.length);
    },
    [allImages.length]
  );

  const lightboxNext = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      setLightboxIdx((i) => (i + 1) % allImages.length);
    },
    [allImages.length]
  );

  useEffect(() => {
    if (!lightboxOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") setLightboxIdx((i) => (i - 1 + allImages.length) % allImages.length);
      if (e.key === "ArrowRight") setLightboxIdx((i) => (i + 1) % allImages.length);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightboxOpen, closeLightbox, allImages.length]);

  if (!product) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-24 text-center">
        <h1 className="text-3xl text-gray-900 mb-4">Product Not Found</h1>
        <Button onClick={() => navigate("/buy-source-code")} variant="outline">
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to Store
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Back button */}
      <button
        onClick={() => navigate("/buy-source-code")}
        className="flex items-center gap-2 text-gray-500 hover:text-gray-800 mb-8 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span className="text-sm">Back to Store</span>
      </button>

      <div className="grid lg:grid-cols-5 gap-10">
        {/* Left column — gallery + contact */}
        <div className="lg:col-span-2 space-y-6">
          {allImages.length > 0 && (
            <div className="space-y-2">
              {/* Main image */}
              <div
                className="rounded-xl overflow-hidden border border-gray-200 shadow-sm bg-gray-50 relative group cursor-zoom-in"
                onDoubleClick={() => { setLightboxIdx(activeIdx); setLightboxOpen(true); }}
                title="Double-click to zoom"
              >
                <img
                  src={allImages[activeIdx]}
                  alt={`${product.name} screenshot ${activeIdx + 1}`}
                  className="w-full h-auto object-contain"
                />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/10 pointer-events-none">
                  <div className="bg-black/50 text-white text-xs px-2 py-1 rounded-full flex items-center gap-1">
                    <ZoomIn className="w-3 h-3" />
                    Double-click to zoom
                  </div>
                </div>
                {allImages.length > 1 && (
                  <div className="absolute bottom-2 right-2 bg-black/50 text-white text-xs px-2 py-0.5 rounded-full pointer-events-none">
                    {activeIdx + 1} / {allImages.length}
                  </div>
                )}
              </div>

              {/* Disclaimer */}
              <p className="text-xs text-gray-400 text-center italic px-1 pt-1">
                These images were purchased from NetCodeShop and are freely created with their own trademarks. You can view the images currently in use and purchase with confidence.
              </p>

              {/* Thumbnail strip — only shown when multiple images */}
              {allImages.length > 1 && (
                <div className="flex gap-2 overflow-x-auto pb-1">
                  {allImages.map((src, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveIdx(idx)}
                      className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                        idx === activeIdx
                          ? "border-blue-500 shadow-md scale-105"
                          : "border-gray-200 hover:border-blue-300 opacity-70 hover:opacity-100"
                      }`}
                    >
                      <img
                        src={src}
                        alt={`Thumbnail ${idx + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Lightbox */}
          {lightboxOpen && allImages.length > 0 && (
            <div
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-sm"
              onClick={closeLightbox}
            >
              <button
                onClick={closeLightbox}
                className="absolute top-4 right-4 bg-white/10 hover:bg-white/25 text-white rounded-full p-2 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>

              {allImages.length > 1 && (
                <>
                  <button
                    onClick={lightboxPrev}
                    className="absolute left-4 bg-white/10 hover:bg-white/25 text-white rounded-full p-3 transition-colors"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                  <button
                    onClick={lightboxNext}
                    className="absolute right-4 bg-white/10 hover:bg-white/25 text-white rounded-full p-3 transition-colors"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                    {allImages.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={(e) => { e.stopPropagation(); setLightboxIdx(idx); }}
                        className={`w-2 h-2 rounded-full transition-all ${
                          idx === lightboxIdx ? "bg-white scale-125" : "bg-white/40 hover:bg-white/70"
                        }`}
                      />
                    ))}
                  </div>
                </>
              )}

              <img
                src={allImages[lightboxIdx]}
                alt={`${product.name} screenshot ${lightboxIdx + 1}`}
                className="max-w-[88vw] max-h-[88vh] object-contain rounded-lg shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              />
            </div>
          )}

          {/* Pricing card */}
          <div className="rounded-xl border border-gray-200 shadow-sm p-5 bg-white">
            {product.price === 0 ? (
              <>
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-4xl font-bold text-green-600">Free</span>
                  <Badge className="bg-blue-100 text-blue-700 border-blue-200 font-semibold">Open Source</Badge>
                </div>
                {product.githubUrl && (
                  <a
                    href={product.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 w-full p-3 rounded-lg bg-gray-900 hover:bg-gray-700 text-white font-semibold transition-colors"
                  >
                    <Github className="w-5 h-5" />
                    View on GitHub
                  </a>
                )}
              </>
            ) : (
              <>
                <div className="flex items-center gap-3 mb-1">
                  <span className="text-4xl font-bold text-gray-900">${product.price}</span>
                  <Badge className="bg-green-100 text-green-700 border-green-200 font-semibold">
                    {product.originalPrice >= 1000 ? "30% OFF" : "10% OFF"}
                  </Badge>
                </div>
                <p className="text-sm text-gray-400 line-through mb-5">${product.originalPrice}</p>

            {/* Contact section */}
            <p className="text-sm font-semibold text-gray-700 mb-3">Contact to Purchase</p>
            <div className="space-y-3">
              {/* Facebook */}
              <a
                href="https://www.facebook.com/share/1B8BRnNqhr/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-3 rounded-lg border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-all group"
              >
                <span className="text-[#1877F2] group-hover:scale-110 transition-transform">
                  <FacebookIcon />
                </span>
                <div>
                  <p className="text-sm font-semibold text-gray-800">Facebook</p>
                  <p className="text-xs text-gray-500">Message us on Facebook</p>
                </div>
              </a>

              {/* Telegram */}
              <a
                href="https://t.me/NetCodeShop"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-3 rounded-lg border border-gray-200 hover:border-sky-300 hover:bg-sky-50 transition-all group"
              >
                <span className="text-[#229ED9] group-hover:scale-110 transition-transform">
                  <TelegramIcon />
                </span>
                <div>
                  <p className="text-sm font-semibold text-gray-800">Telegram</p>
                  <p className="text-xs text-gray-500">@NetCodeShop</p>
                </div>
              </a>

              {/* Telegram Channel */}
              <a
                href="https://t.me/NetCodeSolutions"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-3 rounded-lg border border-gray-200 hover:border-sky-300 hover:bg-sky-50 transition-all group"
              >
                <span className="text-[#229ED9] group-hover:scale-110 transition-transform">
                  <TelegramIcon />
                </span>
                <div>
                  <p className="text-sm font-semibold text-gray-800">Telegram Channel</p>
                  <p className="text-xs text-gray-500">@NetCodeSolutions</p>
                </div>
              </a>

              {/* WhatsApp */}
              <div className="p-3 rounded-lg border border-gray-200">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-[#25D366]">
                    <WhatsAppIcon />
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-gray-800">WhatsApp</p>
                    <p className="text-xs text-gray-500">Scan QR to chat</p>
                  </div>
                </div>
                <div className="rounded-lg overflow-hidden border border-gray-100">
                  <img
                    src={whatsappQr}
                    alt="WhatsApp QR Code"
                    className="w-full h-auto object-contain"
                  />
                </div>
              </div>
            </div>
              </>
            )}
          </div>
        </div>

        {/* Right column — product details */}
        <div className="lg:col-span-3 space-y-8">
          {/* Header */}
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <Badge variant="secondary">{product.category}</Badge>
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                <span className="text-sm font-medium">{product.rating}</span>
              </div>
              <div className="flex items-center gap-1 text-gray-500 text-sm">
                <Download className="w-4 h-4" />
                <span>{product.downloads.toLocaleString()} downloads</span>
              </div>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-3">{product.name}</h1>
            <p className="text-gray-600 text-base leading-relaxed">{product.description}</p>
          </div>

          {/* Technologies */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Tag className="w-4 h-4 text-gray-400" />
              <p className="text-sm font-semibold text-gray-700 uppercase tracking-wide">Technologies</p>
            </div>
            <div className="flex flex-wrap gap-2">
              {product.tags.map((tag) => (
                <Badge key={tag} variant="outline" className="text-sm px-3 py-1">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>

          {/* Full Feature List */}
          {product.features && product.features.length > 0 && (
            <div>
              <p className="text-sm font-semibold text-gray-700 uppercase tracking-wide mb-4">
                Complete Feature List
              </p>
              <ul className="space-y-4">
                {product.features.map((feature, idx) => {
                  const [title, description] = feature.split(" - ");
                  return (
                    <li key={idx} className="flex gap-3">
                      <CheckCircle2 className="w-5 h-5 text-blue-500 mt-0.5 shrink-0" />
                      <div>
                        <p className="text-gray-900 font-medium">{title}</p>
                        {description && (
                          <p className="text-sm text-gray-500 mt-0.5">{description}</p>
                        )}
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          )}

          {/* Demo Video */}
          {product.demoVideo && (
            <div>
              <div className="flex items-center gap-2 mb-3">
                <PlayCircle className="w-4 h-4 text-red-500" />
                <p className="text-sm font-semibold text-gray-700 uppercase tracking-wide">Demo Video</p>
              </div>
              <div className="rounded-xl overflow-hidden border border-gray-200 shadow-sm aspect-video">
                <iframe
                  src={`https://www.youtube.com/embed/${product.demoVideo}`}
                  title={`${product.name} Demo`}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full"
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
