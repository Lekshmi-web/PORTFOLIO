"use client";

import { animate, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { prefersReducedMotion } from "./motion";

/** Counts up from 0 to `value` the first time it scrolls into view. */
export function Counter({ value, decimals = 0, suffix = "" }: { value: number; decimals?: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const [display, setDisplay] = useState(value);
  const [armed, setArmed] = useState(false);

  // Start at 0 only once we know JS is running (server HTML shows the real number).
  useEffect(() => {
    if (!prefersReducedMotion()) {
      setDisplay(0);
      setArmed(true);
    }
  }, []);

  useEffect(() => {
    if (!inView || !armed) return;
    const controls = animate(0, value, {
      duration: 1.8,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setDisplay(v),
    });
    return () => controls.stop();
  }, [inView, armed, value]);

  return (
    <span ref={ref} className="tabular-nums">
      {display.toLocaleString("en-IN", { minimumFractionDigits: decimals, maximumFractionDigits: decimals })}
      {suffix}
    </span>
  );
}
