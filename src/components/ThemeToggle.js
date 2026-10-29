"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { AnimatePresence, motion } from "framer-motion";
import { Moon, Sun } from "lucide-react";

export default function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const isDark = mounted && resolvedTheme === "dark";
  return (
    <motion.button
      type="button"
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      onClick={() => setTheme(isDark ? "light" : "dark")}
      whileTap={{ scale: 0.85 }}
      className="relative grid h-9 w-9 place-items-center overflow-hidden rounded-full border border-line text-muted transition-colors hover:border-gold hover:text-gold"
    >
      <AnimatePresence mode="wait" initial={false}>
        {mounted && (
          <motion.span
            key={isDark ? "sun" : "moon"}
            initial={{ y: 20, rotate: -90, opacity: 0 }}
            animate={{ y: 0, rotate: 0, opacity: 1 }}
            exit={{ y: -20, rotate: 90, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {isDark ? <Sun size={16} /> : <Moon size={16} />}
          </motion.span>
        )}
      </AnimatePresence>
    </motion.button>
  );
}
