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
        label="03 — Speaking & Events"
        accent="lime"
        title={
          <>
            Achievements &amp; <span className="italic text-violet">journey</span>
          </>
        }
        intro="Speaking engagements, events, achievements, and professional experiences."
      />
      <section className="container-x pb-24 md:pb-32">
        {items.length === 0 ? (
          <EmptyState text="Milestones will appear here." />
        ) : (
          <ol className="space-y-6">
            {items.map((a, i) => (
              <Reveal as="li" key={a.id}>
                <div
                  className={`grid gap-6 rounded-[2rem] p-6 md:grid-cols-[200px_1fr_auto] md:items-center md:p-10 ${
                    i === 0 ? "bg-violet text-canvas" : "bg-canvas ring-1 ring-ink/15"
                  }`}
                >
                  <div>
                    <p className={`display text-6xl md:text-7xl ${i === 0 ? "text-lime" : "text-violet"}`}>
                      {String(i + 1).padStart(2, "0")}
                    </p>
                    <p className="eyebrow mt-2 opacity-80">{a.kind}</p>
                  </div>
                  <div>
                    <div className="flex flex-wrap items-center gap-3">
                      <h2 className="display text-3xl md:text-4xl">{a.title}</h2>
                      <SampleTag show={a.is_sample} />
                    </div>
                    {(a.organisation || a.happened_on) && (
                      <p className="mt-2 font-grotesk text-sm opacity-75">
                        {[a.organisation, formatDate(a.happened_on)].filter(Boolean).join(" · ")}
                      </p>
                    )}
                    {a.description && <p className="mt-4 max-w-2xl opacity-85">{a.description}</p>}
                    {a.link_url && (
                      <a href={a.link_url} target="_blank" rel="noopener noreferrer" className="link-underline mt-4 inline-block font-grotesk text-sm">
                        Learn more ↗
                      </a>
                    )}
                  </div>
                  {a.image_url && (
                    <div className="relative aspect-square w-full overflow-hidden rounded-2xl md:w-48">
                      <SmartImage src={a.image_url} alt="" fill sizes="192px" className="object-cover" />
                    </div>
                  )}
                </div>
              </Reveal>
            ))}
          </ol>
        )}
      </section>
    </>
  );
}
