"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { Award, Briefcase, Check, Languages } from "lucide-react";
import Section from "./Section";
import Reveal from "./Reveal";
import SpotlightCard from "./fx/SpotlightCard";
import Marquee from "./fx/Marquee";
import { profile, certification, experience, education, coreSkills, techSkills, languages, ticker } from "@/data/profile";

export function Ticker() {
  return (
    <div className="relative -rotate-1 border-y border-line bg-accent py-4 text-bg">
      <Marquee items={ticker} className="font-serif text-xl sm:text-2xl" />
    </div>
  );
}

export function About() {
  return (
    <Section id="about" index="01" eyebrow="About" title="Where technology meets finance">
      <div className="grid gap-10 md:grid-cols-[1.4fr_1fr]">
        <div className="space-y-5 text-base leading-relaxed text-muted sm:text-lg">
          {profile.summary.map((p, i) => (
            <Reveal key={i} delay={i * 0.1}>
              <p>{p}</p>
            </Reveal>
          ))}
        </div>
        <Reveal delay={0.15}>
          <SpotlightCard className="rounded-2xl border border-line bg-surface p-6">
            <p className="text-sm font-semibold">What I bring</p>
            <ul className="mt-4 space-y-3 text-sm text-muted">
              {[
                "Operational knowledge of the trade lifecycle",
                "Detail-oriented and process-driven",
                "Automation and data-handling skills",
                "Adaptable in fast-paced environments",
              ].map((t, i) => (
                <motion.li
                  key={t}
                  className="flex gap-3"
                  initial={{ opacity: 0, x: -12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + i * 0.1 }}
                >
                  <motion.span
                    initial={{ scale: 0, rotate: -90 }}
                    whileInView={{ scale: 1, rotate: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 + i * 0.1, type: "spring", stiffness: 300 }}
                  >
                    <Check size={16} className="mt-0.5 shrink-0 text-gold" />
                  </motion.span>
                  {t}
                </motion.li>
              ))}
            </ul>
            <div className="mt-6 flex items-center gap-2 border-t border-line pt-5 text-sm text-muted">
              <Languages size={16} className="text-gold" />
              {languages.join(" · ")}
            </div>
          </SpotlightCard>
        </Reveal>
      </div>
    </Section>
  );
}

export function Expertise() {
  return (
    <div className="relative overflow-hidden border-y border-line bg-accent-soft/60">
      <div aria-hidden="true" className="grid-bg pointer-events-none absolute inset-0 opacity-60" />
      <div className="relative">
        <Section id="expertise" index="02" eyebrow="Certification" title="Investment Banking Operations">
          <Reveal>
            <SpotlightCard tilt={3} className="flex flex-col gap-4 rounded-2xl border border-line bg-surface p-6 sm:p-8">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                <motion.div
                  className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-accent text-bg"
                  initial={{ rotate: -180, scale: 0 }}
                  whileInView={{ rotate: 0, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ type: "spring", stiffness: 160, damping: 12, delay: 0.2 }}
                >
                  <Award size={26} />
                </motion.div>
                <div className="flex-1">
                  <h3 className="font-serif text-xl font-medium sm:text-2xl">{certification.title}</h3>
                  <p className="mt-1 text-sm text-muted">
                    {certification.org} · {certification.location}
                  </p>
                </div>
                <span className="self-start rounded-full border border-gold/60 px-3 py-1 text-xs font-medium text-gold sm:self-center">
                  {certification.year}
                </span>
              </div>
            </SpotlightCard>
          </Reveal>

          <motion.div
            className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
            variants={{ show: { transition: { staggerChildren: 0.08 } } }}
          >
            {certification.areas.map((a, i) => (
              <motion.div
                key={a}
                variants={{
                  hidden: { opacity: 0, y: 30, scale: 0.95 },
                  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
                }}
                className={i === certification.areas.length - 1 ? "sm:col-span-2 lg:col-span-1" : ""}
              >
                <SpotlightCard className="group h-full rounded-xl border border-line bg-surface p-5 transition-colors hover:border-gold/60">
                  <div className="flex items-start gap-4">
                    <span className="font-serif text-2xl text-gold/40 transition-colors duration-300 group-hover:text-gold">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="pt-1.5 text-sm font-medium">{a}</span>
                  </div>
                </SpotlightCard>
              </motion.div>
            ))}
          </motion.div>
        </Section>
      </div>
    </div>
  );
}

export function Experience() {
  return (
    <Section id="experience" index="03" eyebrow="Experience" title="Work experience">
      {experience.map((job) => (
        <Reveal key={job.company}>
          <SpotlightCard tilt={2} as="article" className="rounded-2xl border border-line bg-surface p-6 sm:p-8">
            <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-start">
              <div className="flex items-center gap-4">
                <div className="grid h-12 w-12 place-items-center rounded-xl bg-accent-soft text-accent">
                  <Briefcase size={20} />
                </div>
                <div>
                  <h3 className="font-serif text-xl font-medium sm:text-2xl">{job.role}</h3>
                  <p className="text-sm text-muted">{job.company}</p>
                </div>
              </div>
              <span className="inline-flex items-center gap-2 text-sm text-gold">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-gold opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-gold" />
                </span>
                {job.period}
              </span>
            </div>
            <ul className="mt-6 space-y-4">
              {job.points.map((p, i) => (
                <motion.li
                  key={p}
                  className="flex gap-3 text-sm leading-relaxed text-muted sm:text-base"
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + i * 0.12 }}
                >
                  <motion.span
                    className="mt-2.5 h-1 w-4 shrink-0 origin-left rounded-full bg-gold"
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + i * 0.12, duration: 0.5 }}
                  />
                  {p}
                </motion.li>
              ))}
            </ul>
          </SpotlightCard>
        </Reveal>
      ))}
    </Section>
  );
}

export function Education() {
  const listRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: listRef, offset: ["start 80%", "end 50%"] });
  const line = useSpring(scrollYProgress, { stiffness: 100, damping: 25 });

  return (
    <Section id="education" index="04" eyebrow="Education" title="Academic background">
      <ol ref={listRef} className="relative">
        <span aria-hidden="true" className="absolute top-0 bottom-0 left-0 w-px bg-line" />
        <motion.span
          aria-hidden="true"
          className="absolute top-0 bottom-0 left-0 w-px origin-top bg-gradient-to-b from-gold to-accent"
          style={{ scaleY: line }}
        />
        {education.map((e, i) => (
          <li key={e.year + e.degree} className="group relative pb-10 pl-10 last:pb-0">
            <motion.span
              className={`absolute top-1.5 -left-[6px] h-[13px] w-[13px] rounded-full border-2 border-gold ring-4 ring-bg ${
                i === 0 ? "bg-gold" : "bg-bg"
              }`}
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ type: "spring", stiffness: 300, damping: 15 }}
            />
            <Reveal delay={0.05} y={0}>
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="flex flex-col gap-1 transition-transform duration-300 group-hover:translate-x-2 sm:flex-row sm:items-baseline sm:gap-6"
              >
                <span className="w-14 shrink-0 font-serif text-lg text-gold">{e.year}</span>
                <div>
                  <h3 className="font-medium sm:text-lg">{e.degree}</h3>
                  <p className="text-sm text-muted">{e.school} · Mumbai</p>
                </div>
              </motion.div>
            </Reveal>
          </li>
        ))}
      </ol>
    </Section>
  );
}

export function Skills() {
  return (
    <div className="border-t border-line">
      <Section id="skills" index="05" eyebrow="Skills" title="What I'm good at">
        <motion.div
          className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          variants={{ show: { transition: { staggerChildren: 0.06 } } }}
        >
          {coreSkills.map((s) => (
            <motion.div
              key={s.title}
              variants={{
                hidden: { opacity: 0, y: 40, rotateX: -30 },
                show: { opacity: 1, y: 0, rotateX: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
              }}
              style={{ transformPerspective: 800 }}
            >
              <SpotlightCard tilt={10} className="h-full rounded-xl border border-line bg-surface p-5 transition-colors hover:border-gold/60">
                <h3 className="text-sm font-semibold">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{s.text}</p>
              </SpotlightCard>
            </motion.div>
          ))}
        </motion.div>

        <Reveal>
          <h3 className="mt-16 text-xs font-semibold uppercase tracking-[0.2em] text-muted">Technical</h3>
        </Reveal>
        <div className="mt-5 space-y-5">
          {techSkills.map((g) => (
            <Reveal key={g.group}>
              <div className="flex flex-col gap-3 sm:flex-row sm:gap-6">
                <span className="w-28 shrink-0 pt-1.5 text-sm font-medium">{g.group}</span>
                <motion.div
                  className="flex flex-wrap gap-2"
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true }}
                  variants={{ show: { transition: { staggerChildren: 0.04 } } }}
                >
                  {g.items.map((it) => (
                    <motion.span
                      key={it}
                      variants={{ hidden: { opacity: 0, scale: 0.6 }, show: { opacity: 1, scale: 1 } }}
                      whileHover={{ y: -3, scale: 1.06 }}
                      className="rounded-full border border-line bg-surface px-3 py-1 text-sm text-muted transition-colors hover:border-gold hover:text-gold"
                    >
                      {it}
                    </motion.span>
                  ))}
                </motion.div>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>
    </div>
  );
}
