"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowUp, ArrowUpRight, Check, Copy, Mail, Phone } from "lucide-react";
import Reveal from "./Reveal";
import SplitText from "./fx/SplitText";
import SpotlightCard from "./fx/SpotlightCard";
import Magnetic from "./fx/Magnetic";
import { profile } from "@/data/profile";

function LinkedInIcon({ size = 20 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z" />
    </svg>
  );
}

const channels = [
  { label: "Email", value: profile.email, href: `mailto:${profile.email}`, icon: <Mail size={20} />, cursor: "Write", copy: profile.email },
  { label: "Phone", value: profile.phone, href: profile.phoneHref, icon: <Phone size={20} />, cursor: "Call", copy: profile.phone },
  { label: "LinkedIn", value: profile.linkedinLabel, href: profile.linkedin, icon: <LinkedInIcon />, cursor: "Open", external: true },
];

function CopyButton({ text }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      type="button"
      aria-label={`Copy ${text}`}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        navigator.clipboard?.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 1600);
      }}
      className="grid h-8 w-8 place-items-center rounded-full border border-line text-muted transition-colors hover:border-gold hover:text-gold"
    >
      {copied ? <Check size={14} className="text-gold" /> : <Copy size={14} />}
    </button>
  );
}

export default function Contact() {
  return (
    <section id="contact" className="relative scroll-mt-20 overflow-hidden bg-accent-soft/60 pt-20 pb-24 sm:pt-28">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="animate-blob absolute top-10 -left-24 h-80 w-80 rounded-full bg-gold/15 blur-3xl" />
        <div className="animate-blob absolute -right-24 bottom-0 h-96 w-96 rounded-full bg-accent/15 blur-3xl [animation-delay:-8s]" />
      </div>

      <div className="relative mx-auto max-w-5xl px-5 sm:px-8">
        <div className="text-center">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">06 — Contact</p>
          </Reveal>
          <h2 className="mt-3 font-serif text-4xl font-medium sm:text-6xl">
            <SplitText text="Feel free to connect" inView stagger={0.03} />
          </h2>
          <Reveal delay={0.3}>
            <p className="mx-auto mt-5 max-w-lg text-muted">
              I&apos;m looking for opportunities in Investment Banking Operations. Whether it&apos;s a role, a question or
              just a chat, my inbox is open.
            </p>
          </Reveal>
        </div>

        <motion.div
          className="mt-14 grid gap-4 md:grid-cols-3"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          variants={{ show: { transition: { staggerChildren: 0.12 } } }}
        >
          {channels.map((c) => (
            <motion.div
              key={c.label}
              variants={{
                hidden: { opacity: 0, y: 50, rotate: -3 },
                show: { opacity: 1, y: 0, rotate: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
              }}
            >
              <SpotlightCard
                tilt={8}
                className="group h-full rounded-2xl border border-line bg-surface transition-[border-color,box-shadow] duration-300 hover:border-gold/60 hover:shadow-xl hover:shadow-accent/10"
              >
                <div className="flex h-full flex-col p-6">
                  <div className="flex items-center justify-between">
                    <span className="grid h-12 w-12 place-items-center rounded-xl bg-accent text-bg transition-transform duration-500 group-hover:rotate-[360deg]">
                      {c.icon}
                    </span>
                    <div className="relative z-10 flex items-center gap-2">
                      {c.copy && <CopyButton text={c.copy} />}
                      <ArrowUpRight
                        size={20}
                        className="text-muted transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-gold"
                      />
                    </div>
                  </div>
                  <p className="mt-8 text-xs font-semibold uppercase tracking-[0.15em] text-muted">{c.label}</p>
                  {/* Stretched link: its ::after covers the whole card */}
                  <a
                    href={c.href}
                    data-cursor={c.cursor}
                    {...(c.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    className="mt-1 break-all font-medium after:absolute after:inset-0 after:content-['']"
                  >
                    {c.value}
                  </a>
                </div>
              </SpotlightCard>
            </motion.div>
          ))}
        </motion.div>

        <div className="mt-20 flex justify-center">
          <Magnetic strength={0.5}>
            <a
              href="#top"
              data-cursor="Top"
              aria-label="Back to top"
              className="grid h-16 w-16 place-items-center rounded-full border border-line bg-surface text-muted transition-colors hover:border-gold hover:text-gold"
            >
              <ArrowUp size={20} />
            </a>
          </Magnetic>
        </div>
      </div>
    </section>
  );
}
