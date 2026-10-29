"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const ease = [0.76, 0, 0.24, 1];

export default function Preloader() {
  const [show, setShow] = useState(true);
  const [count, setCount] = useState(0);

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
      setCount(Math.round((1 - Math.pow(1 - p, 3)) * 100));
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
          <div className="overflow-hidden">
            <motion.p
              className="font-serif text-4xl font-medium sm:text-6xl"
              initial={{ y: "110%" }}
              animate={{ y: 0 }}
              transition={{ duration: 0.8, ease }}
            >
              Tirthak<span className="text-[#cfae6b]">.</span>
            </motion.p>
          </div>
          <motion.p
            className="mt-3 text-xs uppercase tracking-[0.3em] text-[#98a2b3]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            Investment Banking Operations
          </motion.p>
          <div className="absolute bottom-10 left-1/2 w-48 -translate-x-1/2">
            <div className="h-px w-full bg-white/10">
              <div className="h-px bg-[#cfae6b]" style={{ width: `${count}%` }} />
            </div>
            <p className="mt-3 text-center font-mono text-xs text-[#98a2b3]">{String(count).padStart(3, "0")}%</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
