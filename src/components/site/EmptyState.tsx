export function EmptyState({ text }: { text: string }) {
  return (
    <div className="rounded-[2rem] border-2 border-dashed border-ink/20 px-6 py-20 text-center">
      <p className="font-display text-3xl">{text}</p>
      <p className="mt-3 text-ink/60">Check back soon.</p>
    </div>
  );
}
