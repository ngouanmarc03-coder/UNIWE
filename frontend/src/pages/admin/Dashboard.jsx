import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FileText, Star, GalleryHorizontal, MapPin } from "lucide-react";
import api from "../../api/client";

export default function Dashboard() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    Promise.all([
      api.get("/admin/quotes").then((r) => r.data),
      api.get("/admin/reviews").then((r) => r.data),
      api.get("/admin/heroes").then((r) => r.data),
      api.get("/admin/locations").then((r) => r.data),
    ]).then(([quotes, reviews, heroes, locations]) => {
      setStats({
        newQuotes: quotes.filter((q) => q.status === "nouveau").length,
        totalQuotes: quotes.length,
        pendingReviews: reviews.filter((r) => r.status === "pending").length,
        heroes: heroes.length,
        locations: locations.length,
      });
    });
  }, []);

  const cards = [
    { label: "Nouvelles demandes de devis", value: stats?.newQuotes, to: "/admin/quotes", icon: FileText },
    { label: "Avis en attente de validation", value: stats?.pendingReviews, to: "/admin/reviews", icon: Star },
    { label: "Heros actifs", value: stats?.heroes, to: "/admin/heroes", icon: GalleryHorizontal },
    { label: "Localisations", value: stats?.locations, to: "/admin/locations", icon: MapPin },
  ];

  return (
    <div>
      <h1 className="font-display text-3xl mb-8">Tableau de bord</h1>
      <div className="grid sm:grid-cols-2 gap-6">
        {cards.map((c) => (
          <Link
            key={c.label}
            to={c.to}
            className="bg-white rounded-none border border-ink/5 p-7 hover:border-accent transition-colors"
          >
            <c.icon className="text-accent mb-4" size={22} />
            <p className="text-3xl font-display">{c.value ?? "—"}</p>
            <p className="text-sm text-ink/50 mt-2">{c.label}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
