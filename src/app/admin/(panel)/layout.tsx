import Link from "next/link";
import { redirect } from "next/navigation";
import { ExternalLink, LogOut } from "lucide-react";
import { AdminNav } from "@/components/admin/AdminNav";
import { SetupNotice } from "@/components/admin/SetupNotice";
import { signOut } from "@/app/admin/actions";
import { getAdminStatus } from "@/lib/admin/auth";

export default async function PanelLayout({ children }: { children: React.ReactNode }) {
  const status = await getAdminStatus();

  if (status.state === "not-configured") {
    return (
      <div className="mx-auto max-w-xl px-5 py-20">
        <div className="rounded-2xl bg-white p-8 shadow-sm ring-1 ring-ink/5">
          <SetupNotice />
        </div>
      </div>
    );
  }
  if (status.state === "signed-out") redirect("/admin/login");
  if (status.state === "not-admin") {
    return (
      <div className="mx-auto max-w-xl space-y-4 px-5 py-20 text-sm leading-relaxed">
        <h1 className="font-display text-3xl">Almost there</h1>
        <p>
          You&apos;re signed in as <strong>{status.email}</strong>, but this account isn&apos;t an admin yet. In Supabase →
          SQL Editor, run:
        </p>
        <pre className="overflow-x-auto rounded-xl bg-ink p-4 text-xs text-lime">
          {`insert into public.admins (user_id) values ('${status.userId}');`}
        </pre>
        <p>Then refresh this page.</p>
        <form action={signOut}>
          <button className="underline">Sign out</button>
        </form>
      </div>
    );
  }

  return (
    <div className="lg:grid lg:min-h-screen lg:grid-cols-[260px_1fr]">
      <aside className="border-b border-ink/10 bg-ink text-canvas lg:sticky lg:top-0 lg:h-screen lg:border-b-0">
        <div className="flex h-full flex-col p-5">
          <Link href="/admin" className="font-display text-2xl">
            Lekshmi <span className="italic text-lime">R</span>
            <span className="text-pink">.</span>
            <span className="ml-2 align-middle font-grotesk text-xs uppercase tracking-widest text-canvas/60">admin</span>
          </Link>
          <AdminNav />
          <div className="mt-4 flex flex-wrap gap-4 text-sm lg:mt-auto lg:block lg:space-y-2 lg:pt-6">
            <Link href="/" target="_blank" className="flex items-center gap-2 text-canvas/70 hover:text-lime">
              <ExternalLink className="size-4" aria-hidden /> View site
            </Link>
            <form action={signOut}>
              <button className="flex items-center gap-2 text-canvas/70 hover:text-lime">
                <LogOut className="size-4" aria-hidden /> Sign out
              </button>
            </form>
            <p className="hidden truncate pt-2 text-xs text-canvas/40 lg:block">{status.email}</p>
          </div>
        </div>
      </aside>
      <div className="min-w-0 px-5 py-8 md:px-10 md:py-12">{children}</div>
    </div>
  );
}
