import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-canvas px-6 text-center text-ink">
      <p className="display text-[clamp(6rem,20vw,14rem)] text-violet">404</p>
      <p className="font-display text-3xl">This page wandered off.</p>
      <Link href="/" className="mt-10 rounded-full bg-ink px-6 py-3 font-grotesk text-sm text-canvas hover:bg-violet">
        Back home
      </Link>
    </main>
  );
}
