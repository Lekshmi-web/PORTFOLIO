import Link from "next/link";
import { ArrowRight } from "lucide-react";

type Variant = "primary" | "outline" | "lime" | "outline-light";

const styles: Record<Variant, string> = {
  primary: "bg-violet text-canvas hover:bg-ink",
  outline: "border border-ink/80 text-ink hover:bg-ink hover:text-canvas",
  lime: "bg-lime text-ink hover:bg-canvas",
  "outline-light": "border border-canvas/70 text-canvas hover:bg-canvas hover:text-ink",
};

interface ButtonLinkProps {
  href: string;
  children: React.ReactNode;
  variant?: Variant;
  arrow?: boolean;
  external?: boolean;
}

export function ButtonLink({ href, children, variant = "primary", arrow = true, external }: ButtonLinkProps) {
  const className = `group inline-flex items-center gap-2 rounded-full px-6 py-3.5 font-grotesk text-sm font-medium transition-colors duration-300 ${styles[variant]}`;
  const inner = (
    <>
      {children}
      {arrow && (
        <ArrowRight aria-hidden className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
      )}
    </>
  );
  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
        {inner}
      </a>
    );
  }
  return (
    <Link href={href} className={className}>
      {inner}
    </Link>
  );
}
