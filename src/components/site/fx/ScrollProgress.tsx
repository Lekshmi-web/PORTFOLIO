"use client";

import { motion, useScroll, useSpring } from "framer-motion";

/** Thin lime bar at the very top that fills as you read the page. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 30, restDelta: 0.001 });
  return (
    <motion.div
      aria-hidden
      className="fixed inset-x-0 top-0 z-[60] h-[2px] origin-left bg-linear-to-r from-violet via-pink to-lime"
      style={{ scaleX }}
    />
  );
}
