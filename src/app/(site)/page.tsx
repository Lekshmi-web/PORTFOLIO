import { ContactCTA } from "@/components/site/sections/ContactCTA";
import { Explore } from "@/components/site/sections/Explore";
import { FeaturedProjects } from "@/components/site/sections/FeaturedProjects";
import { Hero } from "@/components/site/sections/Hero";
import { Journey } from "@/components/site/sections/Journey";
import { ResourcesContent } from "@/components/site/sections/ResourcesContent";
import { Testimonials } from "@/components/site/sections/Testimonials";
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

export const revalidate = 60;

export default async function HomePage() {
  const [settings, categories, projects, workshops, resources, content, achievements, testimonials] =
    await Promise.all([
      getSettings(),
      getCategories(),
      getProjects(true, 4),
      getWorkshops(true, 6),
      getResources(true, 4),
      getContent(true, 3),
      getAchievements(true, 4),
      getTestimonials(true, 4),
    ]);

  return (
    <>
      <Hero settings={settings} />
      <Explore categories={categories} />
      <FeaturedProjects projects={projects} />
      <WorkshopsStrip workshops={workshops} />
      <ResourcesContent resources={resources} content={content} />
      <Journey achievements={achievements} />
      <Testimonials testimonials={testimonials} />
      <ContactCTA settings={settings} />
    </>
  );
}
