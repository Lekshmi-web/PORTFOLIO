import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { EmptyState } from "@/components/site/EmptyState";
import { PageHeader } from "@/components/site/PageHeader";
import { Reveal } from "@/components/site/Reveal";
import { SampleTag } from "@/components/site/SampleTag";
import { SmartImage } from "@/components/site/SmartImage";
import { getProjects } from "@/lib/data";

export const metadata: Metadata = {
  title: "Projects",
  description: "AI and engineering projects — machine learning, LLMs, automation and practical software.",
};

export default async function ProjectsPage() {
  const projects = await getProjects();

  return (
    <>
      <PageHeader
        label="01 — ai & engineering"
        title={
          <>
            Projects &amp; <span className="accent-serif gradient-text">experiments</span>
          </>
        }
        intro="AI projects, machine learning, LLMs, automation, and practical engineering solutions."
      />
      <section className="container-x pb-24">
        {projects.length === 0 ? (
          <EmptyState text="Projects are on their way." />
        ) : (
          <ul className="grid gap-4 md:grid-cols-2">
            {projects.map((p, i) => (
              <Reveal as="li" key={p.id} delay={(i % 2) * 0.08} className={i === 0 ? "md:col-span-2" : ""}>
                <Link
                  href={`/projects/${p.slug}`}
                  className={`group glass grid h-full overflow-hidden transition-all duration-500 hover:border-lime/40 hover:shadow-[0_0_60px_-24px_rgba(216,241,107,0.5)] ${
                    i === 0 ? "md:grid-cols-[1.3fr_1fr]" : ""
                  }`}
                >
                  <div className={`relative overflow-hidden bg-night ${i === 0 ? "aspect-[16/10] md:aspect-auto md:min-h-[360px]" : "aspect-[16/10]"}`}>
                    {p.image_url && (
                      <SmartImage
                        src={p.image_url}
                        alt={`${p.title} preview`}
                        fill
                        sizes="(min-width: 768px) 50vw, 100vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                      />
                    )}
                  </div>
                  <div className="flex flex-col p-6 md:p-8">
                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-2 font-mono text-xs text-canvas/60">
                        {String(i + 1).padStart(2, "0")} <SampleTag show={p.is_sample} />
                      </span>
                      <ArrowUpRight aria-hidden className="size-5 text-canvas/50 transition-all group-hover:rotate-45 group-hover:text-lime" />
                    </div>
                    <h2 className={`heading mt-6 group-hover:text-lime ${i === 0 ? "text-3xl md:text-4xl" : "text-2xl"}`}>{p.title}</h2>
                    {p.summary && <p className="mt-3 text-canvas/70">{p.summary}</p>}
                    {p.tech.length > 0 && (
                      <ul className="mt-auto flex flex-wrap gap-1.5 pt-6">
                        {p.tech.map((t) => (
                          <li key={t} className="chip">
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
