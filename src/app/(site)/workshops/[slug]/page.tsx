import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { ButtonLink } from "@/components/site/ButtonLink";
import { Reveal } from "@/components/site/Reveal";
import { SampleTag } from "@/components/site/SampleTag";
import { SmartImage } from "@/components/site/SmartImage";
import { Countdown } from "@/components/site/fx/Countdown";
import { Gallery } from "@/components/site/fx/Gallery";
import { getWorkshop } from "@/lib/data";
import { formatDate } from "@/lib/format";

type Params = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const w = await getWorkshop(slug);
  return w ? { title: w.title, description: w.summary ?? undefined } : { title: "Workshop not found" };
}

export default async function WorkshopPage({ params }: Params) {
  const { slug } = await params;
  const w = await getWorkshop(slug);
  if (!w) notFound();

  const facts = [
    { label: "format", value: w.format },
    { label: "audience", value: w.audience },
    { label: "date", value: formatDate(w.event_date, true) },
    { label: "location", value: w.location },
  ].filter((f) => f.value);

  return (
    <article className="relative isolate pb-24 pt-28 md:pt-36">
      <div aria-hidden className="absolute inset-x-0 top-0 -z-10 h-[600px]">
        <div className="bg-grid absolute inset-0" />
        <div className="glow-pink absolute -right-40 -top-40 size-[600px]" />
      </div>
      <div className="container-x">
        <Link href="/workshops" className="inline-flex items-center gap-2 font-mono text-xs text-canvas/65 hover:text-lime">
          <ArrowLeft className="size-4" aria-hidden /> cd ../workshops
        </Link>

        <div className="mt-8 grid items-start gap-10 lg:grid-cols-[1fr_380px]">
          <Reveal>
            <p className="mono-label mb-4 flex items-center gap-3 text-lime">
              // workshop <SampleTag show={w.is_sample} />
            </p>
            <h1 className="heading text-4xl sm:text-5xl lg:text-6xl">{w.title}</h1>
            {w.summary && <p className="mt-5 text-lg text-canvas/70">{w.summary}</p>}
            {w.details && <p className="mt-8 whitespace-pre-line leading-relaxed text-canvas/85">{w.details}</p>}
            {(w.gallery ?? []).length > 0 && (
              <div className="mt-10">
                <p className="mono-label mb-4 text-lime">// photos from the session</p>
                <Gallery images={w.gallery} title={w.title} />
              </div>
            )}
            {w.topics.length > 0 && (
              <div className="mt-8">
                <p className="mono-label mb-3 text-canvas/60">topics covered</p>
                <ul className="flex flex-wrap gap-1.5">
                  {w.topics.map((t) => (
                    <li key={t} className="chip">
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </Reveal>

          <aside className="space-y-4 lg:sticky lg:top-24">
            {w.image_url && (
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-white/10 bg-night">
                <SmartImage src={w.image_url} alt="" fill sizes="380px" className="object-cover" />
              </div>
            )}
            {facts.length > 0 && (
              <dl className="glass divide-y divide-white/10 px-5">
                {facts.map((f) => (
                  <div key={f.label} className="flex justify-between gap-4 py-3 text-sm">
                    <dt className="font-mono text-xs uppercase tracking-widest text-canvas/60">{f.label}</dt>
                    <dd className="text-right">{f.value}</dd>
                  </div>
                ))}
              </dl>
            )}
            {w.event_date && w.event_date.slice(0, 10) >= new Date().toISOString().slice(0, 10) && (
              <div className="glass p-5">
                <p className="mono-label mb-3 text-lime">starts in</p>
                <Countdown date={w.event_date} />
              </div>
            )}
            {w.register_url ? (
              <ButtonLink href={w.register_url} external>
                Register
              </ButtonLink>
            ) : (
              <ButtonLink href="/contact" variant="outline">
                Book this workshop
              </ButtonLink>
            )}
          </aside>
        </div>
      </div>
    </article>
  );
}
