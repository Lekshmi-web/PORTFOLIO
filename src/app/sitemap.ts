import type { MetadataRoute } from "next";
import { getProjects, getWorkshops } from "@/lib/data";

const base = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const pages = ["", "/about", "/projects", "/workshops", "/resources", "/content", "/achievements", "/testimonials", "/contact"];
  const [projects, workshops] = await Promise.all([getProjects(), getWorkshops()]);
  return [
    ...pages.map((p) => ({ url: `${base}${p}`, changeFrequency: "weekly" as const, priority: p === "" ? 1 : 0.7 })),
    ...projects.filter((p) => !p.is_sample).map((p) => ({ url: `${base}/projects/${p.slug}`, priority: 0.6 })),
    ...workshops.filter((w) => !w.is_sample).map((w) => ({ url: `${base}/workshops/${w.slug}`, priority: 0.6 })),
  ];
}
