import { useRef, useState } from "react";
import { Camera, X } from "lucide-react";
import api from "../../api/client";
import ChannelChoiceDialog from "./ChannelChoiceDialog.jsx";

const EMPTY = {
  name: "",
  phone: "",
  email: "",
  company: "",
  goodsType: "",
  origin: "",
  destination: "",
  details: "",
};

function buildWhatsappMessage(form, hasPhoto) {
  const lines = [
    `Nouvelle demande de devis UNIWÊ`,
    `Nom : ${form.name}`,
    `Téléphone : ${form.phone}`,
    form.email && `Email : ${form.email}`,
    form.company && `Entreprise : ${form.company}`,
    form.goodsType && `Marchandise : ${form.goodsType}`,
    form.origin && `Origine : ${form.origin}`,
    form.destination && `Destination : ${form.destination}`,
    form.details && `Détails : ${form.details}`,
    hasPhoto && `Photo de la marchandise : envoyée via le site (visible dans l'espace admin)`,
  ].filter(Boolean);
  return lines.join("\n");
}

function buildFormData(form, channel, photo) {
  const data = new FormData();
  Object.entries(form).forEach(([key, value]) => data.append(key, value));
  data.append("channel", channel);
  if (photo) data.append("photo", photo);
  return data;
}

export default function QuoteForm({ whatsappAdminNumber }) {
  const [form, setForm] = useState(EMPTY);
  const [photo, setPhoto] = useState(null);
  const [photoPreview, setPhotoPreview] = useState("");
  const fileInputRef = useRef(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [sending, setSending] = useState(false);
  const [result, setResult] = useState(null);

  function update(field, value) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  function handlePhotoChange(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    setPhoto(file);
    setPhotoPreview(URL.createObjectURL(file));
  }

  function removePhoto() {
    setPhoto(null);
    setPhotoPreview("");
    if (fileInputRef.current) fileInputRef.current.value = "";
  }

  function resetForm() {
    setForm(EMPTY);
    removePhoto();
  }

  function handleSubmit(e) {
    e.preventDefault();
    setDialogOpen(true);
  }

  async function sendViaSite() {
    setSending(true);
    try {
      await api.post("/quotes", buildFormData(form, "site", photo), {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setResult("site");
      resetForm();
    } catch {
      setResult("error");
    } finally {
      setSending(false);
      setDialogOpen(false);
    }
  }

  async function sendViaWhatsapp() {
    setSending(true);
    try {
      await api.post("/quotes", buildFormData(form, "whatsapp", photo), {
        headers: { "Content-Type": "multipart/form-data" },
      });
      const message = encodeURIComponent(buildWhatsappMessage(form, !!photo));
      const number = (whatsappAdminNumber || "").replace(/\D/g, "");
      window.open(`https://wa.me/${number}?text=${message}`, "_blank");
      setResult("whatsapp");
      resetForm();
    } catch {
      setResult("error");
    } finally {
      setSending(false);
      setDialogOpen(false);
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid sm:grid-cols-2 gap-5">
          <Field label="Nom complet" required>
            <input
              required
              value={form.name}
              onChange={(e) => update("name", e.target.value)}
              className="input"
            />
          </Field>
          <Field label="Téléphone" required>
            <input
              required
              value={form.phone}
              onChange={(e) => update("phone", e.target.value)}
              className="input"
              placeholder="+225 / +33 ..."
            />
          </Field>
          <Field label="Email">
            <input
              type="email"
              value={form.email}
              onChange={(e) => update("email", e.target.value)}
              className="input"
            />
          </Field>
          <Field label="Entreprise (optionnel)">
            <input
              value={form.company}
              onChange={(e) => update("company", e.target.value)}
              className="input"
            />
          </Field>
          <Field label="Type de marchandise">
            <input
              value={form.goodsType}
              onChange={(e) => update("goodsType", e.target.value)}
              className="input"
            />
          </Field>
          <Field label="Photo de la marchandise (optionnel)">
            {photoPreview ? (
              <div className="flex items-center gap-3">
                <img
                  src={photoPreview}
                  alt="Aperçu"
                  className="h-11 w-11 object-cover rounded-none border border-ink/10"
                />
                <button
                  type="button"
                  onClick={removePhoto}
                  className="inline-flex items-center gap-1.5 text-sm text-ink/50 hover:text-red-500"
                >
                  <X size={15} /> Retirer
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="inline-flex items-center gap-2 rounded-none border border-ink/15 hover:border-accent transition-colors px-4 py-2.5 text-sm w-full justify-center"
              >
                <Camera size={16} /> Ajouter une photo
              </button>
            )}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handlePhotoChange}
              className="hidden"
            />
          </Field>
          <Field label="Origine">
            <input
              value={form.origin}
              onChange={(e) => update("origin", e.target.value)}
              className="input"
              placeholder="Ville, pays"
            />
          </Field>
          <Field label="Destination">
            <input
              value={form.destination}
              onChange={(e) => update("destination", e.target.value)}
              className="input"
              placeholder="Ville, pays"
            />
          </Field>
        </div>

        <Field label="Détails de votre demande">
          <textarea
            rows={4}
            value={form.details}
            onChange={(e) => update("details", e.target.value)}
            className="input"
          />
        </Field>

        {result === "site" && (
          <p className="text-accent text-sm">
            Merci ! Votre demande a bien été transmise, nous revenons vers vous rapidement.
          </p>
        )}
        {result === "whatsapp" && (
          <p className="text-accent text-sm">
            Votre demande a été enregistrée et WhatsApp s'est ouvert avec votre message.
          </p>
        )}
        {result === "error" && (
          <p className="text-red-500 text-sm">Une erreur est survenue, réessayez.</p>
        )}

        <button
          type="submit"
          className="rounded-full bg-ink text-sand hover:bg-accent hover:scale-[1.03] active:scale-[0.97] transition-all px-8 py-4 text-sm font-medium tracking-wide"
        >
          Envoyer ma demande
        </button>
      </form>

      <ChannelChoiceDialog
        open={dialogOpen}
        sending={sending}
        onClose={() => setDialogOpen(false)}
        onChooseSite={sendViaSite}
        onChooseWhatsapp={sendViaWhatsapp}
      />
    </>
  );
}

function Field({ label, required, children, className = "" }) {
  return (
    <label className={`block ${className}`}>
      <span className="text-xs uppercase tracking-wide text-ink/50">
        {label} {required && <span className="text-accent">*</span>}
      </span>
      <div className="mt-2">{children}</div>
    </label>
  );
}
