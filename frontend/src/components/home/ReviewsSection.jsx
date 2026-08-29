import { useState } from "react";
import { Star, MessageSquarePlus } from "lucide-react";
import Reveal from "./Reveal.jsx";
import ReviewForm from "./ReviewForm.jsx";

const BG_IMAGE =
  "https://images.unsplash.com/photo-1521791136064-7986c2920216?q=80&w=1600";

export default function ReviewsSection({ reviews = [], onSubmitted }) {
  const [showForm, setShowForm] = useState(false);
  const hasReviews = reviews.length > 0;

  return (
    <section id="avis" className="relative bg-ink text-sand py-10 md:py-32 overflow-hidden">
      <img src={BG_IMAGE} alt="" className="absolute inset-0 w-full h-full object-cover" />
      <div className="absolute inset-0 bg-ink/90" />
      <div className="relative max-w-7xl mx-auto px-5 md:px-10">
        <Reveal
          className={`flex flex-wrap items-end gap-6 ${
            hasReviews ? "justify-between" : "justify-center text-center"
          }`}
        >
          <div>
            <p className="uppercase tracking-[0.25em] text-accent-light text-xs mb-4">
              Avis clients
            </p>
            <h2 className="font-display text-3xl md:text-5xl max-w-2xl leading-tight">
              Ce que nos clients disent de nous.
            </h2>
          </div>
          {hasReviews && (
            <button
              onClick={() => setShowForm((s) => !s)}
              className="rounded-full border border-sand/30 hover:border-accent hover:text-accent hover:scale-[1.03] transition-all px-6 py-3 text-sm font-medium"
            >
              {showForm ? "Fermer" : "Donner mon avis"}
            </button>
          )}
        </Reveal>

        {showForm && (
          <Reveal className={`mt-10 max-w-xl ${hasReviews ? "" : "mx-auto"}`}>
            <ReviewForm
              onSuccess={() => {
                setShowForm(false);
                onSubmitted?.();
              }}
            />
          </Reveal>
        )}

        {hasReviews ? (
          <div className="mt-16 grid md:grid-cols-3 gap-8">
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
        ) : (
          !showForm && (
            <Reveal delay={0.1} className="mt-6 md:mt-14 flex justify-center">
              <div className="max-w-md w-full text-center border border-sand/15 px-5 py-5 md:px-10 md:py-12">
                <MessageSquarePlus className="text-accent mx-auto" size={24} />
                <p className="mt-3 font-display text-lg md:text-xl">Aucun avis pour l'instant</p>
                <p className="mt-2 text-sm text-sand/50 leading-relaxed">
                  Soyez le premier à partager votre expérience avec UNIWÊ et à aider les futurs
                  clients à se décider.
                </p>
                <button
                  onClick={() => setShowForm(true)}
                  className="mt-5 rounded-full bg-sand text-ink hover:bg-white hover:scale-[1.03] active:scale-[0.97] transition-all px-6 py-2.5 text-sm font-medium"
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
