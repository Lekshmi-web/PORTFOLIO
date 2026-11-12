"use client";

import { motion, useScroll } from "framer-motion";
import { useEffect, useState } from "react";

/** Sticky "on this page" list that highlights the section in view, with a reading-progress bar. */
export function ScrollSpy({ items }: { items: { id: string; label: string }[] }) {
  const [active, setActive] = useState(items[0]?.id ?? "");
  const { scrollYProgress } = useScroll();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-20% 0px -60% 0px" },
    );
    items.forEach((i) => {
      const el = document.getElementById(i.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [items]);

  if (items.length < 2) return null;

  return (
    <nav aria-label="On this page" className="glass p-5">
      <p className="mono-label mb-3 text-canvas/60">on this page</p>
      <div className="mb-4 h-px w-full bg-white/10">
        <motion.div className="h-full origin-left bg-lime" style={{ scaleX: scrollYProgress }} />
      </div>
      <ul className="space-y-1">
        {items.map((i) => (
          <li key={i.id}>
            <a
              href={`#${i.id}`}
              aria-current={active === i.id ? "true" : undefined}
              className={`flex items-center gap-2 rounded-lg px-2 py-1.5 font-mono text-xs transition-colors ${
                active === i.id ? "bg-white/[0.06] text-lime" : "text-canvas/65 hover:text-canvas"
              }`}
            >
              <span aria-hidden className={`size-1.5 rounded-full ${active === i.id ? "bg-lime" : "bg-white/20"}`} />
              {i.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
