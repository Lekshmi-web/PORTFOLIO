import type { Metadata } from "next";
import { EmptyState } from "@/components/site/EmptyState";
import { PageHeader } from "@/components/site/PageHeader";
import { ProjectExplorer } from "@/components/site/ProjectExplorer";
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
        {projects.length === 0 ? <EmptyState text="Projects are on their way." /> : <ProjectExplorer projects={projects} />}
      </section>
    </>
  );
}
