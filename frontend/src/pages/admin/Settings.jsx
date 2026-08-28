import { useEffect, useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import api from "../../api/client";
import MediaUploader from "../../components/admin/MediaUploader.jsx";
import { useAuth } from "../../context/AuthContext.jsx";

export default function Settings() {
  const { setAdmin } = useAuth();
  const [settings, setSettings] = useState(null);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    currentPassword: "",
    newPassword: "",
  });
  const [credSaving, setCredSaving] = useState(false);
  const [credMessage, setCredMessage] = useState("");

  useEffect(() => {
    api.get("/admin/settings").then((r) => setSettings(r.data));
    api.get("/admin/auth/me").then((r) =>
      setCredentials((c) => ({ ...c, name: r.data.name || "", email: r.data.email || "" }))
    );
  }, []);

  function update(field, value) {
    setSettings((s) => ({ ...s, [field]: value }));
  }

  function updateNested(path, value) {
    setSettings((s) => {
      const next = { ...s };
      const [group, key] = path;
      next[group] = { ...next[group], [key]: value };
      return next;
    });
  }

  function updateStat(index, field, value) {
    setSettings((s) => {
      const stats = [...(s.stats || [])];
      stats[index] = { ...stats[index], [field]: value };
      return { ...s, stats };
    });
  }

  function addStat() {
    setSettings((s) => ({ ...s, stats: [...(s.stats || []), { value: "", label: "" }] }));
  }

  function removeStat(index) {
    setSettings((s) => ({ ...s, stats: s.stats.filter((_, i) => i !== index) }));
  }

  async function handleSave(e) {
    e.preventDefault();
    setSaving(true);
    setSaved(false);
    try {
      const res = await api.put("/admin/settings", settings);
      setSettings(res.data);
      setSaved(true);
    } finally {
      setSaving(false);
    }
  }

  async function handleCredentials(e) {
    e.preventDefault();
    setCredSaving(true);
    setCredMessage("");
    try {
      const res = await api.put("/admin/auth/credentials", credentials);
      localStorage.setItem("uniwe_admin_token", res.data.token);
      setAdmin(res.data.admin);
      setCredentials((c) => ({ ...c, currentPassword: "", newPassword: "" }));
      setCredMessage("Identifiants mis à jour avec succès.");
    } catch (err) {
      setCredMessage(err.response?.data?.message || "Erreur lors de la mise à jour.");
    } finally {
      setCredSaving(false);
    }
  }

  if (!settings) return <p className="text-ink/40">Chargement...</p>;

  return (
    <div className="space-y-12">
      <div>
        <h1 className="font-display text-3xl mb-8">Réglages du site</h1>

        <form onSubmit={handleSave} className="bg-white rounded-none border border-ink/5 p-7 space-y-6">
          <Field label="Nom du site">
            <input value={settings.siteName} onChange={(e) => update("siteName", e.target.value)} className="input" />
          </Field>

          <Field label="Logo">
            <MediaUploader value={settings.logoUrl} accept="image/*" onChange={(url) => update("logoUrl", url)} />
          </Field>

          <Field label="Slogan">
            <input value={settings.tagline} onChange={(e) => update("tagline", e.target.value)} className="input" />
          </Field>

          <div className="grid sm:grid-cols-2 gap-6">
            <Field label="Numéro WhatsApp (format international, ex: 22501020304)">
              <input
                value={settings.whatsappAdminNumber}
                onChange={(e) => update("whatsappAdminNumber", e.target.value)}
                className="input"
              />
            </Field>
            <Field label="Lien communauté WhatsApp">
              <input
                value={settings.whatsappCommunityLink}
                onChange={(e) => update("whatsappCommunityLink", e.target.value)}
                className="input"
              />
            </Field>
            <Field label="Email de contact">
              <input
                value={settings.contactEmail}
                onChange={(e) => update("contactEmail", e.target.value)}
                className="input"
              />
            </Field>
            <Field label="Téléphone de contact">
              <input
                value={settings.contactPhone}
                onChange={(e) => update("contactPhone", e.target.value)}
                className="input"
              />
            </Field>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <Field label="Facebook">
              <input
                value={settings.socialLinks?.facebook || ""}
                onChange={(e) => updateNested(["socialLinks", "facebook"], e.target.value)}
                className="input"
              />
            </Field>
            <Field label="Instagram">
              <input
                value={settings.socialLinks?.instagram || ""}
                onChange={(e) => updateNested(["socialLinks", "instagram"], e.target.value)}
                className="input"
              />
            </Field>
            <Field label="TikTok">
              <input
                value={settings.socialLinks?.tiktok || ""}
                onChange={(e) => updateNested(["socialLinks", "tiktok"], e.target.value)}
                className="input"
              />
            </Field>
            <Field label="LinkedIn">
              <input
                value={settings.socialLinks?.linkedin || ""}
                onChange={(e) => updateNested(["socialLinks", "linkedin"], e.target.value)}
                className="input"
              />
            </Field>
          </div>
          <p className="text-xs text-ink/40">
            L'icône WhatsApp du pied de page utilise automatiquement le numéro WhatsApp renseigné
            plus haut — pas besoin de champ supplémentaire.
          </p>

          <hr className="border-ink/10" />
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium">Chiffres clés (bandeau accueil)</p>
            <button
              type="button"
              onClick={addStat}
              className="inline-flex items-center gap-1.5 text-xs text-accent hover:text-ink"
            >
              <Plus size={14} /> Ajouter un chiffre
            </button>
          </div>
          <div className="space-y-3">
            {(settings.stats || []).map((stat, i) => (
              <div key={i} className="flex items-center gap-3">
                <input
                  placeholder="Valeur (ex: 500+)"
                  value={stat.value}
                  onChange={(e) => updateStat(i, "value", e.target.value)}
                  className="input w-32"
                />
                <input
                  placeholder="Libellé (ex: Envois réalisés)"
                  value={stat.label}
                  onChange={(e) => updateStat(i, "label", e.target.value)}
                  className="input flex-1"
                />
                <button
                  type="button"
                  onClick={() => removeStat(i)}
                  className="text-ink/40 hover:text-red-500 shrink-0"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
            {(!settings.stats || settings.stats.length === 0) && (
              <p className="text-xs text-ink/40">Aucun chiffre pour l'instant.</p>
            )}
          </div>

          <hr className="border-ink/10" />
          <p className="text-sm font-medium">Textes légaux (pied de page)</p>

          <Field label="Mentions légales">
            <textarea
              rows={5}
              value={settings.legalTexts?.mentionsLegales || ""}
              onChange={(e) => updateNested(["legalTexts", "mentionsLegales"], e.target.value)}
              className="input"
            />
          </Field>
          <Field label="Conditions générales d'utilisation">
            <textarea
              rows={5}
              value={settings.legalTexts?.cgu || ""}
              onChange={(e) => updateNested(["legalTexts", "cgu"], e.target.value)}
              className="input"
            />
          </Field>
          <Field label="Politique de confidentialité">
            <textarea
              rows={5}
              value={settings.legalTexts?.confidentialite || ""}
              onChange={(e) => updateNested(["legalTexts", "confidentialite"], e.target.value)}
              className="input"
            />
          </Field>

          {saved && <p className="text-sm text-accent">Réglages enregistrés.</p>}

          <button
            type="submit"
            disabled={saving}
            className="rounded-none bg-ink text-sand hover:bg-accent transition-colors px-8 py-3.5 text-sm disabled:opacity-60"
          >
            {saving ? "Enregistrement..." : "Enregistrer les réglages"}
          </button>
        </form>
      </div>

      <div>
        <h2 className="font-display text-2xl mb-6">Mes identifiants</h2>
        <form onSubmit={handleCredentials} className="bg-white rounded-none border border-ink/5 p-7 space-y-5 max-w-lg">
          <Field label="Nom">
            <input
              value={credentials.name}
              onChange={(e) => setCredentials((c) => ({ ...c, name: e.target.value }))}
              className="input"
            />
          </Field>
          <Field label="Email">
            <input
              type="email"
              value={credentials.email}
              onChange={(e) => setCredentials((c) => ({ ...c, email: e.target.value }))}
              className="input"
            />
          </Field>
          <Field label="Mot de passe actuel (requis pour changer le mot de passe)">
            <input
              type="password"
              value={credentials.currentPassword}
              onChange={(e) => setCredentials((c) => ({ ...c, currentPassword: e.target.value }))}
              className="input"
            />
          </Field>
          <Field label="Nouveau mot de passe">
            <input
              type="password"
              value={credentials.newPassword}
              onChange={(e) => setCredentials((c) => ({ ...c, newPassword: e.target.value }))}
              className="input"
            />
          </Field>

          {credMessage && <p className="text-sm text-accent">{credMessage}</p>}

          <button
            type="submit"
            disabled={credSaving}
            className="rounded-none bg-ink text-sand hover:bg-accent transition-colors px-8 py-3.5 text-sm disabled:opacity-60"
          >
            {credSaving ? "Enregistrement..." : "Mettre à jour"}
          </button>
        </form>
      </div>
    </div>
  );
}

function Field({ label, children }) {
  return (
    <label className="block">
      <span className="text-xs uppercase tracking-wide text-ink/50">{label}</span>
      <div className="mt-2">{children}</div>
    </label>
  );
}
