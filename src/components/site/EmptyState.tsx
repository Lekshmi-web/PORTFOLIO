export function EmptyState({ text }: { text: string }) {
  return (
    <div className="glass px-6 py-16 text-center">
      <p className="font-mono text-sm text-lime">// 404: content not found (yet)</p>
      <p className="heading mt-3 text-2xl">{text}</p>
      <p className="mt-2 text-sm text-canvas/60">Check back soon.</p>
    </div>
  );
}
