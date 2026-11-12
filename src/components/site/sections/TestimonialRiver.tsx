import type { Testimonial } from "@/lib/types";
import { SampleTag } from "../SampleTag";
import { SectionHeading } from "../SectionHeading";

function Card({ t }: { t: Testimonial }) {
  return (
    <figure className="glass w-[340px] shrink-0 p-6 md:w-[400px]">
      <span aria-hidden className="accent-serif block text-4xl leading-none text-pink">
        &ldquo;
      </span>
      <blockquote className="mt-1 leading-relaxed text-canvas/85">{t.quote}</blockquote>
      <figcaption className="mt-4 flex flex-wrap items-center gap-2 border-t border-white/10 pt-4 text-sm">
        <span className="grid size-8 place-items-center rounded-full bg-violet font-mono text-xs text-canvas" aria-hidden>
          {t.name.charAt(0)}
        </span>
        <span className="font-medium">{t.name}</span>
        {t.role && <span className="text-canvas/60">· {t.role}</span>}
        <SampleTag show={t.is_sample} />
      </figcaption>
    </figure>
  );
}

/** Two rows of testimonials flowing in opposite directions. Pauses on hover. */
export function TestimonialRiver({ testimonials }: { testimonials: Testimonial[] }) {
  if (!testimonials.length) return null;
  const fill = (list: Testimonial[]) => Array.from({ length: Math.ceil(6 / list.length) }).flatMap(() => list);
  const rowA = fill(testimonials);
  const rowB = fill([...testimonials].reverse());

  return (
    <section className="py-20 md:py-28" aria-label="Testimonials">
      <div className="container-x">
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
      </div>

      {/* Screen readers get each testimonial once. */}
      <ul className="sr-only">
        {testimonials.map((t) => (
          <li key={t.id}>
            {t.quote} — {t.name}
            {t.role ? `, ${t.role}` : ""}
          </li>
        ))}
      </ul>

      <div
        aria-hidden
        className="pause-on-hover space-y-4 [mask-image:linear-gradient(90deg,transparent,#000_8%,#000_92%,transparent)]"
      >
        {[
          { row: rowA, cls: "animate-marquee" },
          { row: rowB, cls: "animate-marquee-reverse" },
        ].map(({ row, cls }, r) => (
          <div key={r} className="overflow-hidden">
            <div className={`flex w-max gap-4 ${cls}`}>
              {[...row, ...row].map((t, i) => (
                <Card key={`${t.id}-${i}`} t={t} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
