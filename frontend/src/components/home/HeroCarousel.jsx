import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

export default function HeroCarousel({ slides = [], onQuoteClick }) {
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
      className="relative h-[42vh] md:h-[50vh] min-h-[300px] md:min-h-[380px] max-h-[460px] overflow-hidden bg-ink"
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
          <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/45 to-ink/25" />
        </motion.div>
      </AnimatePresence>

      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
        <motion.p
          key={`eyebrow-${slide._id}`}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="uppercase tracking-[0.3em] text-accent-light text-xs md:text-sm mb-3"
        >
          Paris ↔ Abidjan
        </motion.p>
        <motion.h1
          key={`title-${slide._id}`}
          initial={{ opacity: 0, y: 16, scale: 0.94 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.7 }}
          className="font-display text-3xl md:text-4xl lg:text-5xl text-sand max-w-3xl leading-tight"
        >
          {slide.title}
        </motion.h1>
        {slide.subtitle && (
          <motion.p
            key={`subtitle-${slide._id}`}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45, duration: 0.7 }}
            className="mt-3 text-sand/80 max-w-xl text-sm md:text-base"
          >
            {slide.subtitle}
          </motion.p>
        )}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.7 }}
          className="mt-6"
        >
          <button
            onClick={onQuoteClick}
            className="rounded-none bg-sand hover:bg-white hover:scale-[1.04] active:scale-[0.97] transition-all text-ink px-8 py-4 text-sm font-medium tracking-wide"
          >
            {slide.ctaText || "Demander un devis"}
          </button>
        </motion.div>
      </div>

      {slides.length > 1 && (
        <div className="absolute bottom-24 left-0 right-0 flex justify-center gap-2 z-10">
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

      <div className="absolute bottom-6 left-0 right-0 flex justify-center z-10 text-sand/60 animate-bounce">
        <ChevronDown size={22} />
      </div>
    </section>
  );
}
