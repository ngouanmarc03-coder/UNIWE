import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Globe, MessageCircle, Clock } from "lucide-react";
import api from "../api/client";
import Navbar from "../components/layout/Navbar.jsx";
import Footer from "../components/layout/Footer.jsx";
import Reveal from "../components/home/Reveal.jsx";
import QuoteForm from "../components/quote/QuoteForm.jsx";

const POINTS = [
  {
    icon: Clock,
    title: "Réponse rapide",
    text: "Nous étudions chaque demande et revenons vers vous sous peu avec une proposition adaptée.",
  },
  {
    icon: Globe,
    title: "Envoi via le site",
    text: "Votre demande arrive directement dans notre espace de gestion.",
  },
  {
    icon: MessageCircle,
    title: "Envoi via WhatsApp",
    text: "Préférez échanger tout de suite ? Envoyez votre demande directement par WhatsApp.",
  },
];

export default function Quote() {
  const [settings, setSettings] = useState(null);
  const [sponsors, setSponsors] = useState([]);

  useEffect(() => {
    api.get("/settings").then((r) => setSettings(r.data));
    api.get("/sponsors").then((r) => setSponsors(r.data));
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar logoUrl={settings?.logoUrl} siteName={settings?.siteName} />

      <main className="flex-1 max-w-5xl mx-auto px-5 md:px-10 pt-16 pb-24 w-full">
        <Link to="/" className="inline-flex items-center gap-2 text-sm text-ink/50 hover:text-accent mb-8">
          <ArrowLeft size={16} /> Retour au site
        </Link>

        <Reveal>
          <p className="uppercase tracking-[0.25em] text-accent text-xs mb-4">Devis</p>
          <h1 className="font-display text-3xl md:text-5xl leading-tight max-w-2xl">
            Demandez votre devis dès maintenant.
          </h1>
          <p className="mt-5 text-ink/60 max-w-xl">
            Nous ne fixons pas de tarif en ligne : chaque envoi est différent. Remplissez le
            formulaire ci-dessous, puis choisissez d'envoyer votre demande via le site ou
            directement par WhatsApp.
          </p>
        </Reveal>

        <Reveal delay={0.1} className="grid sm:grid-cols-3 gap-6 mt-12 mb-14">
          {POINTS.map((p) => (
            <div key={p.title} className="p-6 border border-ink/5 bg-white/60">
              <p.icon className="text-accent" size={22} />
              <p className="font-medium text-sm mt-4 mb-1">{p.title}</p>
              <p className="text-sm text-ink/60 leading-relaxed">{p.text}</p>
            </div>
          ))}
        </Reveal>

        <Reveal delay={0.15} className="bg-white/70 border border-ink/5 p-6 md:p-12">
          <QuoteForm whatsappAdminNumber={settings?.whatsappAdminNumber} />
        </Reveal>
      </main>

      <Footer settings={settings} sponsors={sponsors} />
    </div>
  );
}
