"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import type { ExploreCategory } from "@/lib/types";
import { SmartImage } from "../SmartImage";

/**
 * "Explore My World" — an editorial index, not a card grid.
 * Desktop: hovering a row swaps the large image on the right.
 * Mobile: each row shows its own image.
 */
export function Explore({ categories }: { categories: ExploreCategory[] }) {
  const [active, setActive] = useState(0);
  if (!categories.length) return null;
  const current = categories[active] ?? categories[0];

  return (
    <section id="explore" className="scroll-mt-24 py-20 md:py-32" aria-labelledby="explore-title">
      <div className="container-x">
        <div className="mb-14 grid gap-6 md:mb-20 md:grid-cols-2 md:items-end">
          <div>
            <p className="eyebrow mb-5 flex items-center gap-3 text-ink/60">
              <span className="text-violet">01</span>
              <span aria-hidden className="h-px w-10 bg-current" />
              What I do
            </p>
            <h2 id="explore-title" className="display text-5xl sm:text-6xl lg:text-7xl">
              Explore my <span className="italic text-violet">world</span>
            </h2>
          </div>
          <p className="max-w-md text-lg text-ink/70 md:justify-self-end">
            Four sides of one mission: making AI practical, teachable and genuinely useful.
          </p>
        </div>

        <div className="grid gap-10 lg:grid-cols-[1fr_440px] lg:gap-16">
          <ol className="border-t border-ink/20">
            {categories.map((c, i) => (
              <li key={c.id} className="border-b border-ink/20">
                <Link
                  href={c.href}
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  className="group grid grid-cols-[auto_1fr_auto] items-start gap-x-5 gap-y-4 py-8 md:gap-x-10 md:py-10"
                >
                  <span className="eyebrow pt-3 text-violet">{c.number}</span>
                  <span>
                    <span
                      className={`display block text-4xl transition-colors duration-300 sm:text-5xl lg:text-6xl ${
                        active === i ? "lg:text-violet" : ""
                      } group-hover:text-violet`}
                    >
                      {c.title}
                    </span>
                    {c.description && (
                      <span className="mt-3 block max-w-lg text-base text-ink/70">{c.description}</span>
                    )}
                    {c.image_url && (
                      <span className="relative mt-6 block aspect-[4/3] overflow-hidden rounded-2xl lg:hidden">
                        <SmartImage src={c.image_url} alt="" fill sizes="90vw" className="object-cover" />
                      </span>
                    )}
                  </span>
                  <span
                    className={`mt-2 inline-flex size-12 items-center justify-center rounded-full border border-ink/30 transition-all duration-300 group-hover:border-violet group-hover:bg-violet group-hover:text-canvas ${
                      active === i ? "lg:border-violet lg:bg-violet lg:text-canvas" : ""
                    }`}
                  >
                    <ArrowUpRight className="size-5" aria-hidden />
                    <span className="sr-only">Go to {c.title}</span>
                  </span>
                </Link>
              </li>
            ))}
          </ol>

          <div className="relative hidden lg:block">
            <div className="sticky top-28">
              <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] bg-ink">
                {categories.map((c, i) =>
                  c.image_url ? (
                    <SmartImage
                      key={c.id}
                      src={c.image_url}
                      alt={i === active ? `${c.title}` : ""}
                      fill
                      sizes="440px"
                      className={`object-cover transition-all duration-700 ease-[var(--ease-soft)] ${
                        i === active ? "scale-100 opacity-100" : "scale-105 opacity-0"
                      }`}
                    />
                  ) : null,
                )}
              </div>
              <p className="mt-5 flex items-center justify-between font-grotesk text-sm text-ink/70">
                <span>
                  <span className="text-violet">{current.number}</span> / {String(categories.length).padStart(2, "0")}
                </span>
                <span>{current.title}</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
