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
        label="learning materials"
        title={
          <>
            Resources, <span className="accent-serif gradient-text">free to use</span>
          </>
        }
        intro="Notes, tools, guides and datasets I've put together to help you learn and build."
      />
      <section className="container-x pb-24">
        {resources.length === 0 ? (
          <EmptyState text="Resources are being prepared." />
        ) : (
          <div className="space-y-14">
            {kinds.map((kind) => (
              <div key={kind}>
                <h2 className="mono-label mb-4 text-lime">$ ls ./{kind.toLowerCase().replace(/\s+/g, "-")}</h2>
                <ul className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {resources
                    .filter((r) => r.kind === kind)
                    .map((r, i) => (
                      <Reveal as="li" key={r.id} delay={(i % 3) * 0.06}>
                        <a
                          href={r.url ?? "#"}
                          target={r.url ? "_blank" : undefined}
                          rel="noopener noreferrer"
                          aria-disabled={!r.url}
                          className="group glass glass-hover flex h-full flex-col p-6"
                        >
                          <span className="flex items-center justify-between">
                            <span className="chip">{r.kind}</span>
                            <ArrowUpRight aria-hidden className="size-5 text-canvas/50 transition-all group-hover:rotate-45 group-hover:text-lime" />
                          </span>
                          <span className="heading mt-6 flex flex-wrap items-center gap-2 text-xl group-hover:text-lime">
                            {r.title} <SampleTag show={r.is_sample} />
                          </span>
                          {r.description && <span className="mt-2 text-sm text-canvas/65">{r.description}</span>}
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
