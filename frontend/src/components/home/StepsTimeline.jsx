import { MessageSquare, FileText, Ship, PackageCheck } from "lucide-react";
import Reveal from "./Reveal.jsx";

const STEPS = [
  {
    icon: MessageSquare,
    title: "Vous nous contactez",
    text: "Remplissez le formulaire de devis ou écrivez-nous directement sur WhatsApp.",
  },
  {
    icon: FileText,
    title: "Nous étudions votre demande",
    text: "Nous analysons votre marchandise et votre trajet pour vous proposer une solution adaptée.",
  },
  {
    icon: Ship,
    title: "Votre envoi est pris en charge",
    text: "Une fois validé, nous organisons le transport entre l'Afrique et l'Europe.",
  },
  {
    icon: PackageCheck,
    title: "Livraison à destination",
    text: "Vous êtes informé jusqu'à la remise finale de votre marchandise.",
  },
];

export default function StepsTimeline() {
  return (
    <section className="max-w-7xl mx-auto px-5 md:px-10 py-24 md:py-32">
      <Reveal>
        <p className="uppercase tracking-[0.25em] text-accent text-xs mb-4">Le parcours</p>
        <h2 className="font-display text-3xl md:text-5xl max-w-2xl leading-tight">
          De votre demande à la livraison.
        </h2>
      </Reveal>

      <div className="mt-16 grid md:grid-cols-4 gap-8 md:gap-6">
        {STEPS.map((step, i) => (
          <Reveal key={step.title} delay={i * 0.1}>
            <div>
              <div className="flex items-center justify-center h-12 w-12 border border-accent/30 mb-5">
                <step.icon className="text-accent" size={20} />
              </div>
              <h3 className="font-medium text-base mb-2">{step.title}</h3>
              <p className="text-sm text-ink/60 leading-relaxed">{step.text}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
