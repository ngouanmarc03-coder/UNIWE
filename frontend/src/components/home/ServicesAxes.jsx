import { Link } from "react-router-dom";
import { Truck, UserCheck, MapPinned, Globe2, ShieldCheck, ArrowRight } from "lucide-react";
import Reveal from "./Reveal.jsx";

const AXES = [
  {
    slug: "transport-leger",
    icon: Truck,
    title: "Transport léger de marchandises",
    text: "Acheminement et livraison de colis ou de fret avec des véhicules légers, pour des envois rapides et flexibles.",
  },
  {
    slug: "location-chauffeur",
    icon: UserCheck,
    title: "Location de véhicules avec chauffeur",
    text: "Mise à disposition d'un véhicule de transport de marchandises accompagné d'un conducteur professionnel.",
  },
  {
    slug: "livraison-proximite",
    icon: MapPinned,
    title: "Livraison de proximité",
    text: "Des trajets courte distance et une logistique urbaine pensés pour livrer vite et près de vos clients.",
  },
  {
    slug: "fret-international",
    icon: Globe2,
    title: "Fret international Afrique-Europe",
    text: "Organisation du transport de marchandises entre la Côte d'Ivoire et la France, par voie aérienne ou maritime.",
  },
  {
    slug: "accompagnement",
    icon: ShieldCheck,
    title: "Accompagnement & suivi personnalisé",
    text: "Un interlocuteur dédié suit votre colis de A à Z, de la prise en charge jusqu'à la remise finale.",
  },
];

export default function ServicesAxes() {
  return (
    <section className="max-w-7xl mx-auto px-5 md:px-10 py-24 md:py-32">
      <Reveal>
        <p className="uppercase tracking-[0.25em] text-accent text-xs mb-4">Nos services</p>
        <h2 className="font-display text-3xl md:text-5xl max-w-2xl leading-tight">
          Ce que UNIWÊ fait pour vous.
        </h2>
      </Reveal>

      <div className="mt-16 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {AXES.map((axe, i) => (
          <Reveal key={axe.slug} delay={i * 0.08}>
            <Link
              to={`/services#${axe.slug}`}
              className="group block h-full p-7 rounded-none bg-white border border-ink/5 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lg hover:border-accent/30"
            >
              <axe.icon className="text-accent transition-transform duration-300 group-hover:scale-110" size={28} />
              <h3 className="font-display text-lg mt-5 mb-2 leading-snug">{axe.title}</h3>
              <p className="text-sm text-ink/60 leading-relaxed">{axe.text}</p>
              <span className="inline-flex items-center gap-1.5 mt-4 text-sm text-accent font-medium">
                En savoir plus <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
              </span>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
