"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { profiles, series } from "@/data/series";

export function ProfileTile({ p, size = "h-24 w-24 sm:h-32 sm:w-32 md:h-36 md:w-36", glyphSize = "text-4xl" }) {
  return (
    <div className={`relative overflow-hidden rounded-md ${p.tile} ${size}`}>
      {p.main ? (
        <Image src={series.heroPhoto} alt="" fill sizes="150px" className="object-cover object-top" />
      ) : (
        <span className={`absolute inset-0 grid place-items-center font-bold text-white drop-shadow ${glyphSize}`}>{p.glyph}</span>
      )}
      <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/25 to-white/10" />
    </div>
  );
}

export default function ProfileGate({ onChoose, current }) {
  const [picked, setPicked] = useState(null);

  const choose = (p) => {
    if (picked) return;
    setPicked(p.id);
    setTimeout(() => onChoose(p.id), 650);
  };

  return (
    <motion.div
      className="fixed inset-0 z-40 flex flex-col items-center justify-center overflow-y-auto bg-[#0b0a0e] px-5 py-16"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(120,20,40,.35),transparent_60%)]" />
      <motion.h1
        className="relative mb-10 text-center text-3xl font-medium text-white sm:text-5xl"
        initial={{ opacity: 0, y: -20, scale: 1.1 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      >
        Who&apos;s watching?
      </motion.h1>

      <div className="relative grid grid-cols-2 gap-6 sm:flex sm:gap-8">
        {profiles.map((p, i) => (
          <motion.button
            key={p.id}
            data-cursor="play"
            onClick={() => choose(p)}
            className="group flex w-28 flex-col items-center text-center sm:w-36 md:w-40"
            initial={{ opacity: 0, y: 30 }}
            animate={
              picked
                ? picked === p.id
                  ? { opacity: 1, scale: 1.25, y: -10 }
                  : { opacity: 0, scale: 0.9 }
                : { opacity: 1, y: 0, scale: 1 }
            }
            transition={{ duration: picked ? 0.5 : 0.6, delay: picked ? 0 : 0.15 + i * 0.08, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="relative rounded-md ring-0 ring-white transition-all duration-300 group-hover:scale-105 group-hover:ring-[3px]">
              <ProfileTile p={p} />
              {p.main && (
                <span className="absolute -right-1 -top-1 rounded-sm bg-red px-1.5 py-0.5 text-[8px] font-black tracking-wider text-white">
                  MAIN
                </span>
              )}
              {current === p.id && <span className="absolute inset-x-0 -bottom-2 mx-auto h-1 w-8 rounded-full bg-white" />}
            </div>
            <span className="mt-4 text-sm font-semibold text-white/75 transition group-hover:text-white">{p.name}</span>
            <span className="mt-1 text-[11px] leading-snug text-white/45">{p.desc}</span>
          </motion.button>
        ))}
      </div>

      <motion.p
        className="relative mt-12 max-w-sm text-center text-xs leading-relaxed text-white/45"
        initial={{ opacity: 0 }}
        animate={{ opacity: picked ? 0 : 1 }}
        transition={{ delay: picked ? 0 : 0.7 }}
      >
        Every profile watches the same true story of {series.shortName} — it only changes
        what plays first.
      </motion.p>
    </motion.div>
  );
}
