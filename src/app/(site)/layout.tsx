import { CommandPalette, type PaletteItem } from "@/components/site/CommandPalette";
import { Footer } from "@/components/site/Footer";
import { Navbar } from "@/components/site/Navbar";
import { BootIntro } from "@/components/site/fx/BootIntro";
import { CustomCursor } from "@/components/site/fx/CustomCursor";
import { MotionProvider } from "@/components/site/fx/MotionProvider";
import { ScrollProgress } from "@/components/site/fx/ScrollProgress";
import { SmoothScroll } from "@/components/site/fx/SmoothScroll";
import { SpotlightTracker } from "@/components/site/fx/SpotlightTracker";
import { getProjects, getSettings, getWorkshops } from "@/lib/data";

const pages: PaletteItem[] = [
  { label: "Home", href: "/", group: "pages", hint: "/" },
  { label: "About", href: "/about", group: "pages", hint: "/about" },
  { label: "Projects", href: "/projects", group: "pages", hint: "/projects" },
  { label: "Workshops", href: "/workshops", group: "pages", hint: "/workshops" },
  { label: "Resources", href: "/resources", group: "pages", hint: "/resources" },
  { label: "Content", href: "/content", group: "pages", hint: "/content" },
  { label: "Achievements", href: "/achievements", group: "pages", hint: "/achievements" },
  { label: "Testimonials", href: "/testimonials", group: "pages", hint: "/testimonials" },
  { label: "Contact", href: "/contact", group: "pages", hint: "/contact" },
];

export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  const [settings, projects, workshops] = await Promise.all([getSettings(), getProjects(), getWorkshops()]);

  const items: PaletteItem[] = [
    ...pages,
    ...projects.map((p) => ({ label: p.title, href: `/projects/${p.slug}`, group: "projects", hint: p.tech[0] })),
    ...workshops.map((w) => ({ label: w.title, href: `/workshops/${w.slug}`, group: "workshops", hint: w.format ?? undefined })),
    ...(settings.github_url ? [{ label: "GitHub", href: settings.github_url, group: "links", hint: "↗", external: true }] : []),
    ...(settings.linkedin_url ? [{ label: "LinkedIn", href: settings.linkedin_url, group: "links", hint: "↗", external: true }] : []),
    ...(settings.email ? [{ label: `Email ${settings.email}`, href: `mailto:${settings.email}`, group: "links", hint: "✉", external: true }] : []),
  ];

  return (
    <MotionProvider>
      <div className="site min-h-screen">
        <BootIntro name={settings.full_name} />
        <ScrollProgress />
        <Navbar name={settings.full_name} />
        <main id="main">{children}</main>
        <Footer settings={settings} />
        <CommandPalette items={items} />
        <CustomCursor />
        <SpotlightTracker />
        <SmoothScroll />
      </div>
    </MotionProvider>
  );
}
