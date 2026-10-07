"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

const SHOW_AFTER = 400; // px scrolled before the button appears
const RING = 2 * Math.PI * 22; // circumference of the progress ring (r = 22)

/** Floating button that fades in after scrolling down and smoothly returns to the top. */
export function BackToTop({ className = "" }: { className?: string }) {
  const [visible, setVisible] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setVisible(window.scrollY > SHOW_AFTER);
      setProgress(max > 0 ? Math.min(1, window.scrollY / max) : 0);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  function scrollToTop() {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
    // Move keyboard focus back to the top of the page too.
    document.getElementById("main")?.focus({ preventScroll: true });
  }

  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label="Back to top"
      title="Back to top"
      className={`fixed right-4 z-40 grid h-12 w-12 place-items-center rounded-full border border-white/15 bg-panel/90 text-white shadow-lg backdrop-blur transition-all duration-300 hover:border-accent hover:text-accent lg:right-6 ${
        visible ? "visible translate-y-0 opacity-100" : "invisible translate-y-3 opacity-0"
      } ${className}`}
    >
      <svg viewBox="0 0 48 48" className="absolute inset-0 h-full w-full -rotate-90" aria-hidden="true">
        <circle
          cx="24"
          cy="24"
          r="22"
          fill="none"
          strokeWidth="2"
          strokeLinecap="round"
          style={{ stroke: "var(--color-accent)" }}
          strokeDasharray={RING}
          strokeDashoffset={RING * (1 - progress)}
        />
      </svg>
      <ArrowUp className="relative h-5 w-5" aria-hidden="true" />
    </button>
  );
}
