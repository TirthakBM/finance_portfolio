"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import ThemeToggle from "./ThemeToggle";
import Magnetic from "./fx/Magnetic";
import { INTRO_DELAY } from "./fx/intro";

const links = [
  { href: "#about", label: "About" },
  { href: "#expertise", label: "Expertise" },
  { href: "#experience", label: "Experience" },
  { href: "#education", label: "Education" },
  { href: "#skills", label: "Skills" },
];

export default function Navbar() {
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [active, setActive] = useState("");
  const [hovered, setHovered] = useState(null);

  // Hide when scrolling down, reveal when scrolling up
  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setScrolled(y > 12);
    setHidden(y > prev && y > 300);
  });

  // Track which section is on screen
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(`#${e.target.id}`)),
      { rootMargin: "-45% 0px -50% 0px" }
    );
    document.querySelectorAll("section[id]").forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  const pill = hovered ?? active;

  return (
    <motion.header
      initial={{ y: -80 }}
      animate={{ y: hidden ? -80 : 0 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color] duration-300 ${
        scrolled ? "border-b border-line bg-bg/75 backdrop-blur-md" : "border-b border-transparent"
      }`}
    >
      <motion.nav
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: INTRO_DELAY - 0.3 }}
        className="mx-auto flex h-16 max-w-5xl items-center justify-between px-5 sm:px-8"
      >
        <a href="#top" className="group font-serif text-lg font-semibold tracking-tight">
          Tirthak
          <span className="inline-block text-gold transition-transform duration-300 group-hover:scale-150 group-hover:rotate-12">.</span>
        </a>
        <div className="flex items-center gap-4">
          <ul className="hidden items-center text-sm text-muted md:flex" onMouseLeave={() => setHovered(null)}>
            {links.map((l) => (
              <li key={l.href} className="relative">
                <a
                  href={l.href}
                  onMouseEnter={() => setHovered(l.href)}
                  className={`relative z-10 block px-3 py-1.5 transition-colors ${pill === l.href ? "text-text" : "hover:text-text"}`}
                >
                  {l.label}
                </a>
                {pill === l.href && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 rounded-full bg-accent-soft"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </li>
            ))}
          </ul>
          <Magnetic className="hidden sm:inline-block">
            <a
              href="#contact"
              className="group relative inline-flex overflow-hidden rounded-full bg-accent px-4 py-1.5 text-sm font-medium text-bg"
            >
              <span className="absolute inset-0 translate-y-full bg-gold transition-transform duration-300 group-hover:translate-y-0" />
              <span className="relative">Connect</span>
            </a>
          </Magnetic>
          <ThemeToggle />
        </div>
      </motion.nav>
    </motion.header>
  );
}
