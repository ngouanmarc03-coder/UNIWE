import { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { ArrowLeft, Truck, UserCheck, MapPinned, Globe2, ShieldCheck } from "lucide-react";
import api from "../api/client";
import Navbar from "../components/layout/Navbar.jsx";
import Footer from "../components/layout/Footer.jsx";
import Reveal from "../components/home/Reveal.jsx";

const BG_IMAGE =
  "https://images.unsplash.com/photo-1578575437130-527eed3abbec?q=80&w=1920";

const AXES = [
  {
    slug: "transport-leger",
    icon: Truck,
    title: "Transport léger de marchandises",
    body: `UNIWÊ assure l'acheminement et la livraison de colis ou de fret à l'aide de véhicules légers n'excédant pas 3,5 tonnes.

Cette activité couvre les envois qui n'ont pas besoin d'un poids lourd : cartons, palettes légères, colis groupés, marchandises commerciales de petit et moyen volume. C'est la formule la plus flexible pour un envoi rapide, avec un suivi simple du départ à l'arrivée.`,
  },
  {
    slug: "location-chauffeur",
    icon: UserCheck,
    title: "Location de véhicules avec chauffeur",
    body: `UNIWÊ met à disposition des véhicules de transport de marchandises accompagnés d'un conducteur professionnel.

Cette solution convient aux besoins ponctuels ou récurrents : un déménagement de matériel, une tournée de livraison spécifique, ou un transport dédié pour lequel vous préférez confier la route à un professionnel plutôt que gérer la logistique vous-même. Le véhicule et le chauffeur sont mobilisés selon votre trajet et votre calendrier.`,
  },
  {
    slug: "livraison-proximite",
    icon: MapPinned,
    title: "Livraison de proximité",
    body: `UNIWÊ propose des services de transport routier ciblés sur des trajets de courte distance et la logistique urbaine.

Une fois votre marchandise arrivée sur le territoire de destination, elle doit souvent encore parcourir le dernier kilomètre jusqu'à son destinataire final. C'est précisément ce que couvre la livraison de proximité : un maillon local, rapide et fiable, qui complète le transport longue distance.`,
  },
  {
    slug: "fret-international",
    icon: Globe2,
    title: "Fret international Afrique-Europe",
    body: `UNIWÊ organise le transport de marchandises entre la Côte d'Ivoire et la France, par voie aérienne ou maritime selon la nature, le volume et l'urgence de votre envoi.

Le fret aérien convient aux envois urgents ou à forte valeur, avec des délais courts. Le fret maritime, plus économique, est adapté aux volumes plus importants et aux envois moins urgents. Dans les deux cas, UNIWÊ vous conseille sur la solution la plus adaptée à votre situation, sans tarif fixe imposé en ligne : chaque envoi est étudié individuellement.`,
  },
  {
    slug: "accompagnement",
    icon: ShieldCheck,
    title: "Accompagnement & suivi personnalisé",
    body: `Chaque client UNIWÊ dispose d'un interlocuteur qui suit sa demande de bout en bout, de la première prise de contact jusqu'à la remise finale de la marchandise. Voici comment se déroule ce suivi, étape par étape.

1. Prise en charge. Dès que votre demande est validée, votre colis ou votre fret est réceptionné et enregistré par notre équipe, avec un état des lieux précis de la marchandise.

2. Préparation et organisation du transport. Nous sélectionnons la solution la plus adaptée (routier, aérien ou maritime) selon votre trajet, votre volume et vos délais, et organisons chaque étape logistique en conséquence.

3. Acheminement. Votre envoi voyage jusqu'à sa destination. Vous êtes tenu informé des étapes clés du trajet, sans avoir à relancer notre équipe.

4. Arrivée et dernier kilomètre. Une fois arrivée à destination, la marchandise est prise en charge pour la livraison de proximité jusqu'au destinataire final.

5. Remise et confirmation. La livraison est confirmée avec vous, et notre équipe reste disponible pour toute question après remise.

Que vous passiez par le formulaire du site ou par WhatsApp, un même interlocuteur reste responsable de votre dossier du début à la fin. C'est notre façon de garantir un suivi rigoureux et professionnel, à chaque envoi.`,
  },
];

export default function Services() {
  const [settings, setSettings] = useState(null);
  const [sponsors, setSponsors] = useState([]);
  const location = useLocation();

  useEffect(() => {
    api.get("/settings").then((r) => setSettings(r.data));
    api.get("/sponsors").then((r) => setSponsors(r.data));
  }, []);

  useEffect(() => {
    if (!location.hash) return;
    const id = location.hash.replace("#", "");
    const el = document.getElementById(id);
    if (el) {
      setTimeout(() => el.scrollIntoView({ behavior: "smooth", block: "start" }), 100);
    }
  }, [location.hash]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar logoUrl={settings?.logoUrl} siteName={settings?.siteName} />

      <section className="relative h-[38vh] md:h-[44vh] min-h-[280px] overflow-hidden bg-ink">
        <img src={BG_IMAGE} alt="Nos services" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/60 to-ink/30" />
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
          <p className="uppercase tracking-[0.3em] text-accent-light text-xs md:text-sm mb-3">
            Nos services
          </p>
          <h1 className="font-display text-3xl md:text-5xl text-sand max-w-2xl leading-tight">
            Ce que UNIWÊ fait pour vous.
          </h1>
        </div>
      </section>

      <main className="flex-1 max-w-3xl mx-auto px-5 md:px-10 py-16 md:py-24 w-full">
        <Link to="/" className="inline-flex items-center gap-2 text-sm text-ink/50 hover:text-accent mb-12">
          <ArrowLeft size={16} /> Retour au site
        </Link>

        <div className="space-y-16">
          {AXES.map((axe, i) => (
            <Reveal key={axe.slug} delay={i * 0.05}>
              <div id={axe.slug} className="scroll-mt-28 border-b border-ink/10 pb-16 last:border-0 last:pb-0">
                <div className="flex items-center justify-center h-12 w-12 border border-accent/30 mb-5">
                  <axe.icon className="text-accent" size={20} />
                </div>
                <h2 className="font-display text-2xl md:text-3xl mb-4">{axe.title}</h2>
                <p className="text-ink/60 leading-relaxed whitespace-pre-line">{axe.body}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <div className="mt-16 text-center">
          <Link
            to="/devis"
            className="inline-block rounded-full bg-ink text-sand hover:bg-accent hover:scale-[1.03] active:scale-[0.97] transition-all px-8 py-4 text-sm font-medium tracking-wide"
          >
            Demander un devis
          </Link>
        </div>
      </main>

      <Footer settings={settings} sponsors={sponsors} />
    </div>
  );
}
