import Link from "next/link";
import type { SiteSettings } from "@/lib/types";
import { SocialLinks } from "./SocialLinks";

const groups = [
  {
    title: "explore",
    links: [
      { href: "/projects", label: "Projects" },
      { href: "/workshops", label: "Workshops" },
      { href: "/resources", label: "Resources" },
      { href: "/content", label: "Content" },
    ],
  },
  {
    title: "about",
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
    <footer className="relative overflow-hidden border-t border-white/10">
      <div aria-hidden className="glow-violet absolute -bottom-60 left-1/2 size-[700px] -translate-x-1/2 opacity-60" />
      <div className="container-x relative grid gap-12 py-16 md:grid-cols-[1.5fr_1fr_1fr]">
        <div>
          <p className="heading max-w-md text-2xl sm:text-3xl">
            {settings.core_message ?? "I build AI. I teach technology. I inspire people to create."}
          </p>
          <SocialLinks settings={settings} className="mt-7 text-canvas" />
        </div>
        {groups.map((g) => (
          <nav key={g.title} aria-label={g.title}>
            <p className="mono-label mb-4 text-lime">// {g.title}</p>
            <ul className="space-y-2.5">
              {g.links.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="link-underline text-sm text-canvas/70 hover:text-canvas">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>
      <div className="container-x relative flex flex-col gap-2 border-t border-white/10 py-6 font-mono text-[11px] text-canvas/60 sm:flex-row sm:justify-between">
        <p>
          © {year} {settings.full_name}
        </p>
        <p>{settings.roles.slice(0, 4).join(" · ")}</p>
      </div>
    </footer>
  );
}
