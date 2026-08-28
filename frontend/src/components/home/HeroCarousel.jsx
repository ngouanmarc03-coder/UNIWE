import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, ArrowRight } from "lucide-react";
import CountUpValue from "./CountUpValue.jsx";

export default function HeroCarousel({ slides = [], stats = [], onQuoteClick }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (slides.length < 2) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % slides.length), 6000);
    return () => clearInterval(id);
  }, [slides.length]);

  if (slides.length === 0) {
    return (
      <section
        id="accueil"
        className="h-[70vh] min-h-[440px] flex items-center justify-center bg-ink text-sand"
      >
        <p className="font-display text-3xl">UNIWÊ</p>
      </section>
    );
  }

  const slide = slides[index];

  return (
    <section
      id="accueil"
      className="relative h-[46vh] md:h-[74vh] min-h-[360px] md:min-h-[580px] max-h-[720px] overflow-hidden bg-ink"
    >
      <AnimatePresence mode="sync">
        <motion.div
          key={slide._id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2 }}
          className="absolute inset-0"
        >
          {slide.mediaType === "video" ? (
            <video
              src={slide.mediaUrl}
              poster={slide.mediaUrl.replace(/\.(mp4|mov|webm|mkv)(\?.*)?$/i, ".jpg$2")}
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              className="w-full h-full object-cover"
            />
          ) : (
            <img
              src={slide.mediaUrl}
              alt={slide.title}
              className="w-full h-full object-cover"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-ink/20" />
          <div className="absolute inset-0 bg-gradient-to-r from-ink/70 via-ink/10 to-transparent" />
        </motion.div>
      </AnimatePresence>

      <div className="relative z-10 h-full max-w-7xl mx-auto px-5 md:px-10 flex flex-col justify-end pb-10 md:pb-20">
        <div className="max-w-xl text-left">
          <motion.p
            key={`eyebrow-${slide._id}`}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="uppercase tracking-[0.3em] text-accent-light text-xs md:text-sm mb-2 md:mb-3"
          >
            Paris ↔ Abidjan
          </motion.p>
          <motion.h1
            key={`title-${slide._id}`}
            initial={{ opacity: 0, y: 16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.7 }}
            className="font-display text-3xl md:text-5xl lg:text-6xl text-sand leading-tight"
          >
            {slide.title}
          </motion.h1>
          {slide.subtitle && (
            <motion.p
              key={`subtitle-${slide._id}`}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45, duration: 0.7 }}
              className="mt-2 md:mt-3 text-sand/80 max-w-md text-sm md:text-base"
            >
              {slide.subtitle}
            </motion.p>
          )}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.7 }}
            className="mt-4 md:mt-7"
          >
            <button
              onClick={onQuoteClick}
              className="inline-flex items-center gap-2 rounded-full bg-sand hover:bg-white hover:scale-[1.04] active:scale-[0.97] transition-all text-ink px-8 py-4 text-sm font-medium tracking-wide"
            >
              {slide.ctaText || "Demander un devis"} <ArrowRight size={16} />
            </button>
          </motion.div>
        </div>
      </div>

      {stats.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.7 }}
          className="hidden md:flex absolute right-5 md:right-10 top-1/2 -translate-y-1/2 z-10 flex-col gap-4 bg-ink/60 backdrop-blur-md border border-sand/10 rounded-2xl px-6 py-6 shadow-[0_8px_30px_rgba(0,0,0,0.3)]"
        >
          {stats.slice(0, 3).map((s, i) => (
            <div key={`${s.label}-${i}`}>
              <CountUpValue
                value={s.value}
                className="font-display text-2xl text-accent-light"
              />
              <p className="text-xs text-sand/60 mt-0.5 whitespace-nowrap">{s.label}</p>
            </div>
          ))}
        </motion.div>
      )}

      {slides.length > 1 && (
        <div className="absolute bottom-6 left-5 md:left-10 flex gap-2 z-10">
          {slides.map((s, i) => (
            <button
              key={s._id}
              onClick={() => setIndex(i)}
              aria-label={`Slide ${i + 1}`}
              className={`h-1.5 rounded-full transition-all ${
                i === index ? "w-8 bg-accent" : "w-1.5 bg-sand/40"
              }`}
            />
          ))}
        </div>
      )}

      <div className="absolute bottom-6 right-5 md:right-10 z-10 text-sand/60 animate-bounce">
        <ChevronDown size={22} />
      </div>
    </section>
  );
}
