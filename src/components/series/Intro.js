"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { series } from "@/data/series";
import { PlayIcon } from "./ui";

// Opening title sequence: "A ___ ORIGINAL" card, then the name, portrait and Play.
export default function Intro({ onDone }) {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const t1 = setTimeout(() => setPhase(1), 1700);
    const t2 = setTimeout(() => setPhase(2), 3300);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  return (
    <motion.div
      className="fixed inset-0 z-50 overflow-hidden bg-[#0d0a12]"
      exit={{ opacity: 0, scale: 1.08, filter: "blur(8px)" }}
      transition={{ duration: 0.7 }}
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_35%,#2a1d3d_0%,#120d1a_45%,#07060a_100%)]" />

      <button
        onClick={onDone}
        className="absolute right-5 top-5 z-10 rounded-full border border-white/25 bg-black/40 px-4 py-1.5 text-[10px] font-bold tracking-[0.25em] text-white/85 backdrop-blur transition hover:border-white hover:text-white"
      >
        SKIP INTRO
      </button>

      <AnimatePresence>
        {phase === 0 && (
          <motion.p
            key="original"
            className="absolute inset-0 grid place-items-center text-[11px] font-bold tracking-[0.55em] text-white/85 sm:text-xs"
            initial={{ opacity: 0, letterSpacing: "0.9em" }}
            animate={{ opacity: 1, letterSpacing: "0.55em" }}
            exit={{ opacity: 0, filter: "blur(6px)" }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          >
            A {series.firstName} ORIGINAL
          </motion.p>
        )}
      </AnimatePresence>

      {phase >= 1 && (
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <motion.div
            className="absolute left-1/2 top-[58%] h-[70vmin] w-[70vmin] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(229,9,20,.55)_0%,rgba(120,8,20,.25)_40%,transparent_70%)]"
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.6, ease: "easeOut" }}
          />
          <motion.h1
            className="name-shine animate-shine relative z-10 font-title text-[22vw] leading-[0.85] sm:text-[15vw] md:text-[12rem]"
            initial={{ opacity: 0, scale: 1.9, filter: "blur(18px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            transition={{ duration: 1.3, ease: [0.16, 1, 0.3, 1] }}
          >
            {series.firstName}
          </motion.h1>
          <motion.p
            className="relative z-10 mt-1 text-[11px] font-black tracking-[0.6em] text-red"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.6 }}
          >
            THE SERIES
          </motion.p>
          <motion.div
            className="relative z-0 mt-4 h-[42vh] w-[min(80vw,340px)]"
            initial={{ opacity: 0, y: 80 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
          >
            <Image
              src={series.heroPhoto}
              alt={series.displayName}
              fill
              priority
              sizes="340px"
              className="object-contain object-bottom [mask-image:linear-gradient(to_bottom,#000_65%,transparent)]"
            />
            <AnimatePresence>
              {phase >= 2 && (
                <motion.div
                  className="absolute inset-x-0 bottom-6 flex flex-col items-center gap-4"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  <p className="text-[9px] font-bold tracking-[0.35em] text-white/85 sm:text-[10px]">{series.tagline}</p>
                  <button
                    data-cursor="play"
                    onClick={onDone}
                    className="group relative inline-flex items-center gap-2 rounded-full bg-white px-6 py-2.5 text-xs font-bold tracking-[0.2em] text-black shadow-[0_0_40px_rgba(255,255,255,.25)] transition hover:scale-105"
                  >
                    <span className="absolute inset-0 animate-pulse-ring rounded-full border-2 border-white/60" />
                    <PlayIcon className="h-3 w-3" /> PLAY
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      )}
    </motion.div>
  );
}
