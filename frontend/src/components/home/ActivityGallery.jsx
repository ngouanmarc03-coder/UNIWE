import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import Reveal from "./Reveal.jsx";

export default function ActivityGallery({ items = [] }) {
  if (items.length === 0) return null;

  const cover = items[0];

  return (
    <section className="px-5 md:px-10 py-20 md:py-28 bg-sand">
      <Reveal className="max-w-7xl mx-auto">
        <Link
          to="/galerie"
          className="group relative block overflow-hidden rounded-none h-[62vh] md:h-[68vh] min-h-[420px] max-h-[640px]"
        >
          <img
            src={cover.imageUrl}
            alt={cover.title}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-ink/10" />

          <div className="relative h-full flex flex-col justify-end p-7 md:p-14">
            <p className="uppercase tracking-[0.3em] text-accent-light text-xs md:text-sm mb-3">
              Notre activité
            </p>
            <h2 className="font-display uppercase text-sand text-3xl md:text-6xl max-w-2xl leading-[1.05]">
              UNIWÊ en action, sur le terrain.
            </h2>
            <p className="mt-4 text-sand/80 max-w-md text-sm md:text-base">
              Ports, entrepôts, routes : découvrez les coulisses de chaque envoi, en images.
            </p>
            <span className="mt-7 inline-flex items-center gap-2 w-fit rounded-full bg-sand text-ink px-7 py-3.5 text-sm font-medium tracking-wide group-hover:bg-white group-hover:scale-[1.03] transition-all">
              Découvrir les photos <ArrowRight size={16} />
            </span>
          </div>
        </Link>
      </Reveal>
    </section>
  );
}
