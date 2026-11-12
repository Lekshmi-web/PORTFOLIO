"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

/**
 * Renders children into <body> so fixed overlays aren't trapped by an ancestor's
 * transform/filter (page transitions, Reveal, .glass). Client-only.
 */
export function Portal({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return mounted ? createPortal(children, document.body) : null;
}
