"use client";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import type { Workshop } from "@/lib/types";
import { formatDate } from "@/lib/format";
import { SampleTag } from "./SampleTag";
import { SmartImage } from "./SmartImage";

type Tab = "all" | "upcoming" | "past";

function isUpcoming(w: Workshop, today: string) {
  return Boolean(w.event_date && w.event_date.slice(0, 10) >= today);
}

/** All / Upcoming / Past tabs with a sliding indicator and animated list. */
export function WorkshopExplorer({ workshops, today }: { workshops: Workshop[]; today: string }) {
  const [tab, setTab] = useState<Tab>("all");
  const dated = workshops.some((w) => w.event_date);

  const shown = workshops.filter((w) =>
    tab === "all" ? true : tab === "upcoming" ? isUpcoming(w, today) : Boolean(w.event_date) && !isUpcoming(w, today),
  );
  const tabs: { id: Tab; label: string }[] = [
    { id: "all", label: "All" },
    { id: "upcoming", label: "Upcoming" },
    { id: "past", label: "Past" },
  ];

  return (
    <>
      {dated && (
        <div role="tablist" aria-label="Filter workshops" className="mb-8 inline-flex rounded-full border border-white/10 bg-white/[0.03] p-1">
          {tabs.map((t) => (
            <button
              key={t.id}
              role="tab"
              type="button"
              aria-selected={tab === t.id}
              onClick={() => setTab(t.id)}
              className={`relative rounded-full px-5 py-2 font-mono text-xs transition-colors ${tab === t.id ? "text-void" : "text-canvas/70 hover:text-canvas"}`}
            >
              {tab === t.id && (
                <motion.span
                  layoutId="workshop-tab"
                  className="absolute inset-0 rounded-full bg-lime"
                  transition={{ type: "spring", stiffness: 420, damping: 34 }}
                />
              )}
              <span className="relative">{t.label}</span>
            </button>
          ))}
        </div>
      )}

      <div role={dated ? "tabpanel" : undefined}>
      <ul className="relative space-y-4">
        <AnimatePresence mode="popLayout" initial={false}>
          {shown.length === 0 && (
            <motion.li key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="glass p-8 text-center font-mono text-sm text-canvas/65">
              {tab === "upcoming" ? "// no upcoming workshops yet — get in touch to book one" : "// nothing here yet"}
            </motion.li>
          )}
          {shown.map((w, i) => (
            <motion.li
              key={w.id}
              layout
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.35, delay: i * 0.04, ease: [0.22, 1, 0.36, 1] }}
            >
              <Link
                href={`/workshops/${w.slug}`}
                data-cursor="view"
                className="group spotlight glass grid items-center gap-6 p-4 transition-colors duration-500 hover:border-white/20 md:grid-cols-[300px_1fr_auto] md:p-5"
              >
                <div className="relative aspect-[16/10] overflow-hidden rounded-xl bg-night">
                  {w.image_url && (
                    <SmartImage src={w.image_url} alt="" fill sizes="300px" className="object-cover transition-transform duration-700 group-hover:scale-105" />
                  )}
                  {isUpcoming(w, today) && (
                    <span className="absolute left-3 top-3 flex items-center gap-1.5 rounded-full bg-lime px-2.5 py-1 font-mono text-[10px] font-medium uppercase text-void">
                      <span className="size-1.5 rounded-full bg-void animate-pulse" aria-hidden /> upcoming
                    </span>
                  )}
                </div>
                <div>
                  <div className="mb-3 flex flex-wrap items-center gap-2 font-mono text-[11px] uppercase tracking-widest">
                    <span className="text-lime">{String(workshops.indexOf(w) + 1).padStart(2, "0")}</span>
                    {w.format && <span className="chip">{w.format}</span>}
                    {w.event_date && <span className="text-canvas/60">{formatDate(w.event_date, true)}</span>}
                    {w.location && <span className="text-canvas/60">{w.location}</span>}
                    <SampleTag show={w.is_sample} />
                  </div>
                  <h2 className="heading text-2xl group-hover:text-lime md:text-3xl">{w.title}</h2>
                  {w.summary && <p className="mt-2 max-w-2xl text-canvas/70">{w.summary}</p>}
                  {w.topics.length > 0 && <p className="mt-3 font-mono text-xs text-lavender">{w.topics.join(" · ")}</p>}
                </div>
                <ArrowUpRight aria-hidden className="hidden size-6 text-canvas/50 transition-all group-hover:rotate-45 group-hover:text-lime md:mr-4 md:block" />
              </Link>
            </motion.li>
          ))}
        </AnimatePresence>
      </ul>
      </div>
    </>
  );
}
