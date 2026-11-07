"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

const links = [
  { href: "/projects", label: "Work" },
  { href: "/workshops", label: "Workshops" },
  { href: "/resources", label: "Resources" },
  { href: "/content", label: "Content" },
  { href: "/achievements", label: "Journey" },
  { href: "/about", label: "About" },
];

export function Navbar({ name }: { name: string }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const [first, ...rest] = name.split(" ");

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled && !open ? "bg-canvas/85 backdrop-blur-md shadow-[0_1px_0_rgba(33,27,43,0.08)]" : ""
      }`}
    >
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-ink focus:px-4 focus:py-2 focus:text-canvas"
      >
        Skip to content
      </a>
      <nav className="container-x flex h-20 items-center justify-between" aria-label="Main">
        <Link
          href="/"
          className={`relative z-50 font-display text-2xl font-medium tracking-tight ${open ? "text-canvas" : ""}`}
        >
          {first}
          {rest.length > 0 && (
            <span className={`italic ${open ? "text-lime" : "text-violet"}`}> {rest.join(" ")}</span>
          )}
          <span className="text-pink">.</span>
        </Link>

        <ul className="hidden items-center gap-8 lg:flex">
          {links.map((l) => {
            const active = pathname === l.href || pathname.startsWith(`${l.href}/`);
            return (
              <li key={l.href}>
                <Link
                  href={l.href}
                  aria-current={active ? "page" : undefined}
                  className={`link-underline font-grotesk text-sm ${active ? "text-violet" : "text-ink/80 hover:text-ink"}`}
                >
                  {l.label}
                </Link>
              </li>
            );
          })}
          <li>
            <Link
              href="/contact"
              className="rounded-full bg-ink px-5 py-2.5 font-grotesk text-sm font-medium text-canvas transition-colors duration-300 hover:bg-violet"
            >
              Let&apos;s Connect
            </Link>
          </li>
        </ul>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          className={`relative z-50 inline-flex size-11 items-center justify-center rounded-full lg:hidden ${
            open ? "bg-lime text-ink" : "bg-ink text-canvas"
          }`}
        >
          {open ? <X className="size-5" aria-hidden /> : <Menu className="size-5" aria-hidden />}
        </button>
      </nav>

      <div
        id="mobile-menu"
        hidden={!open}
        className="fixed inset-0 z-40 overflow-y-auto bg-ink px-5 pb-10 pt-28 text-canvas lg:hidden"
      >
        <ul className="space-y-2">
          {[...links, { href: "/testimonials", label: "Testimonials" }, { href: "/contact", label: "Contact" }].map(
            (l, i) => (
              <li key={l.href} className="border-b border-canvas/15">
                <Link href={l.href} className="flex items-baseline gap-4 py-4">
                  <span className="eyebrow text-lime">{String(i + 1).padStart(2, "0")}</span>
                  <span className="font-display text-4xl">{l.label}</span>
                </Link>
              </li>
            ),
          )}
        </ul>
      </div>
    </header>
  );
}
