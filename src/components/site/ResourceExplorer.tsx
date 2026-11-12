"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useMemo, useState } from "react";
import { ArrowUpRight, Search, X } from "lucide-react";
import type { Resource } from "@/lib/types";
import { SampleTag } from "./SampleTag";
import { CopyButton } from "./fx/CopyButton";

/** Instant search + type filter over resources, with copy-link buttons. */
export function ResourceExplorer({ resources }: { resources: Resource[] }) {
  const [query, setQuery] = useState("");
  const [kind, setKind] = useState("All");
  const kinds = useMemo(() => ["All", ...Array.from(new Set(resources.map((r) => r.kind)))], [resources]);

  const q = query.trim().toLowerCase();
  const shown = resources.filter(
    (r) => (kind === "All" || r.kind === kind) && (!q || `${r.title} ${r.description ?? ""} ${r.kind}`.toLowerCase().includes(q)),
  );

  return (
    <>
      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <label className="glass flex w-full max-w-md items-center gap-3 px-4 focus-within:border-lime/60">
          <Search className="size-4 text-lime" aria-hidden />
          <span className="sr-only">Search resources</span>
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="grep resources…"
            className="h-12 w-full bg-transparent font-mono text-sm text-canvas placeholder:text-canvas/40 focus:outline-none [&::-webkit-search-cancel-button]:hidden"
          />
          {query && (
            <button type="button" onClick={() => setQuery("")} aria-label="Clear search" className="text-canvas/60 hover:text-lime">
              <X className="size-4" aria-hidden />
            </button>
          )}
        </label>
        {kinds.length > 2 && (
          <div role="group" aria-label="Filter by type" className="flex flex-wrap gap-2">
            {kinds.map((k) => (
              <button
                key={k}
                type="button"
                aria-pressed={kind === k}
                onClick={() => setKind(k)}
                className={`rounded-full px-3.5 py-1.5 font-mono text-xs transition-colors ${
                  kind === k ? "bg-lime text-void" : "border border-white/12 text-canvas/75 hover:border-lime/50"
                }`}
              >
                {k}
              </button>
            ))}
          </div>
        )}
      </div>

      <p className="mb-4 font-mono text-xs text-canvas/60" aria-live="polite">
        {shown.length} result{shown.length === 1 ? "" : "s"}
        {q && ` for "${query.trim()}"`}
      </p>

      <motion.ul layout className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {shown.map((r) => (
            <motion.li
              key={r.id}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="relative"
            >
              <a
                href={r.url ?? "#"}
                target={r.url ? "_blank" : undefined}
                rel="noopener noreferrer"
                aria-disabled={!r.url}
                data-cursor="open"
                className="group spotlight glass glass-hover flex h-full flex-col p-6"
              >
                <span className="flex items-center justify-between pr-10">
                  <span className="chip">{r.kind}</span>
                </span>
                <span className="heading mt-6 flex flex-wrap items-center gap-2 text-xl group-hover:text-lime">
                  {r.title} <SampleTag show={r.is_sample} />
                </span>
                {r.description && <span className="mt-2 text-sm text-canvas/65">{r.description}</span>}
                <span className="mt-auto flex items-center gap-1.5 pt-6 font-mono text-[11px] uppercase tracking-widest text-lavender group-hover:text-lime">
                  open <ArrowUpRight className="size-3.5 transition-transform group-hover:rotate-45" aria-hidden />
                </span>
              </a>
              {r.url && <CopyButton value={r.url} label={`Copy link to ${r.title}`} className="absolute right-5 top-5 z-[2] bg-void/60" />}
            </motion.li>
          ))}
        </AnimatePresence>
      </motion.ul>
      {shown.length === 0 && <p className="glass p-8 text-center font-mono text-sm text-canvas/65">// no matches — try another word</p>}
    </>
  );
}
