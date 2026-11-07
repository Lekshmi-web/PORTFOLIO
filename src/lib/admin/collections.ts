import type { CollectionKey } from "@/lib/types";

export type FieldType = "text" | "textarea" | "url" | "number" | "date" | "boolean" | "tags" | "image" | "select" | "slug";

export interface Field {
  name: string;
  label: string;
  type: FieldType;
  required?: boolean;
  help?: string;
  options?: string[];
  /** Field the slug is generated from when left empty. */
  from?: string;
}

export interface CollectionConfig {
  key: CollectionKey;
  label: string;
  singular: string;
  /** Column shown as the row title in the admin list. */
  titleField: string;
  /** Public page to preview this collection. */
  publicPath: string;
  fields: Field[];
}

const display: Field[] = [
  { name: "featured", label: "Show on homepage", type: "boolean" },
  { name: "published", label: "Published (visible on the site)", type: "boolean" },
  { name: "sort_order", label: "Order", type: "number", help: "Lower numbers appear first." },
  { name: "is_sample", label: "This is sample content", type: "boolean", help: "Untick once it's real. Sample items show a “Sample” tag." },
];

export const collections: Record<CollectionKey, CollectionConfig> = {
  explore_categories: {
    key: "explore_categories",
    label: "Explore Categories",
    singular: "Category",
    titleField: "title",
    publicPath: "/#explore",
    fields: [
      { name: "number", label: "Number", type: "text", required: true, help: "e.g. 01" },
      { name: "title", label: "Title", type: "text", required: true },
      { name: "description", label: "Description", type: "textarea" },
      { name: "image_url", label: "Image", type: "image", help: "Portrait or landscape photo. Shown large on desktop." },
      { name: "href", label: "Links to", type: "select", required: true, options: ["/projects", "/workshops", "/achievements", "/content", "/resources", "/about", "/contact"] },
      ...display.filter((f) => f.name !== "featured"),
    ],
  },
  projects: {
    key: "projects",
    label: "Projects",
    singular: "Project",
    titleField: "title",
    publicPath: "/projects",
    fields: [
      { name: "title", label: "Title", type: "text", required: true },
      { name: "slug", label: "URL slug", type: "slug", from: "title", help: "Leave empty to generate from the title." },
      { name: "summary", label: "One-line summary", type: "textarea" },
      { name: "problem", label: "The problem", type: "textarea" },
      { name: "role", label: "What I built / my role", type: "textarea" },
      { name: "outcome", label: "Outcome / impact", type: "textarea" },
      { name: "tech", label: "Tech stack", type: "tags", help: "Comma separated, e.g. Python, LangChain, Next.js" },
      { name: "image_url", label: "Cover image", type: "image" },
      { name: "live_url", label: "Live link", type: "url" },
      { name: "repo_url", label: "GitHub link", type: "url" },
      ...display,
    ],
  },
  workshops: {
    key: "workshops",
    label: "Workshops",
    singular: "Workshop",
    titleField: "title",
    publicPath: "/workshops",
    fields: [
      { name: "title", label: "Title", type: "text", required: true },
      { name: "slug", label: "URL slug", type: "slug", from: "title", help: "Leave empty to generate from the title." },
      { name: "summary", label: "Short summary", type: "textarea" },
      { name: "details", label: "Full details", type: "textarea" },
      { name: "event_date", label: "Date", type: "date" },
      { name: "location", label: "Location / venue", type: "text" },
      { name: "audience", label: "Audience", type: "text", help: "e.g. Engineering students" },
      { name: "format", label: "Format", type: "select", options: ["Hands-on", "Bootcamp", "Talk", "Webinar", "Mentoring", "Training"] },
      { name: "topics", label: "Topics", type: "tags", help: "Comma separated" },
      { name: "image_url", label: "Photo", type: "image" },
      { name: "register_url", label: "Registration link", type: "url" },
      ...display,
    ],
  },
  resources: {
    key: "resources",
    label: "Resources",
    singular: "Resource",
    titleField: "title",
    publicPath: "/resources",
    fields: [
      { name: "title", label: "Title", type: "text", required: true },
      { name: "description", label: "Description", type: "textarea" },
      { name: "kind", label: "Type", type: "select", required: true, options: ["Guide", "Notes", "Tool", "Tutorial", "Datasets", "Template", "Cheat sheet"] },
      { name: "url", label: "Link", type: "url" },
      { name: "image_url", label: "Image (optional)", type: "image" },
      ...display,
    ],
  },
  content_items: {
    key: "content_items",
    label: "Content",
    singular: "Content item",
    titleField: "title",
    publicPath: "/content",
    fields: [
      { name: "title", label: "Title", type: "text", required: true },
      { name: "summary", label: "Summary", type: "textarea" },
      { name: "platform", label: "Platform", type: "select", required: true, options: ["YouTube", "Article", "LinkedIn", "Instagram", "Podcast", "Other"] },
      { name: "url", label: "Link", type: "url" },
      { name: "image_url", label: "Thumbnail", type: "image" },
      { name: "published_on", label: "Published on", type: "date" },
      ...display,
    ],
  },
  achievements: {
    key: "achievements",
    label: "Achievements & Events",
    singular: "Achievement",
    titleField: "title",
    publicPath: "/achievements",
    fields: [
      { name: "title", label: "Title", type: "text", required: true },
      { name: "kind", label: "Type", type: "select", required: true, options: ["Award", "Speaking", "Event", "Milestone", "Certification", "Recognition"] },
      { name: "organisation", label: "Organisation / event", type: "text" },
      { name: "happened_on", label: "Date", type: "date" },
      { name: "description", label: "Description", type: "textarea" },
      { name: "image_url", label: "Photo", type: "image" },
      { name: "link_url", label: "Link", type: "url" },
      ...display,
    ],
  },
  testimonials: {
    key: "testimonials",
    label: "Testimonials",
    singular: "Testimonial",
    titleField: "name",
    publicPath: "/testimonials",
    fields: [
      { name: "quote", label: "Quote", type: "textarea", required: true, help: "Only real feedback, with the person's permission." },
      { name: "name", label: "Name", type: "text", required: true },
      { name: "role", label: "Role / context", type: "text", help: "e.g. B.Tech student, workshop attendee" },
      { name: "image_url", label: "Photo (optional)", type: "image" },
      ...display,
    ],
  },
};

export function getCollection(key: string): CollectionConfig | null {
  return key in collections ? collections[key as CollectionKey] : null;
}
