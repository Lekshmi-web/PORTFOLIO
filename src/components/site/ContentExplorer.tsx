"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useMemo, useState } from "react";
import { ArrowUpRight, Play } from "lucide-react";
import type { ContentItem } from "@/lib/types";
import { formatDate, youTubeId } from "@/lib/format";
import { SampleTag } from "./SampleTag";
import { SmartImage } from "./SmartImage";
import { VideoModal } from "./fx/VideoModal";

const platformColour: Record<string, string> = {
  YouTube: "text-coral",
  Article: "text-lime",
  LinkedIn: "text-lavender",
  Instagram: "text-pink",
};

/** Platform tabs + cards; YouTube links play in an in-page player. */
export function ContentExplorer({ items }: { items: ContentItem[] }) {
  const [platform, setPlatform] = useState("All");
  const [video, setVideo] = useState<{ id: string; title: string } | null>(null);
  const platforms = useMemo(() => ["All", ...Array.from(new Set(items.map((i) => i.platform)))], [items]);
  const shown = platform === "All" ? items : items.filter((i) => i.platform === platform);
  const close = useCallback(() => setVideo(null), []);

  return (
    <>
      {platforms.length > 2 && (
        <div role="tablist" aria-label="Filter by platform" className="mb-8 flex flex-wrap gap-1 rounded-full border border-white/10 bg-white/[0.03] p-1 sm:inline-flex">
          {platforms.map((p) => (
            <button
              key={p}
              role="tab"
              type="button"
              aria-selected={platform === p}
              onClick={() => setPlatform(p)}
              className={`relative rounded-full px-4 py-2 font-mono text-xs transition-colors ${platform === p ? "text-void" : "text-canvas/70 hover:text-canvas"}`}
            >
              {platform === p && (
                <motion.span layoutId="content-tab" className="absolute inset-0 rounded-full bg-lime" transition={{ type: "spring", stiffness: 420, damping: 34 }} />
              )}
              <span className="relative">{p}</span>
            </button>
          ))}
        </div>
      )}

      <motion.ul layout className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {shown.map((c) => {
            const yt = youTubeId(c.url);
            const thumb = c.image_url ?? (yt ? `https://i.ytimg.com/vi/${yt}/hqdefault.jpg` : null);
            const body = (
              <>
                <span className="relative block aspect-video overflow-hidden bg-night">
                  {thumb ? (
                    <SmartImage
                      src={thumb}
                      alt=""
                      fill
                      sizes="(min-width: 1024px) 33vw, 100vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  ) : (
                    <span aria-hidden className="absolute inset-0 bg-grid" />
                  )}
                  <span aria-hidden className="absolute inset-0 grid place-items-center">
                    <span className="grid size-14 place-items-center rounded-full border border-white/20 bg-void/50 backdrop-blur transition-all duration-300 group-hover:scale-110 group-hover:border-lime group-hover:bg-lime group-hover:text-void">
                      {yt ? <Play className="size-5 translate-x-0.5" /> : <ArrowUpRight className="size-5" />}
                    </span>
                  </span>
                </span>
                <span className="block p-5 text-left">
                  <span className="flex flex-wrap items-center gap-2 font-mono text-[11px] uppercase tracking-widest">
                    <span className={platformColour[c.platform] ?? "text-lavender"}>● {c.platform}</span>
                    {c.published_on && <span className="text-canvas/60">{formatDate(c.published_on, true)}</span>}
                    <SampleTag show={c.is_sample} />
                  </span>
                  <span className="heading mt-3 block text-lg leading-snug group-hover:text-lime">{c.title}</span>
                  {c.summary && <span className="mt-2 block text-sm text-canvas/65">{c.summary}</span>}
                </span>
              </>
            );
            const cls = "group spotlight glass glass-hover block h-full w-full overflow-hidden";
            return (
              <motion.li
                key={c.id}
                layout
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              >
                {yt ? (
                  <button type="button" data-cursor="play" onClick={() => setVideo({ id: yt, title: c.title })} className={cls}>
                    {body}
                  </button>
                ) : (
                  <a href={c.url ?? "#"} target={c.url ? "_blank" : undefined} rel="noopener noreferrer" data-cursor="open" className={cls}>
                    {body}
                  </a>
                )}
              </motion.li>
            );
          })}
        </AnimatePresence>
      </motion.ul>

      <VideoModal videoId={video?.id ?? null} title={video?.title ?? "Video"} onClose={close} />
    </>
  );
}
