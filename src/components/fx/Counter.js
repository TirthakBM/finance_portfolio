"use client";

import { useEffect, useRef } from "react";
import { animate, useInView } from "framer-motion";

export default function Counter({ to, from = 0, suffix = "", delay = 0 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    const controls = animate(from, to, {
      duration: 2,
      delay,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => {
        if (ref.current) ref.current.textContent = Math.round(v) + suffix;
      },
    });
    return () => controls.stop();
  }, [inView, from, to, suffix, delay]);

  return <span ref={ref}>{from + suffix}</span>;
}
