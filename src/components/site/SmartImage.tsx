import Image, { type ImageProps } from "next/image";

const SUPABASE_PUBLIC = /^https:\/\/[^/]+\.supabase\.co\/storage\/v1\/object\/public\//;

/**
 * next/image that also handles local SVG placeholders and pasted links from
 * other websites (those skip optimisation instead of crashing the page).
 */
export function SmartImage(props: ImageProps) {
  const src = typeof props.src === "string" ? props.src : "";
  const isSvg = src.toLowerCase().endsWith(".svg");
  const isLocal = src.startsWith("/");
  const isSupabase = SUPABASE_PUBLIC.test(src);
  return <Image {...props} unoptimized={isSvg || (!isLocal && !isSupabase) || props.unoptimized} />;
}
