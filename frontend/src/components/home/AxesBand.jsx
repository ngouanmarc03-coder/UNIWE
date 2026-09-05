import { Link } from "react-router-dom";
import { Truck, Globe2, ShieldCheck } from "lucide-react";
import Reveal from "./Reveal.jsx";

const AXES = [
  { slug: "transport-leger", icon: Truck, label: "Transport léger" },
  { slug: "fret-international", icon: Globe2, label: "Fret Afrique-Europe" },
  { slug: "accompagnement", icon: ShieldCheck, label: "Suivi personnalisé" },
];

export default function AxesBand({ className = "" }) {
  return (
    <section className={`bg-ink text-sand py-8 ${className}`}>
      <div className="max-w-7xl mx-auto px-5 grid grid-cols-3 gap-3">
        {AXES.map((axe, i) => (
          <Reveal key={axe.slug} delay={i * 0.1}>
            <Link
              to={`/services#${axe.slug}`}
              className="flex flex-col items-center text-center gap-2.5 text-sand/80 hover:text-accent-light transition-colors"
            >
              <span className="flex items-center justify-center h-11 w-11 rounded-full border border-sand/15">
                <axe.icon size={18} />
              </span>
              <span className="text-xs leading-tight">{axe.label}</span>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
