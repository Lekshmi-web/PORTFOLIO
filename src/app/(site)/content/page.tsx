import type { Metadata } from "next";
import { ContentExplorer } from "@/components/site/ContentExplorer";
import { EmptyState } from "@/components/site/EmptyState";
import { PageHeader } from "@/components/site/PageHeader";
import { getContent } from "@/lib/data";

export const metadata: Metadata = {
  title: "Content",
  description: "Videos, articles and posts — educational content, AI tools and tutorials.",
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
        {items.length === 0 ? <EmptyState text="Fresh content is on the way." /> : <ContentExplorer items={items} />}
      </section>
    </>
  );
}
