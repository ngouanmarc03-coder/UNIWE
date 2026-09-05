import { useState } from "react";
import { Star, MessageSquarePlus } from "lucide-react";
import Reveal from "./Reveal.jsx";
import ReviewForm from "./ReviewForm.jsx";

export default function ReviewsSection({ reviews = [], onSubmitted }) {
  const [showForm, setShowForm] = useState(false);
  const hasReviews = reviews.length > 0;

  return (
    <section id="avis" className="bg-sand-dark/30 py-14 md:py-20">
      <div className="max-w-7xl mx-auto px-5 md:px-10">
        <Reveal
          className={`flex flex-wrap items-end gap-6 ${
            hasReviews ? "justify-between" : "justify-center text-center"
          }`}
        >
          <div>
            <p className="uppercase tracking-[0.25em] text-accent text-xs mb-3">Avis clients</p>
            <h2 className="font-display text-2xl md:text-3xl max-w-2xl leading-tight text-ink">
              Ce que nos clients disent de nous.
            </h2>
          </div>
          {hasReviews && (
            <button
              onClick={() => setShowForm((s) => !s)}
              className="rounded-full border border-ink/15 hover:border-accent hover:text-accent transition-all px-5 py-2.5 text-sm font-medium text-ink/70"
            >
              {showForm ? "Fermer" : "Donner mon avis"}
            </button>
          )}
        </Reveal>

        {showForm && (
          <Reveal className={`mt-8 max-w-xl ${hasReviews ? "" : "mx-auto"}`}>
            <ReviewForm
              onSuccess={() => {
                setShowForm(false);
                onSubmitted?.();
              }}
            />
          </Reveal>
        )}

        {hasReviews ? (
          <div className="mt-10 grid md:grid-cols-3 gap-5">
            {reviews.map((r, i) => (
              <Reveal key={r._id} delay={(i % 3) * 0.08}>
                <div className="p-6 rounded-none bg-white border border-ink/5 h-full transition-all duration-300 hover:-translate-y-1 hover:border-accent/30">
                  <div className="flex gap-1 mb-3">
                    {Array.from({ length: 5 }).map((_, idx) => (
                      <Star
                        key={idx}
                        size={13}
                        className={idx < r.rating ? "fill-accent text-accent" : "text-ink/15"}
                      />
                    ))}
                  </div>
                  <p className="text-sm text-ink/60 leading-relaxed">"{r.comment}"</p>
                  <p className="mt-4 text-xs text-ink/40">
                    {r.name}
                    {r.company ? ` — ${r.company}` : ""}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        ) : (
          !showForm && (
            <Reveal delay={0.1} className="mt-6 md:mt-10 flex justify-center">
              <div className="max-w-md w-full text-center border border-ink/10 bg-white px-5 py-5 md:px-8 md:py-8">
                <MessageSquarePlus className="text-accent mx-auto" size={20} />
                <p className="mt-3 font-display text-base md:text-lg text-ink">Aucun avis pour l'instant</p>
                <p className="mt-2 text-xs text-ink/45 leading-relaxed">
                  Soyez le premier à partager votre expérience avec UNIWÊ.
                </p>
                <button
                  onClick={() => setShowForm(true)}
                  className="mt-4 rounded-full bg-ink text-sand hover:bg-accent transition-all px-5 py-2 text-xs font-medium"
                >
                  Donner mon avis
                </button>
              </div>
            </Reveal>
          )
        )}
      </div>
    </section>
  );
}
