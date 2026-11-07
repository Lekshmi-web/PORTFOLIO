import Link from "next/link";
import type { SiteSettings } from "@/lib/types";
import { SocialLinks } from "./SocialLinks";

const groups = [
  {
    title: "Explore",
    links: [
      { href: "/projects", label: "Projects" },
      { href: "/workshops", label: "Workshops" },
      { href: "/resources", label: "Resources" },
      { href: "/content", label: "Content" },
    ],
  },
  {
    title: "About",
    links: [
      { href: "/about", label: "My story" },
      { href: "/achievements", label: "Achievements" },
      { href: "/testimonials", label: "Testimonials" },
      { href: "/contact", label: "Contact" },
    ],
  },
];

export function Footer({ settings }: { settings: SiteSettings }) {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-ink text-canvas">
      <div className="container-x grid gap-14 py-20 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <p className="display text-3xl sm:text-4xl">
            {settings.core_message ?? "I build AI. I teach technology. I inspire people to create."}
          </p>
          <SocialLinks settings={settings} className="mt-8 text-canvas" />
        </div>
        {groups.map((g) => (
          <nav key={g.title} aria-label={g.title}>
            <p className="eyebrow mb-5 text-lime">{g.title}</p>
            <ul className="space-y-3">
              {g.links.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="link-underline text-canvas/80 hover:text-canvas">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>
      <div className="container-x flex flex-col gap-2 border-t border-canvas/15 py-6 font-grotesk text-xs text-canvas/60 sm:flex-row sm:justify-between">
        <p>
          © {year} {settings.full_name}. All rights reserved.
        </p>
        <p>{settings.roles.slice(0, 4).join(" · ")}</p>
      </div>
    </footer>
  );
}
