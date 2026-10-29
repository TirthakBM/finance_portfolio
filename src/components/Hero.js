"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";
import { ArrowDown, MapPin, ShieldCheck, TrendingUp, Repeat } from "lucide-react";
import { profile, stats, roles } from "@/data/profile";
import SplitText from "./fx/SplitText";
import RotatingText from "./fx/RotatingText";
import Magnetic from "./fx/Magnetic";
import Counter from "./fx/Counter";
import { INTRO_DELAY } from "./fx/intro";

const ease = [0.22, 1, 0.36, 1];

const badges = [
  { icon: TrendingUp, text: "Equity Markets", pos: "-left-6 top-10 sm:-left-12", delay: 0 },
  { icon: ShieldCheck, text: "AML / KYC", pos: "-right-4 top-1/2 sm:-right-10", delay: 1.2 },
  { icon: Repeat, text: "T+1 Settlement", pos: "-left-4 bottom-12 sm:-left-10", delay: 2.4 },
];

export default function Hero() {
  const reduce = useReducedMotion();
  const sectionRef = useRef(null);
  const photoRef = useRef(null);

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end start"] });
  const textY = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const photoY = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const fadeOut = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const rx = useSpring(useMotionValue(0), { stiffness: 150, damping: 15 });
  const ry = useSpring(useMotionValue(0), { stiffness: 150, damping: 15 });
  const tilt = (e) => {
    const r = photoRef.current.getBoundingClientRect();
    ry.set(((e.clientX - r.left) / r.width - 0.5) * 18);
    rx.set(-((e.clientY - r.top) / r.height - 0.5) * 18);
  };
  const untilt = () => {
    rx.set(0);
    ry.set(0);
  };

  const fade = (delay) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 20, filter: "blur(6px)" },
          animate: { opacity: 1, y: 0, filter: "blur(0px)" },
          transition: { duration: 0.8, delay: INTRO_DELAY + delay, ease },
        };

  return (
    <section ref={sectionRef} id="top" className="relative overflow-hidden pt-28 pb-16 sm:pt-36 sm:pb-20">
      {/* Background: grid + drifting colour blobs */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="grid-bg absolute inset-0" />
        <div className="animate-blob absolute -top-20 -left-20 h-96 w-96 rounded-full bg-gold/20 blur-3xl" />
        <div className="animate-blob absolute top-40 right-0 h-[28rem] w-[28rem] rounded-full bg-accent/15 blur-3xl [animation-delay:-6s]" />
        <div className="animate-blob absolute bottom-0 left-1/3 h-72 w-72 rounded-full bg-gold/10 blur-3xl [animation-delay:-12s]" />
      </div>

      <div className="mx-auto grid max-w-5xl items-center gap-14 px-5 sm:px-8 md:grid-cols-[1.3fr_1fr]">
        <motion.div style={reduce ? {} : { y: textY, opacity: fadeOut }} className="order-2 md:order-1">
          <motion.p {...fade(0)} className="inline-flex items-center gap-2 rounded-full border border-line bg-surface/60 px-3 py-1 text-xs text-muted backdrop-blur">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-gold opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-gold" />
            </span>
            Open to IB Operations roles
          </motion.p>

          <h1 className="mt-6 font-serif text-5xl leading-[1.05] font-medium sm:text-6xl lg:text-7xl">
            <SplitText text="Hi, I'm Tirthak" delay={INTRO_DELAY + 0.1} className="block" />
            <SplitText text="Majalkar." delay={INTRO_DELAY + 0.5} className="text-shine animate-shine block" />
          </h1>

          <motion.p {...fade(0.7)} className="mt-5 flex flex-wrap items-center gap-x-2 text-sm font-semibold uppercase tracking-[0.18em] text-muted">
            Focused on <RotatingText words={roles} className="text-gold" />
          </motion.p>

          <motion.p {...fade(0.85)} className="mt-6 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
            {profile.intro}
          </motion.p>

          <motion.div {...fade(1)} className="mt-8 flex flex-wrap items-center gap-3">
            <Magnetic>
              <a
                href="#contact"
                className="group relative inline-flex overflow-hidden rounded-full bg-accent px-7 py-3.5 text-sm font-medium text-bg"
              >
                <span className="absolute inset-0 translate-y-full rounded-full bg-gold transition-transform duration-500 ease-out group-hover:translate-y-0" />
                <span className="relative">Get in touch</span>
              </a>
            </Magnetic>
            <Magnetic>
              <a
                href="#about"
                className="inline-flex items-center gap-2 rounded-full border border-line bg-surface/50 px-7 py-3.5 text-sm font-medium backdrop-blur transition-colors hover:border-gold hover:text-gold"
              >
                Learn more <ArrowDown size={15} className="animate-bounce" />
              </a>
            </Magnetic>
          </motion.div>

          <motion.p {...fade(1.1)} className="mt-8 inline-flex items-center gap-1.5 text-sm text-muted">
            <MapPin size={14} /> {profile.location}
          </motion.p>
        </motion.div>

        <motion.div
          style={reduce ? {} : { y: photoY }}
          className="order-1 mx-auto w-full max-w-[280px] md:order-2 md:max-w-none"
        >
          <motion.div
            initial={reduce ? false : { opacity: 0, scale: 0.85, rotate: -4 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 1.1, delay: INTRO_DELAY - 0.2, ease }}
            className="relative"
          >
            <motion.div
              ref={photoRef}
              onPointerMove={tilt}
              onPointerLeave={untilt}
              data-cursor="Hello!"
              style={{ rotateX: rx, rotateY: ry, transformPerspective: 1000 }}
              className="relative"
            >
              <motion.div
                aria-hidden="true"
                className="absolute -inset-3 -z-10 rounded-[2rem] border border-gold/60"
                initial={reduce ? false : { x: 0, y: 0 }}
                animate={{ x: 16, y: 16 }}
                transition={{ duration: 1, delay: INTRO_DELAY + 0.5, ease }}
              />
              <div className="overflow-hidden rounded-[2rem] bg-surface shadow-2xl shadow-accent/20">
                <motion.div
                  initial={reduce ? false : { clipPath: "inset(100% 0 0 0)" }}
                  animate={{ clipPath: "inset(0% 0 0 0)" }}
                  transition={{ duration: 1.2, delay: INTRO_DELAY - 0.1, ease: [0.76, 0, 0.24, 1] }}
                >
                  <Image
                    src={profile.photo}
                    alt={profile.name}
                    width={1086}
                    height={1448}
                    priority
                    className="aspect-[4/5] h-auto w-full object-cover object-top transition-transform duration-700 hover:scale-105"
                  />
                </motion.div>
              </div>
            </motion.div>

            {badges.map((b, i) => (
              <motion.div
                key={b.text}
                initial={reduce ? false : { opacity: 0, scale: 0.6 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: INTRO_DELAY + 0.9 + i * 0.15, type: "spring", stiffness: 200, damping: 14 }}
                className={`absolute ${b.pos} hidden sm:block`}
              >
                <div
                  className="animate-float flex items-center gap-2 rounded-xl border border-line bg-surface/90 px-3 py-2 text-xs font-medium shadow-lg shadow-black/5 backdrop-blur"
                  style={{ animationDelay: `${b.delay}s` }}
                >
                  <b.icon size={14} className="text-gold" />
                  {b.text}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      <div className="mx-auto mt-16 max-w-5xl px-5 sm:px-8">
        <motion.dl {...fade(1.2)} className="grid grid-cols-3 divide-x divide-line rounded-2xl border border-line bg-surface/70 backdrop-blur">
          {stats.map((s) => (
            <div key={s.label} className="px-3 py-5 text-center sm:px-6">
              <dt className="font-serif text-2xl font-medium text-accent sm:text-4xl">
                <Counter to={s.value} from={s.from} suffix={s.suffix} delay={INTRO_DELAY + 1.2} />
              </dt>
              <dd className="mt-1 text-xs text-muted sm:text-sm">{s.label}</dd>
            </div>
          ))}
        </motion.dl>
      </div>

      <motion.a
        href="#about"
        aria-label="Scroll down"
        {...fade(1.4)}
        className="mx-auto mt-12 hidden h-10 w-6 justify-center rounded-full border-2 border-muted/40 pt-2 sm:flex"
      >
        <motion.span
          className="h-2 w-1 rounded-full bg-gold"
          animate={{ y: [0, 12, 0], opacity: [1, 0.2, 1] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.a>
    </section>
  );
}
