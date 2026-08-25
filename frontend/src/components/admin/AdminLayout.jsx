import { useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  GalleryHorizontal,
  MapPin,
  FileText,
  Star,
  Newspaper,
  Award,
  HelpCircle,
  Settings as SettingsIcon,
  LogOut,
  Menu,
  X,
  ExternalLink,
} from "lucide-react";
import { useAuth } from "../../context/AuthContext.jsx";

const NAV = [
  { to: "/admin", label: "Tableau de bord", icon: LayoutDashboard, end: true },
  { to: "/admin/heroes", label: "Heros (accueil)", icon: GalleryHorizontal },
  { to: "/admin/locations", label: "Localisations", icon: MapPin },
  { to: "/admin/quotes", label: "Demandes de devis", icon: FileText },
  { to: "/admin/reviews", label: "Avis clients", icon: Star },
  { to: "/admin/posts", label: "Comment ça marche", icon: Newspaper },
  { to: "/admin/sponsors", label: "Sponsors", icon: Award },
  { to: "/admin/faqs", label: "FAQ", icon: HelpCircle },
  { to: "/admin/settings", label: "Réglages", icon: SettingsIcon },
];

export default function AdminLayout() {
  const { admin, logout } = useAuth();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  function handleLogout() {
    logout();
    navigate("/admin/login");
  }

  return (
    <div className="min-h-screen flex bg-sand-dark/40">
      <aside
        className={`fixed lg:static inset-y-0 left-0 z-40 w-72 bg-ink text-sand p-6 flex flex-col transition-transform duration-300 ${
          open ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <div className="flex items-center justify-between mb-10">
          <p className="font-display text-xl">UNIWÊ Admin</p>
          <button className="lg:hidden" onClick={() => setOpen(false)}>
            <X size={20} />
          </button>
        </div>

        <nav className="flex-1 space-y-1">
          {NAV.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-none px-4 py-3 text-sm transition-colors ${
                  isActive ? "bg-accent text-sand" : "text-sand/70 hover:bg-sand/10"
                }`
              }
            >
              <item.icon size={18} />
              {item.label}
            </NavLink>
          ))}
        </nav>

        <a
          href="/"
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-3 rounded-none px-4 py-3 text-sm text-sand/60 hover:bg-sand/10"
        >
          <ExternalLink size={18} /> Voir le site
        </a>
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 rounded-none px-4 py-3 text-sm text-sand/60 hover:bg-sand/10"
        >
          <LogOut size={18} /> Déconnexion
        </button>
        {admin?.email && <p className="text-xs text-sand/30 px-4 mt-3">{admin.email}</p>}
      </aside>

      {open && (
        <div
          className="fixed inset-0 z-30 bg-ink/50 lg:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      <div className="flex-1 min-w-0">
        <div className="lg:hidden flex items-center justify-between p-5 bg-sand border-b border-ink/10">
          <p className="font-display text-lg">UNIWÊ Admin</p>
          <button onClick={() => setOpen(true)}>
            <Menu size={22} />
          </button>
        </div>
        <main className="p-6 md:p-10 max-w-5xl mx-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
