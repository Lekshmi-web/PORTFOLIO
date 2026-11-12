"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { hasFinePointer, prefersReducedMotion } from "./motion";

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  /** Maximum tilt in degrees. */
  max?: number;
}

/** Leans toward the cursor in 3D. Mouse only; static for touch and reduced motion. */
export function TiltCard({ children, className = "", max = 7 }: TiltCardProps) {
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const rotateX = useSpring(useTransform(py, [0, 1], [max, -max]), { stiffness: 220, damping: 20 });
  const rotateY = useSpring(useTransform(px, [0, 1], [-max, max]), { stiffness: 220, damping: 20 });

  function onMove(e: React.PointerEvent<HTMLDivElement>) {
    if (e.pointerType !== "mouse" || !hasFinePointer() || prefersReducedMotion()) return;
    const r = e.currentTarget.getBoundingClientRect();
    px.set((e.clientX - r.left) / r.width);
    py.set((e.clientY - r.top) / r.height);
  }
  function reset() {
    px.set(0.5);
    py.set(0.5);
  }

  return (
    <div className={`[perspective:1100px] ${className}`}>
      <motion.div
        className="h-full [transform-style:preserve-3d]"
        style={{ rotateX, rotateY }}
        onPointerMove={onMove}
        onPointerLeave={reset}
      >
        {children}
      </motion.div>
    </div>
  );
}
