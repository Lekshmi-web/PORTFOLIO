import type { Metadata } from "next";
import Link from "next/link";
import { EmptyState } from "@/components/site/EmptyState";
import { PageHeader } from "@/components/site/PageHeader";
import { Reveal } from "@/components/site/Reveal";
import { WorkshopExplorer } from "@/components/site/WorkshopExplorer";
import { Countdown } from "@/components/site/fx/Countdown";
import { getWorkshops } from "@/lib/data";
import { formatDate } from "@/lib/format";

export const metadata: Metadata = {
  title: "Workshops",
  description: "Hands-on workshops, technical training and mentoring programmes.",
};

export default async function WorkshopsPage() {
  const workshops = await getWorkshops();
  const today = new Date().toISOString().slice(0, 10);
  const next = workshops
    .filter((w) => w.event_date && w.event_date.slice(0, 10) >= today)
    .sort((a, b) => (a.event_date ?? "").localeCompare(b.event_date ?? ""))[0];

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
        {next?.event_date && (
          <Reveal className="mb-10">
            <div className="relative isolate overflow-hidden rounded-3xl border border-lime/30 bg-linear-to-br from-violet/40 via-night to-night p-6 md:p-8">
              <div aria-hidden className="bg-grid absolute inset-0 -z-10" />
              <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                <div>
                  <p className="mono-label flex items-center gap-2 text-lime">
                    <span className="size-2 rounded-full bg-lime animate-pulse-dot" aria-hidden /> next workshop
                  </p>
                  <Link href={`/workshops/${next.slug}`} className="heading mt-3 block text-2xl hover:text-lime md:text-3xl">
                    {next.title}
                  </Link>
                  <p className="mt-1 font-mono text-xs text-canvas/65">
                    {[formatDate(next.event_date, true), next.location].filter(Boolean).join(" · ")}
                  </p>
                </div>
                <Countdown date={next.event_date} />
              </div>
            </div>
          </Reveal>
        )}
        {workshops.length === 0 ? <EmptyState text="New workshops coming soon." /> : <WorkshopExplorer workshops={workshops} />}
      </section>
    </>
  );
}
