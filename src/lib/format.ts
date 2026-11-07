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
