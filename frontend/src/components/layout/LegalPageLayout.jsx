import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import api from "../../api/client";
import Navbar from "./Navbar.jsx";
import Footer from "./Footer.jsx";

export default function LegalPageLayout({ title, textKey }) {
  const [settings, setSettings] = useState(null);
  const [sponsors, setSponsors] = useState([]);

  useEffect(() => {
    api.get("/settings").then((r) => setSettings(r.data));
    api.get("/sponsors").then((r) => setSponsors(r.data));
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar logoUrl={settings?.logoUrl} siteName={settings?.siteName} />
      <main className="flex-1 max-w-3xl mx-auto px-5 md:px-10 pt-28 md:pt-32 pb-24 w-full">
        <Link to="/" className="inline-flex items-center gap-2 text-sm text-ink/50 hover:text-accent mb-8">
          <ArrowLeft size={16} /> Retour au site
        </Link>
        <h1 className="font-display text-3xl md:text-4xl mb-8">{title}</h1>
        <div className="prose prose-sm max-w-none text-ink/70 whitespace-pre-line leading-relaxed">
          {settings?.legalTexts?.[textKey] || "Contenu en cours de rédaction."}
        </div>
      </main>
      <Footer settings={settings} sponsors={sponsors} />
    </div>
  );
}
