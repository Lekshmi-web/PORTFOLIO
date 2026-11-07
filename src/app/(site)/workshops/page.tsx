import type { Metadata } from "next";
import Link from "next/link";
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
        label="02 — Teaching & Mentoring"
        accent="pink"
        title={
          <>
            Workshops &amp; <span className="italic text-violet">mentoring</span>
          </>
        }
        intro="Workshops, technical training, student mentoring, and knowledge sharing."
      />
      <section className="container-x pb-24 md:pb-32">
        {workshops.length === 0 ? (
          <EmptyState text="New workshops coming soon." />
        ) : (
          <ul className="space-y-6">
            {workshops.map((w, i) => (
              <Reveal as="li" key={w.id}>
                <Link
                  href={`/workshops/${w.slug}`}
                  className={`group grid items-center gap-8 rounded-[2rem] p-5 transition-colors md:grid-cols-[320px_1fr] md:p-6 ${
                    i % 2 === 0 ? "bg-ink text-canvas" : "bg-lavender text-ink"
                  }`}
                >
                  <div className="relative aspect-[4/3] overflow-hidden rounded-[1.5rem] bg-violet">
                    {w.image_url && (
                      <SmartImage src={w.image_url} alt="" fill sizes="320px" className="object-cover transition-transform duration-700 group-hover:scale-105" />
                    )}
                  </div>
                  <div className="md:pr-6">
                    <div className="mb-3 flex flex-wrap items-center gap-3 font-grotesk text-xs uppercase tracking-widest">
                      {w.format && <span className={i % 2 === 0 ? "text-lime" : "text-violet"}>{w.format}</span>}
                      {w.event_date && <span className="opacity-75">{formatDate(w.event_date, true)}</span>}
                      {w.location && <span className="opacity-75">{w.location}</span>}
                      <SampleTag show={w.is_sample} />
                    </div>
                    <h2 className="display text-3xl md:text-5xl">{w.title}</h2>
                    {w.summary && <p className="mt-3 max-w-2xl opacity-80">{w.summary}</p>}
                    {w.topics.length > 0 && (
                      <ul className="mt-5 flex flex-wrap gap-2">
                        {w.topics.map((t) => (
                          <li
                            key={t}
                            className={`rounded-full px-3 py-1 font-grotesk text-xs ${
                              i % 2 === 0 ? "bg-canvas/10 text-canvas" : "bg-canvas text-ink"
                            }`}
                          >
                            {t}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </Link>
              </Reveal>
            ))}
          </ul>
        )}
      </section>
    </>
  );
}
