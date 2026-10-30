"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, RotateCcw, RefreshCw } from "lucide-react";
import { series } from "@/data/series";
import { Logo, PlayIcon, scrollToTop, useSeries } from "./ui";

export default function Finale() {
  const { replayIntro } = useSeries();
  const links = [
    { label: "LINKEDIN", href: series.linkedin },
    series.github ? { label: "GITHUB", href: series.github } : { label: "PHONE", href: series.phoneHref },
    { label: "EMAIL", href: `mailto:${series.email}` },
  ];
  const words = "TO BE CONTINUED...".split(" ");

  return (
    <section id="finale" className="relative overflow-hidden px-5 pb-10 pt-32 text-center">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_60%,rgba(120,10,25,.3),transparent_60%)]" />
      <motion.p
        className="relative text-[10px] font-black tracking-[0.4em] text-red"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        THE NEXT EPISODE
      </motion.p>
      <h2 className="title-3d relative mt-4 font-display text-[15vw] uppercase leading-[0.9] text-[#f1ece2] md:text-[9rem]">
        {words.map((w, i) => (
          <motion.span
            key={w}
            className="mr-[0.2em] inline-block last:mr-0"
            initial={{ opacity: 0, filter: "blur(20px)", y: 40, scaleY: 1.4 }}
            whileInView={{ opacity: 1, filter: "blur(0px)", y: 0, scaleY: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ delay: i * 0.25, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          >
            {w}
          </motion.span>
        ))}
      </h2>

      <motion.div
        className="relative"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.8, duration: 0.6 }}
      >
        <p className="mt-6 text-sm font-bold tracking-[0.35em] text-white">{series.displayName}</p>
        <p className="mt-1 text-[10px] font-semibold tracking-[0.3em] text-white/50">{series.tagline}</p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <a
            href={`mailto:${series.email}`}
            data-cursor="play"
            className="inline-flex items-center gap-2 rounded-full bg-red px-5 py-2.5 text-[11px] font-black tracking-[0.2em] text-white shadow-[0_0_30px_rgba(229,9,20,.6)] transition hover:scale-105 hover:bg-red-2"
          >
            <PlayIcon className="h-3 w-3" /> LET&apos;S BUILD
          </a>
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              target={l.href.startsWith("http") ? "_blank" : undefined}
              rel="noreferrer"
              className="inline-flex items-center gap-1 rounded-full border border-white/25 px-4 py-2.5 text-[11px] font-bold tracking-[0.2em] text-white/85 transition hover:border-white hover:text-white"
            >
              {l.label} <ArrowUpRight className="h-3 w-3" />
            </a>
          ))}
        </div>

        <div className="mt-8 flex items-center justify-center gap-6 text-[10px] font-bold tracking-[0.25em] text-white/45">
          <button onClick={() => scrollToTop()} className="inline-flex items-center gap-1.5 transition hover:text-white">
            <RotateCcw className="h-3 w-3" /> WATCH AGAIN
          </button>
          <button onClick={replayIntro} className="inline-flex items-center gap-1.5 transition hover:text-white">
            <RefreshCw className="h-3 w-3" /> REPLAY OPENING
          </button>
        </div>
      </motion.div>

      <footer className="relative mt-24 flex flex-col items-center gap-3 border-t border-white/10 pt-8">
        <Logo className="text-base" />
        <p className="text-[10px] text-white/35">
          © {new Date().getFullYear()} {series.shortName}. A personal, streaming-inspired portfolio — not affiliated with any streaming service.
        </p>
      </footer>
    </section>
  );
}
