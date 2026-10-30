"use client";

import { motion } from "framer-motion";
import { series, topPicks } from "@/data/series";
import { SectionTitle } from "./ui";

export default function TopPicks() {
  return (
    <section id="picks" className="relative mx-auto max-w-[1400px] scroll-mt-16 px-5 py-24 md:px-10">
      <SectionTitle>{series.firstName}&apos;s Top Picks</SectionTitle>

      <div className="no-scrollbar -mx-5 mt-10 flex gap-2 overflow-x-auto px-5 pb-6 md:mx-0 md:px-0">
        {topPicks.map((p, i) => (
          <motion.div
            key={p.title}
            data-cursor="play"
            className="group flex shrink-0 items-end"
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ delay: i * 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="outline-num -mr-5 font-display text-[170px] leading-[0.8] transition group-hover:[-webkit-text-stroke-color:#e50914] sm:text-[210px]">{i + 1}</span>
            <motion.div
              whileHover={{ scale: 1.06, y: -6 }}
              className={`relative z-10 h-[230px] w-[160px] overflow-hidden rounded-md bg-gradient-to-br ${p.color} p-3 shadow-[0_20px_40px_-10px_rgba(0,0,0,.8)] ring-1 ring-white/10 sm:h-[260px] sm:w-[180px]`}
            >
              <span className="absolute left-3 top-3 font-title text-lg leading-none text-white drop-shadow">T</span>
              <p className="mt-6 text-[8px] font-black tracking-[0.25em] text-white/80">{p.label}</p>
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 to-transparent p-3 pt-12">
                <p className="title-3d font-display text-2xl uppercase leading-none text-white">{p.title}</p>
                <p className="mt-1.5 text-[10px] leading-snug text-white/70">{p.text}</p>
              </div>
            </motion.div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
