"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { skillGenres } from "@/data/series";
import { FadeUp, SectionTitle } from "./ui";

const initials = (n) =>
  n
    .replace(/[^A-Za-z0-9 ]/g, " ")
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();

export default function SkillUniverse() {
  const [genreId, setGenreId] = useState(skillGenres[0].id);
  const [hover, setHover] = useState(null);
  const genre = skillGenres.find((g) => g.id === genreId);
  const focus = genre.items.find((s) => s.name === hover);

  return (
    <section id="skills" className="relative mx-auto max-w-[1400px] scroll-mt-16 px-5 py-24 md:px-10">
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <SectionTitle kicker="Genres">My Skill Universe</SectionTitle>
        <p className="max-w-[240px] text-[11px] leading-relaxed text-white/45">
          Hover or tap a skill to see where it shows up across work and certifications.
        </p>
      </div>

      <div className="mt-10 grid gap-8 md:grid-cols-[260px_1fr]">
        <FadeUp>
          <ul className="no-scrollbar -mx-5 flex gap-2 overflow-x-auto px-5 md:mx-0 md:flex-col md:gap-1 md:px-0">
            {skillGenres.map((g) => {
              const on = g.id === genreId;
              return (
                <li key={g.id} className="shrink-0">
                  <button
                    onClick={() => {
                      setGenreId(g.id);
                      setHover(null);
                    }}
                    className={`relative w-full rounded-md px-4 py-2.5 text-left transition ${on ? "bg-panel-2" : "hover:bg-white/5"}`}
                  >
                    {on && <motion.span layoutId="genre-bar" className="absolute inset-y-1 left-0 w-[3px] rounded bg-red" />}
                    <p className={`font-display text-lg uppercase leading-tight md:text-xl ${on ? "text-white" : "text-white/55"}`}>{g.name}</p>
                    <p className="text-[10px] text-white/40">
                      {g.items.length} skills · {g.blurb}
                    </p>
                  </button>
                </li>
              );
            })}
          </ul>
        </FadeUp>

        <div className="min-h-[340px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={genre.id}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.35 }}
            >
              <p className="text-sm text-white/70">
                <span className="font-semibold text-white">{genre.heading.split(" — ")[0]}</span>
                <span className="text-white/45"> — {genre.heading.split(" — ")[1]}</span>
              </p>
              <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-4">
                {genre.items.map((s, i) => {
                  const primary = s.name === genre.primary;
                  return (
                    <motion.button
                      key={s.name}
                      onMouseEnter={() => setHover(s.name)}
                      onFocus={() => setHover(s.name)}
                      onClick={() => setHover(s.name)}
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.04 }}
                      className={`group relative overflow-hidden rounded-md border p-3.5 text-left transition ${
                        hover === s.name
                          ? "border-red/60 bg-gradient-to-br from-[#3a0b12] to-panel"
                          : "border-white/10 bg-panel hover:border-white/25"
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <span className="grid h-8 w-8 shrink-0 place-items-center rounded bg-gradient-to-br from-red to-[#7a0a10] text-[11px] font-black text-white">
                          {initials(s.name)}
                        </span>
                        <span className="text-[13px] font-semibold leading-tight text-white">{s.name}</span>
                      </div>
                      {primary && (
                        <span className="absolute right-2 top-2 rounded-sm bg-red px-1.5 py-[1px] text-[8px] font-black tracking-wider text-white">PRIMARY</span>
                      )}
                      <div className="mt-3 h-[3px] overflow-hidden rounded bg-white/10">
                        <motion.div
                          className="h-full bg-red"
                          initial={{ width: 0 }}
                          animate={{ width: `${s.level}%` }}
                          transition={{ duration: 0.9, delay: 0.1 + i * 0.04, ease: [0.16, 1, 0.3, 1] }}
                        />
                      </div>
                    </motion.button>
                  );
                })}
              </div>

              <AnimatePresence mode="wait">
                {focus && (
                  <motion.div
                    key={focus.name}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    className="mt-5 rounded-md border-l-2 border-red bg-panel/70 px-4 py-3"
                  >
                    <p className="text-sm font-semibold text-white">{focus.name}</p>
                    <p className="mt-0.5 text-xs leading-relaxed text-white/60">{focus.note}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
