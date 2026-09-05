import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import api from "../api/client";
import Navbar from "../components/layout/Navbar.jsx";
import Footer from "../components/layout/Footer.jsx";
import Reveal from "../components/home/Reveal.jsx";

export default function GalleryIndex() {
  const [settings, setSettings] = useState(null);
  const [sponsors, setSponsors] = useState([]);
  const [items, setItems] = useState([]);

  useEffect(() => {
    api.get("/settings").then((r) => setSettings(r.data));
    api.get("/sponsors").then((r) => setSponsors(r.data));
    api.get("/gallery").then((r) => setItems(r.data));
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar logoUrl={settings?.logoUrl} siteName={settings?.siteName} />

      <main className="flex-1 max-w-7xl mx-auto px-5 md:px-10 pt-28 md:pt-32 pb-24 w-full">
        <Link to="/" className="inline-flex items-center gap-2 text-sm text-ink/50 hover:text-accent mb-8">
          <ArrowLeft size={16} /> Retour au site
        </Link>

        <p className="uppercase tracking-[0.25em] text-accent text-xs mb-4">Notre activité</p>
        <h1 className="font-display text-3xl md:text-5xl max-w-2xl leading-tight mb-12 md:mb-16">
          Toutes nos photos, par activité.
        </h1>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {items.map((item, i) => (
            <Reveal key={item._id} delay={i * 0.06}>
              <Link
                to={`/galerie/${item.slug}`}
                className="group relative block overflow-hidden rounded-none h-[70vw] max-h-[340px] min-h-[220px] sm:h-[42vw] sm:max-h-[300px]"
              >
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/10 to-transparent" />
                <div className="relative h-full flex flex-col justify-end p-6">
                  <h3 className="font-display text-sand text-lg md:text-xl leading-snug">{item.title}</h3>
                  {item.subtitle && (
                    <p className="mt-1.5 text-sand/70 text-xs md:text-sm">{item.subtitle}</p>
                  )}
                </div>
              </Link>
            </Reveal>
          ))}
          {items.length === 0 && <p className="text-ink/40">Aucune photo pour l'instant.</p>}
        </div>
      </main>

      <Footer settings={settings} sponsors={sponsors} />
    </div>
  );
}
