import { useState } from "react";
import { Plus } from "lucide-react";
import Reveal from "./Reveal.jsx";

export default function FaqSection({ faqs = [] }) {
  const [openId, setOpenId] = useState(null);

  if (faqs.length === 0) return null;

  return (
    <section id="faq" className="bg-sand-dark/60 py-24 md:py-32">
      <div className="max-w-3xl mx-auto px-5 md:px-10">
        <Reveal className="text-center mb-14">
          <p className="uppercase tracking-[0.25em] text-accent text-xs mb-4">Questions fréquentes</p>
          <h2 className="font-display text-3xl md:text-5xl leading-tight">
            Vous vous posez des questions ?
          </h2>
        </Reveal>

        <div className="space-y-3">
          {faqs.map((faq, i) => {
            const open = openId === faq._id;
            return (
              <Reveal key={faq._id} delay={i * 0.05}>
                <div className="bg-white border border-ink/5">
                  <button
                    onClick={() => setOpenId(open ? null : faq._id)}
                    className="w-full flex items-center justify-between gap-4 text-left px-6 py-5"
                  >
                    <span className="font-medium text-sm md:text-base">{faq.question}</span>
                    <Plus
                      size={18}
                      className={`shrink-0 text-accent transition-transform duration-300 ${
                        open ? "rotate-45" : ""
                      }`}
                    />
                  </button>
                  <div
                    className={`grid transition-all duration-300 ${
                      open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <p className="text-sm text-ink/60 leading-relaxed px-6 pb-5">{faq.answer}</p>
                    </div>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
