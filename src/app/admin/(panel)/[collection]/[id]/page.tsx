import Link from "next/link";
import { notFound } from "next/navigation";
import { deleteItem } from "@/app/admin/actions";
import { ConfirmButton } from "@/components/admin/ConfirmButton";
import { ItemForm } from "@/components/admin/ItemForm";
import { getCollection } from "@/lib/admin/collections";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { createClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ collection: string; id: string }> };

export default async function EditItemPage({ params }: Props) {
  const { collection, id } = await params;
  const config = getCollection(collection);
  if (!config) notFound();

  if (!isSupabaseConfigured) return null; // the layout shows setup steps
  const supabase = await createClient();
  const { data } = await supabase.from(config.key).select("*").eq("id", id).maybeSingle();
  if (!data) notFound();
  const item = data as Record<string, unknown>;

  return (
    <div className="max-w-6xl">
      <Link href={`/admin/${config.key}`} className="font-grotesk text-sm text-ink/60 hover:text-violet">
        ← {config.label}
      </Link>
      <div className="mb-8 mt-3 flex flex-wrap items-center justify-between gap-4">
        <h1 className="font-display text-4xl">Edit {config.singular.toLowerCase()}</h1>
        <ConfirmButton
          action={deleteItem.bind(null, config.key, id)}
          message={`Delete this ${config.singular.toLowerCase()} permanently? This can't be undone.`}
          className="rounded-full border border-coral px-4 py-2 text-sm text-ink hover:bg-coral"
        >
          Delete
        </ConfirmButton>
      </div>
      <ItemForm config={config} id={id} item={item} />
    </div>
  );
}
