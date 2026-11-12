import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { ExploreCategory } from "@/lib/types";
import { Reveal } from "../Reveal";
import { SectionHeading } from "../SectionHeading";
import { SmartImage } from "../SmartImage";
import { TiltCard } from "../fx/TiltCard";

/** Bento layout: alternating wide/narrow tiles so it never reads as a uniform grid. */
const spans = ["lg:col-span-7", "lg:col-span-5", "lg:col-span-5", "lg:col-span-7"];

export function Explore({ categories }: { categories: ExploreCategory[] }) {
  if (!categories.length) return null;

  return (
    <section id="explore" className="scroll-mt-24 py-20 md:py-28" aria-label="Explore my world">
      <div className="container-x">
        <SectionHeading
          number="01"
          label="what i do"
          title={
            <>
              Explore my <span className="accent-serif gradient-text">world</span>
            </>
          }
          intro="Four sides of one mission: making AI practical, teachable and genuinely useful."
        />

        <ul className="grid gap-4 md:grid-cols-2 lg:grid-cols-12">
          {categories.map((c, i) => (
            <Reveal as="li" key={c.id} delay={i * 0.08} className={spans[i % spans.length]}>
              <TiltCard className="h-full">
              <Link
                href={c.href}
                data-cursor="open"
                className="group spotlight relative flex h-[300px] flex-col justify-end overflow-hidden rounded-3xl border border-white/10 bg-night p-6 transition-all duration-500 hover:border-lime/50 hover:shadow-[0_0_60px_-20px_rgba(216,241,107,0.45)] md:h-[360px] md:p-8"
              >
                {c.image_url && (
                  <SmartImage
                    src={c.image_url}
                    alt=""
                    fill
                    sizes="(min-width: 1024px) 60vw, (min-width: 768px) 50vw, 100vw"
                    className="object-cover opacity-70 transition-all duration-700 ease-[var(--ease-soft)] group-hover:scale-105 group-hover:opacity-90"
                  />
                )}
                <div aria-hidden className="absolute inset-0 bg-linear-to-t from-void via-void/70 to-void/0" />

                <span className="chip absolute left-6 top-6 md:left-8 md:top-8">
                  <span className="text-lime">{c.number}</span>
                  <span className="mx-1.5 text-canvas/40">/</span>
                  {String(categories.length).padStart(2, "0")}
                </span>
                <span
                  aria-hidden
                  className="absolute right-6 top-6 grid size-11 place-items-center rounded-full border border-white/20 bg-void/40 backdrop-blur transition-all duration-300 group-hover:rotate-45 group-hover:border-lime group-hover:bg-lime group-hover:text-void md:right-8 md:top-8"
                >
                  <ArrowUpRight className="size-5" />
                </span>

                <div className="relative [transform:translateZ(40px)]">
                  <h3 className="heading text-2xl md:text-3xl">{c.title}</h3>
                  {c.description && <p className="mt-2 max-w-md text-sm text-canvas/75 md:text-base">{c.description}</p>}
                </div>
              </Link>
              </TiltCard>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
