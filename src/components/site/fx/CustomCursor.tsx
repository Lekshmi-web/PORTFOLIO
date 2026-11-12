"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useState } from "react";
import { hasFinePointer, prefersReducedMotion } from "./motion";

/**
 * Lime dot + trailing ring. The ring grows over links and shows a label over
 * elements with data-cursor="view" / "play" / any short word.
 * Mouse/trackpad only; touch and reduced-motion users keep the normal cursor.
 */
export function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const [label, setLabel] = useState<string | null>(null);
  const [hovering, setHovering] = useState(false);
  const [visible, setVisible] = useState(false);
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const ringX = useSpring(x, { stiffness: 380, damping: 32, mass: 0.6 });
  const ringY = useSpring(y, { stiffness: 380, damping: 32, mass: 0.6 });

  useEffect(() => {
    if (!hasFinePointer() || prefersReducedMotion()) return;
    setEnabled(true);
    document.documentElement.classList.add("custom-cursor");

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      x.set(e.clientX);
      y.set(e.clientY);
      setVisible(true);
      const target = e.target instanceof Element ? e.target : null;
      const labelled = target?.closest<HTMLElement>("[data-cursor]");
      setLabel(labelled?.dataset.cursor ?? null);
      setHovering(Boolean(target?.closest("a, button, [role='button'], summary, label")));
    };
    const onLeave = () => setVisible(false);

    window.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);
    return () => {
      document.documentElement.classList.remove("custom-cursor");
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
    };
  }, [x, y]);

  if (!enabled) return null;

  const size = label ? 72 : hovering ? 44 : 30;

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[90]" style={{ opacity: visible ? 1 : 0 }}>
      <motion.div
        className="absolute left-0 top-0 grid place-items-center rounded-full border font-mono text-[10px] uppercase tracking-widest transition-[width,height,background-color,border-color] duration-300"
        style={{
          x: ringX,
          y: ringY,
          width: size,
          height: size,
          marginLeft: -size / 2,
          marginTop: -size / 2,
          borderColor: label ? "transparent" : "rgb(216 241 107 / 0.6)",
          backgroundColor: label ? "var(--color-lime)" : hovering ? "rgb(216 241 107 / 0.08)" : "transparent",
          color: "var(--color-void)",
        }}
      >
        {label}
      </motion.div>
      <motion.div
        className="absolute left-0 top-0 -ml-1 -mt-1 size-2 rounded-full bg-lime"
        style={{ x, y, opacity: label ? 0 : 1 }}
      />
    </div>
  );
}
