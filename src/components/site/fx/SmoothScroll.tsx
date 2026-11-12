"use client";

import Lenis from "lenis";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { prefersReducedMotion } from "./motion";

/**
 * Momentum scrolling via Lenis. Other components can pause it (menus, dialogs) by
 * dispatching `window.dispatchEvent(new Event("lenis:stop" | "lenis:start"))`.
 */
export function SmoothScroll() {
  const lenisRef = useRef<Lenis | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const lenis = new Lenis({ autoRaf: true, anchors: { offset: -80 }, lerp: 0.11 });
    lenisRef.current = lenis;
    const stop = () => lenis.stop();
    const start = () => lenis.start();
    window.addEventListener("lenis:stop", stop);
    window.addEventListener("lenis:start", start);
    return () => {
      window.removeEventListener("lenis:stop", stop);
      window.removeEventListener("lenis:start", start);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  // Jump to top on page change (Next also does this; this keeps Lenis in sync).
  useEffect(() => {
    if (!window.location.hash) lenisRef.current?.scrollTo(0, { immediate: true });
  }, [pathname]);

  return null;
}
