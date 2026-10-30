"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Download, Info } from "lucide-react";
import { episodes, series } from "@/data/series";
import { Logo, PlayIcon, scrollToId, useSeries } from "./ui";

const ease = [0.16, 1, 0.3, 1];

export default function Billboard() {
  const { profile, replayIntro } = useSeries();

  return (
    <section id="home" className="relative overflow-hidden">
      {/* backdrop */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_75%_40%,rgba(150,10,30,.45)_0%,rgba(60,5,15,.25)_35%,transparent_65%)]" />
      <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-ink to-transparent" />

      <div key={profile.id} className="relative mx-auto grid min-h-[100svh] max-w-[1400px] grid-cols-1 items-center gap-6 px-5 pb-60 pt-24 md:grid-cols-[1.05fr_1fr] md:px-10 md:pb-52">
        {/* copy */}
        <div className="relative z-10 order-2 md:order-1">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }}>
            <Logo className="text-sm" />
          </motion.div>
          <motion.h1
            className="name-shine animate-shine mt-2 font-title text-[24vw] leading-[0.82] sm:text-[9rem] lg:text-[11rem]"
            initial={{ opacity: 0, filter: "blur(16px)", x: -30, scale: 1.05 }}
            animate={{ opacity: 1, filter: "blur(0px)", x: 0, scale: 1 }}
            transition={{ duration: 1.1, ease }}
          >
            {series.firstName}
          </motion.h1>
          <motion.p
            className="mt-1 text-xs font-black tracking-[0.55em] text-red"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.6 }}
          >
            THE SERIES
          </motion.p>

          <motion.div
            className="mt-5 flex flex-wrap items-center gap-x-2.5 gap-y-1.5 text-[12px] text-white/75"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            <span className="rounded-sm border border-white/40 px-1.5 py-[1px] text-[10px] font-bold text-white">{series.badge}</span>
            {series.meta.map((m, i) => (
              <span key={m} className="flex items-center gap-2.5">
                {i > 0 && <span className="h-1 w-1 rounded-full bg-white/40" />}
                {m}
              </span>
            ))}
          </motion.div>

          <motion.p
            className="mt-3 text-[11px] font-bold tracking-[0.3em] text-white/90"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            {series.tagline}
          </motion.p>
          <motion.p
            className="mt-3 max-w-lg text-[15px] leading-relaxed text-white/75"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.6 }}
          >
            {series.intro}
          </motion.p>

          <motion.div
            className="mt-7 flex flex-wrap items-center gap-3"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.85, duration: 0.6 }}
          >
            <button
              data-cursor="play"
              onClick={replayIntro}
              className="inline-flex items-center gap-2 rounded bg-white px-6 py-2.5 text-sm font-semibold text-black transition hover:bg-white/80"
            >
              <PlayIcon className="h-4 w-4" /> Play Intro
            </button>
            <button
              onClick={() => scrollToId("resume")}
              className="inline-flex items-center gap-2 rounded border border-white/15 bg-white/10 px-6 py-2.5 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/20"
            >
              <Download className="h-4 w-4" /> View Resume
            </button>
            <button
              onClick={() => scrollToId("about")}
              aria-label="More info"
              className="grid h-10 w-10 place-items-center rounded-full border border-white/40 text-white/85 transition hover:border-white hover:text-white"
            >
              <Info className="h-4 w-4" />
            </button>
          </motion.div>
        </div>

        {/* portrait */}
        <div className="relative order-1 mx-auto h-[46vh] w-full max-w-[520px] md:order-2 md:h-[64vh]">
          <motion.div
            className="absolute left-1/2 top-[45%] aspect-square w-[95%] -translate-x-1/2 -translate-y-1/2"
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.4, ease }}
          >
            <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle,rgba(229,9,20,.55)_0%,rgba(120,8,20,.25)_45%,transparent_70%)]" />
            {[0.55, 0.75, 0.95].map((s, i) => (
              <div key={s} className="absolute inset-0 m-auto rounded-full border border-red/25" style={{ width: `${s * 100}%`, height: `${s * 100}%`, opacity: 0.8 - i * 0.2 }} />
            ))}
            <div className="absolute inset-[22%] animate-pulse-ring rounded-full border border-red/40" />
          </motion.div>

          <motion.div
            className="absolute inset-0"
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.15, ease }}
          >
            <Image
              src={series.heroPhoto}
              alt={series.displayName}
              fill
              priority
              sizes="(max-width: 768px) 90vw, 520px"
              className="object-contain object-bottom [mask-image:linear-gradient(to_bottom,#000_70%,transparent_98%)]"
            />
          </motion.div>

          {series.chips.map((c, i) => (
            <motion.div
              key={c.title}
              className={`absolute hidden rounded-md border border-white/10 bg-black/55 px-3 py-2 backdrop-blur-md sm:block ${
                c.pos === "left" ? "left-0 top-[34%]" : c.pos === "right" ? "right-0 top-[20%]" : "bottom-[22%] right-2"
              }`}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1 + i * 0.15, duration: 0.5 }}
            >
              <div className="animate-float" style={{ animationDelay: `${i * 0.8}s` }}>
                <p className="text-[12px] font-semibold text-white">{c.title}</p>
                <p className="text-[8px] font-bold tracking-[0.2em] text-white/55">{c.sub}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <ContinueExploring />
    </section>
  );
}

function ContinueExploring() {
  const { order, progress } = useSeries();
  const rail = useRef(null);
  const scroll = (dir) => rail.current?.scrollBy({ left: dir * rail.current.clientWidth * 0.8, behavior: "smooth" });

  return (
    <div className="absolute inset-x-0 bottom-6 z-20">
      <div className="mx-auto flex max-w-[1400px] items-end justify-between px-5 md:px-10">
        <h3 className="text-lg font-bold text-white md:text-xl">Continue Exploring</h3>
        <p className="hidden text-[11px] text-white/45 sm:block">Progress shows what you&apos;ve watched so far</p>
      </div>
      <div className="group/rail relative mx-auto mt-1 max-w-[1400px]">
        <button
          onClick={() => scroll(-1)}
          aria-label="Scroll left"
          className="absolute left-0 top-0 z-10 hidden h-full w-12 place-items-center bg-gradient-to-r from-ink to-transparent opacity-0 transition group-hover/rail:opacity-100 md:grid"
        >
          <ChevronLeft className="h-8 w-8" />
        </button>
        <div ref={rail} className="no-scrollbar flex gap-3 overflow-x-auto scroll-smooth px-5 py-3 md:px-10">
          {order.map((k, i) => (
            <EpisodeCard key={k} id={k} n={i + 1} pct={progress[k] || 0} delay={i * 0.06} />
          ))}
        </div>
        <button
          onClick={() => scroll(1)}
          aria-label="Scroll right"
          className="absolute right-0 top-0 z-10 hidden h-full w-12 place-items-center bg-gradient-to-l from-ink to-transparent opacity-0 transition group-hover/rail:opacity-100 md:grid"
        >
          <ChevronRight className="h-8 w-8" />
        </button>
      </div>
    </div>
  );
}

function EpisodeCard({ id, n, pct, delay }) {
  const e = episodes[id];
  return (
    <motion.button
      data-cursor="play"
      onClick={() => scrollToId(id)}
      className="group relative w-[230px] shrink-0 text-left sm:w-[270px]"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.9 + delay, duration: 0.6, ease }}
      whileHover={{ scale: 1.06, y: -4, zIndex: 5 }}
    >
      <div className={`relative h-[130px] overflow-hidden rounded-md bg-gradient-to-br sm:h-[150px] ${e.grad} shadow-lg ring-1 ring-white/10 transition group-hover:ring-white/50`}>
        <span className="absolute -right-2 -top-4 font-display text-[110px] leading-none text-white/10 transition duration-500 group-hover:scale-110">{e.mark}</span>
        <span className="absolute right-2.5 top-2.5 grid h-7 w-7 place-items-center rounded-full border border-white/50 bg-black/30 text-white transition group-hover:bg-white group-hover:text-black">
          <PlayIcon className="h-2.5 w-2.5" />
        </span>
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-3 pt-10">
          <p className="text-[9px] font-black tracking-[0.25em] text-red-2">EPISODE {String(n).padStart(2, "0")}</p>
          <p className="font-display text-xl uppercase leading-tight text-white">{e.title}</p>
          <p className="max-h-0 overflow-hidden text-[10px] text-white/70 transition-all duration-300 group-hover:max-h-6">{e.sub}</p>
        </div>
      </div>
      <div className="mt-1.5 h-[3px] w-full overflow-hidden rounded bg-white/15">
        <div className="h-full bg-red transition-[width] duration-500" style={{ width: `${Math.round(pct * 100)}%` }} />
      </div>
    </motion.button>
  );
}
