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
        label="01 — AI & Engineering"
        title={
          <>
            Projects &amp; <span className="italic text-violet">experiments</span>
          </>
        }
        intro="AI projects, machine learning, LLMs, automation, and practical engineering solutions."
      />
      <section className="container-x pb-24 md:pb-32">
        {projects.length === 0 ? (
          <EmptyState text="Projects are on their way." />
        ) : (
          <ul className="grid gap-x-10 gap-y-20 md:grid-cols-12">
            {projects.map((p, i) => {
              // Alternate wide and narrow tiles for an editorial rhythm.
              const span = i % 3 === 0 ? "md:col-span-12 lg:col-span-7" : i % 3 === 1 ? "md:col-span-6 lg:col-span-5 lg:mt-32" : "md:col-span-6 lg:col-span-6 lg:col-start-4";
              return (
                <Reveal as="li" key={p.id} className={span}>
                  <Link href={`/projects/${p.slug}`} className="group block">
                    <div className="relative aspect-[4/3] overflow-hidden rounded-[2rem] bg-lavender">
                      {p.image_url && (
                        <SmartImage
                          src={p.image_url}
                          alt={`${p.title} preview`}
                          fill
                          sizes="(min-width: 1024px) 50vw, 100vw"
                          className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                        />
                      )}
                    </div>
                    <div className="mt-6 flex items-start justify-between gap-6">
                      <div>
                        <p className="eyebrow mb-2 flex items-center gap-3 text-ink/60">
                          {String(i + 1).padStart(2, "0")}
                          <SampleTag show={p.is_sample} />
                        </p>
                        <h2 className="display text-3xl group-hover:text-violet md:text-4xl">{p.title}</h2>
                        {p.summary && <p className="mt-3 max-w-lg text-ink/75">{p.summary}</p>}
                        {p.tech.length > 0 && (
                          <p className="mt-4 font-grotesk text-sm text-violet">{p.tech.join(" · ")}</p>
                        )}
                      </div>
                      <span className="inline-flex size-12 shrink-0 items-center justify-center rounded-full border border-ink/30 transition-colors group-hover:border-violet group-hover:bg-violet group-hover:text-canvas">
                        <ArrowUpRight className="size-5" aria-hidden />
                      </span>
                    </div>
                  </Link>
                </Reveal>
              );
            })}
          </ul>
        )}
      </section>
    </>
  );
}
