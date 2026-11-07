"use client";

import Link from "next/link";
import { useActionState } from "react";
import { saveItem, type FormState } from "@/app/admin/actions";
import type { CollectionConfig } from "@/lib/admin/collections";
import { FieldInput } from "./FieldInput";

interface ItemFormProps {
  config: CollectionConfig;
  id: string | null;
  item: Record<string, unknown> | null;
}

const defaults: Record<string, unknown> = { published: true, featured: false, is_sample: false, sort_order: 0 };

export function ItemForm({ config, id, item }: ItemFormProps) {
  const action = saveItem.bind(null, config.key, id);
  const [state, formAction, pending] = useActionState<FormState, FormData>(action, {});
  const values = item ?? defaults;

  const main = config.fields.filter((f) => !["featured", "published", "sort_order", "is_sample"].includes(f.name));
  const side = config.fields.filter((f) => ["featured", "published", "sort_order", "is_sample"].includes(f.name));

  return (
    <form action={formAction} className="grid gap-8 lg:grid-cols-[1fr_300px]">
      <div className="space-y-6 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-ink/5 md:p-8">
        {main.map((f) => (
          <FieldInput key={f.name} field={f} value={values[f.name] ?? defaults[f.name]} folder={config.key} />
        ))}
      </div>
      <aside className="space-y-6">
        <div className="space-y-5 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-ink/5">
          {side.map((f) => (
            <FieldInput key={f.name} field={f} value={values[f.name] ?? defaults[f.name]} folder={config.key} />
          ))}
        </div>
        {state.error && (
          <p role="alert" className="rounded-xl bg-coral/15 px-4 py-3 text-sm">
            {state.error}
          </p>
        )}
        <div className="flex gap-3">
          <button
            type="submit"
            disabled={pending}
            className="flex-1 rounded-full bg-violet px-5 py-3 font-grotesk text-sm font-medium text-canvas hover:bg-ink disabled:opacity-60"
          >
            {pending ? "Saving…" : id ? "Save changes" : `Create ${config.singular.toLowerCase()}`}
          </button>
          <Link href={`/admin/${config.key}`} className="rounded-full border border-ink/20 px-5 py-3 font-grotesk text-sm">
            Cancel
          </Link>
        </div>
      </aside>
    </form>
  );
}
