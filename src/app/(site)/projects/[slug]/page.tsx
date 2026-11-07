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
    { label: "The problem", text: p.problem },
    { label: "What I built", text: p.role },
    { label: "Outcome", text: p.outcome },
  ].filter((s) => s.text);

  return (
    <article className="pb-24 pt-32 md:pb-32 md:pt-40">
      <div className="container-x">
        <Link href="/projects" className="inline-flex items-center gap-2 font-grotesk text-sm text-ink/70 hover:text-violet">
          <ArrowLeft className="size-4" aria-hidden /> All projects
        </Link>

        <Reveal className="mt-10 grid gap-10 lg:grid-cols-[1.4fr_1fr] lg:items-end">
          <div>
            <p className="eyebrow mb-5 flex items-center gap-3 text-violet">
              Project <SampleTag show={p.is_sample} />
            </p>
            <h1 className="display text-5xl sm:text-6xl lg:text-7xl">{p.title}</h1>
            {p.summary && <p className="mt-6 max-w-2xl text-xl text-ink/75">{p.summary}</p>}
          </div>
          <dl className="grid gap-6 border-t border-ink/20 pt-6 font-grotesk text-sm">
            {p.tech.length > 0 && (
              <div>
                <dt className="eyebrow text-ink/60">Stack</dt>
                <dd className="mt-2 flex flex-wrap gap-2">
                  {p.tech.map((t) => (
                    <span key={t} className="rounded-full bg-ink px-3 py-1 text-xs text-canvas">
                      {t}
                    </span>
                  ))}
                </dd>
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
          </dl>
        </Reveal>

        {p.image_url && (
          <Reveal className="relative mt-16 aspect-[16/9] overflow-hidden rounded-[2rem] bg-lavender">
            <SmartImage src={p.image_url} alt={`${p.title} preview`} fill priority sizes="100vw" className="object-cover" />
          </Reveal>
        )}

        {sections.length > 0 && (
          <div className="mx-auto mt-20 max-w-3xl space-y-14">
            {sections.map((s, i) => (
              <Reveal key={s.label}>
                <p className="eyebrow mb-4 text-violet">
                  {String(i + 1).padStart(2, "0")} — {s.label}
                </p>
                <p className="whitespace-pre-line text-xl leading-relaxed text-ink/85">{s.text}</p>
              </Reveal>
            ))}
          </div>
        )}
      </div>
    </article>
  );
}
