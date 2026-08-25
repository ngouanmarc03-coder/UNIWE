import { useEffect, useState } from "react";
import { Check, X as XIcon, Trash2, Star } from "lucide-react";
import api from "../../api/client";

const STATUS_LABELS = { pending: "En attente", approved: "Approuvé", rejected: "Rejeté" };

export default function Reviews() {
  const [items, setItems] = useState([]);
  const [filter, setFilter] = useState("pending");

  function load() {
    api.get("/admin/reviews").then((r) => setItems(r.data));
  }

  useEffect(load, []);

  async function updateStatus(id, status) {
    await api.put(`/admin/reviews/${id}`, { status });
    load();
  }

  async function remove(id) {
    if (!confirm("Supprimer cet avis ?")) return;
    await api.delete(`/admin/reviews/${id}`);
    load();
  }

  const filtered = filter === "all" ? items : items.filter((i) => i.status === filter);

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
        <h1 className="font-display text-3xl">Avis clients</h1>
        <select value={filter} onChange={(e) => setFilter(e.target.value)} className="input w-auto">
          <option value="pending">En attente</option>
          <option value="approved">Approuvés</option>
          <option value="rejected">Rejetés</option>
          <option value="all">Tous</option>
        </select>
      </div>

      <div className="space-y-4">
        {filtered.map((r) => (
          <div key={r._id} className="bg-white rounded-none border border-ink/5 p-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="flex gap-1 mb-2">
                  {Array.from({ length: 5 }).map((_, idx) => (
                    <Star
                      key={idx}
                      size={14}
                      className={idx < r.rating ? "fill-accent text-accent" : "text-ink/15"}
                    />
                  ))}
                </div>
                <p className="text-sm text-ink/70">"{r.comment}"</p>
                <p className="text-xs text-ink/40 mt-2">
                  {r.name} {r.company && `— ${r.company}`} · {STATUS_LABELS[r.status]}
                </p>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                {r.status !== "approved" && (
                  <button
                    onClick={() => updateStatus(r._id, "approved")}
                    className="p-2 rounded-none bg-green-50 text-green-600 hover:bg-green-100"
                    title="Approuver"
                  >
                    <Check size={16} />
                  </button>
                )}
                {r.status !== "rejected" && (
                  <button
                    onClick={() => updateStatus(r._id, "rejected")}
                    className="p-2 rounded-none bg-orange-50 text-orange-600 hover:bg-orange-100"
                    title="Rejeter"
                  >
                    <XIcon size={16} />
                  </button>
                )}
                <button onClick={() => remove(r._id)} className="p-2 text-ink/40 hover:text-red-500" title="Supprimer">
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          </div>
        ))}
        {filtered.length === 0 && <p className="text-ink/40">Aucun avis.</p>}
      </div>
    </div>
  );
}
