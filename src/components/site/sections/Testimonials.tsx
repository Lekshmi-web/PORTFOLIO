import type { Testimonial } from "@/lib/types";
import { Reveal } from "../Reveal";
import { SampleTag } from "../SampleTag";
import { SectionHeading } from "../SectionHeading";

export function Testimonials({ testimonials, showHeading = true }: { testimonials: Testimonial[]; showHeading?: boolean }) {
  if (!testimonials.length) return null;

  return (
    <section className="py-20 md:py-28" aria-label="Testimonials">
      <div className="container-x">
        {showHeading && (
          <SectionHeading
            number="06"
            label="kind words"
            title={
              <>
                What people <span className="accent-serif gradient-text">say</span>
              </>
            }
            href="/testimonials"
            linkText="All testimonials"
          />
        )}

        <ul className="columns-1 gap-4 md:columns-2 lg:columns-3 [&>li]:mb-4">
          {testimonials.map((t, i) => (
            <Reveal as="li" key={t.id} delay={(i % 3) * 0.08} className="break-inside-avoid">
              <figure className={`glass glass-hover p-6 ${i === 0 ? "border-lime/30" : ""}`}>
                <span aria-hidden className="accent-serif block text-5xl leading-none text-pink">
                  &ldquo;
                </span>
                <blockquote className={`mt-2 leading-relaxed text-canvas/85 ${i === 0 ? "text-lg md:text-xl" : ""}`}>
                  {t.quote}
                </blockquote>
                <figcaption className="mt-5 flex flex-wrap items-center gap-2 border-t border-white/10 pt-4 text-sm">
                  <span className="grid size-8 place-items-center rounded-full bg-violet font-mono text-xs text-canvas" aria-hidden>
                    {t.name.charAt(0)}
                  </span>
                  <span className="font-medium">{t.name}</span>
                  {t.role && <span className="text-canvas/60">· {t.role}</span>}
                  <SampleTag show={t.is_sample} />
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
