import Link from "next/link";
import type { Workshop } from "@/lib/types";
import { SampleTag } from "../SampleTag";
import { SectionHeading } from "../SectionHeading";
import { SmartImage } from "../SmartImage";

export function WorkshopsStrip({ workshops }: { workshops: Workshop[] }) {
  if (!workshops.length) return null;

  return (
    <section className="bg-ink py-20 text-canvas md:py-32" aria-label="Workshops">
      <div className="container-x">
        <SectionHeading
          tone="dark"
          number="03"
          label="Teaching & mentoring"
          title={
            <>
              Learning by <span className="italic text-lime">building</span>
            </>
          }
          href="/workshops"
          linkText="All workshops"
        />
      </div>

      <ul
        className="flex snap-x snap-mandatory gap-6 overflow-x-auto px-5 pb-6 sm:px-8 lg:px-[max(3rem,calc((100vw-1320px)/2+3rem))]"
        aria-label="Workshop list — scroll sideways for more"
      >
        {workshops.map((w, i) => (
          <li key={w.id} className="w-[82vw] max-w-[420px] shrink-0 snap-start">
            <Link href={`/workshops/${w.slug}`} className="group block">
              <div className="relative aspect-[4/3] overflow-hidden rounded-[1.5rem] bg-violet">
                {w.image_url && (
                  <SmartImage
                    src={w.image_url}
                    alt=""
                    fill
                    sizes="420px"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                )}
                <span className="absolute left-4 top-4 rounded-full bg-lime px-3 py-1 font-grotesk text-xs font-medium text-ink">
                  {w.format ?? `Workshop ${String(i + 1).padStart(2, "0")}`}
                </span>
              </div>
              <div className="mt-5 flex items-center gap-3">
                <h3 className="font-display text-2xl group-hover:text-lime md:text-3xl">{w.title}</h3>
                <SampleTag show={w.is_sample} />
              </div>
              {w.audience && <p className="mt-2 font-grotesk text-sm text-canvas/70">For {w.audience}</p>}
              {w.topics.length > 0 && (
                <p className="mt-3 text-sm text-lavender">{w.topics.join(" · ")}</p>
              )}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
