"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef } from "react";
import { X } from "lucide-react";
import { Portal } from "./Portal";

/** In-page YouTube player (privacy-enhanced domain). Esc or backdrop click closes. */
export function VideoModal({ videoId, title, onClose }: { videoId: string | null; title: string; onClose: () => void }) {
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!videoId) return;
    window.dispatchEvent(new Event("lenis:stop"));
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
      window.dispatchEvent(new Event("lenis:start"));
    };
  }, [videoId, onClose]);

  return (
    <Portal>
<AnimatePresence>
      {videoId && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label={title}
          className="fixed inset-0 z-[85] flex items-center justify-center bg-void/90 p-4 text-canvas backdrop-blur-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) onClose();
          }}
        >
          <motion.div
            className="relative w-full max-w-5xl"
            initial={{ scale: 0.94, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.96, y: 10 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="aspect-video overflow-hidden rounded-2xl border border-white/15 bg-black shadow-2xl shadow-violet/30">
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0`}
                title={title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="size-full"
              />
            </div>
            <button
              ref={closeRef}
              type="button"
              onClick={onClose}
              aria-label="Close video"
              className="absolute -top-14 right-0 grid size-11 place-items-center rounded-full border border-white/20 bg-void/60 hover:border-lime hover:text-lime"
            >
              <X className="size-5" aria-hidden />
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
</Portal>
  );
}
