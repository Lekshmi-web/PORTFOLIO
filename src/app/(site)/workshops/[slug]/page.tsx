import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { ButtonLink } from "@/components/site/ButtonLink";
import { Reveal } from "@/components/site/Reveal";
import { SampleTag } from "@/components/site/SampleTag";
import { SmartImage } from "@/components/site/SmartImage";
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
    { label: "Format", value: w.format },
    { label: "Audience", value: w.audience },
    { label: "Date", value: formatDate(w.event_date, true) },
    { label: "Location", value: w.location },
  ].filter((f) => f.value);

  return (
    <article className="pb-24 pt-32 md:pb-32 md:pt-40">
      <div className="container-x">
        <Link href="/workshops" className="inline-flex items-center gap-2 font-grotesk text-sm text-ink/70 hover:text-violet">
          <ArrowLeft className="size-4" aria-hidden /> All workshops
        </Link>

        <div className="mt-10 grid gap-12 lg:grid-cols-[1fr_420px]">
          <Reveal>
            <p className="eyebrow mb-5 flex items-center gap-3 text-violet">
              Workshop <SampleTag show={w.is_sample} />
            </p>
            <h1 className="display text-5xl sm:text-6xl lg:text-7xl">{w.title}</h1>
            {w.summary && <p className="mt-6 text-xl text-ink/75">{w.summary}</p>}
            {w.details && <p className="mt-10 whitespace-pre-line text-lg leading-relaxed text-ink/85">{w.details}</p>}
            {w.topics.length > 0 && (
              <div className="mt-10">
                <p className="eyebrow mb-4 text-ink/60">Topics covered</p>
                <ul className="flex flex-wrap gap-2">
                  {w.topics.map((t) => (
                    <li key={t} className="rounded-full bg-lavender px-4 py-1.5 font-grotesk text-sm">
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </Reveal>

          <Reveal delay={0.1}>
            <div className="sticky top-28 space-y-6">
              {w.image_url && (
                <div className="relative aspect-[4/3] overflow-hidden rounded-[2rem] bg-violet">
                  <SmartImage src={w.image_url} alt="" fill sizes="420px" className="object-cover" />
                </div>
              )}
              {facts.length > 0 && (
                <dl className="divide-y divide-canvas/15 rounded-[2rem] bg-ink p-6 text-canvas">
                  {facts.map((f) => (
                    <div key={f.label} className="flex justify-between gap-4 py-3 font-grotesk text-sm">
                      <dt className="text-canvas/60">{f.label}</dt>
                      <dd className="text-right">{f.value}</dd>
                    </div>
                  ))}
                </dl>
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
            </div>
          </Reveal>
        </div>
      </div>
    </article>
  );
}
