import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import Reveal from "./Reveal.jsx";

const FALLBACK_BG =
  "https://images.unsplash.com/photo-1494412651409-8963ce7935a7?q=80&w=1920";

export default function HowItWorksTeaser({ posts = [] }) {
  const bgImage = posts.find((p) => p.imageUrl)?.imageUrl || FALLBACK_BG;

  return (
    <section id="comment-ca-marche" className="max-w-7xl mx-auto px-5 md:px-10 py-24 md:py-32">
      <Reveal>
        <Link
          to="/comment-ca-marche"
          className="group relative block h-[360px] md:h-[420px] overflow-hidden"
        >
          <img
            src={bgImage}
            alt="Comment ça marche"
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/50 to-ink/20" />

          <div className="relative z-10 h-full flex flex-col items-start justify-end p-8 md:p-14">
            <p className="uppercase tracking-[0.25em] text-accent-light text-xs mb-4">
              Le processus
            </p>
            <h2 className="font-display text-2xl md:text-4xl text-sand max-w-xl leading-tight">
              Comment se passe une demande chez UNIWÊ ?
            </h2>
            <span className="mt-6 inline-flex items-center gap-2 text-sand text-sm font-medium group-hover:gap-3 transition-all">
              Découvrir le processus <ArrowRight size={16} />
            </span>
          </div>
        </Link>
      </Reveal>
    </section>
  );
}
