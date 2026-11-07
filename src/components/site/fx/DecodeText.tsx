"use client";

import { useEffect, useState } from "react";

const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789<>/{}[]#$%&*+=_";

interface DecodeTextProps {
  text: string;
  /** Delay before this line starts decoding (ms). */
  delay?: number;
  /** Total decode time (ms). */
  duration?: number;
  className?: string;
}

/**
 * Text that "decrypts" from random glyphs into the real words.
 * The real text is always in the DOM (for SEO, screen readers and no layout shift);
 * the scrambled copy is drawn on top and removed when done.
 */
export function DecodeText({ text, delay = 0, duration = 1100, className = "" }: DecodeTextProps) {
  const [output, setOutput] = useState<string | null>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    let startTime = 0;
    const chars = Array.from(text);
    // Each character resolves at a slightly random moment, left to right.
    const resolveAt = chars.map((_, i) => (i / chars.length) * 0.75 + Math.random() * 0.25);

    const tick = (now: number) => {
      if (!startTime) startTime = now;
      const progress = (now - startTime - delay) / duration;
      if (progress < 0) {
        setOutput(chars.map((c) => (c === " " ? " " : GLYPHS[(Math.random() * GLYPHS.length) | 0])).join(""));
        raf = requestAnimationFrame(tick);
        return;
      }
      if (progress >= 1) {
        setOutput(null);
        return;
      }
      setOutput(
        chars
          .map((c, i) => (c === " " || progress >= resolveAt[i] ? c : GLYPHS[(Math.random() * GLYPHS.length) | 0]))
          .join(""),
      );
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [text, delay, duration]);

  return (
    <span className={`relative inline-grid ${className}`}>
      <span className={`col-start-1 row-start-1 ${output !== null ? "invisible" : ""}`}>{text}</span>
      {output !== null && (
        <span aria-hidden className="col-start-1 row-start-1 overflow-hidden whitespace-pre-wrap">
          {output}
        </span>
      )}
    </span>
  );
}
