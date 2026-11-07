import type { Testimonial } from "@/lib/types";
import { Reveal } from "../Reveal";
import { SampleTag } from "../SampleTag";
import { SectionHeading } from "../SectionHeading";

export function Testimonials({ testimonials, showHeading = true }: { testimonials: Testimonial[]; showHeading?: boolean }) {
  if (!testimonials.length) return null;
  const [lead, ...rest] = testimonials;

  return (
    <section className="py-20 md:py-32" aria-label="Testimonials">
      <div className="container-x">
        {showHeading && (
          <SectionHeading
            number="06"
            label="Kind words"
            title={
              <>
                What people <span className="italic text-violet">say</span>
              </>
            }
            href="/testimonials"
            linkText="All testimonials"
          />
        )}

        <Reveal>
          <figure className="relative max-w-5xl">
            <span aria-hidden className="absolute -left-2 -top-10 font-display text-[9rem] leading-none text-pink md:-left-14">
              &ldquo;
            </span>
            <blockquote className="display relative text-3xl leading-tight sm:text-4xl lg:text-5xl">
              {lead.quote}
            </blockquote>
            <figcaption className="mt-8 flex items-center gap-3 font-grotesk">
              <span className="h-px w-10 bg-ink" aria-hidden />
              <span className="font-medium">{lead.name}</span>
              {lead.role && <span className="text-ink/60">· {lead.role}</span>}
              <SampleTag show={lead.is_sample} />
            </figcaption>
          </figure>
        </Reveal>

        {rest.length > 0 && (
          <ul className="mt-20 grid gap-10 md:grid-cols-2 lg:grid-cols-3">
            {rest.map((t, i) => (
              <Reveal as="li" key={t.id} delay={i * 0.06} className={i % 2 === 1 ? "md:mt-12" : ""}>
                <figure className="border-t-2 border-ink pt-6">
                  <blockquote className="text-lg leading-relaxed text-ink/85">&ldquo;{t.quote}&rdquo;</blockquote>
                  <figcaption className="mt-5 flex flex-wrap items-center gap-2 font-grotesk text-sm">
                    <span className="font-medium">{t.name}</span>
                    {t.role && <span className="text-ink/60">· {t.role}</span>}
                    <SampleTag show={t.is_sample} />
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
