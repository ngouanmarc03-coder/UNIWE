import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";

const LINKS = [
  { label: "Accueil", href: "#accueil" },
  { label: "À propos", href: "#a-propos" },
  { label: "Comment ça marche", to: "/comment-ca-marche" },
  { label: "Avis", href: "#avis" },
  { label: "Localisation", href: "#localisation" },
  { label: "FAQ", href: "#faq" },
];

export default function Navbar({ logoUrl, siteName }) {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-sand/25 backdrop-blur-md border-b border-sand/20">
      <nav className="max-w-7xl mx-auto flex items-center justify-between px-5 md:px-10 py-4">
        <a href="#accueil" className="flex items-center gap-2">
          {logoUrl ? (
            <span className="h-10 w-10 rounded-full overflow-hidden shrink-0 border border-ink/10">
              <img src={logoUrl} alt={siteName} className="h-full w-full object-cover" />
            </span>
          ) : (
            <span className="font-display text-2xl tracking-wide text-ink">
              {siteName || "UNIWÊ"}
            </span>
          )}
        </a>

        <div className="hidden md:flex items-center gap-8">
          {LINKS.map((l) =>
            l.to ? (
              <Link
                key={l.to}
                to={l.to}
                className="text-sm tracking-wide text-ink/80 hover:text-accent transition-colors"
              >
                {l.label}
              </Link>
            ) : (
              <a
                key={l.href}
                href={l.href}
                className="text-sm tracking-wide text-ink/80 hover:text-accent transition-colors"
              >
                {l.label}
              </a>
            )
          )}
          <Link
            to="/devis"
            className="rounded-none bg-ink text-sand px-5 py-2.5 text-sm font-medium tracking-wide hover:bg-accent hover:scale-[1.03] active:scale-[0.97] transition-all"
          >
            Demander un devis
          </Link>
        </div>

        <button
          className="md:hidden text-ink"
          onClick={() => setOpen((o) => !o)}
          aria-label="Ouvrir le menu"
        >
          {open ? <X size={26} /> : <Menu size={26} />}
        </button>
      </nav>

      {open && (
        <div className="md:hidden bg-sand border-t border-ink/10 px-5 pb-6 flex flex-col gap-4">
          {LINKS.map((l) =>
            l.to ? (
              <Link key={l.to} to={l.to} onClick={() => setOpen(false)} className="text-ink/80 py-1">
                {l.label}
              </Link>
            ) : (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="text-ink/80 py-1"
              >
                {l.label}
              </a>
            )
          )}
          <Link
            to="/devis"
            onClick={() => setOpen(false)}
            className="rounded-none bg-ink text-sand px-5 py-3 text-center font-medium"
          >
            Demander un devis
          </Link>
        </div>
      )}
    </header>
  );
}
