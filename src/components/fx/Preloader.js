"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const ease = [0.76, 0, 0.24, 1];

export default function Preloader() {
  const [show, setShow] = useState(true);
  const [count, setCount] = useState(1);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setShow(false);
      return;
    }
    document.documentElement.style.overflow = "hidden";
    const start = performance.now();
    const duration = 1400;
    let id;
    const tick = (t) => {
      const p = Math.min((t - start) / duration, 1);
      setCount(1 + Math.round((1 - Math.pow(1 - p, 3)) * 99));
      if (p < 1) id = requestAnimationFrame(tick);
      else setTimeout(() => setShow(false), 250);
    };
    id = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(id);
  }, []);

  useEffect(() => {
    if (!show) document.documentElement.style.overflow = "";
  }, [show]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="preloader"
          className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-[#0e1420] text-[#e8ebf1]"
          exit={{ y: "-100%" }}
          transition={{ duration: 0.9, ease }}
        >
          <p className="font-serif text-7xl font-medium tabular-nums leading-none sm:text-9xl">
            {count}
            <span className="text-[#cfae6b]">%</span>
          </p>
          <div className="mt-6 overflow-hidden">
            <motion.p
              className="font-serif text-xl font-medium sm:text-2xl"
              initial={{ y: "110%" }}
              animate={{ y: 0 }}
              transition={{ duration: 0.8, ease }}
            >
              Tirthak<span className="text-[#cfae6b]">.</span>
            </motion.p>
          </div>
          <div className="mt-6 h-px w-48 bg-white/10 sm:w-64">
            <div className="h-px bg-[#cfae6b]" style={{ width: `${count}%` }} />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
