import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { EmptyState } from "@/components/site/EmptyState";
import { PageHeader } from "@/components/site/PageHeader";
import { Reveal } from "@/components/site/Reveal";
import { SampleTag } from "@/components/site/SampleTag";
import { SmartImage } from "@/components/site/SmartImage";
import { getWorkshops } from "@/lib/data";
import { formatDate } from "@/lib/format";

export const metadata: Metadata = {
  title: "Workshops",
  description: "Hands-on workshops, technical training and mentoring programmes.",
};

export default async function WorkshopsPage() {
  const workshops = await getWorkshops();

  return (
    <>
      <PageHeader
        label="02 — teaching & mentoring"
        accent="pink"
        title={
          <>
            Workshops &amp; <span className="accent-serif gradient-text">mentoring</span>
          </>
        }
        intro="Workshops, technical training, student mentoring, and knowledge sharing."
      />
      <section className="container-x pb-24">
        {workshops.length === 0 ? (
          <EmptyState text="New workshops coming soon." />
        ) : (
          <ul className="space-y-4">
            {workshops.map((w, i) => (
              <Reveal as="li" key={w.id} delay={0.05}>
                <Link
                  href={`/workshops/${w.slug}`}
                  className="group glass grid items-center gap-6 p-4 transition-all duration-500 hover:border-lime/40 md:grid-cols-[300px_1fr_auto] md:p-5"
                >
                  <div className="relative aspect-[16/10] overflow-hidden rounded-xl bg-night">
                    {w.image_url && (
                      <SmartImage src={w.image_url} alt="" fill sizes="300px" className="object-cover transition-transform duration-700 group-hover:scale-105" />
                    )}
                  </div>
                  <div>
                    <div className="mb-3 flex flex-wrap items-center gap-2 font-mono text-[11px] uppercase tracking-widest">
                      <span className="text-lime">{String(i + 1).padStart(2, "0")}</span>
                      {w.format && <span className="chip">{w.format}</span>}
                      {w.event_date && <span className="text-canvas/60">{formatDate(w.event_date, true)}</span>}
                      {w.location && <span className="text-canvas/60">{w.location}</span>}
                      <SampleTag show={w.is_sample} />
                    </div>
                    <h2 className="heading text-2xl group-hover:text-lime md:text-3xl">{w.title}</h2>
                    {w.summary && <p className="mt-2 max-w-2xl text-canvas/70">{w.summary}</p>}
                    {w.topics.length > 0 && <p className="mt-3 font-mono text-xs text-lavender">{w.topics.join(" · ")}</p>}
                  </div>
                  <ArrowUpRight aria-hidden className="hidden size-6 text-canvas/50 transition-all group-hover:rotate-45 group-hover:text-lime md:mr-4 md:block" />
                </Link>
              </Reveal>
            ))}
          </ul>
        )}
      </section>
    </>
  );
}
