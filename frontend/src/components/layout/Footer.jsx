import { useNavigate } from "react-router-dom";
import { useRef } from "react";
import { Facebook, Instagram, Linkedin, MessageCircle } from "lucide-react";

const CLICKS_NEEDED = 5;
const WINDOW_MS = 3000;

export default function Footer({ settings, sponsors = [] }) {
  const navigate = useNavigate();
  const clicksRef = useRef([]);

  function handleSecretClick() {
    const now = Date.now();
    clicksRef.current = [...clicksRef.current, now].filter((t) => now - t < WINDOW_MS);
    if (clicksRef.current.length >= CLICKS_NEEDED) {
      clicksRef.current = [];
      navigate("/admin/login");
    }
  }

  return (
    <footer className="bg-ink text-sand/80">
      {sponsors.length > 0 && (
        <div className="border-b border-sand/10">
          <div className="max-w-7xl mx-auto px-5 md:px-10 py-10">
            <p className="text-center text-xs tracking-[0.2em] uppercase text-sand/50 mb-6">
              Ils nous font confiance
            </p>
            <div className="flex flex-wrap items-center justify-center gap-10">
              {sponsors.map((s) => (
                <a
                  key={s._id}
                  href={s.link || "#"}
                  target={s.link ? "_blank" : undefined}
                  rel="noreferrer"
                  className="opacity-70 hover:opacity-100 transition-opacity"
                >
                  <img src={s.logoUrl} alt={s.name} className="h-8 w-auto grayscale" />
                </a>
              ))}
            </div>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-5 md:px-10 py-14 grid gap-10 md:grid-cols-4">
        <div>
          <p className="font-display text-2xl text-sand mb-3">{settings?.siteName || "UNIWÊ"}</p>
          <p className="text-sm text-sand/60 leading-relaxed">
            {settings?.tagline || "Import-export entre l'Afrique et l'Europe"}
          </p>
          <div className="flex gap-4 mt-5">
            {settings?.socialLinks?.facebook && (
              <a href={settings.socialLinks.facebook} target="_blank" rel="noreferrer">
                <Facebook size={18} />
              </a>
            )}
            {settings?.socialLinks?.instagram && (
              <a href={settings.socialLinks.instagram} target="_blank" rel="noreferrer">
                <Instagram size={18} />
              </a>
            )}
            {settings?.socialLinks?.linkedin && (
              <a href={settings.socialLinks.linkedin} target="_blank" rel="noreferrer">
                <Linkedin size={18} />
              </a>
            )}
          </div>
        </div>

        <div>
          <p className="text-sand text-sm font-medium mb-4">Contact</p>
          <ul className="space-y-2 text-sm text-sand/60">
            {settings?.contactEmail && <li>{settings.contactEmail}</li>}
            {settings?.contactPhone && <li>{settings.contactPhone}</li>}
          </ul>
        </div>

        <div>
          <p className="text-sand text-sm font-medium mb-4">Communauté</p>
          {settings?.whatsappCommunityLink ? (
            <a
              href={settings.whatsappCommunityLink}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 text-sm text-sand/70 hover:text-accent"
            >
              <MessageCircle size={16} /> Rejoindre le groupe WhatsApp
            </a>
          ) : (
            <p className="text-sm text-sand/40">Bientôt disponible</p>
          )}
        </div>

        <div>
          <p className="text-sand text-sm font-medium mb-4">Légal</p>
          <ul className="space-y-2 text-sm text-sand/60">
            <li>
              <a href="/mentions-legales" className="hover:text-accent">
                Mentions légales
              </a>
            </li>
            <li>
              <a href="/cgu" className="hover:text-accent">
                Conditions générales d'utilisation
              </a>
            </li>
            <li>
              <a href="/confidentialite" className="hover:text-accent">
                Politique de confidentialité
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-sand/10 py-6 px-5 md:px-10 flex items-center justify-center gap-2">
        <p className="text-xs text-sand/40">
          © {new Date().getFullYear()} {settings?.siteName || "UNIWÊ"}. Tous droits réservés.
        </p>
        <button
          onClick={handleSecretClick}
          aria-hidden="true"
          tabIndex={-1}
          className="text-sand/40 select-none cursor-default text-xs leading-none px-1"
        >
          ·
        </button>
      </div>
    </footer>
  );
}
