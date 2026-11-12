"use client";

import { useEffect } from "react";

/** Remembers the boot intro for this session and lets visitors skip it. */
export function BootSkip({ storageKey }: { storageKey: string }) {
  useEffect(() => {
    try {
      sessionStorage.setItem(storageKey, "1");
    } catch {
      // Storage blocked — the intro just plays again next time.
    }
    const boot = document.getElementById("boot");
    const skip = () => boot?.setAttribute("data-skip", "1");
    window.addEventListener("keydown", skip, { once: true });
    boot?.addEventListener("pointerdown", skip, { once: true });
    // Mark as booted once the intro is over so later client navigations skip boot delays.
    const done = window.setTimeout(() => document.documentElement.setAttribute("data-booted", "1"), 2500);
    return () => {
      window.removeEventListener("keydown", skip);
      boot?.removeEventListener("pointerdown", skip);
      window.clearTimeout(done);
    };
  }, [storageKey]);
  return null;
}
