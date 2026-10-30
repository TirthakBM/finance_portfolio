"use client";

import { useEffect, useRef, useState } from "react";
import { PlayIcon } from "./ui";

// White ring that becomes a red play button over [data-cursor="play"] elements.
export default function Cursor() {
  const ref = useRef(null);
  const [enabled, setEnabled] = useState(false);
  const [mode, setMode] = useState("default");

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    setEnabled(true);
    document.documentElement.classList.add("custom-cursor");

    const pos = { x: innerWidth / 2, y: innerHeight / 2 };
    const cur = { ...pos };
    let id;
    const move = (e) => {
      pos.x = e.clientX;
      pos.y = e.clientY;
      const t = e.target.closest?.('[data-cursor="play"], a, button');
      setMode(!t ? "default" : t.dataset.cursor === "play" ? "play" : "link");
    };
    const tick = () => {
      cur.x += (pos.x - cur.x) * 0.22;
      cur.y += (pos.y - cur.y) * 0.22;
      if (ref.current) ref.current.style.transform = `translate3d(${cur.x}px, ${cur.y}px, 0)`;
      id = requestAnimationFrame(tick);
    };
    window.addEventListener("mousemove", move);
    id = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener("mousemove", move);
      cancelAnimationFrame(id);
      document.documentElement.classList.remove("custom-cursor");
    };
  }, []);

  if (!enabled) return null;

  const size = mode === "play" ? 44 : mode === "link" ? 30 : 18;
  return (
    <div ref={ref} className="pointer-events-none fixed left-0 top-0 z-[100]" aria-hidden>
      <div
        className={`grid -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full transition-all duration-200 ease-out ${
          mode === "play"
            ? "bg-red text-white shadow-[0_0_24px_rgba(229,9,20,.7)]"
            : mode === "link"
              ? "border-2 border-white/80 bg-white/10"
              : "border-2 border-white/80"
        }`}
        style={{ width: size, height: size }}
      >
        {mode === "play" && <PlayIcon className="h-3.5 w-3.5 translate-x-[1px]" />}
      </div>
    </div>
  );
}
