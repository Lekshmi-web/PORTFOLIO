import type { Metadata } from "next";
import { EmptyState } from "@/components/site/EmptyState";
import { PageHeader } from "@/components/site/PageHeader";
import { Reveal } from "@/components/site/Reveal";
import { SampleTag } from "@/components/site/SampleTag";
import { SmartImage } from "@/components/site/SmartImage";
import { getAchievements } from "@/lib/data";
import { formatDate } from "@/lib/format";

export const metadata: Metadata = {
  title: "Achievements & Events",
  description: "Speaking engagements, events, achievements and professional milestones.",
};

export default async function AchievementsPage() {
  const items = await getAchievements();

  return (
    <>
      <PageHeader
        label="03 — speaking & events"
        title={
          <>
            Achievements &amp; <span className="accent-serif gradient-text">journey</span>
          </>
        }
        intro="Speaking engagements, events, achievements, and professional experiences."
      />
      <section className="container-x pb-24">
        {items.length === 0 ? (
          <EmptyState text="Milestones will appear here." />
        ) : (
          <ol className="grid gap-4 md:grid-cols-2">
            {items.map((a, i) => (
              <Reveal as="li" key={a.id} delay={(i % 2) * 0.08} className={i === 0 ? "md:col-span-2" : ""}>
                <div
                  className={`group relative h-full overflow-hidden rounded-2xl border p-6 md:p-8 ${
                    i === 0
                      ? "border-lime/40 bg-linear-to-br from-violet/50 via-night to-night"
                      : "glass glass-hover"
                  }`}
                >
                  <div className="flex items-start justify-between gap-6">
                    <div>
                      <p className="mono-label flex items-center gap-2 text-lime">
                        {String(i + 1).padStart(2, "0")} · {a.kind}
                        <SampleTag show={a.is_sample} />
                      </p>
                      <h2 className={`heading mt-4 ${i === 0 ? "text-3xl md:text-4xl" : "text-2xl"}`}>{a.title}</h2>
                      {(a.organisation || a.happened_on) && (
                        <p className="mt-2 font-mono text-xs text-lavender">
                          {[a.organisation && `@ ${a.organisation}`, formatDate(a.happened_on)].filter(Boolean).join(" · ")}
                        </p>
                      )}
                      {a.description && <p className="mt-4 max-w-2xl text-canvas/75">{a.description}</p>}
                      {a.link_url && (
                        <a href={a.link_url} target="_blank" rel="noopener noreferrer" className="link-underline mt-4 inline-block font-mono text-xs text-lime">
                          learn more ↗
                        </a>
                      )}
                    </div>
                    {a.image_url && (
                      <div className="relative hidden aspect-square w-32 shrink-0 overflow-hidden rounded-xl border border-white/10 sm:block md:w-40">
                        <SmartImage src={a.image_url} alt="" fill sizes="160px" className="object-cover" />
                      </div>
                    )}
                  </div>
                </div>
              </Reveal>
            ))}
          </ol>
        )}
      </section>
    </>
  );
}
