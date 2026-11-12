"use client";

import { MotionConfig } from "framer-motion";

/** Framer Motion follows the visitor's "reduce motion" setting everywhere on the site. */
export function MotionProvider({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
