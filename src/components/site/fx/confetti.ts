import { prefersReducedMotion } from "./motion";

const COLORS = ["#D8F16B", "#FF6E91", "#D9C9F5", "#E76B45", "#5427A8", "#F1EBDD"];

/** Fires a palette-coloured confetti burst. Loads the library only when needed; skipped for reduced motion. */
export async function burst(origin: { x: number; y: number } = { x: 0.5, y: 0.6 }) {
  if (prefersReducedMotion()) return;
  const { default: confetti } = await import("canvas-confetti");
  const base = { colors: COLORS, origin, disableForReducedMotion: true, zIndex: 95 };
  confetti({ ...base, particleCount: 70, spread: 70, startVelocity: 42, scalar: 0.9 });
  setTimeout(() => confetti({ ...base, particleCount: 40, spread: 110, startVelocity: 28, scalar: 0.7 }), 180);
}

/** Origin for burst() from an element's on-screen centre. */
export function originOf(el: Element): { x: number; y: number } {
  const r = el.getBoundingClientRect();
  return { x: (r.left + r.width / 2) / window.innerWidth, y: (r.top + r.height / 2) / window.innerHeight };
}
