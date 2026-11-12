import { parseStat } from "@/lib/format";
import { Reveal } from "../Reveal";
import { Counter } from "../fx/Counter";

/** Animated counters from Admin → Site settings → Counters. Hidden when empty. */
export function Stats({ lines }: { lines: string[] }) {
  const stats = lines.map(parseStat).filter((s) => s !== null);
  if (!stats.length) return null;

  return (
    <section aria-label="In numbers" className="border-b border-white/10">
      <div className="container-x">
        <dl className="grid grid-cols-2 divide-white/10 md:grid-cols-4 md:divide-x">
          {stats.slice(0, 4).map((s, i) => (
            <Reveal key={s.label} delay={i * 0.08} className="flex flex-col px-2 py-8 md:px-8 md:py-10">
              <dt className="mono-label order-2 mt-2 text-canvas/65">{s.label}</dt>
              <dd className="heading order-1 text-4xl text-canvas md:text-5xl">
                <Counter value={s.value} decimals={s.decimals} suffix={s.suffix} />
              </dd>
            </Reveal>
          ))}
        </dl>
      </div>
    </section>
  );
}
