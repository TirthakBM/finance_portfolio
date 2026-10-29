"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useMotionValue, useSpring } from "framer-motion";

// Dot follows the pointer exactly; ring trails on a spring and grows over
// interactive elements. Elements with data-cursor="Label" show that label.
export default function Cursor() {
  const [enabled, setEnabled] = useState(false);
  const [hover, setHover] = useState(false);
  const [label, setLabel] = useState("");
  const [down, setDown] = useState(false);
  const [hidden, setHidden] = useState(true);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const rx = useSpring(x, { stiffness: 220, damping: 22, mass: 0.6 });
  const ry = useSpring(y, { stiffness: 220, damping: 22, mass: 0.6 });

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduce) return;
    setEnabled(true);
    document.documentElement.classList.add("custom-cursor");

    const move = (e) => {
      x.set(e.clientX);
      y.set(e.clientY);
      setHidden(false);
      const target = e.target.closest?.("a, button, [data-cursor]");
      setHover(!!target);
      setLabel(target?.getAttribute("data-cursor") || "");
    };
    const leave = () => setHidden(true);
    const press = () => setDown(true);
    const release = () => setDown(false);

    window.addEventListener("pointermove", move);
    document.addEventListener("pointerleave", leave);
    window.addEventListener("pointerdown", press);
    window.addEventListener("pointerup", release);
    return () => {
      document.documentElement.classList.remove("custom-cursor");
      window.removeEventListener("pointermove", move);
      document.removeEventListener("pointerleave", leave);
      window.removeEventListener("pointerdown", press);
      window.removeEventListener("pointerup", release);
    };
  }, [x, y]);

  if (!enabled) return null;

  const size = label ? 84 : hover ? 56 : 34;

  return (
    <div aria-hidden="true" className={`pointer-events-none fixed inset-0 z-[100] transition-opacity duration-300 ${hidden ? "opacity-0" : "opacity-100"}`}>
      <motion.div
        className="absolute top-0 left-0 grid place-items-center rounded-full border border-gold"
        style={{ x: rx, y: ry, translateX: "-50%", translateY: "-50%" }}
        animate={{
          width: size,
          height: size,
          scale: down ? 0.8 : 1,
          backgroundColor: label ? "var(--gold)" : hover ? "rgba(168,132,63,0.12)" : "rgba(0,0,0,0)",
        }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
      >
        <AnimatePresence>
          {label && (
            <motion.span
              key={label}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              className="text-[11px] font-semibold uppercase tracking-wider text-white"
            >
              {label}
            </motion.span>
          )}
        </AnimatePresence>
      </motion.div>
      <motion.div
        className="absolute top-0 left-0 h-1.5 w-1.5 rounded-full bg-gold"
        style={{ x, y, translateX: "-50%", translateY: "-50%" }}
        animate={{ scale: hover ? 0 : 1 }}
      />
    </div>
  );
}
