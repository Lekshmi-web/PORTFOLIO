import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { ContentItem, Resource } from "@/lib/types";
import { Reveal } from "../Reveal";
import { SampleTag } from "../SampleTag";

export function ResourcesContent({ resources, content }: { resources: Resource[]; content: ContentItem[] }) {
  if (!resources.length && !content.length) return null;

  return (
    <section className="py-20 md:py-32" aria-labelledby="learn-title">
      <div className="container-x">
        <div className="mb-14 max-w-3xl md:mb-20">
          <p className="eyebrow mb-5 flex items-center gap-3 text-ink/60">
            <span className="text-violet">04</span>
            <span aria-hidden className="h-px w-10 bg-current" />
            Resources &amp; content
          </p>
          <h2 id="learn-title" className="display text-4xl sm:text-5xl lg:text-6xl">
            Learn with me, <span className="italic text-violet">for free</span>
          </h2>
        </div>

        <div className="grid gap-16 lg:grid-cols-2 lg:gap-20">
          {resources.length > 0 && (
            <div>
              <div className="mb-6 flex items-baseline justify-between">
                <h3 className="font-grotesk text-sm font-medium uppercase tracking-widest">Resources</h3>
                <Link href="/resources" className="link-underline font-grotesk text-sm text-violet">
                  Browse all
                </Link>
              </div>
              <ul className="border-t border-ink/20">
                {resources.map((r, i) => (
                  <Reveal as="li" key={r.id} delay={i * 0.05} className="border-b border-ink/20">
                    <a
                      href={r.url ?? "/resources"}
                      target={r.url ? "_blank" : undefined}
                      rel="noopener noreferrer"
                      className="group flex items-start justify-between gap-6 py-6"
                    >
                      <span>
                        <span className="mb-2 flex items-center gap-2">
                          <span className="rounded-full bg-lavender px-2.5 py-0.5 font-grotesk text-xs text-ink">
                            {r.kind}
                          </span>
                          <SampleTag show={r.is_sample} />
                        </span>
                        <span className="block font-display text-2xl group-hover:text-violet">{r.title}</span>
                        {r.description && <span className="mt-1 block text-ink/70">{r.description}</span>}
                      </span>
                      <ArrowUpRight
                        aria-hidden
                        className="mt-8 size-5 shrink-0 text-ink/40 transition-colors group-hover:text-violet"
                      />
                    </a>
                  </Reveal>
                ))}
              </ul>
            </div>
          )}

          {content.length > 0 && (
            <div className="rounded-[2rem] bg-violet p-8 text-canvas md:p-10">
              <div className="mb-6 flex items-baseline justify-between">
                <h3 className="font-grotesk text-sm font-medium uppercase tracking-widest text-lime">Latest content</h3>
                <Link href="/content" className="link-underline font-grotesk text-sm text-canvas">
                  See all
                </Link>
              </div>
              <ul className="space-y-8">
                {content.map((c) => (
                  <li key={c.id}>
                    <a
                      href={c.url ?? "/content"}
                      target={c.url ? "_blank" : undefined}
                      rel="noopener noreferrer"
                      className="group block"
                    >
                      <span className="mb-2 flex items-center gap-2 font-grotesk text-xs uppercase tracking-widest text-lavender">
                        {c.platform}
                        <SampleTag show={c.is_sample} />
                      </span>
                      <span className="block font-display text-2xl leading-snug group-hover:text-lime">{c.title}</span>
                      {c.summary && <span className="mt-1 block text-canvas/75">{c.summary}</span>}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
