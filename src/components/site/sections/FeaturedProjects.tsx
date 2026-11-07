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
    <section className="py-20 md:py-32" aria-label="Featured projects">
      <div className="container-x">
        <SectionHeading
          number="02"
          label="Selected work"
          title={
            <>
              Things I&apos;ve <span className="italic text-violet">built</span>
            </>
          }
          href="/projects"
          linkText="All projects"
        />

        <Reveal>
          <Link
            href={`/projects/${lead.slug}`}
            className="group grid gap-8 lg:grid-cols-[1.5fr_1fr] lg:items-end lg:gap-14"
          >
            <div className="relative aspect-[16/10] overflow-hidden rounded-[2rem] bg-lavender">
              {lead.image_url && (
                <SmartImage
                  src={lead.image_url}
                  alt={`${lead.title} preview`}
                  fill
                  sizes="(min-width: 1024px) 60vw, 100vw"
                  className="object-cover transition-transform duration-700 ease-[var(--ease-soft)] group-hover:scale-[1.03]"
                />
              )}
            </div>
            <div className="pb-2">
              <div className="mb-4 flex items-center gap-3">
                <span className="eyebrow text-violet">Featured</span>
                <SampleTag show={lead.is_sample} />
              </div>
              <h3 className="display text-4xl group-hover:text-violet md:text-5xl">{lead.title}</h3>
              {lead.summary && <p className="mt-5 text-lg text-ink/75">{lead.summary}</p>}
              {lead.tech.length > 0 && (
                <ul className="mt-6 flex flex-wrap gap-2">
                  {lead.tech.map((t) => (
                    <li key={t} className="rounded-full bg-ink px-3 py-1 font-grotesk text-xs text-canvas">
                      {t}
                    </li>
                  ))}
                </ul>
              )}
              <span className="mt-8 inline-flex items-center gap-2 font-grotesk text-sm font-medium text-violet">
                <span className="link-underline">Read the case study</span>
                <ArrowUpRight className="size-4" aria-hidden />
              </span>
            </div>
          </Link>
        </Reveal>

        {others.length > 0 && (
          <ol className="mt-20 border-t border-ink/20">
            {others.map((p, i) => (
              <Reveal as="li" key={p.id} delay={i * 0.05} className="border-b border-ink/20">
                <Link
                  href={`/projects/${p.slug}`}
                  className="group grid grid-cols-[auto_1fr] items-baseline gap-x-6 gap-y-2 py-7 md:grid-cols-[80px_1.2fr_1fr_auto] md:gap-x-10"
                >
                  <span className="eyebrow text-ink/50">{String(i + 2).padStart(2, "0")}</span>
                  <span className="flex items-center gap-3">
                    <span className="font-display text-2xl group-hover:text-violet md:text-3xl">{p.title}</span>
                    <SampleTag show={p.is_sample} />
                  </span>
                  <span className="col-start-2 text-ink/70 md:col-start-auto">{p.summary}</span>
                  <ArrowUpRight
                    aria-hidden
                    className="hidden size-6 text-ink/40 transition-all duration-300 group-hover:-translate-y-1 group-hover:text-violet md:block"
                  />
                </Link>
              </Reveal>
            ))}
          </ol>
        )}
      </div>
    </section>
  );
}
