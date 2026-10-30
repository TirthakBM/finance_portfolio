"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, ArrowUpRight, X } from "lucide-react";
import { originals, series } from "@/data/series";
import { Kicker, PlayIcon } from "./ui";

const themes = {
  red: { bg: "from-[#ff2a3d] via-[#a50f1f] to-[#2a0509]", accent: "text-[#ff6b78]" },
  gold: { bg: "from-[#f0a535] via-[#8a4f0c] to-[#1f1204]", accent: "text-[#ffc46b]" },
  blue: { bg: "from-[#2b8fe0] via-[#0f4a80] to-[#06162a]", accent: "text-[#7cc4ff]" },
};

// Decorative poster art per theme
function Art({ theme }) {
  if (theme === "red")
    return (
      <svg viewBox="0 0 200 200" className="absolute right-[-10%] top-[6%] h-[70%] text-white/25" aria-hidden>
        <path d="M100 10 L170 40 V100 C170 145 140 175 100 190 C60 175 30 145 30 100 V40 Z" fill="none" stroke="currentColor" strokeWidth="3" />
        <path d="M100 35 L150 55 V100 C150 132 130 155 100 166 C70 155 50 132 50 100 V55 Z" fill="currentColor" opacity=".25" />
        <path d="M75 100 L95 120 L130 80" fill="none" stroke="currentColor" strokeWidth="6" strokeLinecap="round" />
      </svg>
    );
  if (theme === "gold")
    return (
      <svg viewBox="0 0 200 200" className="absolute right-[-6%] top-[8%] h-[65%] text-white/30" aria-hidden>
        {[[40, 50], [150, 40], [100, 110], [45, 160], [165, 150]].map(([x, y], i, a) => (
          <g key={i}>
            {a.slice(i + 1).map(([x2, y2], j) => (
              <line key={j} x1={x} y1={y} x2={x2} y2={y2} stroke="currentColor" strokeWidth="1.5" />
            ))}
            <circle cx={x} cy={y} r={i === 2 ? 16 : 9} fill="none" stroke="currentColor" strokeWidth="3" />
          </g>
        ))}
      </svg>
    );
  return (
    <svg viewBox="0 0 200 200" className="absolute right-[-4%] top-[6%] h-[65%] text-white/25" aria-hidden>
      {Array.from({ length: 9 }).map((_, i) => (
        <rect key={i} x={20 + (i % 3) * 60} y={20 + Math.floor(i / 3) * 60} width="46" height="46" rx="8" fill={i === 4 ? "currentColor" : "none"} stroke="currentColor" strokeWidth="3" />
      ))}
    </svg>
  );
}

function Poster({ o, i, onOpen }) {
  const t = themes[o.theme];
  return (
    <motion.article
      data-cursor="play"
      whileHover={{ y: -10 }}
      className="group relative h-[440px] w-[300px] shrink-0 overflow-hidden rounded-xl border border-white/10 bg-panel shadow-[0_30px_60px_-20px_rgba(0,0,0,.9)] sm:h-[500px] sm:w-[360px]"
    >
      <div className={`absolute inset-x-0 top-0 h-[62%] bg-gradient-to-br ${t.bg} transition duration-700 group-hover:scale-105`}>
        <Art theme={o.theme} />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-panel" />
      </div>
      <div className="absolute left-4 top-4 flex items-center gap-1.5">
        <span className="font-title text-xl leading-none text-red">T</span>
        <span className="text-[8px] font-black tracking-[0.3em] text-white/80">ORIGINAL</span>
      </div>
      <div className="absolute inset-x-0 bottom-0 p-5">
        <p className={`text-[9px] font-black tracking-[0.25em] ${t.accent}`}>{o.kicker}</p>
        <h3 className="title-3d mt-1 font-display text-3xl uppercase leading-[0.95] text-white sm:text-4xl">{o.title}</h3>
        <p className="mt-3 text-xs leading-relaxed text-white/65">{o.text}</p>
        <div className="mt-3 flex flex-wrap gap-1.5">
          {o.tags.map((tag) => (
            <span key={tag} className="rounded-sm bg-white/10 px-1.5 py-0.5 text-[10px] text-white/75">
              {tag}
            </span>
          ))}
        </div>
        <div className="mt-4 flex gap-2">
          <button onClick={onOpen} className="inline-flex items-center gap-1.5 rounded bg-white px-3 py-1.5 text-[11px] font-semibold text-black transition hover:bg-white/80">
            <PlayIcon className="h-2.5 w-2.5" /> View Project
          </button>
          {series.github && (
            <a href={series.github} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 rounded border border-white/20 px-3 py-1.5 text-[11px] font-semibold text-white hover:bg-white/10">
              GitHub <ArrowUpRight className="h-3 w-3" />
            </a>
          )}
        </div>
      </div>
      <span className="absolute right-4 top-3 font-display text-6xl text-white/10">0{i + 1}</span>
    </motion.article>
  );
}

export default function Originals() {
  const outer = useRef(null);
  const track = useRef(null);
  const [distance, setDistance] = useState(0);
  const [open, setOpen] = useState(null);

  useEffect(() => {
    const measure = () => {
      if (!track.current) return;
      setDistance(Math.max(0, track.current.scrollWidth - window.innerWidth + 40));
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  const { scrollYProgress } = useScroll({ target: outer, offset: ["start start", "end end"] });
  const x = useTransform(scrollYProgress, [0, 1], [0, -distance]);
  const line = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  const more = series.github || series.linkedin;

  return (
    <section id="originals" ref={outer} className="relative scroll-mt-16" style={{ height: `calc(100vh + ${distance}px)` }}>
      <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_50%,rgba(120,10,25,.25),transparent_60%)]" />
        <motion.div ref={track} style={{ x }} className="relative flex items-center gap-6 pl-5 pr-10 md:pl-10">
          <div className="w-[300px] shrink-0 sm:w-[380px]">
            <Kicker>{originals.length} Originals · 2026</Kicker>
            <h2 className="title-3d mt-3 font-display text-6xl uppercase leading-[0.9] text-white sm:text-8xl">Originals</h2>
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-white/60">
              Productions from the resume — an operations capstone, a cross-platform app and a React UI system. Open any title for the full story.
            </p>
            <p className="mt-6 flex items-center gap-2 text-[10px] font-bold tracking-[0.3em] text-white/50">
              SCROLL TO BROWSE <ArrowRight className="h-3 w-3" />
            </p>
          </div>
          {originals.map((o, i) => (
            <Poster key={o.title} o={o} i={i} onOpen={() => setOpen(o)} />
          ))}
          <a
            href={more}
            target="_blank"
            rel="noreferrer"
            className="group grid h-[440px] w-[220px] shrink-0 place-items-center rounded-xl border border-dashed border-white/15 text-center transition hover:border-red/60 sm:h-[500px]"
          >
            <div>
              <p className="font-display text-3xl uppercase leading-tight text-white">
                More on
                <br />
                {series.github ? "GitHub" : "LinkedIn"}
              </p>
              <ArrowUpRight className="mx-auto mt-3 h-6 w-6 text-red transition group-hover:-translate-y-1 group-hover:translate-x-1" />
            </div>
          </a>
        </motion.div>

        <div className="relative mx-5 mt-10 md:mx-10">
          <div className="h-px bg-white/10" />
          <motion.div style={{ width: line }} className="absolute left-0 top-0 h-px bg-red shadow-[0_0_10px_#e50914]" />
          <motion.span style={{ left: line }} className="absolute top-1/2 h-3.5 w-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white/70 bg-ink" />
          <p className="mt-4 text-[9px] font-bold tracking-[0.3em] text-white/35">ORIGINALS</p>
        </div>
      </div>

      <AnimatePresence>{open && <Detail o={open} onClose={() => setOpen(null)} />}</AnimatePresence>
    </section>
  );
}

function Detail({ o, onClose }) {
  const t = themes[o.theme];
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <motion.div
      className="fixed inset-0 z-[60] grid place-items-center bg-black/75 p-4 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      data-lenis-prevent
    >
      <motion.div
        className="relative w-full max-w-2xl overflow-hidden rounded-xl border border-white/10 bg-panel"
        initial={{ scale: 0.9, y: 40 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.92, y: 30, opacity: 0 }}
        transition={{ type: "spring", stiffness: 260, damping: 26 }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={`relative h-56 bg-gradient-to-br ${t.bg}`}>
          <Art theme={o.theme} />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-panel" />
          <button onClick={onClose} aria-label="Close" className="absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-full bg-black/60 text-white hover:bg-black">
            <X className="h-5 w-5" />
          </button>
          <h3 className="title-3d absolute bottom-4 left-6 right-6 font-display text-4xl uppercase leading-none text-white sm:text-5xl">{o.title}</h3>
        </div>
        <div className="p-6">
          <p className={`text-[10px] font-black tracking-[0.25em] ${t.accent}`}>{o.kicker}</p>
          <p className="mt-3 text-sm leading-relaxed text-white/75">{o.text}</p>
          <div className="mt-4 flex flex-wrap gap-1.5">
            {o.tags.map((tag) => (
              <span key={tag} className="rounded-sm border border-white/15 px-2 py-0.5 text-[11px] text-white/75">
                {tag}
              </span>
            ))}
          </div>
          {o.link && (
            <a href={o.link} target="_blank" rel="noreferrer" className="mt-6 inline-flex items-center gap-1.5 rounded bg-white px-4 py-2 text-xs font-semibold text-black hover:bg-white/80">
              Open project <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}
