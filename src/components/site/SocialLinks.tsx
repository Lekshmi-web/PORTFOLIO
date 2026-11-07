import { Mail } from "lucide-react";
import type { SiteSettings } from "@/lib/types";
import { GithubIcon, InstagramIcon, LinkedinIcon, YoutubeIcon } from "./BrandIcons";

type Icon = (props: { className?: string }) => React.ReactElement;

export function socialItems(s: SiteSettings) {
  const items: { label: string; href: string; Icon: Icon }[] = [];
  if (s.email) items.push({ label: "Email", href: `mailto:${s.email}`, Icon: Mail as unknown as Icon });
  if (s.linkedin_url) items.push({ label: "LinkedIn", href: s.linkedin_url, Icon: LinkedinIcon });
  if (s.github_url) items.push({ label: "GitHub", href: s.github_url, Icon: GithubIcon });
  if (s.youtube_url) items.push({ label: "YouTube", href: s.youtube_url, Icon: YoutubeIcon });
  if (s.instagram_url) items.push({ label: "Instagram", href: s.instagram_url, Icon: InstagramIcon });
  return items;
}

export function SocialLinks({ settings, className = "" }: { settings: SiteSettings; className?: string }) {
  const items = socialItems(settings);
  if (!items.length) return null;
  return (
    <ul className={`flex flex-wrap gap-3 ${className}`}>
      {items.map(({ label, href, Icon }) => (
        <li key={label}>
          <a
            href={href}
            target={href.startsWith("mailto:") ? undefined : "_blank"}
            rel="noopener noreferrer"
            aria-label={label}
            className="inline-flex size-11 items-center justify-center rounded-full border border-current/30 transition-colors duration-300 hover:border-current hover:bg-current/10"
          >
            <Icon className="size-[18px]" />
          </a>
        </li>
      ))}
    </ul>
  );
}
