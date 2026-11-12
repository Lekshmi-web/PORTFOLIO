/**
 * Fallback content.
 * - Brand copy, categories, your 4 GitHub projects and the First Rank
 *   achievement are REAL (from your brief and GitHub).
 * - Everything with is_sample: true is placeholder content. It shows only when
 *   NEXT_PUBLIC_SHOW_SAMPLES=true and the database has nothing for that section.
 */
import type {
  Achievement,
  ContentItem,
  ExploreCategory,
  Project,
  Resource,
  SiteSettings,
  Testimonial,
  Workshop,
} from "@/lib/types";

const base = { published: true, featured: true };

export const sampleSettings: SiteSettings = {
  full_name: "Lekshmi R",
  roles: ["AI Engineer", "Technical Mentor", "Educator", "Content Creator", "Lifelong Learner"],
  hero_headline: "Building with AI. Sharing Knowledge. Inspiring Engineers.",
  hero_intro:
    "I design practical artificial intelligence systems, conduct intensive hands-on workshops, and mentor engineering students and tech professionals to build, innovate, and lead.",
  about_short:
    "I am Lekshmi R, an AI Engineer, Technical Mentor, Educator and Content Creator passionate about building practical AI solutions and making technology easier for everyone to understand.",
  about_long:
    "I work at the intersection of Artificial Intelligence, software development, education and community learning. I enjoy developing real-world projects, teaching students through hands-on workshops, mentoring aspiring engineers, and sharing knowledge through digital content.\n\nMy goal is to make AI accessible, practical and useful — not just something people learn theoretically, but something they can actually build and apply.",
  core_message: "I build AI. I teach technology. I inspire people to create.",
  portrait_url: "/samples/portrait.svg",
  location: null,
  email: null,
  linkedin_url: null,
  github_url: "https://github.com/Lekshmi-web",
  youtube_url: null,
  instagram_url: null,
  resume_url: null,
  skills: [],
  stats: [],
  status_text: null,
};

export const sampleCategories: ExploreCategory[] = [
  {
    id: "cat-1", number: "01", title: "AI & Engineering",
    description: "AI projects, machine learning, LLMs, automation, and practical engineering solutions.",
    image_url: "/samples/explore-ai.svg", href: "/projects", sort_order: 1, ...base, is_sample: false,
  },
  {
    id: "cat-2", number: "02", title: "Teaching & Mentoring",
    description: "Workshops, technical training, student mentoring, and knowledge sharing.",
    image_url: "/samples/explore-teaching.svg", href: "/workshops", sort_order: 2, ...base, is_sample: false,
  },
  {
    id: "cat-3", number: "03", title: "Speaking & Events",
    description: "Speaking engagements, events, achievements, and professional experiences.",
    image_url: "/samples/explore-speaking.svg", href: "/achievements", sort_order: 3, ...base, is_sample: false,
  },
  {
    id: "cat-4", number: "04", title: "Content Creator",
    description: "Educational content, useful AI tools, tutorials, and learning resources.",
    image_url: "/samples/explore-content.svg", href: "/content", sort_order: 4, ...base, is_sample: false,
  },
];

const project = (
  i: number,
  slug: string,
  title: string,
  summary: string,
  repo: string,
  tech: string[] = [],
): Project => ({
  id: `proj-${i}`, slug, title, summary, problem: null, role: null, outcome: null, tech,
  image_url: `/samples/project-${i}.svg`, live_url: null,
  repo_url: `https://github.com/Lekshmi-web/${repo}`, gallery: [],
  sort_order: i, ...base, is_sample: false,
});

/** Real repos from github.com/Lekshmi-web — add full details in Admin → Projects. */
export const sampleProjects: Project[] = [
  project(1, "ai-interview-platform", "AI Interview Platform", "An AI-powered interview platform built with Django.", "AI-INTERVIEW-PLATFORM-DJANGO-", ["Django", "Python", "AI"]),
  project(2, "hirely-job-platform", "Hirely", "A job platform connecting candidates and employers.", "Hirely-Job-Platform"),
  project(3, "agrismart-platform", "AgriSmart", "A smart agriculture platform.", "AgriSmart-Platform"),
  project(4, "telecom-churn-dashboard", "Indian Telecom Churn Analytics", "A customer churn analytics dashboard for Indian telecom data.", "Indian-Telecom-Customer-Churn-Analytics-Dashboard", ["Data Analytics"]),
];

export const sampleWorkshops: Workshop[] = [
  {
    id: "ws-1", slug: "sample-hands-on-genai", title: "Sample: Hands-on Generative AI",
    summary: "Sample workshop — replace in Admin → Workshops.",
    details: null, event_date: null, location: null, audience: "Engineering students",
    format: "Hands-on", topics: ["LLMs", "Prompting", "Building apps"],
    image_url: "/samples/workshop-1.svg", register_url: null, gallery: [], sort_order: 1, ...base, is_sample: true,
  },
  {
    id: "ws-2", slug: "sample-python-for-ai", title: "Sample: Python for AI",
    summary: "Sample workshop — replace in Admin → Workshops.",
    details: null, event_date: null, location: null, audience: "Beginners",
    format: "Bootcamp", topics: ["Python", "Data", "ML basics"],
    image_url: "/samples/workshop-2.svg", register_url: null, gallery: [], sort_order: 2, ...base, is_sample: true,
  },
  {
    id: "ws-3", slug: "sample-mentoring-circle", title: "Sample: Project Mentoring Circle",
    summary: "Sample programme — replace in Admin → Workshops.",
    details: null, event_date: null, location: null, audience: "Final-year students",
    format: "Mentoring", topics: ["Project guidance", "Career"],
    image_url: "/samples/workshop-3.svg", register_url: null, gallery: [], sort_order: 3, ...base, is_sample: true,
  },
];

export const sampleResources: Resource[] = [
  { id: "res-1", title: "Sample: Python Notes", description: "Placeholder — link your real notes in Admin → Resources.", kind: "Notes", url: "https://github.com/Lekshmi-web/Python-Notes", image_url: null, sort_order: 1, ...base, is_sample: true },
  { id: "res-2", title: "Sample: Deep Learning Notes", description: "Placeholder — link your real notes in Admin → Resources.", kind: "Notes", url: "https://github.com/Lekshmi-web/Deep-Learning-Notes", image_url: null, sort_order: 2, ...base, is_sample: true },
  { id: "res-3", title: "Sample: Data Analytics Datasets", description: "Placeholder — link your real resources in Admin → Resources.", kind: "Datasets", url: "https://github.com/Lekshmi-web/Data-Analytics-Projects-Datasets", image_url: null, sort_order: 3, ...base, is_sample: true },
];

export const sampleContent: ContentItem[] = [
  { id: "con-1", title: "Sample video title", summary: "Sample content — add your real videos and posts in Admin → Content.", platform: "YouTube", url: null, image_url: null, published_on: null, sort_order: 1, ...base, is_sample: true },
  { id: "con-2", title: "Sample article title", summary: "Sample content — add your real articles in Admin → Content.", platform: "Article", url: null, image_url: null, published_on: null, sort_order: 2, ...base, is_sample: true },
  { id: "con-3", title: "Sample post title", summary: "Sample content — add your real posts in Admin → Content.", platform: "LinkedIn", url: null, image_url: null, published_on: null, sort_order: 3, ...base, is_sample: true },
];

export const sampleAchievements: Achievement[] = [
  {
    id: "ach-1", title: "First Rank Holder — Bachelor's in Data Science",
    description: "Ranked first in the Bachelor's in Data Science programme.",
    kind: "Award", happened_on: null, organisation: "University of Kerala",
    image_url: null, link_url: null, sort_order: 1, ...base, is_sample: false,
  },
  {
    id: "ach-2", title: "Sample: Speaking engagement",
    description: "Placeholder — add real talks and events in Admin → Achievements.",
    kind: "Speaking", happened_on: null, organisation: null,
    image_url: null, link_url: null, sort_order: 2, ...base, is_sample: true,
  },
  {
    id: "ach-3", title: "Sample: Event or milestone",
    description: "Placeholder — add real milestones in Admin → Achievements.",
    kind: "Event", happened_on: null, organisation: null,
    image_url: null, link_url: null, sort_order: 3, ...base, is_sample: true,
  },
];

export const sampleTestimonials: Testimonial[] = [
  { id: "tes-1", quote: "Sample testimonial — replace with real feedback from a student in Admin → Testimonials.", name: "Sample name", role: "Student", image_url: null, sort_order: 1, ...base, is_sample: true },
  { id: "tes-2", quote: "Sample testimonial — replace with real feedback from a collaborator in Admin → Testimonials.", name: "Sample name", role: "Collaborator", image_url: null, sort_order: 2, ...base, is_sample: true },
];
