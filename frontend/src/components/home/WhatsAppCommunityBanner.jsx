import Reveal from "./Reveal.jsx";
import WhatsAppIcon from "../icons/WhatsAppIcon.jsx";

const BG_IMAGE =
  "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=1600";

export default function WhatsAppCommunityBanner({ link }) {
  if (!link) return null;

  return (
    <section className="px-5 md:px-10 py-16">
      <Reveal className="relative max-w-7xl mx-auto rounded-none overflow-hidden px-8 md:px-14 py-16 flex flex-col md:flex-row items-center justify-between gap-8">
        <img
          src={BG_IMAGE}
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-ink/90" />

        <div className="relative text-center md:text-left">
          <p className="uppercase tracking-[0.25em] text-sand/80 text-xs mb-3">Communauté</p>
          <h3 className="font-display text-2xl md:text-4xl text-sand max-w-xl">
            Rejoignez la communauté WhatsApp UNIWÊ
          </h3>
          <p className="mt-3 text-sand/80 max-w-xl text-sm">
            Actualités, conseils et échanges directs avec l'équipe et les autres clients.
          </p>
        </div>
        <a
          href={link}
          target="_blank"
          rel="noreferrer"
          className="relative flex items-center gap-2 rounded-full bg-sand text-ink px-7 py-4 text-sm font-medium hover:bg-white hover:scale-[1.03] active:scale-[0.97] transition-all whitespace-nowrap"
        >
          <WhatsAppIcon size={17} className="text-[#25D366]" /> Rejoindre le groupe
        </a>
      </Reveal>
    </section>
  );
}
