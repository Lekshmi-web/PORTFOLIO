import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Magnetic } from "./fx/Magnetic";

type Variant = "primary" | "outline" | "violet";

const styles: Record<Variant, string> = {
  primary:
    "bg-lime text-void shadow-[0_0_0_0_rgba(216,241,107,0)] hover:shadow-[0_0_32px_-4px_rgba(216,241,107,0.55)]",
  outline: "border border-white/20 text-canvas hover:border-lime hover:text-lime",
  violet: "bg-violet text-canvas hover:shadow-[0_0_32px_-4px_rgba(84,39,168,0.9)]",
};

interface ButtonLinkProps {
  href: string;
  children: React.ReactNode;
  variant?: Variant;
  arrow?: boolean;
  external?: boolean;
}

export function ButtonLink({ href, children, variant = "primary", arrow = true, external }: ButtonLinkProps) {
  const className = `group inline-flex items-center gap-2 rounded-full px-5 py-3 font-grotesk text-sm font-medium transition-[box-shadow,border-color,color] duration-300 ${styles[variant]}`;
  const inner = (
    <>
      {children}
      {arrow && <ArrowRight aria-hidden className="size-4 transition-transform duration-300 group-hover:translate-x-1" />}
    </>
  );
  return (
    <Magnetic>
      {external ? (
        <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
          {inner}
        </a>
      ) : (
        <Link href={href} className={className}>
          {inner}
        </Link>
      )}
    </Magnetic>
  );
}
