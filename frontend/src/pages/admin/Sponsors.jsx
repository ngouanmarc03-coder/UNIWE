import { useEffect, useState } from "react";
import { Pencil, Trash2, Plus, X } from "lucide-react";
import api from "../../api/client";
import MediaUploader from "../../components/admin/MediaUploader.jsx";

const EMPTY = { name: "", logoUrl: "", link: "", order: 0 };

export default function Sponsors() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState(null);
  const [saving, setSaving] = useState(false);

  function load() {
    api.get("/admin/sponsors").then((r) => setItems(r.data));
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
        await api.put(`/admin/sponsors/${form._id}`, form);
      } else {
        await api.post("/admin/sponsors", form);
      }
      setForm(null);
      load();
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id) {
    if (!confirm("Supprimer ce sponsor ?")) return;
    await api.delete(`/admin/sponsors/${id}`);
    load();
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-display text-3xl">Sponsors / partenaires</h1>
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
            <img src={item.logoUrl} alt="" className="w-16 h-12 object-contain rounded-none bg-sand-dark/30" />
            <p className="flex-1 font-medium">{item.name}</p>
            <button onClick={() => setForm(item)} className="text-ink/50 hover:text-accent">
              <Pencil size={18} />
            </button>
            <button onClick={() => handleDelete(item._id)} className="text-ink/50 hover:text-red-500">
              <Trash2 size={18} />
            </button>
          </div>
        ))}
        {items.length === 0 && <p className="text-ink/40">Aucun sponsor pour l'instant.</p>}
      </div>

      {form && (
        <div className="fixed inset-0 z-50 bg-ink/60 flex items-center justify-center p-5">
          <form
            onSubmit={handleSave}
            className="bg-sand rounded-none p-8 max-w-lg w-full max-h-[85vh] overflow-y-auto"
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="font-display text-xl">{form._id ? "Modifier" : "Nouveau"} sponsor</h2>
              <button type="button" onClick={() => setForm(null)}>
                <X size={20} />
              </button>
            </div>

            <div className="space-y-4">
              <input
                required
                placeholder="Nom"
                value={form.name}
                onChange={(e) => update("name", e.target.value)}
                className="input"
              />
              <MediaUploader
                value={form.logoUrl}
                accept="image/*"
                onChange={(url) => update("logoUrl", url)}
              />
              <input
                placeholder="Lien (optionnel)"
                value={form.link}
                onChange={(e) => update("link", e.target.value)}
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
              disabled={saving || !form.logoUrl}
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
