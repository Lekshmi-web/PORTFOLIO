export function SampleTag({ show }: { show: boolean }) {
  if (!show) return null;
  return (
    <span
      className="eyebrow inline-flex items-center rounded-full bg-pink px-2 py-0.5 text-[10px] text-ink"
      title="Placeholder content — replace it in the admin panel"
    >
      Sample
    </span>
  );
}
