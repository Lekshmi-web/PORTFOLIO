export interface SiteSettings {
  full_name: string;
  roles: string[];
  hero_headline: string | null;
  hero_intro: string | null;
  about_short: string | null;
  about_long: string | null;
  core_message: string | null;
  portrait_url: string | null;
  location: string | null;
  email: string | null;
  linkedin_url: string | null;
  github_url: string | null;
  youtube_url: string | null;
  instagram_url: string | null;
  resume_url: string | null;
  skills: string[];
}

interface Base {
  id: string;
  sort_order: number;
  published: boolean;
  featured?: boolean;
  is_sample: boolean;
}

export interface ExploreCategory extends Base {
  number: string;
  title: string;
  description: string | null;
  image_url: string | null;
  href: string;
}

export interface Project extends Base {
  slug: string;
  title: string;
  summary: string | null;
  problem: string | null;
  role: string | null;
  outcome: string | null;
  tech: string[];
  image_url: string | null;
  live_url: string | null;
  repo_url: string | null;
  featured: boolean;
}

export interface Workshop extends Base {
  slug: string;
  title: string;
  summary: string | null;
  details: string | null;
  event_date: string | null;
  location: string | null;
  audience: string | null;
  format: string | null;
  topics: string[];
  image_url: string | null;
  register_url: string | null;
  featured: boolean;
}

export interface Resource extends Base {
  title: string;
  description: string | null;
  kind: string;
  url: string | null;
  image_url: string | null;
  featured: boolean;
}

export interface ContentItem extends Base {
  title: string;
  summary: string | null;
  platform: string;
  url: string | null;
  image_url: string | null;
  published_on: string | null;
  featured: boolean;
}

export interface Achievement extends Base {
  title: string;
  description: string | null;
  kind: string;
  happened_on: string | null;
  organisation: string | null;
  image_url: string | null;
  link_url: string | null;
  featured: boolean;
}

export interface Testimonial extends Base {
  quote: string;
  name: string;
  role: string | null;
  image_url: string | null;
  featured: boolean;
}

export interface Message {
  id: string;
  name: string;
  email: string;
  subject: string | null;
  body: string;
  is_read: boolean;
  created_at: string;
}

export type CollectionKey =
  | "explore_categories"
  | "projects"
  | "workshops"
  | "resources"
  | "content_items"
  | "achievements"
  | "testimonials";

export interface CollectionMap {
  explore_categories: ExploreCategory;
  projects: Project;
  workshops: Workshop;
  resources: Resource;
  content_items: ContentItem;
  achievements: Achievement;
  testimonials: Testimonial;
}
