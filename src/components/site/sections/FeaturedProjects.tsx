import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/lib/types";
import { Reveal } from "../Reveal";
import { SampleTag } from "../SampleTag";
import { SectionHeading } from "../SectionHeading";
import { SmartImage } from "../SmartImage";

export function FeaturedProjects({ projects }: { projects: Project[] }) {
  if (!projects.length) return null;
  const [lead, ...others] = projects;

  return (
    <section className="py-20 md:py-28" aria-label="Featured projects">
      <div className="container-x">
        <SectionHeading
          number="02"
          label="selected work"
          title={
            <>
              Things I&apos;ve <span className="accent-serif gradient-text">built</span>
            </>
          }
          href="/projects"
          linkText="All projects"
        />

        <Reveal>
          <Link
            href={`/projects/${lead.slug}`}
            className="group glass grid overflow-hidden transition-all duration-500 hover:border-lime/40 lg:grid-cols-[1.4fr_1fr]"
          >
            <div className="relative aspect-[16/10] overflow-hidden bg-night lg:aspect-auto lg:min-h-[380px]">
              {lead.image_url && (
                <SmartImage
                  src={lead.image_url}
                  alt={`${lead.title} preview`}
                  fill
                  sizes="(min-width: 1024px) 60vw, 100vw"
                  className="object-cover transition-transform duration-700 ease-[var(--ease-soft)] group-hover:scale-[1.04]"
                />
              )}
            </div>
            <div className="flex flex-col justify-center p-6 md:p-10">
              <div className="mb-4 flex items-center gap-3">
                <span className="mono-label text-lime">● featured</span>
                <SampleTag show={lead.is_sample} />
              </div>
              <h3 className="heading text-3xl group-hover:text-lime md:text-4xl">{lead.title}</h3>
              {lead.summary && <p className="mt-4 text-canvas/70">{lead.summary}</p>}
              {lead.tech.length > 0 && (
                <ul className="mt-6 flex flex-wrap gap-2">
                  {lead.tech.map((t) => (
                    <li key={t} className="chip">
                      {t}
                    </li>
                  ))}
                </ul>
              )}
              <span className="mt-8 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-lavender group-hover:text-lime">
                read case study <ArrowUpRight className="size-4" aria-hidden />
              </span>
            </div>
          </Link>
        </Reveal>

        {others.length > 0 && (
          <ul className="mt-4 grid gap-4 md:grid-cols-3">
            {others.map((p, i) => (
              <Reveal as="li" key={p.id} delay={i * 0.08}>
                <Link
                  href={`/projects/${p.slug}`}
                  className="group glass glass-hover flex h-full flex-col p-6"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs text-canvas/60">{String(i + 2).padStart(2, "0")}</span>
                    <ArrowUpRight aria-hidden className="size-5 text-canvas/50 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-lime" />
                  </div>
                  <h3 className="heading mt-8 flex items-center gap-2 text-xl group-hover:text-lime">
                    {p.title} <SampleTag show={p.is_sample} />
                  </h3>
                  {p.summary && <p className="mt-2 text-sm text-canvas/65">{p.summary}</p>}
                  {p.tech.length > 0 && <p className="mt-auto pt-5 font-mono text-[11px] text-lavender">{p.tech.join(" · ")}</p>}
                </Link>
              </Reveal>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
