import type { Achievement } from "@/lib/types";
import { formatDate } from "@/lib/format";
import { Reveal } from "../Reveal";
import { SampleTag } from "../SampleTag";
import { SectionHeading } from "../SectionHeading";

export function Journey({ achievements }: { achievements: Achievement[] }) {
  if (!achievements.length) return null;

  return (
    <section className="bg-lavender py-20 md:py-32" aria-label="Achievements and journey">
      <div className="container-x">
        <SectionHeading
          number="05"
          label="Achievements & journey"
          title={
            <>
              Milestones <span className="italic text-violet">so far</span>
            </>
          }
          href="/achievements"
          linkText="Full journey"
        />

        <ol className="relative ml-3 border-l-2 border-ink/20 md:ml-0 md:border-l-0">
          {achievements.map((a, i) => (
            <Reveal
              as="li"
              key={a.id}
              delay={i * 0.06}
              className="relative pb-12 pl-8 md:grid md:grid-cols-[220px_1fr] md:gap-12 md:pl-0"
            >
              <span
                aria-hidden
                className={`absolute -left-[9px] top-2 size-4 rounded-full border-2 border-ink md:hidden ${
                  i === 0 ? "bg-lime" : "bg-lavender"
                }`}
              />
              <div className="mb-3 md:mb-0 md:border-t md:border-ink/25 md:pt-4">
                <p className="eyebrow text-violet">{a.kind}</p>
                {(a.happened_on || a.organisation) && (
                  <p className="mt-1 font-grotesk text-sm text-ink/70">
                    {[formatDate(a.happened_on), a.organisation].filter(Boolean).join(" · ")}
                  </p>
                )}
              </div>
              <div className="md:border-t md:border-ink/25 md:pt-4">
                <div className="flex flex-wrap items-center gap-3">
                  <h3 className="display text-3xl md:text-4xl">{a.title}</h3>
                  <SampleTag show={a.is_sample} />
                </div>
                {a.description && <p className="mt-3 max-w-2xl text-lg text-ink/75">{a.description}</p>}
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
