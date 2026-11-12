"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, Search, X } from "lucide-react";

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
    window.dispatchEvent(new Event(open ? "lenis:stop" : "lenis:start"));
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const openPalette = () => window.dispatchEvent(new Event("open-palette"));

  const [first, ...rest] = name.split(" ");

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-lime focus:px-4 focus:py-2 focus:text-void"
      >
        Skip to content
      </a>
      <nav
        aria-label="Main"
        className={`mx-auto flex h-14 max-w-[1240px] items-center justify-between rounded-full px-4 transition-all duration-500 sm:px-5 ${
          scrolled || open ? "border border-white/10 bg-void/70 backdrop-blur-xl" : "border border-transparent"
        }`}
      >
        <Link href="/" className="relative z-50 flex items-center gap-2 font-grotesk text-base font-medium tracking-tight">
          <span className="grid size-7 place-items-center rounded-md bg-lime font-mono text-xs font-bold text-void" aria-hidden>
            {first.charAt(0)}
            {rest[0]?.charAt(0) ?? ""}
          </span>
          {first}
          {rest.length > 0 && <span className="accent-serif text-lavender">{rest.join(" ")}</span>}
        </Link>

        <ul className="hidden items-center gap-1 lg:flex">
          {links.map((l) => {
            const active = pathname === l.href || pathname.startsWith(`${l.href}/`);
            return (
              <li key={l.href}>
                <Link
                  href={l.href}
                  aria-current={active ? "page" : undefined}
                  className={`rounded-full px-3.5 py-1.5 font-grotesk text-sm transition-colors ${
                    active ? "bg-white/10 text-canvas" : "text-canvas/70 hover:text-canvas"
                  }`}
                >
                  {l.label}
                </Link>
              </li>
            );
          })}
          <li className="ml-2">
            <button
              type="button"
              onClick={openPalette}
              className="flex items-center gap-2 rounded-full border border-white/12 px-3 py-1.5 font-mono text-[11px] text-canvas/70 transition-colors hover:border-lime/50 hover:text-canvas"
              aria-label="Search the site (Ctrl+K)"
            >
              <Search className="size-3.5" aria-hidden />
              ctrl k
            </button>
          </li>
          <li className="ml-2">
            <Link
              href="/contact"
              className="rounded-full bg-lime px-4 py-2 font-grotesk text-sm font-medium text-void transition-shadow duration-300 hover:shadow-[0_0_24px_-4px_rgba(216,241,107,0.6)]"
            >
              Let&apos;s Connect
            </Link>
          </li>
        </ul>

        <div className="flex items-center gap-2 lg:hidden">
        <button
          type="button"
          onClick={openPalette}
          aria-label="Search the site"
          className="relative z-50 inline-flex size-10 items-center justify-center rounded-full border border-white/15 text-canvas"
        >
          <Search className="size-4" aria-hidden />
        </button>
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          className="relative z-50 inline-flex size-10 items-center justify-center rounded-full border border-white/15 text-canvas lg:hidden"
        >
          {open ? <X className="size-5" aria-hidden /> : <Menu className="size-5" aria-hidden />}
        </button>
        </div>
      </nav>

      <div
        id="mobile-menu"
        hidden={!open}
        data-lenis-prevent
        className="fixed inset-0 z-40 overflow-y-auto bg-void/95 px-6 pb-10 pt-24 backdrop-blur-xl lg:hidden"
      >
        <ul>
          {[...links, { href: "/testimonials", label: "Testimonials" }, { href: "/contact", label: "Contact" }].map((l, i) => (
            <li key={l.href} className="border-b border-white/10">
              <Link href={l.href} className="flex items-baseline gap-4 py-4">
                <span className="font-mono text-xs text-lime">{String(i + 1).padStart(2, "0")}</span>
                <span className="heading text-3xl">{l.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}
