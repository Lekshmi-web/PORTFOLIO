import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { ContentItem, Resource } from "@/lib/types";
import { Reveal } from "../Reveal";
import { SampleTag } from "../SampleTag";
import { SectionHeading } from "../SectionHeading";

export function ResourcesContent({ resources, content }: { resources: Resource[]; content: ContentItem[] }) {
  if (!resources.length && !content.length) return null;

  return (
    <section className="py-20 md:py-28" aria-label="Resources and content">
      <div className="container-x">
        <SectionHeading
          number="04"
          label="resources & content"
          title={
            <>
              Learn with me, <span className="accent-serif gradient-text">for free</span>
            </>
          }
        />

        <div className="grid gap-4 lg:grid-cols-2">
          {resources.length > 0 && (
            <Reveal className="glass p-6 md:p-8">
              <div className="mb-4 flex items-baseline justify-between">
                <h3 className="mono-label text-lime">$ ls ./resources</h3>
                <Link href="/resources" className="font-mono text-xs text-lavender hover:text-lime">
                  browse all →
                </Link>
              </div>
              <ul className="divide-y divide-white/10">
                {resources.map((r) => (
                  <li key={r.id}>
                    <a
                      href={r.url ?? "/resources"}
                      target={r.url ? "_blank" : undefined}
                      rel="noopener noreferrer"
                      className="group flex items-start justify-between gap-6 py-5"
                    >
                      <span>
                        <span className="mb-2 flex items-center gap-2">
                          <span className="chip">{r.kind}</span>
                          <SampleTag show={r.is_sample} />
                        </span>
                        <span className="heading block text-lg group-hover:text-lime">{r.title}</span>
                        {r.description && <span className="mt-1 block text-sm text-canvas/65">{r.description}</span>}
                      </span>
                      <ArrowUpRight aria-hidden className="mt-1 size-5 shrink-0 text-canvas/40 group-hover:text-lime" />
                    </a>
                  </li>
                ))}
              </ul>
            </Reveal>
          )}

          {content.length > 0 && (
            <Reveal delay={0.1} className="relative overflow-hidden rounded-2xl border border-violet/60 bg-linear-to-br from-violet/40 via-night to-night p-6 md:p-8">
              <div className="mb-4 flex items-baseline justify-between">
                <h3 className="mono-label text-lime">● latest content</h3>
                <Link href="/content" className="font-mono text-xs text-lavender hover:text-lime">
                  see all →
                </Link>
              </div>
              <ul className="space-y-6">
                {content.map((c) => (
                  <li key={c.id}>
                    <a href={c.url ?? "/content"} target={c.url ? "_blank" : undefined} rel="noopener noreferrer" className="group block">
                      <span className="mb-1.5 flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-pink">
                        {c.platform}
                        <SampleTag show={c.is_sample} />
                      </span>
                      <span className="heading block text-lg group-hover:text-lime">{c.title}</span>
                      {c.summary && <span className="mt-1 block text-sm text-canvas/70">{c.summary}</span>}
                    </a>
                  </li>
                ))}
              </ul>
            </Reveal>
          )}
        </div>
      </div>
    </section>
  );
}
