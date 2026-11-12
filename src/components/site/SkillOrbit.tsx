/**
 * Skills constellation: tags orbit a glowing core on up to three rings.
 * Pure CSS animation (pauses on hover, static for reduced motion). Desktop/tablet only —
 * phones get the plain chip list.
 */
export function SkillOrbit({ skills, centre }: { skills: string[]; centre: string }) {
  if (skills.length < 3) return null;
  const rings = [
    { r: 120, dur: 38, items: [] as string[] },
    { r: 200, dur: 54, items: [] as string[] },
    { r: 280, dur: 72, items: [] as string[] },
  ];
  // Fill inner rings first, by capacity.
  const caps = [5, 8, 12];
  let k = 0;
  for (const s of skills.slice(0, 25)) {
    while (k < 2 && rings[k].items.length >= caps[k]) k++;
    rings[k].items.push(s);
  }
  const colours = ["text-lime border-lime/40", "text-pink border-pink/40", "text-lavender border-lavender/40", "text-coral border-coral/40"];

  return (
    <>
      <div className="orbit-wrap relative mx-auto hidden aspect-square w-full max-w-[640px] md:block" aria-hidden>
        <div className="glow-violet absolute left-1/2 top-1/2 size-72 -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute left-1/2 top-1/2 grid size-28 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-lime/50 bg-void text-center shadow-[0_0_60px_-10px_rgba(216,241,107,0.6)]">
          <span className="font-mono text-xs uppercase tracking-widest text-lime">{centre}</span>
        </div>
        {rings.map(
          (ring, ri) =>
            ring.items.length > 0 && (
              <div
                key={ri}
                className="orbit-anim absolute left-1/2 top-1/2 rounded-full border border-dashed border-white/10"
                style={{
                  width: ring.r * 2,
                  height: ring.r * 2,
                  marginLeft: -ring.r,
                  marginTop: -ring.r,
                  animation: `orbit ${ring.dur}s linear infinite ${ri % 2 ? "reverse" : ""}`,
                }}
              >
                {ring.items.map((skill, i) => {
                  const angle = (360 / ring.items.length) * i;
                  return (
                    <div
                      key={skill}
                      className="absolute left-1/2 top-1/2"
                      style={{ transform: `rotate(${angle}deg) translateX(${ring.r}px) rotate(${-angle}deg)` }}
                    >
                      <span
                        className={`orbit-anim block -translate-x-1/2 -translate-y-1/2 whitespace-nowrap rounded-full border bg-void/90 px-3 py-1.5 font-mono text-[11px] transition-transform duration-300 hover:scale-125 ${colours[(i + ri) % colours.length]}`}
                        style={{ animation: `counter-orbit ${ring.dur}s linear infinite ${ri % 2 ? "reverse" : ""}` }}
                      >
                        {skill}
                      </span>
                    </div>
                  );
                })}
              </div>
            ),
        )}
      </div>
      <ul className="flex flex-wrap gap-2 md:sr-only">
        {skills.map((s) => (
          <li key={s} className="chip px-4 py-2 text-xs">
            {s}
          </li>
        ))}
      </ul>
    </>
  );
}
