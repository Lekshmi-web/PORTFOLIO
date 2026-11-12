"use client";

import { motion, useScroll, useSpring } from "framer-motion";
import { useRef } from "react";

/** Wraps a timeline; a glowing line grows down its left edge as you scroll through it. */
export function TimelineTrack({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 75%", "end 55%"] });
  const scaleY = useSpring(scrollYProgress, { stiffness: 120, damping: 28, restDelta: 0.001 });

  return (
    <div ref={ref} className={`relative ${className}`}>
      <motion.span
        aria-hidden
        className="absolute left-0 top-0 h-full w-[2px] -translate-x-[0.5px] origin-top bg-linear-to-b from-lime via-pink to-violet shadow-[0_0_12px_rgba(216,241,107,0.6)]"
        style={{ scaleY }}
      />
      {children}
    </div>
  );
}
