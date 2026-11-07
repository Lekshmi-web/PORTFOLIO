import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

interface SectionHeadingProps {
  number: string;
  label: string;
  title: React.ReactNode;
  intro?: string;
  href?: string;
  linkText?: string;
}

export function SectionHeading({ number, label, title, intro, href, linkText = "View all" }: SectionHeadingProps) {
  return (
    <div className="mb-10 flex flex-col gap-5 md:mb-14 md:flex-row md:items-end md:justify-between">
      <div className="max-w-2xl">
        <p className="mono-label mb-4 text-lime">
          // {number} — {label}
        </p>
        <h2 className="heading text-3xl sm:text-4xl lg:text-5xl">{title}</h2>
        {intro && <p className="mt-4 max-w-xl text-canvas/65">{intro}</p>}
      </div>
      {href && (
        <Link href={href} className="group inline-flex shrink-0 items-center gap-1.5 font-mono text-xs uppercase tracking-widest text-lavender hover:text-lime">
          {linkText}
          <ArrowUpRight
            aria-hidden
            className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
          />
        </Link>
      )}
    </div>
  );
}
