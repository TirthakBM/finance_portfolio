"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { credentials, moments } from "@/data/series";
import { FadeUp, SectionTitle } from "./ui";

function LaurelHalf({ flip }) {
  return (
    <svg viewBox="0 0 40 48" className="h-11 w-9 shrink-0 text-gold" style={flip ? { transform: "scaleX(-1)" } : undefined} aria-hidden>
      <path d="M30 46 C14 38 8 22 14 4" fill="none" stroke="currentColor" strokeWidth="1.4" />
      {Array.from({ length: 6 }, (_, i) => (
        <ellipse key={i} cx={14 + i * 0.6} cy={8 + i * 6.5} rx="5" ry="2.2" fill="currentColor" transform={`rotate(${-50 + i * 6} ${14 + i * 0.6} ${8 + i * 6.5})`} opacity={0.9} />
      ))}
    </svg>
  );
}

function Laurel({ label }) {
  return (
    <div className="mx-auto flex h-12 w-full items-center justify-center gap-1">
      <LaurelHalf />
      <span className="max-w-[110px] text-center text-[8px] font-black leading-tight tracking-[0.22em] text-gold/90">{label}</span>
      <LaurelHalf flip />
    </div>
  );
}

export default function Moments() {
  const groups = ["All", ...new Set(credentials.map((c) => c.group))];
  const [filter, setFilter] = useState("All");
  const shown = credentials.filter((c) => filter === "All" || c.group === filter);

  return (
    <section id="moments" className="relative mx-auto max-w-[1400px] scroll-mt-16 px-5 py-24 md:px-10">
      <SectionTitle kicker="Awards Season">Top Moments</SectionTitle>

      <div className="no-scrollbar -mx-5 mt-10 flex gap-4 overflow-x-auto px-5 pb-4 md:mx-0 md:grid md:grid-cols-3 md:px-0 xl:grid-cols-5">
        {moments.map((m, i) => (
          <FadeUp key={m.title} delay={i * 0.08} className="w-[250px] shrink-0 md:w-auto">
            <motion.div
              whileHover={{ y: -8 }}
              className="group relative flex h-full flex-col rounded-lg border border-gold/35 bg-gradient-to-b from-[#1d1912] to-[#0f0e0c] p-5 text-center shadow-[inset_0_1px_0_rgba(217,173,85,.25)] transition-shadow hover:shadow-[0_20px_50px_-15px_rgba(217,173,85,.35),inset_0_1px_0_rgba(217,173,85,.4)]"
            >
              <Laurel label={m.label} />
              <h3 className="mt-3 font-display text-2xl uppercase leading-tight text-white">{m.title}</h3>
              <p className="mt-1 text-[9px] font-bold tracking-[0.2em] text-gold">{m.org}</p>
              <p className="mt-3 flex-1 text-xs leading-relaxed text-white/60">{m.text}</p>
              {m.link && (
                <a
                  href={m.link}
                  target="_blank"
                  rel="noreferrer"
                  className="mx-auto mt-4 inline-flex items-center gap-1 rounded border border-gold/40 px-3 py-1.5 text-[11px] font-semibold text-gold transition hover:bg-gold hover:text-black"
                >
                  View certificate <ArrowUpRight className="h-3 w-3" />
                </a>
              )}
            </motion.div>
          </FadeUp>
        ))}
      </div>

      <div className="mt-16 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <h3 className="text-xl font-bold text-white">
          Certified <span className="text-white/40">·</span> {credentials.length} credentials
        </h3>
        <div className="flex flex-wrap gap-2">
          {groups.map((g) => (
            <button
              key={g}
              onClick={() => setFilter(g)}
              className={`rounded-full border px-3 py-1 text-[11px] font-semibold transition ${
                filter === g ? "border-white bg-white text-black" : "border-white/15 text-white/60 hover:border-white/40 hover:text-white"
              }`}
            >
              {g}
            </button>
          ))}
        </div>
      </div>

      <motion.div layout className="no-scrollbar -mx-5 mt-5 flex gap-3 overflow-x-auto px-5 pb-2 md:mx-0 md:px-0">
        <AnimatePresence mode="popLayout">
          {shown.map((c) => (
            <motion.div
              layout
              key={c.title}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              className="group flex h-[110px] w-[210px] shrink-0 flex-col justify-between rounded-md border border-white/10 bg-panel p-3.5 transition hover:-translate-y-1 hover:border-red/50 hover:bg-panel-2"
            >
              <div className="flex items-start justify-between gap-2">
                <span className="truncate text-[9px] font-black tracking-[0.2em] text-red">{c.issuer}</span>
                <ArrowUpRight className="h-3.5 w-3.5 shrink-0 text-white/40 transition group-hover:text-white" />
              </div>
              <p className="text-[13px] font-semibold leading-snug text-white">{c.title}</p>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}
