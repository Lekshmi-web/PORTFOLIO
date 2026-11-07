import Link from "next/link";
import type { Workshop } from "@/lib/types";
import { SampleTag } from "../SampleTag";
import { SectionHeading } from "../SectionHeading";
import { SmartImage } from "../SmartImage";

export function WorkshopsStrip({ workshops }: { workshops: Workshop[] }) {
  if (!workshops.length) return null;

  return (
    <section className="relative overflow-hidden border-y border-white/10 bg-night py-20 md:py-28" aria-label="Workshops">
      <div aria-hidden className="glow-violet absolute -left-40 top-0 size-[600px] opacity-70" />
      <div className="container-x relative">
        <SectionHeading
          number="03"
          label="teaching & mentoring"
          title={
            <>
              Learning by <span className="accent-serif text-lime">building</span>
            </>
          }
          href="/workshops"
          linkText="All workshops"
        />
      </div>

      <ul
        className="relative flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-4 [scrollbar-width:thin] sm:px-8 lg:px-[max(2.5rem,calc((100vw-1240px)/2+2.5rem))]"
        aria-label="Workshop list — scroll sideways for more"
      >
        {workshops.map((w, i) => (
          <li key={w.id} className="w-[80vw] max-w-[380px] shrink-0 snap-start">
            <Link href={`/workshops/${w.slug}`} className="group glass glass-hover block overflow-hidden">
              <div className="relative aspect-[16/10] overflow-hidden bg-void">
                {w.image_url && (
                  <SmartImage
                    src={w.image_url}
                    alt=""
                    fill
                    sizes="380px"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                )}
                <span className="absolute left-4 top-4 rounded-full bg-lime px-3 py-1 font-mono text-[11px] font-medium text-void">
                  {w.format ?? `workshop_${String(i + 1).padStart(2, "0")}`}
                </span>
              </div>
              <div className="p-5">
                <h3 className="heading flex flex-wrap items-center gap-2 text-xl group-hover:text-lime">
                  {w.title} <SampleTag show={w.is_sample} />
                </h3>
                {w.audience && <p className="mt-1.5 text-sm text-canvas/65">For {w.audience}</p>}
                {w.topics.length > 0 && (
                  <ul className="mt-4 flex flex-wrap gap-1.5">
                    {w.topics.map((t) => (
                      <li key={t} className="chip">
                        {t}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
