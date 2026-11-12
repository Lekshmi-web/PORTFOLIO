"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { SmartImage } from "../SmartImage";

/** Thumbnail grid that opens a fullscreen viewer (arrow keys, Esc, swipe-free buttons). */
export function Gallery({ images, title }: { images: string[]; title: string }) {
  const [index, setIndex] = useState<number | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const openerRef = useRef<HTMLButtonElement | null>(null);

  const close = useCallback(() => {
    setIndex(null);
    openerRef.current?.focus();
  }, []);
  const step = useCallback(
    (dir: 1 | -1) => setIndex((i) => (i === null ? i : (i + dir + images.length) % images.length)),
    [images.length],
  );

  useEffect(() => {
    if (index === null) return;
    window.dispatchEvent(new Event("lenis:stop"));
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      else if (e.key === "ArrowRight") step(1);
      else if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
      window.dispatchEvent(new Event("lenis:start"));
    };
  }, [index, close, step]);

  if (!images.length) return null;

  return (
    <>
      <ul className="grid grid-cols-2 gap-3 md:grid-cols-3">
        {images.map((src, i) => (
          <li key={src} className={i === 0 && images.length > 2 ? "col-span-2 row-span-2" : ""}>
            <button
              type="button"
              data-cursor="zoom"
              onClick={(e) => {
                openerRef.current = e.currentTarget;
                setIndex(i);
              }}
              className="group spotlight relative block aspect-[4/3] size-full overflow-hidden rounded-xl border border-white/10 bg-night"
              aria-label={`Open image ${i + 1} of ${images.length}`}
            >
              <SmartImage
                src={src}
                alt=""
                fill
                sizes="(min-width: 768px) 33vw, 50vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </button>
          </li>
        ))}
      </ul>

      <AnimatePresence>
        {index !== null && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={`${title} — image ${index + 1} of ${images.length}`}
            className="fixed inset-0 z-[85] flex items-center justify-center bg-void/95 p-4 backdrop-blur-md md:p-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onMouseDown={(e) => {
              if (e.target === e.currentTarget) close();
            }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={images[index]}
                className="relative h-[80vh] w-full max-w-6xl"
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.25 }}
              >
                <SmartImage src={images[index]} alt={`${title} — image ${index + 1}`} fill sizes="100vw" className="object-contain" />
              </motion.div>
            </AnimatePresence>

            <p className="chip absolute left-4 top-4 md:left-8 md:top-8">
              {String(index + 1).padStart(2, "0")} / {String(images.length).padStart(2, "0")}
            </p>
            <button
              ref={closeRef}
              type="button"
              onClick={close}
              aria-label="Close"
              className="absolute right-4 top-4 grid size-11 place-items-center rounded-full border border-white/20 bg-void/60 hover:border-lime hover:text-lime md:right-8 md:top-8"
            >
              <X className="size-5" aria-hidden />
            </button>
            {images.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={() => step(-1)}
                  aria-label="Previous image"
                  className="absolute left-3 top-1/2 grid size-12 -translate-y-1/2 place-items-center rounded-full border border-white/20 bg-void/60 hover:border-lime hover:text-lime md:left-8"
                >
                  <ChevronLeft className="size-5" aria-hidden />
                </button>
                <button
                  type="button"
                  onClick={() => step(1)}
                  aria-label="Next image"
                  className="absolute right-3 top-1/2 grid size-12 -translate-y-1/2 place-items-center rounded-full border border-white/20 bg-void/60 hover:border-lime hover:text-lime md:right-8"
                >
                  <ChevronRight className="size-5" aria-hidden />
                </button>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
