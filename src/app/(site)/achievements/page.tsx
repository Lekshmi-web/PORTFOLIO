import type { Metadata } from "next";
import { EmptyState } from "@/components/site/EmptyState";
import { PageHeader } from "@/components/site/PageHeader";
import { Reveal } from "@/components/site/Reveal";
import { SampleTag } from "@/components/site/SampleTag";
import { SmartImage } from "@/components/site/SmartImage";
import { ConfettiOnView } from "@/components/site/fx/ConfettiOnView";
import { TiltCard } from "@/components/site/fx/TiltCard";
import { getAchievements } from "@/lib/data";
import { formatDate } from "@/lib/format";
import type { Achievement } from "@/lib/types";

export const metadata: Metadata = {
  title: "Achievements & Events",
  description: "Speaking engagements, events, achievements and professional milestones.",
};

function Body({ a, i, lead }: { a: Achievement; i: number; lead: boolean }) {
  return (
    <div className="relative flex items-start justify-between gap-6">
      <div>
        <p className="mono-label flex items-center gap-2 text-lime">
          {lead && <span aria-hidden>★</span>}
          {String(i + 1).padStart(2, "0")} · {a.kind}
          <SampleTag show={a.is_sample} />
        </p>
        <h2 className={`heading mt-4 ${lead ? "text-3xl md:text-5xl" : "text-2xl"}`}>
          {lead ? <span className="gradient-text">{a.title}</span> : a.title}
        </h2>
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
  );
}

export default async function AchievementsPage() {
  const items = await getAchievements();
  const [lead, ...rest] = items;

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
        {!lead ? (
          <EmptyState text="Milestones will appear here." />
        ) : (
          <>
            <Reveal>
              <ConfettiOnView id={lead.id}>
                <div className="holo relative overflow-hidden rounded-3xl border border-lime/40 bg-linear-to-br from-violet/60 via-night to-night p-7 shadow-[0_0_80px_-30px_rgba(216,241,107,0.5)] md:p-12">
                  <span aria-hidden className="holo-sheen" />
                  <div aria-hidden className="bg-grid absolute inset-0 opacity-60" />
                  <Body a={lead} i={0} lead />
                </div>
              </ConfettiOnView>
            </Reveal>

            {rest.length > 0 && (
              <ol className="mt-4 grid gap-4 md:grid-cols-2" start={2}>
                {rest.map((a, i) => (
                  <Reveal as="li" key={a.id} delay={(i % 2) * 0.08}>
                    <TiltCard max={5} className="h-full">
                      <div className="spotlight glass glass-hover h-full p-6 md:p-8">
                        <Body a={a} i={i + 1} lead={false} />
                      </div>
                    </TiltCard>
                  </Reveal>
                ))}
              </ol>
            )}
          </>
        )}
      </section>
    </>
  );
}
