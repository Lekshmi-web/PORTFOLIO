import { ContactCTA } from "@/components/site/sections/ContactCTA";
import { Explore } from "@/components/site/sections/Explore";
import { Hero } from "@/components/site/sections/Hero";
import { Journey } from "@/components/site/sections/Journey";
import { PinnedProjects } from "@/components/site/sections/PinnedProjects";
import { ResourcesContent } from "@/components/site/sections/ResourcesContent";
import { Stats } from "@/components/site/sections/Stats";
import { TechMarquee } from "@/components/site/sections/TechMarquee";
import { TestimonialRiver } from "@/components/site/sections/TestimonialRiver";
import { WorkshopsStrip } from "@/components/site/sections/WorkshopsStrip";
import {
  getAchievements,
  getCategories,
  getContent,
  getProjects,
  getResources,
  getSettings,
  getTestimonials,
  getWorkshops,
} from "@/lib/data";
import { uniqueTags } from "@/lib/format";

export const revalidate = 60;

export default async function HomePage() {
  const [settings, categories, projects, allProjects, workshops, resources, content, achievements, testimonials] =
    await Promise.all([
      getSettings(),
      getCategories(),
      getProjects(true, 6),
      getProjects(),
      getWorkshops(true, 6),
      getResources(true, 4),
      getContent(true, 3),
      getAchievements(true, 4),
      getTestimonials(true, 8),
    ]);

  // Real tags only: your skills plus the tech listed on your projects.
  const tech = uniqueTags(settings.skills, ...allProjects.map((p) => p.tech));

  return (
    <>
      <Hero settings={settings} />
      <Stats lines={settings.stats ?? []} />
      <Explore categories={categories} />
      <TechMarquee items={tech} />
      <PinnedProjects projects={projects} />
      <WorkshopsStrip workshops={workshops} />
      <ResourcesContent resources={resources} content={content} />
      <Journey achievements={achievements} />
      <TestimonialRiver testimonials={testimonials} />
      <ContactCTA settings={settings} />
    </>
  );
}
