import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";
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
  YouTube: "bg-coral text-ink",
  Article: "bg-lime text-ink",
  LinkedIn: "bg-lavender text-ink",
  Instagram: "bg-pink text-ink",
};

export default async function ContentPage() {
  const items = await getContent();

  return (
    <>
      <PageHeader
        label="04 — Content Creator"
        accent="coral"
        title={
          <>
            Content &amp; <span className="italic text-violet">tutorials</span>
          </>
        }
        intro="Educational content, useful AI tools, tutorials, and learning resources."
      />
      <section className="container-x pb-24 md:pb-32">
        {items.length === 0 ? (
          <EmptyState text="Fresh content is on the way." />
        ) : (
          <ul className="grid gap-x-10 gap-y-14 md:grid-cols-2 lg:grid-cols-3">
            {items.map((c, i) => (
              <Reveal as="li" key={c.id} delay={(i % 3) * 0.06} className={i % 3 === 1 ? "lg:mt-16" : ""}>
                <a
                  href={c.url ?? "#"}
                  target={c.url ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  className="group block"
                >
                  <div className="relative aspect-video overflow-hidden rounded-[1.5rem] bg-ink">
                    {c.image_url ? (
                      <SmartImage src={c.image_url} alt="" fill sizes="(min-width: 1024px) 33vw, 100vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
                    ) : (
                      <span aria-hidden className="absolute inset-0 flex items-center justify-center font-display text-6xl italic text-lavender">
                        {c.platform}
                      </span>
                    )}
                  </div>
                  <div className="mt-5 flex flex-wrap items-center gap-3 font-grotesk text-xs">
                    <span className={`rounded-full px-3 py-1 ${platformColour[c.platform] ?? "bg-lavender text-ink"}`}>
                      {c.platform}
                    </span>
                    {c.published_on && <span className="text-ink/60">{formatDate(c.published_on, true)}</span>}
                    <SampleTag show={c.is_sample} />
                  </div>
                  <h2 className="mt-3 flex items-start justify-between gap-4 font-display text-2xl leading-snug group-hover:text-violet">
                    {c.title}
                    <ArrowUpRight aria-hidden className="mt-1 size-5 shrink-0" />
                  </h2>
                  {c.summary && <p className="mt-2 text-ink/70">{c.summary}</p>}
                </a>
              </Reveal>
            ))}
          </ul>
        )}
      </section>
    </>
  );
}
