/** Shared browser checks for effects. Call only in effects/handlers (client side). */

export function prefersReducedMotion(): boolean {
  return typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function hasFinePointer(): boolean {
  return typeof window !== "undefined" && window.matchMedia("(pointer: fine)").matches;
}

/** Extra delay so hero animations play after the boot intro instead of underneath it. */
export function bootDelay(): number {
  if (typeof document === "undefined" || prefersReducedMotion()) return 0;
  const boot = document.getElementById("boot");
  const skipped = boot?.hasAttribute("data-skip");
  return document.documentElement.hasAttribute("data-booted") || !boot || skipped ? 0 : 1900;
}
