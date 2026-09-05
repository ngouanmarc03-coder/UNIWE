import { useEffect, useState } from "react";
import { Pencil, Trash2, Plus, X } from "lucide-react";
import api from "../../api/client";
import MediaUploader from "../../components/admin/MediaUploader.jsx";

const EMPTY = { slug: "", title: "", subtitle: "", imageUrl: "", photos: [], order: 0, active: true };

function slugify(text) {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export default function Gallery() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState(null);
  const [saving, setSaving] = useState(false);

  function load() {
    api.get("/admin/gallery").then((r) => setItems(r.data));
  }

  useEffect(load, []);

  function update(field, value) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  function updatePhoto(index, field, value) {
    setForm((f) => {
      const photos = [...f.photos];
      photos[index] = { ...photos[index], [field]: value };
      return { ...f, photos };
    });
  }

  function addPhoto() {
    setForm((f) => ({
      ...f,
      photos: [...f.photos, { mediaType: "image", mediaUrl: "", caption: "" }],
    }));
  }

  function removePhoto(index) {
    setForm((f) => ({ ...f, photos: f.photos.filter((_, i) => i !== index) }));
  }

  async function handleSave(e) {
    e.preventDefault();
    setSaving(true);
    try {
      const payload = { ...form, slug: form.slug || slugify(form.title) };
      if (form._id) {
        await api.put(`/admin/gallery/${form._id}`, payload);
      } else {
        await api.post("/admin/gallery", payload);
      }
      setForm(null);
      load();
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id) {
    if (!confirm("Supprimer cette catégorie de photos ?")) return;
    await api.delete(`/admin/gallery/${id}`);
    load();
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-display text-3xl">Notre activité en images</h1>
        <button
          onClick={() => setForm(EMPTY)}
          className="inline-flex items-center gap-2 rounded-none bg-ink text-sand px-5 py-2.5 text-sm hover:bg-accent"
        >
          <Plus size={16} /> Ajouter une catégorie
        </button>
      </div>
      <p className="text-sm text-ink/50 -mt-5 mb-8">
        Chaque catégorie apparaît comme une tuile sur la page d'accueil (photo + titre). En cliquant
        dessus, le visiteur arrive sur une page dédiée avec toutes les photos/vidéos et explications
        de cette catégorie.
      </p>

      <div className="space-y-4">
        {items.map((item) => (
          <div key={item._id} className="bg-white rounded-none border border-ink/5 p-5 flex items-center gap-5">
            <img src={item.imageUrl} alt="" className="w-20 h-16 object-cover rounded-none bg-sand-dark/30" />
            <div className="flex-1">
              <p className="font-medium">{item.title}</p>
              <p className="text-sm text-ink/50">/galerie/{item.slug} · {item.photos?.length || 0} photo(s)/vidéo(s)</p>
              {!item.active && <p className="text-xs text-red-500 mt-1">Masqué du site</p>}
            </div>
            <button onClick={() => setForm({ ...EMPTY, ...item })} className="text-ink/50 hover:text-accent">
              <Pencil size={18} />
            </button>
            <button onClick={() => handleDelete(item._id)} className="text-ink/50 hover:text-red-500">
              <Trash2 size={18} />
            </button>
          </div>
        ))}
        {items.length === 0 && <p className="text-ink/40">Aucune catégorie pour l'instant.</p>}
      </div>

      {form && (
        <div className="fixed inset-0 z-50 bg-ink/60 flex items-center justify-center p-5">
          <form
            onSubmit={handleSave}
            className="bg-sand rounded-none p-8 max-w-2xl w-full max-h-[85vh] overflow-y-auto"
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="font-display text-xl">{form._id ? "Modifier" : "Nouvelle"} catégorie</h2>
              <button type="button" onClick={() => setForm(null)}>
                <X size={20} />
              </button>
            </div>

            <div className="space-y-4">
              <p className="text-xs uppercase tracking-wide text-ink/40">Tuile (page d'accueil)</p>
              <MediaUploader
                value={form.imageUrl}
                accept="image/*"
                onChange={(url) => update("imageUrl", url)}
              />
              <input
                required
                placeholder="Titre (ex: Fret aérien)"
                value={form.title}
                onChange={(e) => update("title", e.target.value)}
                className="input"
              />
              <input
                placeholder="Sous-titre (optionnel)"
                value={form.subtitle}
                onChange={(e) => update("subtitle", e.target.value)}
                className="input"
              />
              <input
                placeholder={`Lien (auto: ${form.title ? slugify(form.title) : "genere-a-partir-du-titre"})`}
                value={form.slug}
                onChange={(e) => update("slug", slugify(e.target.value))}
                className="input"
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

              <hr className="border-ink/10 my-2" />
              <div className="flex items-center justify-between">
                <p className="text-xs uppercase tracking-wide text-ink/40">
                  Photos / vidéos de la page détaillée
                </p>
                <button
                  type="button"
                  onClick={addPhoto}
                  className="inline-flex items-center gap-1.5 text-xs text-accent hover:text-ink"
                >
                  <Plus size={14} /> Ajouter
                </button>
              </div>

              <div className="space-y-5">
                {form.photos.map((photo, i) => (
                  <div key={i} className="border border-ink/10 p-4 relative">
                    <button
                      type="button"
                      onClick={() => removePhoto(i)}
                      className="absolute top-3 right-3 text-ink/40 hover:text-red-500"
                    >
                      <Trash2 size={16} />
                    </button>
                    <MediaUploader
                      value={photo.mediaUrl}
                      onChange={(url, resourceType) => {
                        updatePhoto(i, "mediaUrl", url);
                        updatePhoto(i, "mediaType", resourceType);
                      }}
                    />
                    <textarea
                      placeholder="Explication sous cette photo/vidéo"
                      value={photo.caption}
                      onChange={(e) => updatePhoto(i, "caption", e.target.value)}
                      className="input mt-3"
                      rows={2}
                    />
                  </div>
                ))}
                {form.photos.length === 0 && (
                  <p className="text-xs text-ink/40">Aucune photo/vidéo ajoutée pour l'instant.</p>
                )}
              </div>
            </div>

            <button
              type="submit"
              disabled={saving || !form.imageUrl || !form.title}
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
