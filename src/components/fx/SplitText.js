"use client";

import { motion, useReducedMotion } from "framer-motion";

// Reveals text letter by letter, each sliding up from behind a mask.
export default function SplitText({ text, delay = 0, stagger = 0.035, className = "", inView = false }) {
  const reduce = useReducedMotion();
  const words = text.split(" ");
  let i = 0;

  const trigger = inView
    ? { whileInView: "show", viewport: { once: true, margin: "-60px" } }
    : { animate: "show" };

  return (
    <motion.span className={className} initial={reduce ? false : "hidden"} {...trigger} aria-label={text}>
      {words.map((w, wi) => (
        <span key={wi} className="inline-block overflow-hidden pb-[0.12em] align-bottom" aria-hidden="true">
          {[...w].map((ch) => {
            const d = delay + i++ * stagger;
            return (
              <motion.span
                key={d}
                className="inline-block"
                variants={{
                  hidden: { y: "110%", rotate: 8 },
                  show: { y: 0, rotate: 0, transition: { duration: 0.7, delay: d, ease: [0.22, 1, 0.36, 1] } },
                }}
              >
                {ch}
              </motion.span>
            );
          })}
          {wi < words.length - 1 && " "}
        </span>
      ))}
    </motion.span>
  );
}
