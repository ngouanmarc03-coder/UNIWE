import { useEffect, useRef, useState } from "react";
import { useInView, animate } from "framer-motion";

export default function CountUpValue({ value, className }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const [display, setDisplay] = useState(value.replace(/[0-9]/g, "0"));

  const match = value.match(/^(\D*)(\d+)(\D*)$/);

  useEffect(() => {
    if (!inView) return;
    if (!match) {
      setDisplay(value);
      return;
    }
    const [, prefix, digits, suffix] = match;
    const target = parseInt(digits, 10);
    const controls = animate(0, target, {
      duration: 1.6,
      delay: 0.15,
      ease: "easeOut",
      onUpdate: (v) => setDisplay(`${prefix}${Math.round(v)}${suffix}`),
    });
    return () => controls.stop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView]);

  return (
    <p ref={ref} className={className}>
      {display}
    </p>
  );
}
