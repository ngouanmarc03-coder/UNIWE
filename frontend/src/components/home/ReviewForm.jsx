import { useState } from "react";
import { Star } from "lucide-react";
import api from "../../api/client";

export default function ReviewForm({ onSuccess }) {
  const [form, setForm] = useState({ name: "", company: "", rating: 5, comment: "" });
  const [status, setStatus] = useState("idle");

  function update(field, value) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("sending");
    try {
      await api.post("/reviews", form);
      setStatus("done");
      onSuccess?.();
    } catch {
      setStatus("error");
    }
  }

  if (status === "done") {
    return (
      <p className="text-accent-light">
        Merci ! Votre avis a été envoyé et sera publié après validation.
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid sm:grid-cols-2 gap-4">
        <input
          required
          placeholder="Votre nom"
          value={form.name}
          onChange={(e) => update("name", e.target.value)}
          className="w-full rounded-none bg-sand/10 border border-sand/20 px-4 py-3 text-sm placeholder:text-sand/40 focus:outline-none focus:border-accent"
        />
        <input
          placeholder="Entreprise (optionnel)"
          value={form.company}
          onChange={(e) => update("company", e.target.value)}
          className="w-full rounded-none bg-sand/10 border border-sand/20 px-4 py-3 text-sm placeholder:text-sand/40 focus:outline-none focus:border-accent"
        />
      </div>

      <div className="flex gap-1">
        {Array.from({ length: 5 }).map((_, idx) => (
          <button
            type="button"
            key={idx}
            onClick={() => update("rating", idx + 1)}
            aria-label={`${idx + 1} étoiles`}
          >
            <Star
              size={22}
              className={idx < form.rating ? "fill-accent text-accent" : "text-sand/20"}
            />
          </button>
        ))}
      </div>

      <textarea
        required
        rows={4}
        placeholder="Votre expérience avec UNIWÊ..."
        value={form.comment}
        onChange={(e) => update("comment", e.target.value)}
        className="w-full rounded-none bg-sand/10 border border-sand/20 px-4 py-3 text-sm placeholder:text-sand/40 focus:outline-none focus:border-accent"
      />

      {status === "error" && (
        <p className="text-sm text-red-400">Une erreur est survenue, réessayez.</p>
      )}

      <button
        type="submit"
        disabled={status === "sending"}
        className="rounded-none bg-sand text-ink hover:bg-white transition-colors px-6 py-3 text-sm font-medium disabled:opacity-60"
      >
        {status === "sending" ? "Envoi..." : "Envoyer mon avis"}
      </button>
    </form>
  );
}
