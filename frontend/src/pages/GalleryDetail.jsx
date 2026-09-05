import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import api from "../api/client";
import Navbar from "../components/layout/Navbar.jsx";
import Footer from "../components/layout/Footer.jsx";
import Reveal from "../components/home/Reveal.jsx";

export default function GalleryDetail() {
  const { slug } = useParams();
  const [settings, setSettings] = useState(null);
  const [sponsors, setSponsors] = useState([]);
  const [item, setItem] = useState(null);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    api.get("/settings").then((r) => setSettings(r.data));
    api.get("/sponsors").then((r) => setSponsors(r.data));
  }, []);

  useEffect(() => {
    setItem(null);
    setNotFound(false);
    api
      .get(`/gallery/${slug}`)
      .then((r) => setItem(r.data))
      .catch(() => setNotFound(true));
  }, [slug]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar logoUrl={settings?.logoUrl} siteName={settings?.siteName} />

      {item && (
        <section className="relative h-[38vh] md:h-[46vh] min-h-[280px] overflow-hidden bg-ink">
          <img src={item.imageUrl} alt={item.title} className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/60 to-ink/30" />
          <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
            <p className="uppercase tracking-[0.3em] text-accent-light text-xs md:text-sm mb-3">
              Notre activité
            </p>
            <h1 className="font-display text-3xl md:text-5xl text-sand max-w-2xl leading-tight">
              {item.title}
            </h1>
            {item.subtitle && (
              <p className="mt-4 text-sand/80 max-w-xl text-sm md:text-base">{item.subtitle}</p>
            )}
          </div>
        </section>
      )}

      <main className="flex-1 max-w-3xl mx-auto px-5 md:px-10 py-16 md:py-24 w-full">
        <Link to="/" className="inline-flex items-center gap-2 text-sm text-ink/50 hover:text-accent mb-12">
          <ArrowLeft size={16} /> Retour au site
        </Link>

        {notFound && <p className="text-ink/40">Cette page n'existe pas ou plus.</p>}

        {item && (
          <div className="space-y-16">
            {item.photos.map((photo, i) => (
              <Reveal key={i} delay={i * 0.05}>
                <div className="border-b border-ink/10 pb-16 last:border-0 last:pb-0">
                  <div className="overflow-hidden rounded-none border border-ink/5">
                    {photo.mediaType === "video" ? (
                      <video
                        src={photo.mediaUrl}
                        controls
                        playsInline
                        className="w-full max-h-[520px] object-cover bg-ink"
                      />
                    ) : (
                      <img
                        src={photo.mediaUrl}
                        alt={photo.caption || item.title}
                        className="w-full max-h-[520px] object-cover"
                      />
                    )}
                  </div>
                  {photo.caption && (
                    <p className="mt-5 text-ink/60 leading-relaxed">{photo.caption}</p>
                  )}
                </div>
              </Reveal>
            ))}
            {item.photos.length === 0 && (
              <p className="text-ink/40">D'autres photos de cette activité arrivent bientôt.</p>
            )}
          </div>
        )}

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
