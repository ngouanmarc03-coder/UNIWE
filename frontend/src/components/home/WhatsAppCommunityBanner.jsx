import { MessageCircle } from "lucide-react";
import Reveal from "./Reveal.jsx";

export default function WhatsAppCommunityBanner({ link }) {
  if (!link) return null;

  return (
    <section className="px-5 md:px-10 py-16">
      <Reveal className="max-w-7xl mx-auto rounded-none bg-accent/10 border border-accent/20 px-8 md:px-14 py-12 flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="text-center md:text-left">
          <p className="uppercase tracking-[0.25em] text-accent text-xs mb-3">Communauté</p>
          <h3 className="font-display text-2xl md:text-3xl max-w-xl">
            Rejoignez la communauté WhatsApp UNIWÊ
          </h3>
          <p className="mt-3 text-ink/60 max-w-xl text-sm">
            Actualités, conseils et échanges directs avec l'équipe et les autres clients.
          </p>
        </div>
        <a
          href={link}
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-2 rounded-none bg-ink text-sand px-7 py-4 text-sm font-medium hover:bg-accent hover:scale-[1.03] active:scale-[0.97] transition-all whitespace-nowrap"
        >
          <MessageCircle size={18} /> Rejoindre le groupe
        </a>
      </Reveal>
    </section>
  );
}
