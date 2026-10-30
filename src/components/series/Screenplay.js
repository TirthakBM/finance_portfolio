"use client";

import { Download } from "lucide-react";
import { resume, series } from "@/data/series";
import { FadeUp, PlayIcon, SectionTitle, scrollToId } from "./ui";

function DocHeading({ children }) {
  return (
    <h4 className="print-red mb-2 mt-5 border-b border-red/40 pb-1 text-[10px] font-black tracking-[0.3em] text-red first:mt-0">{children}</h4>
  );
}

export default function Screenplay() {
  const download = () => {
    if (series.resumeUrl) window.open(series.resumeUrl, "_blank");
    else window.print();
  };

  return (
    <section id="resume" className="relative mx-auto max-w-[1400px] scroll-mt-16 px-5 py-24 md:px-10">
      <SectionTitle kicker="The Screenplay">The Full Story</SectionTitle>

      <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_300px]">
        <FadeUp>
          <article
            id="resume-doc"
            className="rounded-md border border-white/10 bg-[#111115] p-6 shadow-[0_30px_80px_-20px_rgba(0,0,0,.8)] sm:p-9"
          >
            <header className="flex flex-col justify-between gap-3 border-b border-white/10 pb-5 sm:flex-row sm:items-end">
              <h3 className="font-display text-3xl uppercase leading-none text-white sm:text-4xl">{series.fullName}</h3>
              <div className="text-[11px] leading-relaxed text-white/55 sm:text-right">
                <p>{series.email}</p>
                <p>
                  {series.phone} · {series.location}
                </p>
              </div>
            </header>

            <div className="mt-6 grid gap-8 md:grid-cols-2">
              <div>
                <DocHeading>EDUCATION</DocHeading>
                {resume.education.map((e) => (
                  <div key={e.degree} className="mb-3">
                    <div className="flex justify-between gap-3">
                      <p className="text-sm font-bold text-white">{e.school}</p>
                      <p className="shrink-0 text-[11px] text-white/45">{e.year}</p>
                    </div>
                    <p className="text-xs text-white/60">{e.degree}</p>
                  </div>
                ))}

                <DocHeading>WORK EXPERIENCE</DocHeading>
                {resume.experience.map((x) => (
                  <div key={x.company}>
                    <div className="flex justify-between gap-3">
                      <p className="text-sm font-bold text-white">
                        {x.company} — {x.role}
                      </p>
                      <p className="shrink-0 text-[11px] text-white/45">{x.period}</p>
                    </div>
                    <ul className="mt-2 space-y-1.5">
                      {x.points.map((p) => (
                        <li key={p} className="flex gap-2 text-xs leading-relaxed text-white/65">
                          <span className="print-red mt-1.5 h-1 w-1 shrink-0 rounded-full bg-red" />
                          {p}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}

                <DocHeading>PROJECTS</DocHeading>
                {resume.projects.map((p) => (
                  <div key={p.name} className="mb-2.5 flex justify-between gap-3">
                    <div>
                      <p className="text-sm font-bold text-white">{p.name}</p>
                      <p className="text-[11px] text-white/50">{p.stack}</p>
                    </div>
                    <p className="text-[11px] text-white/45">{p.year}</p>
                  </div>
                ))}
              </div>

              <div>
                <DocHeading>SKILLS</DocHeading>
                <dl className="space-y-1.5">
                  {resume.skills.map((s) => (
                    <div key={s.label} className="text-xs leading-relaxed">
                      <dt className="inline font-bold text-white">{s.label}: </dt>
                      <dd className="inline text-white/60">{s.value}</dd>
                    </div>
                  ))}
                </dl>

                <DocHeading>ACHIEVEMENTS</DocHeading>
                {resume.achievements.map((a) => (
                  <p key={a.title} className="mb-2 text-xs leading-relaxed text-white/60">
                    <span className="font-bold text-white">{a.title}</span> — {a.text}
                  </p>
                ))}

                <DocHeading>CERTIFICATIONS</DocHeading>
                <p className="text-xs leading-relaxed text-white/60">
                  <span className="font-bold text-white">Imarticus Learning (CIBOP): </span>
                  {resume.certifications.join(", ")}.
                </p>
              </div>
            </div>
          </article>
        </FadeUp>

        <aside className="lg:sticky lg:top-24 lg:self-start">
          <FadeUp delay={0.15} className="rounded-md border border-white/10 bg-[#111115]/80 p-6 backdrop-blur">
            <p className="font-serif text-2xl italic leading-tight text-white">Every episode, on one page.</p>
            <p className="mt-3 text-sm leading-relaxed text-white/60">
              Education, training, experience and certifications — view it here or take a copy with you.
            </p>
            <button
              onClick={() => scrollToId("resume-doc")}
              className="mt-6 flex w-full items-center justify-center gap-2 rounded bg-cream py-2.5 text-sm font-semibold text-black transition hover:brightness-95"
            >
              <PlayIcon className="h-3.5 w-3.5" /> View Resume
            </button>
            <button
              onClick={download}
              className="mt-2 flex w-full items-center justify-center gap-2 rounded border border-white/15 bg-white/5 py-2.5 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              <Download className="h-4 w-4" /> Download Resume
            </button>
            <div className="mt-6 grid grid-cols-3 border-t border-white/10 pt-5 text-center">
              {series.stats.map((s) => (
                <div key={s.label}>
                  <p className="font-display text-2xl text-white">{s.value}</p>
                  <p className="text-[9px] font-bold tracking-[0.2em] text-white/45">{s.label}</p>
                </div>
              ))}
            </div>
          </FadeUp>
        </aside>
      </div>
    </section>
  );
}
