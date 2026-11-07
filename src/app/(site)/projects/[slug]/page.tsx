import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { ButtonLink } from "@/components/site/ButtonLink";
import { Reveal } from "@/components/site/Reveal";
import { SampleTag } from "@/components/site/SampleTag";
import { SmartImage } from "@/components/site/SmartImage";
import { getProject } from "@/lib/data";

type Params = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const p = await getProject(slug);
  if (!p) return { title: "Project not found" };
  return {
    title: p.title,
    description: p.summary ?? undefined,
    openGraph: p.image_url && !p.image_url.endsWith(".svg") ? { images: [p.image_url] } : undefined,
  };
}

export default async function ProjectPage({ params }: Params) {
  const { slug } = await params;
  const p = await getProject(slug);
  if (!p) notFound();

  const sections = [
    { label: "the_problem", text: p.problem },
    { label: "what_i_built", text: p.role },
    { label: "outcome", text: p.outcome },
  ].filter((s) => s.text);

  return (
    <article className="relative isolate pb-24 pt-28 md:pt-36">
      <div aria-hidden className="absolute inset-x-0 top-0 -z-10 h-[600px]">
        <div className="bg-grid absolute inset-0" />
        <div className="glow-violet absolute -left-40 -top-40 size-[600px]" />
      </div>
      <div className="container-x">
        <Link href="/projects" className="inline-flex items-center gap-2 font-mono text-xs text-canvas/65 hover:text-lime">
          <ArrowLeft className="size-4" aria-hidden /> cd ../projects
        </Link>

        <Reveal className="mt-8 grid gap-10 lg:grid-cols-[1.4fr_1fr] lg:items-end">
          <div>
            <p className="mono-label mb-4 flex items-center gap-3 text-lime">
              // project <SampleTag show={p.is_sample} />
            </p>
            <h1 className="heading text-4xl sm:text-5xl lg:text-6xl">{p.title}</h1>
            {p.summary && <p className="mt-5 max-w-2xl text-lg text-canvas/70">{p.summary}</p>}
          </div>
          <div className="glass space-y-5 p-6">
            {p.tech.length > 0 && (
              <div>
                <p className="mono-label text-canvas/60">stack</p>
                <ul className="mt-3 flex flex-wrap gap-1.5">
                  {p.tech.map((t) => (
                    <li key={t} className="chip">
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            <div className="flex flex-wrap gap-3">
              {p.live_url && (
                <ButtonLink href={p.live_url} external>
                  Live site
                </ButtonLink>
              )}
              {p.repo_url && (
                <ButtonLink href={p.repo_url} variant="outline" external>
                  Source code
                </ButtonLink>
              )}
            </div>
          </div>
        </Reveal>

        {p.image_url && (
          <Reveal className="relative mt-12 aspect-[16/9] overflow-hidden rounded-3xl border border-white/10 bg-night">
            <SmartImage src={p.image_url} alt={`${p.title} preview`} fill priority sizes="100vw" className="object-cover" />
          </Reveal>
        )}

        {sections.length > 0 && (
          <div className="mx-auto mt-16 max-w-3xl space-y-10">
            {sections.map((s, i) => (
              <Reveal key={s.label}>
                <p className="mono-label mb-3 text-lime">
                  {String(i + 1).padStart(2, "0")} · {s.label}
                </p>
                <p className="whitespace-pre-line text-lg leading-relaxed text-canvas/85">{s.text}</p>
              </Reveal>
            ))}
          </div>
        )}
      </div>
    </article>
  );
}
