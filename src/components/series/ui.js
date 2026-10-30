"use client";

import { createContext, useContext, useEffect } from "react";
import { motion } from "framer-motion";
import Lenis from "lenis";

// ---------- Smooth scroll (Lenis) + helpers ----------
let lenis = null;

export function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    lenis = new Lenis({ lerp: 0.09 });
    let id;
    const raf = (t) => {
      lenis.raf(t);
      id = requestAnimationFrame(raf);
    };
    id = requestAnimationFrame(raf);
    return () => {
      cancelAnimationFrame(id);
      lenis.destroy();
      lenis = null;
    };
  }, []);
  return null;
}

export function scrollToId(id) {
  const el = document.getElementById(id);
  if (!el) return;
  if (lenis) lenis.scrollTo(el, { offset: -64, duration: 1.4 });
  else el.scrollIntoView({ behavior: "smooth" });
}

export function scrollToTop(immediate = false) {
  if (lenis) lenis.scrollTo(0, { immediate, duration: 1.4 });
  else window.scrollTo({ top: 0, behavior: immediate ? "auto" : "smooth" });
}

// ---------- App context ----------
export const SeriesContext = createContext(null);
export const useSeries = () => useContext(SeriesContext);

// ---------- Brand mark ----------
export function Logo({ className = "" }) {
  return (
    <span className={`inline-flex items-center gap-1.5 select-none ${className}`}>
      <span
        className="font-title text-[1.9em] leading-none text-red"
        style={{ textShadow: "0 0 18px rgba(229,9,20,.55)", transform: "scaleY(1.15)" }}
      >
        T
      </span>
      <span className="text-[0.62em] font-bold tracking-[0.32em] text-white/90">SERIES</span>
    </span>
  );
}

export function Kicker({ children, className = "" }) {
  return (
    <div className={`flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.28em] text-red ${className}`}>
      <span className="flex flex-col gap-[3px]">
        <span className="block h-[2px] w-6 bg-red" />
        <span className="block h-[2px] w-6 bg-red/60" />
      </span>
      {children}
    </div>
  );
}

// Section heading that "projects in": a blurred, stretched ghost resolves into the title.
export function SectionTitle({ kicker, children, className = "", size = "text-5xl sm:text-6xl md:text-7xl" }) {
  return (
    <div className={className}>
      {kicker && (
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
        >
          <Kicker className="mb-3">{kicker}</Kicker>
        </motion.div>
      )}
      <div className="relative">
        <motion.h2
          aria-hidden
          className={`pointer-events-none absolute inset-0 font-display uppercase leading-[0.95] text-red/70 ${size}`}
          initial={{ opacity: 0.8, y: -18, filter: "blur(6px)" }}
          whileInView={{ opacity: 0, y: -2, filter: "blur(10px)" }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 1.1, ease: [0.2, 0.7, 0.2, 1] }}
        >
          {children}
        </motion.h2>
        <motion.h2
          className={`title-3d relative font-display uppercase leading-[0.95] text-[#f1f1f4] ${size}`}
          initial={{ opacity: 0, y: 40, scaleY: 1.35, filter: "blur(14px)" }}
          whileInView={{ opacity: 1, y: 0, scaleY: 1, filter: "blur(0px)" }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.9, ease: [0.2, 0.7, 0.2, 1] }}
          style={{ transformOrigin: "bottom left" }}
        >
          {children}
        </motion.h2>
      </div>
    </div>
  );
}

export function FadeUp({ children, delay = 0, className = "", ...rest }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, delay, ease: [0.2, 0.7, 0.2, 1] }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

export function PlayIcon({ className = "h-3 w-3" }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
      <path d="M7 4.5v15a1 1 0 0 0 1.5.86l12.5-7.5a1 1 0 0 0 0-1.72L8.5 3.64A1 1 0 0 0 7 4.5Z" />
    </svg>
  );
}
