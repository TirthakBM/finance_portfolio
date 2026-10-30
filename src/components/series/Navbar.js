"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Menu, X, RotateCcw, Users } from "lucide-react";
import { episodes, profiles } from "@/data/series";
import { Logo, scrollToId, scrollToTop, useSeries } from "./ui";
import { ProfileTile } from "./ProfileGate";

export default function Navbar() {
  const { profile, order, active, choose, openGate, replayIntro } = useSeries();
  const [scrolled, setScrolled] = useState(false);
  const [menu, setMenu] = useState(false);
  const [mobile, setMobile] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [{ id: "home", label: "Home" }, ...order.map((k) => ({ id: k, label: episodes[k].nav }))];
  const go = (id) => {
    setMobile(false);
    id === "home" ? scrollToTop() : scrollToId(id);
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-colors duration-500 ${
        scrolled ? "bg-[#0a0a0d]/90 backdrop-blur-md" : "bg-gradient-to-b from-black/80 to-transparent"
      }`}
    >
      <nav className="mx-auto flex h-16 max-w-[1400px] items-center gap-8 px-5 md:px-10">
        <button onClick={() => go("home")} className="text-lg" aria-label="Home">
          <Logo />
        </button>

        <motion.ul layout className="hidden items-center gap-5 lg:flex">
          {links.map((l) => (
            <motion.li layout key={l.id} transition={{ type: "spring", stiffness: 300, damping: 30 }}>
              <button
                onClick={() => go(l.id)}
                className={`relative py-1 text-[13px] transition ${active === l.id ? "font-semibold text-white" : "text-white/65 hover:text-white"}`}
              >
                {l.label}
                {active === l.id && (
                  <motion.span layoutId="nav-underline" className="absolute -bottom-1 left-0 right-0 h-[2px] rounded bg-red" />
                )}
              </button>
            </motion.li>
          ))}
        </motion.ul>

        <div className="ml-auto flex items-center gap-3">
          <button
            onClick={() => scrollToId("finale")}
            className="hidden rounded-full border border-white/25 px-4 py-1.5 text-[10px] font-bold tracking-[0.2em] text-white/90 transition hover:border-red hover:bg-red sm:block"
          >
            LET&apos;S BUILD
          </button>

          <div className="relative" onMouseLeave={() => setMenu(false)}>
            <button
              onClick={() => setMenu((m) => !m)}
              onMouseEnter={() => setMenu(true)}
              className="flex items-center gap-1"
              aria-label="Switch profile"
            >
              <ProfileTile p={profile} size="h-8 w-8" glyphSize="text-sm" />
              <ChevronDown className={`h-4 w-4 text-white/70 transition ${menu ? "rotate-180" : ""}`} />
            </button>
            <AnimatePresence>
              {menu && (
                <motion.div
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  className="absolute right-0 top-full w-60 pt-3"
                >
                  <div className="rounded-md border border-white/10 bg-black/95 p-2 shadow-2xl">
                    {profiles.map((p) => (
                      <button
                        key={p.id}
                        onClick={() => {
                          setMenu(false);
                          choose(p.id);
                        }}
                        className={`flex w-full items-center gap-3 rounded px-2 py-2 text-left text-sm transition hover:bg-white/10 ${
                          p.id === profile.id ? "text-white" : "text-white/70"
                        }`}
                      >
                        <ProfileTile p={p} size="h-7 w-7" glyphSize="text-xs" />
                        <span className="flex-1">{p.name}</span>
                        {p.id === profile.id && <span className="h-1.5 w-1.5 rounded-full bg-red" />}
                      </button>
                    ))}
                    <div className="my-2 h-px bg-white/10" />
                    <button onClick={openGate} className="flex w-full items-center gap-3 rounded px-2 py-2 text-sm text-white/70 hover:bg-white/10 hover:text-white">
                      <Users className="h-4 w-4" /> Manage profiles
                    </button>
                    <button onClick={replayIntro} className="flex w-full items-center gap-3 rounded px-2 py-2 text-sm text-white/70 hover:bg-white/10 hover:text-white">
                      <RotateCcw className="h-4 w-4" /> Replay opening
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <button onClick={() => setMobile(true)} className="text-white lg:hidden" aria-label="Open menu">
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {mobile && (
          <motion.div
            className="fixed inset-0 z-50 flex flex-col bg-[#0a0a0d]/98 px-6 py-5 backdrop-blur lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="flex items-center justify-between">
              <Logo className="text-lg" />
              <button onClick={() => setMobile(false)} aria-label="Close menu">
                <X className="h-6 w-6" />
              </button>
            </div>
            <ul className="mt-10 flex flex-col gap-1">
              {links.map((l, i) => (
                <motion.li key={l.id} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.04 }}>
                  <button
                    onClick={() => go(l.id)}
                    className={`font-display text-4xl uppercase ${active === l.id ? "text-red" : "text-white/85"}`}
                  >
                    {l.label}
                  </button>
                </motion.li>
              ))}
            </ul>
            <button
              onClick={() => go("finale")}
              className="mt-auto rounded-full bg-red py-3 text-xs font-bold tracking-[0.2em] text-white"
            >
              LET&apos;S BUILD
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
