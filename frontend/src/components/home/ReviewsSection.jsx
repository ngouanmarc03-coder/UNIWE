import { useState } from "react";
import { Star } from "lucide-react";
import Reveal from "./Reveal.jsx";
import ReviewForm from "./ReviewForm.jsx";

export default function ReviewsSection({ reviews = [], onSubmitted }) {
  const [showForm, setShowForm] = useState(false);

  return (
    <section id="avis" className="bg-ink text-sand py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-5 md:px-10">
        <Reveal className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="uppercase tracking-[0.25em] text-accent-light text-xs mb-4">
              Avis clients
            </p>
            <h2 className="font-display text-3xl md:text-5xl max-w-2xl leading-tight">
              Ce que nos clients disent de nous.
            </h2>
          </div>
          <button
            onClick={() => setShowForm((s) => !s)}
            className="rounded-none border border-sand/30 hover:border-accent hover:text-accent hover:scale-[1.03] transition-all px-6 py-3 text-sm font-medium"
          >
            {showForm ? "Fermer" : "Donner mon avis"}
          </button>
        </Reveal>

        {showForm && (
          <Reveal className="mt-10 max-w-xl">
            <ReviewForm
              onSuccess={() => {
                setShowForm(false);
                onSubmitted?.();
              }}
            />
          </Reveal>
        )}

        <div className="mt-16 grid md:grid-cols-3 gap-8">
          {reviews.length === 0 && (
            <p className="text-sand/50 col-span-3">
              Soyez le premier à partager votre expérience avec UNIWÊ.
            </p>
          )}
          {reviews.map((r, i) => (
            <Reveal key={r._id} delay={(i % 3) * 0.1}>
              <div className="p-7 rounded-none bg-sand/5 border border-sand/10 h-full transition-all duration-300 hover:-translate-y-1.5 hover:bg-sand/10 hover:border-accent/40">
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: 5 }).map((_, idx) => (
                    <Star
                      key={idx}
                      size={16}
                      className={idx < r.rating ? "fill-accent text-accent" : "text-sand/20"}
                    />
                  ))}
                </div>
                <p className="text-sm text-sand/80 leading-relaxed">"{r.comment}"</p>
                <p className="mt-5 text-sm text-sand/50">
                  {r.name}
                  {r.company ? ` — ${r.company}` : ""}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
