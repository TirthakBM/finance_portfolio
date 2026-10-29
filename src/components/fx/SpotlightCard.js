"use client";

import { useRef } from "react";
import { motion, useMotionTemplate, useMotionValue, useSpring } from "framer-motion";

// Card with a gold glow that follows the pointer and an optional 3D tilt.
export default function SpotlightCard({ children, className = "", tilt = 6, as = "div", ...rest }) {
  const ref = useRef(null);
  const mx = useMotionValue(-300);
  const my = useMotionValue(-300);
  const rx = useSpring(0, { stiffness: 180, damping: 18 });
  const ry = useSpring(0, { stiffness: 180, damping: 18 });
  const glow = useMotionTemplate`radial-gradient(320px circle at ${mx}px ${my}px, color-mix(in srgb, var(--gold) 18%, transparent), transparent 70%)`;

  const move = (e) => {
    const r = ref.current.getBoundingClientRect();
    const px = e.clientX - r.left;
    const py = e.clientY - r.top;
    mx.set(px);
    my.set(py);
    ry.set((px / r.width - 0.5) * tilt * 2);
    rx.set(-(py / r.height - 0.5) * tilt * 2);
  };
  const leave = () => {
    mx.set(-300);
    my.set(-300);
    rx.set(0);
    ry.set(0);
  };

  const Comp = motion[as];

  return (
    <Comp
      ref={ref}
      onPointerMove={move}
      onPointerLeave={leave}
      style={{ rotateX: rx, rotateY: ry, transformPerspective: 900 }}
      className={`relative overflow-hidden ${className}`}
      {...rest}
    >
      <motion.div aria-hidden="true" className="pointer-events-none absolute inset-0" style={{ background: glow }} />
      <div className="relative h-full">{children}</div>
    </Comp>
  );
}
