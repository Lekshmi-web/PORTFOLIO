export function SampleTag({ show }: { show: boolean }) {
  if (!show) return null;
  return (
    <span
      className="inline-flex items-center rounded-full bg-pink px-2 py-0.5 font-mono text-[10px] font-medium uppercase tracking-wider text-void"
      title="Placeholder content — replace it in the admin panel"
    >
      Sample
    </span>
  );
}
