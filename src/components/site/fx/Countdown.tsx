"use client";

import { useEffect, useState } from "react";

function parts(ms: number) {
  const s = Math.max(0, Math.floor(ms / 1000));
  return { days: Math.floor(s / 86400), hours: Math.floor((s % 86400) / 3600), mins: Math.floor((s % 3600) / 60), secs: s % 60 };
}

/** Live countdown to a date (YYYY-MM-DD, treated as 9:00 India time). */
export function Countdown({ date }: { date: string }) {
  const target = new Date(`${date.slice(0, 10)}T09:00:00+05:30`).getTime();
  const [now, setNow] = useState<number | null>(null);

  useEffect(() => {
    setNow(Date.now());
    const t = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(t);
  }, []);

  if (Number.isNaN(target)) return null;
  const p = parts(now === null ? 0 : target - now);
  const cells = [
    { v: p.days, l: "days" },
    { v: p.hours, l: "hrs" },
    { v: p.mins, l: "min" },
    { v: p.secs, l: "sec" },
  ];

  return (
    <div className="flex gap-2" role="timer" aria-label={now === null ? "Countdown" : `${p.days} days, ${p.hours} hours to go`}>
      {cells.map((c) => (
        <div key={c.l} className="min-w-[64px] rounded-xl border border-white/10 bg-void/60 px-3 py-2 text-center">
          <p className="heading text-2xl tabular-nums text-lime md:text-3xl" aria-hidden>
            {now === null ? "--" : String(c.v).padStart(2, "0")}
          </p>
          <p className="mono-label text-canvas/60" aria-hidden>
            {c.l}
          </p>
        </div>
      ))}
    </div>
  );
}
