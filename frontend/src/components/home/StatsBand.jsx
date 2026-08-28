import Reveal from "./Reveal.jsx";
import CountUpValue from "./CountUpValue.jsx";

export default function StatsBand({ stats = [], className = "" }) {
  if (stats.length === 0) return null;

  return (
    <section className={`bg-ink text-sand py-8 md:py-10 ${className}`}>
      <div className="max-w-7xl mx-auto px-5 md:px-10 grid grid-cols-2 md:grid-cols-4 gap-8">
        {stats.map((s, i) => (
          <Reveal key={`${s.label}-${i}`} delay={i * 0.1} className="text-center md:text-left">
            <CountUpValue
              value={s.value}
              className="font-display text-2xl md:text-3xl text-accent-light"
            />
            <p className="mt-1 text-xs md:text-sm text-sand/60">{s.label}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
