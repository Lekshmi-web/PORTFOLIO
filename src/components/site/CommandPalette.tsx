"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useId, useMemo, useRef, useState } from "react";
import { CornerDownLeft, Search } from "lucide-react";

export interface PaletteItem {
  label: string;
  href: string;
  group: string;
  hint?: string;
  external?: boolean;
}

/** Ctrl/⌘+K quick navigation. Opened by the keyboard shortcut or an "open-palette" window event. */
export function CommandPalette({ items }: { items: PaletteItem[] }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const restoreFocus = useRef<HTMLElement | null>(null);
  const listId = useId();

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return items;
    return items.filter((i) => `${i.label} ${i.group} ${i.hint ?? ""}`.toLowerCase().includes(q));
  }, [items, query]);

  const show = useCallback(() => {
    restoreFocus.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    setQuery("");
    setActive(0);
    setOpen(true);
  }, []);
  const hide = useCallback(() => {
    setOpen(false);
    restoreFocus.current?.focus();
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        if (open) hide();
        else show();
      }
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("open-palette", show);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("open-palette", show);
    };
  }, [open, show, hide]);

  useEffect(() => {
    window.dispatchEvent(new Event(open ? "lenis:stop" : "lenis:start"));
    if (open) requestAnimationFrame(() => inputRef.current?.focus());
  }, [open]);

  // Keep the highlighted result visible while arrowing through a long list.
  useEffect(() => {
    if (open) document.getElementById(`${listId}-${active}`)?.scrollIntoView({ block: "nearest" });
  }, [active, open, listId]);

  function go(item: PaletteItem | undefined) {
    if (!item) return;
    setOpen(false);
    if (item.external) window.open(item.href, "_blank", "noopener,noreferrer");
    else router.push(item.href);
  }

  function onInputKey(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((a) => Math.min(a + 1, Math.max(results.length - 1, 0)));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((a) => Math.max(a - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      go(results[active]);
    } else if (e.key === "Escape") {
      e.preventDefault();
      hide();
    } else if (e.key === "Tab") {
      // Keep focus inside the dialog.
      e.preventDefault();
    }
  }

  let lastGroup = "";

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[80] flex items-start justify-center bg-void/70 px-4 pt-[14vh] backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) hide();
          }}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Quick navigation"
            className="w-full max-w-xl overflow-hidden rounded-2xl border border-white/15 bg-night/95 shadow-2xl shadow-black/60"
            initial={{ opacity: 0, y: -12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex items-center gap-3 border-b border-white/10 px-4">
              <Search className="size-4 text-lime" aria-hidden />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setActive(0);
                }}
                onKeyDown={onInputKey}
                placeholder="Search pages, projects, workshops…"
                className="h-14 w-full bg-transparent font-grotesk text-canvas placeholder:text-canvas/40 focus:outline-none"
                role="combobox"
                aria-expanded="true"
                aria-controls={listId}
                aria-activedescendant={results[active] ? `${listId}-${active}` : undefined}
                aria-autocomplete="list"
              />
              <kbd className="chip shrink-0">esc</kbd>
            </div>
            <ul id={listId} role="listbox" className="max-h-[50vh] overflow-y-auto p-2" data-lenis-prevent>
              {results.length === 0 && <li className="px-3 py-8 text-center font-mono text-sm text-canvas/60">no matches</li>}
              {results.map((item, i) => {
                const header = item.group !== lastGroup ? item.group : null;
                lastGroup = item.group;
                return (
                  <li key={`${item.group}-${item.href}`} role="presentation">
                    {header && <p className="mono-label px-3 pb-1 pt-3 text-lime">{header}</p>}
                    <div
                      id={`${listId}-${i}`}
                      role="option"
                      aria-selected={i === active}
                      onMouseEnter={() => setActive(i)}
                      onClick={() => go(item)}
                      className={`flex cursor-pointer items-center justify-between gap-3 rounded-lg px-3 py-2.5 text-sm ${
                        i === active ? "bg-white/10 text-canvas" : "text-canvas/75"
                      }`}
                    >
                      <span className="truncate">{item.label}</span>
                      <span className="flex shrink-0 items-center gap-2 font-mono text-[11px] text-canvas/60">
                        {item.hint}
                        {i === active && <CornerDownLeft className="size-3.5 text-lime" aria-hidden />}
                      </span>
                    </div>
                  </li>
                );
              })}
            </ul>
            <div className="flex justify-between border-t border-white/10 px-4 py-2.5 font-mono text-[11px] text-canvas/60">
              <span>↑↓ navigate · ↵ open</span>
              <span>ctrl/⌘ + k</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
