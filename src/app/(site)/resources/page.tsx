import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";
import { EmptyState } from "@/components/site/EmptyState";
import { PageHeader } from "@/components/site/PageHeader";
import { Reveal } from "@/components/site/Reveal";
import { SampleTag } from "@/components/site/SampleTag";
import { getResources } from "@/lib/data";

export const metadata: Metadata = {
  title: "Resources",
  description: "Free learning materials, notes, tools and guides for learning AI and programming.",
};

export default async function ResourcesPage() {
  const resources = await getResources();
  const kinds = Array.from(new Set(resources.map((r) => r.kind)));

  return (
    <>
      <PageHeader
        label="Learning materials"
        accent="lavender"
        title={
          <>
            Resources, <span className="italic text-violet">free to use</span>
          </>
        }
        intro="Notes, tools, guides and datasets I've put together to help you learn and build."
      />
      <section className="container-x pb-24 md:pb-32">
        {resources.length === 0 ? (
          <EmptyState text="Resources are being prepared." />
        ) : (
          <div className="space-y-20">
            {kinds.map((kind, k) => (
              <div key={kind} className="grid gap-8 md:grid-cols-[220px_1fr]">
                <h2 className="eyebrow flex items-baseline gap-3 text-ink/70 md:pt-7">
                  <span className="text-violet">{String(k + 1).padStart(2, "0")}</span>
                  {kind}
                </h2>
                <ul className="border-t border-ink/20">
                  {resources
                    .filter((r) => r.kind === kind)
                    .map((r) => (
                      <Reveal as="li" key={r.id} className="border-b border-ink/20">
                        <a
                          href={r.url ?? "#"}
                          target={r.url ? "_blank" : undefined}
                          rel="noopener noreferrer"
                          aria-disabled={!r.url}
                          className="group flex items-start justify-between gap-6 py-7"
                        >
                          <span>
                            <span className="flex items-center gap-3">
                              <span className="font-display text-3xl group-hover:text-violet">{r.title}</span>
                              <SampleTag show={r.is_sample} />
                            </span>
                            {r.description && <span className="mt-2 block max-w-2xl text-ink/70">{r.description}</span>}
                          </span>
                          <ArrowUpRight aria-hidden className="mt-2 size-6 shrink-0 text-ink/40 group-hover:text-violet" />
                        </a>
                      </Reveal>
                    ))}
                </ul>
              </div>
            ))}
          </div>
        )}
      </section>
    </>
  );
}
