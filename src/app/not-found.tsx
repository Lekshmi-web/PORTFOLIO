import Link from "next/link";

export default function NotFound() {
  return (
    <main className="site relative isolate flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 text-center">
      <div aria-hidden className="absolute inset-0 -z-10">
        <div className="bg-grid absolute inset-0" />
        <div className="glow-violet absolute left-1/2 top-1/2 size-[640px] -translate-x-1/2 -translate-y-1/2" />
      </div>
      <p className="font-mono text-sm text-lime">// error 404</p>
      <p className="heading mt-3 text-[clamp(4rem,14vw,9rem)]">
        <span className="glitch text-lime" data-text="404">
          404
        </span>
      </p>
      <p className="mt-2 text-lg text-canvas/70">This page wandered off the network.</p>
      <Link
        href="/"
        className="mt-8 rounded-full bg-lime px-6 py-3 font-grotesk text-sm font-medium text-void hover:shadow-[0_0_32px_-4px_rgba(216,241,107,0.6)]"
      >
        cd ~/home
      </Link>
    </main>
  );
}
