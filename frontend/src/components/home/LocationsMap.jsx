import { useState } from "react";
import { MapPin } from "lucide-react";
import Reveal from "./Reveal.jsx";

export default function LocationsMap({ locations = [] }) {
  const [active, setActive] = useState(0);

  if (locations.length === 0) return null;

  const current = locations[active] || locations[0];
  const mapSrc = `https://www.google.com/maps?q=${current.lat},${current.lng}&z=15&hl=fr&output=embed`;

  return (
    <section id="localisation" className="bg-ink text-sand py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-5 md:px-10">
        <Reveal>
          <p className="uppercase tracking-[0.3em] text-accent-light text-xs mb-4">
            Où nous trouver
          </p>
          <h2 className="font-display text-3xl md:text-6xl max-w-2xl leading-tight uppercase">
            Nos bureaux, entre deux continents.
          </h2>
        </Reveal>

        <Reveal delay={0.15} className="mt-16 grid lg:grid-cols-5 gap-0 border-t border-sand/15">
          <div className="lg:col-span-2">
            {locations.map((loc, i) => (
              <button
                key={loc._id}
                onClick={() => setActive(i)}
                className={`w-full text-left px-6 py-6 border-b border-sand/15 transition-colors duration-300 ${
                  i === active ? "bg-sand text-ink" : "hover:bg-sand/5"
                }`}
              >
                <div className="flex items-center gap-3">
                  <MapPin
                    size={16}
                    className={i === active ? "text-accent" : "text-accent-light"}
                  />
                  <p className="font-display text-lg uppercase tracking-wide">{loc.label}</p>
                </div>
                <p className={`text-sm mt-2 ml-7 ${i === active ? "text-ink/60" : "text-sand/50"}`}>
                  {loc.address}
                </p>
                {loc.hours && (
                  <p className="text-sm mt-1 ml-7 text-accent">{loc.hours}</p>
                )}
                {loc.phone && (
                  <p className={`text-sm ml-7 ${i === active ? "text-ink/60" : "text-sand/50"}`}>
                    {loc.phone}
                  </p>
                )}
              </button>
            ))}
          </div>

          <div className="lg:col-span-3 h-[320px] lg:h-auto border-b lg:border-b-0 lg:border-l border-sand/15">
            <iframe
              key={current._id}
              title={`Carte — ${current.label}`}
              src={mapSrc}
              className="w-full h-full border-0 grayscale-[0.3] contrast-[1.1]"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
