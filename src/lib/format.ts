/** "2026-03-14" → "Mar 2026". Returns null for empty input. */
export function formatDate(value: string | null | undefined, withDay = false): string | null {
  if (!value) return null;
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return value;
  return d.toLocaleDateString("en-GB", {
    day: withDay ? "numeric" : undefined,
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  });
}

export interface Stat {
  value: number;
  /** Text right after the number, e.g. "+" or "k+". */
  suffix: string;
  label: string;
  decimals: number;
}

/** "25+ Workshops run" → { value: 25, suffix: "+", label: "Workshops run" }. Returns null if no leading number. */
export function parseStat(line: string): Stat | null {
  const m = line.trim().match(/^(\d[\d,]*(?:\.\d+)?)(\S*)\s+(.+)$/);
  if (!m) return null;
  return {
    value: Number.parseFloat(m[1].replace(/,/g, "")),
    suffix: m[2],
    label: m[3],
    decimals: m[1].includes(".") ? m[1].split(".")[1].length : 0,
  };
}

/** Unique, case-insensitive merge of tag lists, keeping the first spelling seen. */
export function uniqueTags(...lists: string[][]): string[] {
  const seen = new Map<string, string>();
  for (const list of lists) for (const t of list) if (t && !seen.has(t.toLowerCase())) seen.set(t.toLowerCase(), t);
  return Array.from(seen.values());
}

/** Returns the YouTube video id for watch / youtu.be / shorts / embed links, else null. */
export function youTubeId(url: string | null | undefined): string | null {
  if (!url) return null;
  const m = url.match(/(?:youtube\.com\/(?:watch\?(?:.*&)?v=|shorts\/|embed\/|live\/)|youtu\.be\/)([\w-]{11})/);
  return m ? m[1] : null;
}

/** "My Project Name!" → "my-project-name" */
export function slugify(input: string): string {
  return input
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}
