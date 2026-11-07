import type { Achievement } from "@/lib/types";
import { formatDate } from "@/lib/format";
import { Reveal } from "../Reveal";
import { SampleTag } from "../SampleTag";
import { SectionHeading } from "../SectionHeading";

export function Journey({ achievements }: { achievements: Achievement[] }) {
  if (!achievements.length) return null;

  return (
    <section className="relative py-20 md:py-28" aria-label="Achievements and journey">
      <div className="container-x">
        <SectionHeading
          number="05"
          label="achievements & journey"
          title={
            <>
              Milestones <span className="accent-serif gradient-text">so far</span>
            </>
          }
          href="/achievements"
          linkText="Full journey"
        />

        <ol className="relative ml-2 border-l border-white/15 md:ml-[180px]">
          {/* Glowing progress line */}
          <span aria-hidden className="absolute -left-px top-0 h-24 w-px bg-linear-to-b from-lime to-transparent" />
          {achievements.map((a, i) => (
            <Reveal as="li" key={a.id} delay={i * 0.08} className="relative pb-10 pl-8 last:pb-0 md:pl-10">
              <span
                aria-hidden
                className={`absolute -left-[7px] top-1.5 size-3.5 rounded-full border-2 ${
                  i === 0 ? "border-lime bg-lime animate-pulse-dot" : "border-lavender/60 bg-void"
                }`}
              />
              <p className="mono-label mb-2 text-lavender md:absolute md:-left-[180px] md:top-1 md:mb-0 md:w-[150px] md:text-right">
                {a.kind}
                {a.happened_on && <span className="block text-canvas/60">{formatDate(a.happened_on)}</span>}
              </p>
              <div className="glass glass-hover p-5 md:p-6">
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="heading text-xl md:text-2xl">{a.title}</h3>
                  <SampleTag show={a.is_sample} />
                </div>
                {a.organisation && <p className="mt-1 font-mono text-xs text-lime">@ {a.organisation}</p>}
                {a.description && <p className="mt-3 text-sm text-canvas/70 md:text-base">{a.description}</p>}
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
