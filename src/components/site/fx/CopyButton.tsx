"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";

interface CopyButtonProps {
  value: string;
  label?: string;
  className?: string;
  /** Show the label text next to the icon. */
  showLabel?: boolean;
}

/** Copies a value to the clipboard and confirms with a short "copied" state. */
export function CopyButton({ value, label = "Copy link", className = "", showLabel = false }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  async function copy(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      window.prompt("Copy this:", value);
    }
  }

  return (
    <button
      type="button"
      onClick={copy}
      aria-label={label}
      title={label}
      className={`inline-flex items-center gap-1.5 rounded-full border border-white/12 px-2.5 py-1.5 font-mono text-[11px] text-canvas/75 transition-colors hover:border-lime/60 hover:text-lime ${className}`}
    >
      {copied ? <Check className="size-3.5 text-lime" aria-hidden /> : <Copy className="size-3.5" aria-hidden />}
      {(showLabel || copied) && <span>{copied ? "copied ✓" : label}</span>}
      <span className="sr-only" aria-live="polite">
        {copied ? "Copied to clipboard" : ""}
      </span>
    </button>
  );
}
