/** Infinite strip of skills / tech as glowing chips. Pauses on hover. */
export function TechMarquee({ items }: { items: string[] }) {
  if (items.length < 3) return null;
  // Repeat so one copy is always wider than the screen, then duplicate for a seamless loop.
  const base = Array.from({ length: Math.ceil(12 / items.length) }).flatMap(() => items);
  const row = [...base, ...base];

  return (
    <section aria-label="Tools and technologies" className="pause-on-hover overflow-hidden py-6">
      <p className="sr-only">{items.join(", ")}</p>
      <div aria-hidden className="relative [mask-image:linear-gradient(90deg,transparent,#000_12%,#000_88%,transparent)]">
        <ul className="flex w-max animate-marquee gap-3">
          {row.map((t, i) => (
            <li
              key={`${t}-${i}`}
              className="flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 font-mono text-xs text-canvas/80 transition-colors hover:border-lime/60 hover:text-lime"
            >
              <span className={["text-lime", "text-pink", "text-lavender", "text-coral"][i % 4]}>◆</span>
              {t}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
