import { useEffect, useState } from "react";
import { Pencil, Trash2, Plus, X } from "lucide-react";
import api from "../../api/client";
import LocationPicker from "../../components/admin/LocationPicker.jsx";

const EMPTY = {
  label: "",
  country: "",
  address: "",
  lat: null,
  lng: null,
  phone: "",
  hours: "",
  order: 0,
  active: true,
};

export default function Locations() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState(null);
  const [saving, setSaving] = useState(false);

  function load() {
    api.get("/admin/locations").then((r) => setItems(r.data));
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
        await api.put(`/admin/locations/${form._id}`, form);
      } else {
        await api.post("/admin/locations", form);
      }
      setForm(null);
      load();
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id) {
    if (!confirm("Supprimer cette localisation ?")) return;
    await api.delete(`/admin/locations/${id}`);
    load();
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-display text-3xl">Localisations</h1>
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
              <p className="font-medium">{item.label} — {item.country}</p>
              <p className="text-xs text-ink/50">{item.address}</p>
            </div>
            <button onClick={() => setForm(item)} className="text-ink/50 hover:text-accent">
              <Pencil size={18} />
            </button>
            <button onClick={() => handleDelete(item._id)} className="text-ink/50 hover:text-red-500">
              <Trash2 size={18} />
            </button>
          </div>
        ))}
        {items.length === 0 && <p className="text-ink/40">Aucune localisation pour l'instant.</p>}
      </div>

      {form && (
        <div className="fixed inset-0 z-50 bg-ink/60 flex items-center justify-center p-5">
          <form
            onSubmit={handleSave}
            className="bg-sand rounded-none p-8 max-w-lg w-full max-h-[85vh] overflow-y-auto"
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="font-display text-xl">{form._id ? "Modifier" : "Nouvelle"} localisation</h2>
              <button type="button" onClick={() => setForm(null)}>
                <X size={20} />
              </button>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <input
                  required
                  placeholder="Libellé (ex: Bureau France)"
                  value={form.label}
                  onChange={(e) => update("label", e.target.value)}
                  className="input"
                />
                <input
                  required
                  placeholder="Pays"
                  value={form.country}
                  onChange={(e) => update("country", e.target.value)}
                  className="input"
                />
              </div>
              <input
                required
                placeholder="Adresse complète"
                value={form.address}
                onChange={(e) => update("address", e.target.value)}
                className="input"
              />
              <div className="grid grid-cols-2 gap-4">
                <input
                  placeholder="Téléphone"
                  value={form.phone}
                  onChange={(e) => update("phone", e.target.value)}
                  className="input"
                />
                <input
                  placeholder="Horaires"
                  value={form.hours}
                  onChange={(e) => update("hours", e.target.value)}
                  className="input"
                />
              </div>

              <p className="text-xs text-ink/50">Cliquez sur la carte pour positionner le point.</p>
              <LocationPicker
                lat={form.lat}
                lng={form.lng}
                onPick={(lat, lng) => {
                  update("lat", lat);
                  update("lng", lng);
                }}
              />

              <div className="grid grid-cols-2 gap-4 items-center">
                <input
                  type="number"
                  placeholder="Ordre"
                  value={form.order}
                  onChange={(e) => update("order", Number(e.target.value))}
                  className="input"
                />
                <label className="flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    checked={form.active}
                    onChange={(e) => update("active", e.target.checked)}
                  />
                  Visible sur le site
                </label>
              </div>
            </div>

            <button
              type="submit"
              disabled={saving || form.lat == null}
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
