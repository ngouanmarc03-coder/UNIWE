import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import api from "../api/client";
import Navbar from "../components/layout/Navbar.jsx";
import Footer from "../components/layout/Footer.jsx";
import Reveal from "../components/home/Reveal.jsx";

const FALLBACK_BG =
  "https://images.unsplash.com/photo-1494412651409-8963ce7935a7?q=80&w=1920";

export default function HowItWorks() {
  const [settings, setSettings] = useState(null);
  const [sponsors, setSponsors] = useState([]);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    api.get("/settings").then((r) => setSettings(r.data));
    api.get("/sponsors").then((r) => setSponsors(r.data));
    api.get("/posts").then((r) => setPosts(r.data));
  }, []);

  const bgImage = posts.find((p) => p.imageUrl)?.imageUrl || FALLBACK_BG;

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar logoUrl={settings?.logoUrl} siteName={settings?.siteName} />

      <section className="relative h-[42vh] md:h-[48vh] min-h-[300px] overflow-hidden bg-ink">
        <img src={bgImage} alt="Comment ça marche" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/60 to-ink/30" />
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
          <p className="uppercase tracking-[0.3em] text-accent-light text-xs md:text-sm mb-3">
            Le processus
          </p>
          <h1 className="font-display text-3xl md:text-5xl text-sand max-w-2xl leading-tight">
            Comment se passe une demande chez UNIWÊ ?
          </h1>
          <p className="mt-4 text-sand/80 max-w-xl text-sm md:text-base">
            Nous ne fixons pas de tarif en ligne : chaque envoi est différent. Voici comment nous
            procédons, en toute transparence.
          </p>
        </div>
      </section>

      <main className="flex-1 max-w-3xl mx-auto px-5 md:px-10 py-16 md:py-24 w-full">
        <Link to="/" className="inline-flex items-center gap-2 text-sm text-ink/50 hover:text-accent mb-12">
          <ArrowLeft size={16} /> Retour au site
        </Link>

        <div className="space-y-12">
          {posts.map((post, i) => (
            <Reveal key={post._id} delay={i * 0.1}>
              <div className="border-b border-ink/10 pb-12 last:border-0 last:pb-0">
                <h2 className="font-display text-2xl mb-3">{post.title}</h2>
                <p className="text-ink/60 leading-relaxed whitespace-pre-line">{post.body}</p>
              </div>
            </Reveal>
          ))}
          {posts.length === 0 && (
            <p className="text-ink/40">Le contenu explicatif sera bientôt disponible.</p>
          )}
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
