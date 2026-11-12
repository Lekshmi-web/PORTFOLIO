"use client";

import { AnimatePresence, LayoutGroup, motion } from "framer-motion";
import Link from "next/link";
import { useMemo, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/lib/types";
import { SampleTag } from "./SampleTag";
import { SmartImage } from "./SmartImage";

/** Filter chips (from the projects' own tech tags) with cards that smoothly rearrange. */
export function ProjectExplorer({ projects }: { projects: Project[] }) {
  const [filter, setFilter] = useState("All");

  const filters = useMemo(() => {
    const counts = new Map<string, number>();
    for (const p of projects) for (const t of p.tech) counts.set(t, (counts.get(t) ?? 0) + 1);
    const top = Array.from(counts.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 8)
      .map(([t]) => t);
    return ["All", ...top];
  }, [projects]);

  const shown = filter === "All" ? projects : projects.filter((p) => p.tech.includes(filter));

  return (
    <LayoutGroup>
      {filters.length > 2 && (
        <div role="group" aria-label="Filter projects by technology" className="mb-8 flex flex-wrap gap-2">
          {filters.map((f) => {
            const active = f === filter;
            return (
              <button
                key={f}
                type="button"
                aria-pressed={active}
                onClick={() => setFilter(f)}
                className={`relative rounded-full px-4 py-2 font-mono text-xs transition-colors ${
                  active ? "text-void" : "border border-white/12 text-canvas/75 hover:border-lime/50 hover:text-canvas"
                }`}
              >
                {active && (
                  <motion.span
                    layoutId="project-filter-pill"
                    className="absolute inset-0 -z-0 rounded-full bg-lime"
                    transition={{ type: "spring", stiffness: 420, damping: 34 }}
                  />
                )}
                <span className="relative">{f}</span>
              </button>
            );
          })}
        </div>
      )}

      <p className="sr-only" aria-live="polite">
        Showing {shown.length} project{shown.length === 1 ? "" : "s"}
      </p>

      <motion.ul layout className="grid gap-4 md:grid-cols-2">
        <AnimatePresence mode="popLayout">
          {shown.map((p, i) => {
            const lead = i === 0 && filter === "All";
            return (
              <motion.li
                key={p.id}
                layout
                initial={{ opacity: 0, scale: 0.96, y: 16 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className={lead ? "md:col-span-2" : ""}
              >
                <Link
                  href={`/projects/${p.slug}`}
                  data-cursor="view"
                  className={`group spotlight glass grid h-full overflow-hidden transition-colors duration-500 hover:border-white/20 ${
                    lead ? "md:grid-cols-[1.3fr_1fr]" : ""
                  }`}
                >
                  <div className={`relative overflow-hidden bg-night ${lead ? "aspect-[16/10] md:aspect-auto md:min-h-[360px]" : "aspect-[16/10]"}`}>
                    {p.image_url && (
                      <SmartImage
                        src={p.image_url}
                        alt={`${p.title} preview`}
                        fill
                        sizes="(min-width: 768px) 50vw, 100vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-[1.05]"
                      />
                    )}
                  </div>
                  <div className="flex flex-col p-6 md:p-8">
                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-2 font-mono text-xs text-canvas/60">
                        {String(projects.indexOf(p) + 1).padStart(2, "0")} <SampleTag show={p.is_sample} />
                      </span>
                      <ArrowUpRight aria-hidden className="size-5 text-canvas/50 transition-all group-hover:rotate-45 group-hover:text-lime" />
                    </div>
                    <h2 className={`heading mt-6 group-hover:text-lime ${lead ? "text-3xl md:text-4xl" : "text-2xl"}`}>{p.title}</h2>
                    {p.summary && <p className="mt-3 text-canvas/70">{p.summary}</p>}
                    {p.tech.length > 0 && (
                      <ul className="mt-auto flex flex-wrap gap-1.5 pt-6">
                        {p.tech.map((t) => (
                          <li key={t} className={`chip ${t === filter ? "border-lime/60 text-lime" : ""}`}>
                            {t}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </Link>
              </motion.li>
            );
          })}
        </AnimatePresence>
      </motion.ul>
    </LayoutGroup>
  );
}
