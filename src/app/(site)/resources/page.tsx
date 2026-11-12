import type { Metadata } from "next";
import { EmptyState } from "@/components/site/EmptyState";
import { PageHeader } from "@/components/site/PageHeader";
import { ResourceExplorer } from "@/components/site/ResourceExplorer";
import { getResources } from "@/lib/data";

export const metadata: Metadata = {
  title: "Resources",
  description: "Free learning materials, notes, tools and guides for learning AI and programming.",
};

export default async function ResourcesPage() {
  const resources = await getResources();

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
        {resources.length === 0 ? <EmptyState text="Resources are being prepared." /> : <ResourceExplorer resources={resources} />}
      </section>
    </>
  );
}
