"use client";

import { useId, useRef, useState } from "react";
import { MoveHorizontal } from "lucide-react";
import { CarArt } from "./CarArt";

export function BeforeAfterSlider({ paint = "#1f2a36", label = "Before and after comparison" }: { paint?: string; label?: string }) {
  const [pos, setPos] = useState(50);
  const ref = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);
  const id = useId().replace(/:/g, "");

  const update = (clientX: number) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const pct = ((clientX - rect.left) / rect.width) * 100;
    setPos(Math.min(100, Math.max(0, pct)));
  };

  return (
    <div
      ref={ref}
      className="relative aspect-[2/1] w-full cursor-ew-resize touch-pan-y select-none overflow-hidden rounded-3xl border border-white/10 bg-ink-2 has-[input:focus-visible]:ring-2 has-[input:focus-visible]:ring-accent"
      onPointerDown={(e) => {
        dragging.current = true;
        e.currentTarget.setPointerCapture(e.pointerId);
        update(e.clientX);
      }}
      onPointerMove={(e) => dragging.current && update(e.clientX)}
      onPointerUp={() => (dragging.current = false)}
      onPointerCancel={() => (dragging.current = false)}
    >
      <CarArt id={`${id}-a`} paint={paint} condition="after" className="absolute inset-0 h-full w-full" />
      <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
        <CarArt id={`${id}-b`} paint={paint} condition="before" className="h-full w-full" />
      </div>

      <span className="pointer-events-none absolute left-3 top-3 rounded-full bg-black/60 px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-widest text-[#fff] sm:left-5 sm:top-5 sm:text-xs">
        Before
      </span>
      <span className="pointer-events-none absolute right-3 top-3 rounded-full bg-accent px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-widest text-on-accent sm:right-5 sm:top-5 sm:text-xs">
        After
      </span>

      <div className="pointer-events-none absolute inset-y-0 w-0.5 bg-[#fff] shadow-[0_0_20px_color-mix(in_srgb,var(--color-accent)_80%,transparent)]" style={{ left: `${pos}%` }}>
        <span className="absolute left-1/2 top-1/2 grid h-11 w-11 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border-2 border-[#fff] bg-black/70 text-[#fff] backdrop-blur">
          <MoveHorizontal className="h-5 w-5" aria-hidden="true" />
        </span>
      </div>

      <input
        type="range"
        min={0}
        max={100}
        value={Math.round(pos)}
        onChange={(e) => setPos(Number(e.target.value))}
        aria-label={label}
        className="absolute inset-0 h-full w-full cursor-ew-resize opacity-0"
        // Pointer handling is done on the wrapper; the input exists for keyboard & screen readers.
        style={{ pointerEvents: "none" }}
      />
    </div>
  );
}
