"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { seasons } from "@/data/series";
import { PlayIcon, SectionTitle } from "./ui";

const grads = [
  "from-[#c8162b] via-[#7a0b18] to-transparent",
  "from-[#c27a12] via-[#6b3a06] to-transparent",
  "from-[#1f6f9f] via-[#0e3b52] to-transparent",
];

export default function Journey() {
  const [idx, setIdx] = useState(seasons.length - 2);
  const s = seasons[idx];

  return (
    <section id="journey" className="relative mx-auto max-w-[1400px] scroll-mt-16 px-5 py-24 md:px-10">
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <SectionTitle kicker={`${seasons.length} Seasons`}>My Journey</SectionTitle>
        <p className="max-w-[240px] text-[11px] leading-relaxed text-white/45">Every stage of the resume, told as a season — select one to see its episodes.</p>
      </div>

      <div className="no-scrollbar -mx-5 mt-8 flex gap-2 overflow-x-auto px-5 md:mx-0 md:px-0">
        {seasons.map((x, i) => (
          <button
            key={x.id}
            onClick={() => setIdx(i)}
            className={`relative shrink-0 rounded-full px-4 py-2 text-left transition ${i === idx ? "text-black" : "text-white/60 hover:text-white"}`}
          >
            {i === idx && <motion.span layoutId="season-pill" className="absolute inset-0 rounded-full bg-white" transition={{ type: "spring", stiffness: 350, damping: 30 }} />}
            <span className="relative block text-[8px] font-black tracking-[0.25em] opacity-70">SEASON {x.id.slice(1)}</span>
            <span className="relative block text-xs font-semibold">{x.name}</span>
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div key={s.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.4 }}>
          <div className="mt-8 flex flex-wrap items-baseline gap-x-4 gap-y-1">
            <span className="font-display text-4xl text-white/20 sm:text-5xl">{s.id}</span>
            <h3 className="title-3d font-display text-4xl uppercase text-white sm:text-5xl">{s.name}</h3>
            <span className="text-xs text-white/45">
              {s.years} · {s.episodes.length} Episodes
            </span>
          </div>
          <p className="mt-2 max-w-xl text-sm text-white/60">{s.blurb}</p>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {s.episodes.map((e, i) => (
              <motion.article
                key={e.title}
                data-cursor="play"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                whileHover={{ y: -6 }}
                className="group overflow-hidden rounded-lg border border-white/10 bg-panel"
              >
                <div className={`relative h-40 bg-gradient-to-b ${grads[i % grads.length]}`}>
                  <p className="absolute left-4 top-3 text-[9px] font-black tracking-[0.25em] text-white/80">
                    {s.id} · EPISODE {String(i + 1).padStart(2, "0")}
                  </p>
                  <span className="absolute -bottom-3 right-3 font-display text-8xl text-white/10 transition duration-500 group-hover:scale-110">E{String(i + 1).padStart(2, "0")}</span>
                  <h4 className="title-3d absolute bottom-3 left-4 right-20 font-display text-2xl uppercase leading-none text-white">{e.title}</h4>
                </div>
                <div className="relative p-4">
                  <span className="absolute -top-4 right-4 grid h-8 w-8 place-items-center rounded-full border border-white/40 bg-panel text-white transition group-hover:border-red group-hover:bg-red">
                    <PlayIcon className="h-3 w-3" />
                  </span>
                  <p className="text-[10px] font-semibold text-white/45">
                    {e.year} · {e.label}
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-white/70">{e.text}</p>
                </div>
              </motion.article>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>
    </section>
  );
}
