"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Award,
  BookOpen,
  Folder,
  LayoutDashboard,
  LayoutGrid,
  Mail,
  Quote,
  Play,
  Presentation,
  Settings,
} from "lucide-react";

const items = [
  { href: "/admin", label: "Dashboard", Icon: LayoutDashboard },
  { href: "/admin/settings", label: "Site settings", Icon: Settings },
  { href: "/admin/explore_categories", label: "Explore categories", Icon: LayoutGrid },
  { href: "/admin/projects", label: "Projects", Icon: Folder },
  { href: "/admin/workshops", label: "Workshops", Icon: Presentation },
  { href: "/admin/resources", label: "Resources", Icon: BookOpen },
  { href: "/admin/content_items", label: "Content", Icon: Play },
  { href: "/admin/achievements", label: "Achievements", Icon: Award },
  { href: "/admin/testimonials", label: "Testimonials", Icon: Quote },
  { href: "/admin/messages", label: "Messages", Icon: Mail },
];

export function AdminNav() {
  const pathname = usePathname();
  return (
    <nav aria-label="Admin" className="-mx-5 mt-6 overflow-x-auto px-5 lg:mx-0 lg:overflow-visible lg:px-0">
      <ul className="flex gap-1 lg:flex-col">
        {items.map(({ href, label, Icon }) => {
          const active = href === "/admin" ? pathname === "/admin" : pathname.startsWith(href);
          return (
            <li key={href}>
              <Link
                href={href}
                aria-current={active ? "page" : undefined}
                className={`flex items-center gap-3 whitespace-nowrap rounded-lg px-3 py-2 text-sm transition-colors ${
                  active ? "bg-lime text-ink" : "text-canvas/75 hover:bg-canvas/10 hover:text-canvas"
                }`}
              >
                <Icon className="size-4 shrink-0" aria-hidden />
                {label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
