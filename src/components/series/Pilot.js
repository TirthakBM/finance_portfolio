"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { about, series } from "@/data/series";
import { FadeUp, SectionTitle } from "./ui";

export default function Pilot() {
  return (
    <section id="about" className="relative mx-auto max-w-[1400px] scroll-mt-16 px-5 py-24 md:px-10">
      <SectionTitle kicker="The Pilot">About Me</SectionTitle>

      <div className="mt-10 grid items-center gap-10 md:grid-cols-[minmax(0,420px)_1fr]">
        <FadeUp>
          <motion.div
            whileHover={{ rotate: -1, scale: 1.02 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            className="relative aspect-[4/5] overflow-hidden rounded-xl border border-white/10 bg-gradient-to-b from-[#5a0b16] via-[#2a070d] to-[#0f0a0c] shadow-[0_40px_80px_-30px_rgba(229,9,20,.45)]"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(255,60,80,.35),transparent_60%)]" />
            <Image src={series.heroPhoto} alt={series.displayName} fill sizes="420px" className="object-contain object-bottom" />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black via-black/60 to-transparent p-5 pt-20">
              <p className="text-[9px] font-black tracking-[0.3em] text-red">THE LEAD</p>
              <p className="font-display text-3xl uppercase leading-none text-white">{series.displayName}</p>
            </div>
            <span className="absolute bottom-5 right-5 rounded-sm border border-white/30 px-1.5 py-0.5 text-[9px] font-bold text-white/80">EP 01</span>
          </motion.div>
        </FadeUp>

        <div>
          <FadeUp>
            <blockquote className="font-serif text-2xl italic leading-snug text-white/90 sm:text-3xl">“{about.quote}”</blockquote>
            <p className="mt-3 text-xs text-white/45">— {series.shortName}</p>
          </FadeUp>

          <div className="mt-10 grid gap-x-8 gap-y-6 border-t border-white/10 pt-8 sm:grid-cols-2">
            {about.facts.map((f, i) => (
              <FadeUp key={f.label} delay={i * 0.08}>
                <p className="text-[9px] font-black tracking-[0.3em] text-white/40">{f.label}</p>
                <p className="mt-1 text-sm font-semibold text-white">{f.title}</p>
                <p className="text-xs text-white/50">{f.sub}</p>
              </FadeUp>
            ))}
          </div>

          <FadeUp delay={0.3} className="mt-8">
            <p className="text-[9px] font-black tracking-[0.3em] text-white/40">INTERESTS</p>
            <div className="mt-2 flex flex-wrap gap-2">
              {about.interests.map((t) => (
                <span key={t} className="rounded-full border border-white/15 bg-white/5 px-3 py-1 text-[11px] text-white/75 transition hover:border-red hover:text-white">
                  {t}
                </span>
              ))}
            </div>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}
