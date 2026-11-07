import type { Field } from "./collections";

export interface SettingsGroup {
  title: string;
  fields: Field[];
}

export const settingsGroups: SettingsGroup[] = [
  {
    title: "Identity",
    fields: [
      { name: "full_name", label: "Full name", type: "text", required: true },
      { name: "roles", label: "Roles", type: "tags", help: "Comma separated, in order. The first one shows on your portrait badge." },
      { name: "portrait_url", label: "Portrait photo", type: "image", help: "Vertical (4:5) works best, at least 1000px tall." },
      { name: "location", label: "Location", type: "text" },
    ],
  },
  {
    title: "Homepage hero",
    fields: [
      { name: "hero_headline", label: "Headline", type: "text", help: "Each sentence gets its own line and style." },
      { name: "hero_intro", label: "Introduction", type: "textarea" },
      { name: "core_message", label: "Core message", type: "text", help: "Shown in the footer and About page." },
    ],
  },
  {
    title: "About",
    fields: [
      { name: "about_short", label: "Short bio", type: "textarea" },
      { name: "about_long", label: "Full story", type: "textarea", help: "Leave a blank line between paragraphs." },
      { name: "skills", label: "Skills", type: "tags", help: "Comma separated, e.g. Python, PyTorch, LangChain" },
      { name: "resume_url", label: "Résumé (PDF)", type: "image", help: "Upload a PDF." },
    ],
  },
  {
    title: "Contact & social",
    fields: [
      { name: "email", label: "Public email", type: "text" },
      { name: "linkedin_url", label: "LinkedIn", type: "url" },
      { name: "github_url", label: "GitHub", type: "url" },
      { name: "youtube_url", label: "YouTube", type: "url" },
      { name: "instagram_url", label: "Instagram", type: "url" },
    ],
  },
];

export const settingsFields: Field[] = settingsGroups.flatMap((g) => g.fields);
