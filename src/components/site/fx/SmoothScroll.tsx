"use client";

import Lenis from "lenis";
import { useEffect } from "react";
import { prefersReducedMotion } from "./motion";

/**
 * Momentum scrolling via Lenis. Other components can pause it (menus, dialogs) by
 * dispatching `window.dispatchEvent(new Event("lenis:stop" | "lenis:start"))`.
 * Next.js handles scroll-to-top and Back/Forward restoration; Lenis follows native scroll.
 */
export function SmoothScroll() {
  useEffect(() => {
    if (prefersReducedMotion()) return;
    const lenis = new Lenis({ autoRaf: true, anchors: { offset: -80 }, lerp: 0.11 });
    const stop = () => lenis.stop();
    const start = () => lenis.start();
    window.addEventListener("lenis:stop", stop);
    window.addEventListener("lenis:start", start);
    return () => {
      window.removeEventListener("lenis:stop", stop);
      window.removeEventListener("lenis:start", start);
      lenis.destroy();
    };
  }, []);

  return null;
}
