import { useEffect, useState } from "react";
import { Trash2, Globe, MessageCircle } from "lucide-react";
import api from "../../api/client";

const STATUS_LABELS = { nouveau: "Nouveau", traite: "Traité", archive: "Archivé" };

export default function Quotes() {
  const [items, setItems] = useState([]);
  const [filter, setFilter] = useState("all");

  function load() {
    api.get("/admin/quotes").then((r) => setItems(r.data));
  }

  useEffect(load, []);

  async function updateStatus(id, status) {
    await api.put(`/admin/quotes/${id}`, { status });
    load();
  }

  async function remove(id) {
    if (!confirm("Supprimer cette demande ?")) return;
    await api.delete(`/admin/quotes/${id}`);
    load();
  }

  const filtered = filter === "all" ? items : items.filter((i) => i.status === filter);

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
        <h1 className="font-display text-3xl">Demandes de devis</h1>
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="input w-auto"
        >
          <option value="all">Tous les statuts</option>
          <option value="nouveau">Nouveau</option>
          <option value="traite">Traité</option>
          <option value="archive">Archivé</option>
        </select>
      </div>

      <div className="space-y-4">
        {filtered.map((q) => (
          <div key={q._id} className="bg-white rounded-none border border-ink/5 p-6">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  {q.channel === "whatsapp" ? (
                    <MessageCircle size={16} className="text-accent" />
                  ) : (
                    <Globe size={16} className="text-accent" />
                  )}
                  <p className="font-medium">{q.name}</p>
                </div>
                <p className="text-sm text-ink/50">
                  {q.phone} {q.email && `· ${q.email}`}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <select
                  value={q.status}
                  onChange={(e) => updateStatus(q._id, e.target.value)}
                  className="input w-auto py-2"
                >
                  {Object.entries(STATUS_LABELS).map(([value, label]) => (
                    <option key={value} value={value}>
                      {label}
                    </option>
                  ))}
                </select>
                <button onClick={() => remove(q._id)} className="text-ink/40 hover:text-red-500">
                  <Trash2 size={18} />
                </button>
              </div>
            </div>

            <div className="mt-4 grid sm:grid-cols-2 gap-2 text-sm text-ink/60">
              {q.company && <p>Entreprise : {q.company}</p>}
              {q.goodsType && <p>Marchandise : {q.goodsType}</p>}
              {q.origin && <p>Origine : {q.origin}</p>}
              {q.destination && <p>Destination : {q.destination}</p>}
            </div>
            {q.details && <p className="mt-3 text-sm text-ink/70">{q.details}</p>}
            {q.photoUrl && (
              <a href={q.photoUrl} target="_blank" rel="noreferrer" className="inline-block mt-3">
                <img
                  src={q.photoUrl}
                  alt="Photo de la marchandise"
                  className="h-24 w-24 object-cover border border-ink/10 hover:border-accent transition-colors"
                />
              </a>
            )}
            <p className="mt-3 text-xs text-ink/30">
              {new Date(q.createdAt).toLocaleString("fr-FR")}
            </p>
          </div>
        ))}
        {filtered.length === 0 && <p className="text-ink/40">Aucune demande.</p>}
      </div>
    </div>
  );
}
