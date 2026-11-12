"use client";

import { useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { prefersReducedMotion } from "./motion";

export interface TerminalLine {
  text: string;
  /** "cmd" lines are typed after a prompt; "out" lines appear instantly. */
  kind: "cmd" | "out";
  accent?: boolean;
}

/** A small terminal window that types its lines once it scrolls into view. */
export function TerminalTyping({ lines, title = "zsh — lekshmi" }: { lines: TerminalLine[]; title?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [lineIndex, setLineIndex] = useState(0);
  const [chars, setChars] = useState(0);
  const [instant, setInstant] = useState(false);

  useEffect(() => {
    if (prefersReducedMotion()) setInstant(true);
  }, []);

  useEffect(() => {
    if (!inView || instant || lineIndex >= lines.length) return;
    const line = lines[lineIndex];
    if (line.kind === "out" || chars >= line.text.length) {
      const t = setTimeout(() => {
        setLineIndex((i) => i + 1);
        setChars(0);
      }, line.kind === "out" ? 380 : 260);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => setChars((c) => c + 1), 38);
    return () => clearTimeout(t);
  }, [inView, instant, lineIndex, chars, lines]);

  const done = instant || lineIndex >= lines.length;

  return (
    <div ref={ref} className="overflow-hidden rounded-2xl border border-white/10 bg-void/80 shadow-2xl shadow-black/40 backdrop-blur">
      <div className="flex items-center gap-2 border-b border-white/10 px-4 py-3">
        <span className="size-3 rounded-full bg-coral" aria-hidden />
        <span className="size-3 rounded-full bg-lime" aria-hidden />
        <span className="size-3 rounded-full bg-lavender" aria-hidden />
        <span className="ml-3 font-mono text-[11px] text-canvas/60">{title}</span>
      </div>
      <div className="min-h-[190px] space-y-1.5 p-5 font-mono text-sm" aria-label={lines.map((l) => l.text).join(". ")} role="img">
        {lines.map((l, i) => {
          if (!done && i > lineIndex) return null;
          const shown = done || i < lineIndex ? l.text : l.kind === "cmd" ? l.text.slice(0, chars) : l.text;
          return (
            <p key={l.text} className={l.kind === "cmd" ? "text-canvas" : l.accent ? "text-lime" : "text-canvas/65"}>
              {l.kind === "cmd" && <span className="text-pink">❯ </span>}
              {shown}
              {!done && i === lineIndex && <span className="ml-0.5 inline-block h-[1em] w-[0.5em] translate-y-[0.15em] bg-lime animate-blink" />}
            </p>
          );
        })}
        {done && (
          <p className="text-canvas">
            <span className="text-pink">❯ </span>
            <span className="inline-block h-[1em] w-[0.5em] translate-y-[0.15em] bg-lime animate-blink" />
          </p>
        )}
      </div>
    </div>
  );
}
