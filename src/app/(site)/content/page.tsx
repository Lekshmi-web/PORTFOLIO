import type { Metadata } from "next";
import { ArrowUpRight, Play } from "lucide-react";
import { EmptyState } from "@/components/site/EmptyState";
import { PageHeader } from "@/components/site/PageHeader";
import { Reveal } from "@/components/site/Reveal";
import { SampleTag } from "@/components/site/SampleTag";
import { SmartImage } from "@/components/site/SmartImage";
import { getContent } from "@/lib/data";
import { formatDate } from "@/lib/format";

export const metadata: Metadata = {
  title: "Content",
  description: "Videos, articles and posts — educational content, AI tools and tutorials.",
};

const platformColour: Record<string, string> = {
  YouTube: "text-coral",
  Article: "text-lime",
  LinkedIn: "text-lavender",
  Instagram: "text-pink",
};

export default async function ContentPage() {
  const items = await getContent();

  return (
    <>
      <PageHeader
        label="04 — content creator"
        accent="pink"
        title={
          <>
            Content &amp; <span className="accent-serif gradient-text">tutorials</span>
          </>
        }
        intro="Educational content, useful AI tools, tutorials, and learning resources."
      />
      <section className="container-x pb-24">
        {items.length === 0 ? (
          <EmptyState text="Fresh content is on the way." />
        ) : (
          <ul className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {items.map((c, i) => (
              <Reveal as="li" key={c.id} delay={(i % 3) * 0.06}>
                <a
                  href={c.url ?? "#"}
                  target={c.url ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  className="group glass glass-hover block h-full overflow-hidden"
                >
                  <div className="relative aspect-video overflow-hidden bg-night">
                    {c.image_url ? (
                      <SmartImage
                        src={c.image_url}
                        alt=""
                        fill
                        sizes="(min-width: 1024px) 33vw, 100vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    ) : (
                      <div aria-hidden className="absolute inset-0 bg-grid" />
                    )}
                    <span aria-hidden className="absolute inset-0 grid place-items-center">
                      <span className="grid size-14 place-items-center rounded-full border border-white/20 bg-void/50 backdrop-blur transition-all duration-300 group-hover:scale-110 group-hover:border-lime group-hover:bg-lime group-hover:text-void">
                        {c.platform === "YouTube" ? <Play className="size-5" /> : <ArrowUpRight className="size-5" />}
                      </span>
                    </span>
                  </div>
                  <div className="p-5">
                    <div className="flex flex-wrap items-center gap-2 font-mono text-[11px] uppercase tracking-widest">
                      <span className={platformColour[c.platform] ?? "text-lavender"}>● {c.platform}</span>
                      {c.published_on && <span className="text-canvas/60">{formatDate(c.published_on, true)}</span>}
                      <SampleTag show={c.is_sample} />
                    </div>
                    <h2 className="heading mt-3 text-lg leading-snug group-hover:text-lime">{c.title}</h2>
                    {c.summary && <p className="mt-2 text-sm text-canvas/65">{c.summary}</p>}
                  </div>
                </a>
              </Reveal>
            ))}
          </ul>
        )}
      </section>
    </>
  );
}
