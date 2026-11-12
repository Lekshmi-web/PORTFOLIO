import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { ButtonLink } from "@/components/site/ButtonLink";
import { Reveal } from "@/components/site/Reveal";
import { SampleTag } from "@/components/site/SampleTag";
import { SmartImage } from "@/components/site/SmartImage";
import { Gallery } from "@/components/site/fx/Gallery";
import { ScrollSpy } from "@/components/site/fx/ScrollSpy";
import { getProject, getProjects } from "@/lib/data";

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
  const [p, all] = await Promise.all([getProject(slug), getProjects()]);
  if (!p) notFound();

  const gallery = p.gallery ?? [];
  const sections = [
    { id: "problem", label: "the_problem", text: p.problem },
    { id: "built", label: "what_i_built", text: p.role },
    { id: "outcome", label: "outcome", text: p.outcome },
  ].filter((s): s is { id: string; label: string; text: string } => Boolean(s.text));
  const spy = [...sections.map((s) => ({ id: s.id, label: s.label })), ...(gallery.length ? [{ id: "gallery", label: "gallery" }] : [])];

  const idx = all.findIndex((x) => x.slug === p.slug);
  const next = all.length > 1 ? all[(idx + 1) % all.length] : null;

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

        <Reveal className="mt-8 max-w-4xl">
          <p className="mono-label mb-4 flex items-center gap-3 text-lime">
            // project <SampleTag show={p.is_sample} />
          </p>
          <h1 className="heading text-4xl sm:text-5xl lg:text-6xl">{p.title}</h1>
          {p.summary && <p className="mt-5 max-w-2xl text-lg text-canvas/70">{p.summary}</p>}
        </Reveal>

        {p.image_url && (
          <Reveal className="relative mt-10 aspect-[16/9] overflow-hidden rounded-3xl border border-white/10 bg-night">
            <SmartImage src={p.image_url} alt={`${p.title} preview`} fill priority sizes="100vw" className="object-cover" />
          </Reveal>
        )}

        <div className="mt-14 grid gap-10 lg:grid-cols-[260px_1fr] lg:gap-14">
          <aside className="space-y-4 lg:sticky lg:top-24 lg:self-start">
            <ScrollSpy items={spy} />
            <div className="glass space-y-5 p-5">
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
              <div className="flex flex-wrap gap-2">
                {p.live_url && (
                  <ButtonLink href={p.live_url} external>
                    Live site
                  </ButtonLink>
                )}
                {p.repo_url && (
                  <ButtonLink href={p.repo_url} variant="outline" external>
                    Source
                  </ButtonLink>
                )}
              </div>
            </div>
          </aside>

          <div className="min-w-0 space-y-14">
            {sections.length === 0 && !gallery.length && (
              <p className="glass p-6 font-mono text-sm text-canvas/65">// full case study coming soon</p>
            )}
            {sections.map((s, i) => (
              <Reveal key={s.id}>
                <section id={s.id} className="scroll-mt-28">
                  <p className="mono-label mb-3 text-lime">
                    {String(i + 1).padStart(2, "0")} · {s.label}
                  </p>
                  <p className="whitespace-pre-line text-lg leading-relaxed text-canvas/85">{s.text}</p>
                </section>
              </Reveal>
            ))}
            {gallery.length > 0 && (
              <section id="gallery" className="scroll-mt-28">
                <p className="mono-label mb-4 text-lime">// gallery</p>
                <Gallery images={gallery} title={p.title} />
              </section>
            )}
          </div>
        </div>

        {next && (
          <Reveal className="mt-24">
            <Link
              href={`/projects/${next.slug}`}
              data-cursor="next"
              className="group spotlight relative flex flex-col justify-end overflow-hidden rounded-3xl border border-white/10 bg-night p-8 md:min-h-[300px] md:p-12"
            >
              {next.image_url && (
                <SmartImage
                  src={next.image_url}
                  alt=""
                  fill
                  sizes="100vw"
                  className="object-cover opacity-35 transition-all duration-700 group-hover:scale-105 group-hover:opacity-55"
                />
              )}
              <div aria-hidden className="absolute inset-0 bg-linear-to-t from-void via-void/60 to-transparent" />
              <div className="relative flex items-end justify-between gap-6">
                <div>
                  <p className="mono-label mb-3 text-lime">next project →</p>
                  <p className="heading text-3xl group-hover:text-lime md:text-5xl">{next.title}</p>
                </div>
                <span className="grid size-14 shrink-0 place-items-center rounded-full border border-white/20 transition-all duration-300 group-hover:rotate-45 group-hover:border-lime group-hover:bg-lime group-hover:text-void">
                  <ArrowUpRight className="size-6" aria-hidden />
                </span>
              </div>
            </Link>
          </Reveal>
        )}
      </div>
    </article>
  );
}
