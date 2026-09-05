import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, ArrowRight } from "lucide-react";

const LINKS = [
  { label: "Accueil", href: "#accueil" },
  { label: "À propos", href: "#a-propos" },
  { label: "Nos services", to: "/services" },
  { label: "Comment ça marche", to: "/comment-ca-marche" },
  { label: "Avis", href: "#avis" },
  { label: "Localisation", href: "#localisation" },
  { label: "FAQ", href: "#faq" },
];

export default function Navbar({ logoUrl, siteName }) {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 inset-x-0 z-50 px-3 pt-3 md:px-5 md:pt-4">
      <div
        className={`max-w-6xl mx-auto bg-accent/30 backdrop-blur-md shadow-[0_8px_30px_rgba(0,0,0,0.25)] transition-all ${
          open ? "rounded-3xl" : "rounded-full"
        }`}
      >
        <nav className="flex items-center justify-between pl-3 pr-2 py-2 md:pl-5 md:pr-3 md:py-2.5">
          <a href="#accueil" className="flex items-center gap-2">
            {logoUrl ? (
              <span className="h-9 w-9 rounded-full overflow-hidden shrink-0 border border-sand/20">
                <img src={logoUrl} alt={siteName} className="h-full w-full object-cover" />
              </span>
            ) : (
              <span className="font-display text-xl tracking-wide text-sand">
                {siteName || "UNIWÊ"}
              </span>
            )}
          </a>

          <div className="hidden md:flex items-center gap-6">
            {LINKS.map((l) =>
              l.to ? (
                <Link
                  key={l.to}
                  to={l.to}
                  className="text-sm tracking-wide text-sand/80 hover:text-accent-light transition-colors"
                >
                  {l.label}
                </Link>
              ) : (
                <a
                  key={l.href}
                  href={l.href}
                  className="text-sm tracking-wide text-sand/80 hover:text-accent-light transition-colors"
                >
                  {l.label}
                </a>
              )
            )}
          </div>

          <div className="flex items-center gap-2">
            <Link
              to="/devis"
              className="hidden sm:inline-flex items-center gap-2 rounded-full bg-sand text-ink px-5 py-2.5 text-sm font-medium tracking-wide hover:bg-accent hover:text-sand hover:scale-[1.03] active:scale-[0.97] transition-all"
            >
              Demander un devis <ArrowRight size={15} />
            </Link>

            <button
              className="md:hidden text-sand p-2"
              onClick={() => setOpen((o) => !o)}
              aria-label="Ouvrir le menu"
            >
              {open ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </nav>

        {open && (
          <div className="md:hidden border-t border-sand/10 px-5 pb-5 flex flex-col gap-1">
            {LINKS.map((l) =>
              l.to ? (
                <Link
                  key={l.to}
                  to={l.to}
                  onClick={() => setOpen(false)}
                  className="text-sand/80 py-2.5 text-sm"
                >
                  {l.label}
                </Link>
              ) : (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="text-sand/80 py-2.5 text-sm"
                >
                  {l.label}
                </a>
              )
            )}
            <Link
              to="/devis"
              onClick={() => setOpen(false)}
              className="mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-sand text-ink px-5 py-3 text-center font-medium text-sm"
            >
              Demander un devis <ArrowRight size={15} />
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}
