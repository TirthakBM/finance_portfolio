"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { profiles } from "@/data/series";
import { SeriesContext, SmoothScroll, scrollToTop } from "./ui";
import Intro from "./Intro";
import ProfileGate from "./ProfileGate";
import Navbar from "./Navbar";
import Billboard from "./Billboard";
import Screenplay from "./Screenplay";
import Moments from "./Moments";
import SkillUniverse from "./SkillUniverse";
import Originals from "./Originals";
import Pilot from "./Pilot";
import Journey from "./Journey";
import TopPicks from "./TopPicks";
import Finale from "./Finale";
import Cursor from "./Cursor";

const SECTIONS = {
  resume: Screenplay,
  moments: Moments,
  skills: SkillUniverse,
  originals: Originals,
  about: Pilot,
  journey: Journey,
  picks: TopPicks,
};

const STORE = "series-progress";

export default function SeriesApp() {
  const [stage, setStage] = useState("intro"); // intro → gate → home
  const [profileId, setProfileId] = useState("main");
  const [toast, setToast] = useState(null);
  const [progress, setProgress] = useState({});
  const [active, setActive] = useState("home");
  const toastTimer = useRef(null);

  const profile = profiles.find((p) => p.id === profileId);
  const order = profile.order;

  useEffect(() => {
    history.scrollRestoration = "manual";
    try {
      setProgress(JSON.parse(localStorage.getItem(STORE)) || {});
    } catch {}
  }, []);

  const choose = useCallback((id) => {
    const p = profiles.find((x) => x.id === id);
    setProfileId(id);
    setStage("home");
    scrollToTop(true);
    clearTimeout(toastTimer.current);
    setToast(`Now watching as ${p.name} — ${p.desc.charAt(0).toLowerCase()}${p.desc.slice(1)}`);
    toastTimer.current = setTimeout(() => setToast(null), 3800);
  }, []);

  // Track how far each section has been "watched" and which one is on screen.
  useEffect(() => {
    if (stage !== "home") return;
    let raf = 0;
    const measure = () => {
      raf = 0;
      const vh = window.innerHeight;
      let current = "home";
      setProgress((prev) => {
        let next = prev;
        for (const k of order) {
          const el = document.getElementById(k);
          if (!el) continue;
          const r = el.getBoundingClientRect();
          if (r.top < vh * 0.4) current = k;
          const p = Math.min(1, Math.max(0, (vh * 0.75 - r.top) / r.height));
          if (p - (prev[k] || 0) > 0.02 || (p === 1 && prev[k] !== 1)) {
            if (next === prev) next = { ...prev };
            next[k] = p;
          }
        }
        if (next !== prev) localStorage.setItem(STORE, JSON.stringify(next));
        return next;
      });
      if (document.getElementById("finale")?.getBoundingClientRect().top < vh * 0.4) current = "finale";
      setActive(current);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(measure);
    };
    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, [stage, order]);

  const ctx = useMemo(
    () => ({
      profile,
      order,
      progress,
      active,
      choose,
      openGate: () => setStage("gate"),
      replayIntro: () => setStage("intro"),
    }),
    [profile, order, progress, active, choose]
  );

  return (
    <SeriesContext.Provider value={ctx}>
      <div className="grain">
        <Cursor />
        <AnimatePresence mode="wait">
          {stage === "intro" && <Intro key="intro" onDone={() => setStage("gate")} />}
          {stage === "gate" && <ProfileGate key="gate" current={profileId} onChoose={choose} />}
        </AnimatePresence>

        {stage === "home" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }} className="overflow-x-clip">
            <SmoothScroll />
            <Navbar />
            <main>
              <Billboard />
              {order.map((k) => {
                const Section = SECTIONS[k];
                return <Section key={k} />;
              })}
              <Finale />
            </main>
          </motion.div>
        )}

        <AnimatePresence>
          {toast && (
            <motion.div
              key={toast}
              className="fixed bottom-6 left-1/2 z-[70] w-max max-w-[90vw] -translate-x-1/2 rounded-md border border-white/15 bg-[#1b1b21]/95 px-4 py-2.5 text-center text-xs text-white shadow-2xl backdrop-blur"
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10 }}
            >
              {toast}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </SeriesContext.Provider>
  );
}
