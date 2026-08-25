import { motion } from "framer-motion";
import Reveal from "./Reveal.jsx";

export default function StatsBand({ stats = [] }) {
  if (stats.length === 0) return null;

  return (
    <section className="bg-ink text-sand py-8 md:py-10">
      <div className="max-w-7xl mx-auto px-5 md:px-10 grid grid-cols-2 md:grid-cols-4 gap-8">
        {stats.map((s, i) => (
          <Reveal key={`${s.label}-${i}`} delay={i * 0.1} className="text-center md:text-left">
            <motion.p
              initial={{ opacity: 0, scale: 0.7 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 + 0.1, duration: 0.5, type: "spring", bounce: 0.4 }}
              className="font-display text-2xl md:text-3xl text-accent-light"
            >
              {s.value}
            </motion.p>
            <p className="mt-1 text-xs md:text-sm text-sand/60">{s.label}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
