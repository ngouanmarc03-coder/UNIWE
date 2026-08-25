import { Ship, ShieldCheck, Globe2 } from "lucide-react";
import Reveal from "./Reveal.jsx";

const POINTS = [
  {
    icon: Ship,
    title: "Un pont logistique",
    text: "UNIWÊ relie la Côte d'Ivoire et la France pour accompagner vos marchandises d'un continent à l'autre, en toute confiance.",
  },
  {
    icon: ShieldCheck,
    title: "Un suivi rigoureux",
    text: "Chaque demande est étudiée avec soin : nous vous accompagnons de la prise en charge jusqu'à la livraison.",
  },
  {
    icon: Globe2,
    title: "Une vision qui s'élargit",
    text: "Aujourd'hui entre l'Afrique et la France, demain vers d'autres pays — UNIWÊ grandit avec ses clients.",
  },
];

export default function AboutSection() {
  return (
    <section id="a-propos" className="max-w-7xl mx-auto px-5 md:px-10 py-24 md:py-32">
      <Reveal>
        <p className="uppercase tracking-[0.25em] text-accent text-xs mb-4">À propos de UNIWÊ</p>
        <h2 className="font-display text-3xl md:text-5xl max-w-2xl leading-tight">
          Le commerce entre l'Afrique et l'Europe, simplifié.
        </h2>
        <p className="mt-6 text-ink/70 max-w-2xl leading-relaxed">
          UNIWÊ est une entreprise d'import-export qui facilite les échanges de marchandises entre
          la Côte d'Ivoire et la France. Notre équipe met tout en œuvre pour rendre chaque envoi
          simple, transparent et fiable — que vous soyez une entreprise ou un particulier.
        </p>
      </Reveal>

      <div className="mt-16 grid md:grid-cols-3 gap-10">
        {POINTS.map((p, i) => (
          <Reveal key={p.title} delay={i * 0.1}>
            <div className="group p-8 rounded-none bg-white/60 border border-ink/5 h-full transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lg hover:border-accent/30">
              <p.icon className="text-accent transition-transform duration-300 group-hover:scale-110" size={28} />
              <h3 className="font-display text-xl mt-5 mb-3">{p.title}</h3>
              <p className="text-sm text-ink/60 leading-relaxed">{p.text}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
