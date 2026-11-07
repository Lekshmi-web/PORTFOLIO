import Link from "next/link";
import { notFound } from "next/navigation";
import { Eye, EyeOff, Plus } from "lucide-react";
import { togglePublished } from "@/app/admin/actions";
import { getCollection } from "@/lib/admin/collections";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { createClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

type Props = {
  params: Promise<{ collection: string }>;
  searchParams: Promise<{ saved?: string; deleted?: string }>;
};

type Row = Record<string, unknown> & {
  id: string;
  published: boolean;
  featured?: boolean;
  is_sample: boolean;
  sort_order: number;
  image_url?: string | null;
};

export default async function CollectionPage({ params, searchParams }: Props) {
  const { collection } = await params;
  const { saved, deleted } = await searchParams;
  const config = getCollection(collection);
  if (!config) notFound();

  if (!isSupabaseConfigured) return null; // the layout shows setup steps
  const supabase = await createClient();
  const { data, error } = await supabase.from(config.key).select("*").order("sort_order").order("created_at", { ascending: false });
  const rows = (data ?? []) as Row[];

  return (
    <div className="max-w-5xl">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-4xl">{config.label}</h1>
          <p className="mt-2 text-ink/60">
            {rows.length} item{rows.length === 1 ? "" : "s"} ·{" "}
            <Link href={config.publicPath} target="_blank" className="underline">
              view on site
            </Link>
          </p>
        </div>
        <Link
          href={`/admin/${config.key}/new`}
          className="inline-flex items-center gap-2 rounded-full bg-violet px-5 py-3 font-grotesk text-sm font-medium text-canvas hover:bg-ink"
        >
          <Plus className="size-4" aria-hidden /> Add {config.singular.toLowerCase()}
        </Link>
      </div>

      {(saved || deleted) && (
        <p role="status" className="mt-6 rounded-xl bg-lime px-4 py-3 text-sm">
          {saved ? "Saved — your website is updated." : "Deleted."}
        </p>
      )}
      {error && <p className="mt-6 rounded-xl bg-coral/15 px-4 py-3 text-sm">{error.message}</p>}

      {rows.length === 0 ? (
        <p className="mt-8 rounded-2xl bg-white p-10 text-center text-ink/60 ring-1 ring-ink/5">
          Nothing here yet. Add your first {config.singular.toLowerCase()}.
        </p>
      ) : (
        <ul className="mt-8 divide-y divide-ink/5 overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-ink/5">
          {rows.map((r) => (
            <li key={r.id} className="flex items-center gap-4 p-4">
              <div className="size-14 shrink-0 overflow-hidden rounded-lg bg-lavender">
                {r.image_url ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={r.image_url} alt="" className="size-full object-cover" />
                ) : null}
              </div>
              <Link href={`/admin/${config.key}/${r.id}`} className="min-w-0 flex-1">
                <p className="truncate font-medium hover:text-violet">{String(r[config.titleField] ?? "Untitled")}</p>
                <p className="mt-1 flex flex-wrap gap-2 font-grotesk text-xs">
                  <span className="text-ink/50">#{r.sort_order}</span>
                  {r.featured && <span className="rounded-full bg-lavender px-2">Homepage</span>}
                  {!r.published && <span className="rounded-full bg-ink/10 px-2">Hidden</span>}
                  {r.is_sample && <span className="rounded-full bg-pink px-2">Sample</span>}
                </p>
              </Link>
              <form action={togglePublished.bind(null, config.key, r.id, !r.published)}>
                <button
                  className="rounded-full p-2 text-ink/50 hover:bg-ink/5 hover:text-ink"
                  aria-label={r.published ? "Hide from site" : "Show on site"}
                  title={r.published ? "Hide from site" : "Show on site"}
                >
                  {r.published ? <Eye className="size-4" aria-hidden /> : <EyeOff className="size-4" aria-hidden />}
                </button>
              </form>
              <Link href={`/admin/${config.key}/${r.id}`} className="rounded-full border border-ink/15 px-4 py-1.5 text-sm hover:border-violet">
                Edit
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
