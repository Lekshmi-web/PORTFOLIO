import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

interface SectionHeadingProps {
  number: string;
  label: string;
  title: React.ReactNode;
  href?: string;
  linkText?: string;
  tone?: "light" | "dark";
}

export function SectionHeading({
  number,
  label,
  title,
  href,
  linkText = "View all",
  tone = "light",
}: SectionHeadingProps) {
  const muted = tone === "dark" ? "text-canvas/70" : "text-ink/60";
  return (
    <div className="mb-12 flex flex-col gap-6 md:mb-16 md:flex-row md:items-end md:justify-between">
      <div className="max-w-3xl">
        <p className={`eyebrow mb-5 flex items-center gap-3 ${muted}`}>
          <span className={tone === "dark" ? "text-lime" : "text-violet"}>{number}</span>
          <span aria-hidden className="h-px w-10 bg-current" />
          {label}
        </p>
        <h2 className="display text-4xl sm:text-5xl lg:text-6xl">{title}</h2>
      </div>
      {href && (
        <Link
          href={href}
          className={`group inline-flex items-center gap-2 font-grotesk text-sm font-medium ${
            tone === "dark" ? "text-lime" : "text-violet"
          }`}
        >
          <span className="link-underline">{linkText}</span>
          <ArrowUpRight
            aria-hidden
            className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
          />
        </Link>
      )}
    </div>
  );
}
