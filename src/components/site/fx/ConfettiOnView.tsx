"use client";

import { useInView } from "framer-motion";
import { useEffect, useRef } from "react";
import { burst, originOf } from "./confetti";

/** Fires one confetti burst the first time its children scroll into view (once per visit). */
export function ConfettiOnView({ children, id, className = "" }: { children: React.ReactNode; id: string; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });

  useEffect(() => {
    if (!inView || !ref.current) return;
    const key = `lk-confetti-${id}`;
    try {
      if (sessionStorage.getItem(key)) return;
      sessionStorage.setItem(key, "1");
    } catch {
      // Storage blocked — burst anyway.
    }
    void burst(originOf(ref.current));
  }, [inView, id]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
