"use client";

import { useRef, useState } from "react";
import { prefersReducedMotion } from "./motion";

const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ<>/{}[]#$%&*+=_";

/** Text that briefly scrambles and re-decodes when hovered or focused. */
export function ScrambleText({ text, className = "" }: { text: string; className?: string }) {
  const [shown, setShown] = useState(text);
  const frame = useRef(0);

  function run() {
    if (prefersReducedMotion()) return;
    cancelAnimationFrame(frame.current);
    const start = performance.now();
    const duration = 600;
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / duration);
      setShown(
        Array.from(text)
          .map((c, i) => (c === " " || i / text.length < p ? c : GLYPHS[(Math.random() * GLYPHS.length) | 0]))
          .join(""),
      );
      if (p < 1) frame.current = requestAnimationFrame(tick);
    };
    frame.current = requestAnimationFrame(tick);
  }

  return (
    <span className={className} onPointerEnter={run} onFocus={run}>
      <span className="sr-only">{text}</span>
      <span aria-hidden>{shown}</span>
    </span>
  );
}
