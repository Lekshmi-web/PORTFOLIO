import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { collections } from "@/lib/admin/collections";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { createClient } from "@/lib/supabase/server";
import type { CollectionKey } from "@/lib/types";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  if (!isSupabaseConfigured) return null; // the layout shows setup steps
  const supabase = await createClient();
  const keys = Object.keys(collections) as CollectionKey[];

  const counts = await Promise.all(
    keys.map(async (k) => {
      const [{ count: total }, { count: samples }] = await Promise.all([
        supabase.from(k).select("id", { count: "exact", head: true }),
        supabase.from(k).select("id", { count: "exact", head: true }).eq("is_sample", true),
      ]);
      return { key: k, total: total ?? 0, samples: samples ?? 0 };
    }),
  );
  const { count: unread } = await supabase
    .from("messages")
    .select("id", { count: "exact", head: true })
    .eq("is_read", false);
  const { data: settings } = await supabase.from("site_settings").select("portrait_url, email").eq("id", 1).maybeSingle();

  const totalSamples = counts.reduce((n, c) => n + c.samples, 0);
  const todo = [
    !settings?.portrait_url || settings.portrait_url.startsWith("/samples") ? { href: "/admin/settings", text: "Upload your portrait photo" } : null,
    !settings?.email ? { href: "/admin/settings", text: "Add your public email and social links" } : null,
    totalSamples > 0 ? { href: "#sections", text: `Replace or delete ${totalSamples} sample item${totalSamples === 1 ? "" : "s"}` } : null,
  ].filter(Boolean) as { href: string; text: string }[];

  return (
    <div className="max-w-5xl">
      <h1 className="font-display text-4xl md:text-5xl">Welcome back, Lekshmi</h1>
      <p className="mt-2 text-ink/60">Everything you change here goes live on your website straight away.</p>

      {(todo.length > 0 || (unread ?? 0) > 0) && (
        <div className="mt-8 rounded-2xl bg-lime p-6">
          <p className="font-grotesk text-sm font-medium uppercase tracking-widest">To do</p>
          <ul className="mt-3 space-y-2">
            {(unread ?? 0) > 0 && (
              <li>
                <Link href="/admin/messages" className="underline">
                  You have {unread} unread message{unread === 1 ? "" : "s"}
                </Link>
              </li>
            )}
            {todo.map((t) => (
              <li key={t.text}>
                <Link href={t.href} className="underline">
                  {t.text}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}

      <ul id="sections" className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {counts.map((c) => (
          <li key={c.key}>
            <Link
              href={`/admin/${c.key}`}
              className="group flex h-full flex-col justify-between rounded-2xl bg-white p-6 shadow-sm ring-1 ring-ink/5 transition hover:ring-violet"
            >
              <span className="font-display text-2xl">{collections[c.key].label}</span>
              <span className="mt-6 flex items-end justify-between">
                <span className="font-grotesk text-sm text-ink/60">
                  {c.total} item{c.total === 1 ? "" : "s"}
                  {c.samples > 0 && <span className="ml-2 rounded-full bg-pink px-2 py-0.5 text-xs text-ink">{c.samples} sample</span>}
                </span>
                <ArrowRight className="size-5 text-ink/40 group-hover:text-violet" aria-hidden />
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
