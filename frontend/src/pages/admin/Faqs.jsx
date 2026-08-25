import { useEffect, useState } from "react";
import { Pencil, Trash2, Plus, X } from "lucide-react";
import api from "../../api/client";

const EMPTY = { question: "", answer: "", order: 0 };

export default function Faqs() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState(null);
  const [saving, setSaving] = useState(false);

  function load() {
    api.get("/admin/faqs").then((r) => setItems(r.data));
  }

  useEffect(load, []);

  function update(field, value) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  async function handleSave(e) {
    e.preventDefault();
    setSaving(true);
    try {
      if (form._id) {
        await api.put(`/admin/faqs/${form._id}`, form);
      } else {
        await api.post("/admin/faqs", form);
      }
      setForm(null);
      load();
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id) {
    if (!confirm("Supprimer cette question ?")) return;
    await api.delete(`/admin/faqs/${id}`);
    load();
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display text-3xl">Questions fréquentes</h1>
          <p className="text-sm text-ink/50 mt-1">Affichées dans la section FAQ de l'accueil.</p>
        </div>
        <button
          onClick={() => setForm(EMPTY)}
          className="inline-flex items-center gap-2 rounded-none bg-ink text-sand px-5 py-2.5 text-sm hover:bg-accent"
        >
          <Plus size={16} /> Ajouter
        </button>
      </div>

      <div className="space-y-4">
        {items.map((item) => (
          <div key={item._id} className="bg-white rounded-none border border-ink/5 p-5 flex items-center gap-5">
            <div className="flex-1 min-w-0">
              <p className="font-medium truncate">{item.question}</p>
              <p className="text-xs text-ink/50 truncate">{item.answer}</p>
            </div>
            <button onClick={() => setForm(item)} className="text-ink/50 hover:text-accent">
              <Pencil size={18} />
            </button>
            <button onClick={() => handleDelete(item._id)} className="text-ink/50 hover:text-red-500">
              <Trash2 size={18} />
            </button>
          </div>
        ))}
        {items.length === 0 && <p className="text-ink/40">Aucune question pour l'instant.</p>}
      </div>

      {form && (
        <div className="fixed inset-0 z-50 bg-ink/60 flex items-center justify-center p-5">
          <form
            onSubmit={handleSave}
            className="bg-sand rounded-none p-8 max-w-lg w-full max-h-[85vh] overflow-y-auto"
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="font-display text-xl">{form._id ? "Modifier" : "Nouvelle"} question</h2>
              <button type="button" onClick={() => setForm(null)}>
                <X size={20} />
              </button>
            </div>

            <div className="space-y-4">
              <input
                required
                placeholder="Question"
                value={form.question}
                onChange={(e) => update("question", e.target.value)}
                className="input"
              />
              <textarea
                required
                rows={4}
                placeholder="Réponse"
                value={form.answer}
                onChange={(e) => update("answer", e.target.value)}
                className="input"
              />
              <input
                type="number"
                placeholder="Ordre"
                value={form.order}
                onChange={(e) => update("order", Number(e.target.value))}
                className="input"
              />
            </div>

            <button
              type="submit"
              disabled={saving}
              className="mt-8 w-full rounded-none bg-ink text-sand hover:bg-accent transition-colors py-3.5 text-sm disabled:opacity-60"
            >
              {saving ? "Enregistrement..." : "Enregistrer"}
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
