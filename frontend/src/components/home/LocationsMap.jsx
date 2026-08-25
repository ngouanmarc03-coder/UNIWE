import { useState } from "react";
import Reveal from "./Reveal.jsx";

export default function LocationsMap({ locations = [] }) {
  const [active, setActive] = useState(0);

  if (locations.length === 0) return null;

  const current = locations[active] || locations[0];
  const mapSrc = `https://www.google.com/maps?q=${current.lat},${current.lng}&z=15&hl=fr&output=embed`;

  return (
    <section id="localisation" className="max-w-7xl mx-auto px-5 md:px-10 py-24 md:py-32">
      <Reveal>
        <p className="uppercase tracking-[0.25em] text-accent text-xs mb-4">Où nous trouver</p>
        <h2 className="font-display text-3xl md:text-5xl max-w-2xl leading-tight">
          Nos bureaux, entre deux continents.
        </h2>
      </Reveal>

      <Reveal delay={0.15} className="mt-14 grid lg:grid-cols-3 gap-10">
        <div className="lg:col-span-1 space-y-4">
          {locations.map((loc, i) => (
            <button
              key={loc._id}
              onClick={() => setActive(i)}
              className={`w-full text-left p-6 rounded-none border transition-all duration-300 ${
                i === active
                  ? "bg-white border-accent shadow-sm"
                  : "bg-white/50 border-ink/5 hover:border-ink/15 hover:-translate-y-1"
              }`}
            >
              <p className="font-display text-lg">{loc.label}</p>
              <p className="text-sm text-ink/60 mt-1">{loc.address}</p>
              {loc.hours && <p className="text-sm text-accent mt-2">{loc.hours}</p>}
              {loc.phone && <p className="text-sm text-ink/60">{loc.phone}</p>}
            </button>
          ))}
        </div>

        <div className="lg:col-span-2 h-[420px] rounded-none overflow-hidden border border-ink/5">
          <iframe
            key={current._id}
            title={`Carte — ${current.label}`}
            src={mapSrc}
            className="w-full h-full border-0"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </Reveal>
    </section>
  );
}
