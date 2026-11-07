"use client";

import { useActionState } from "react";
import { saveSettings, type FormState } from "@/app/admin/actions";
import { settingsGroups } from "@/lib/admin/settings-fields";
import { FieldInput } from "./FieldInput";

export function SettingsForm({ values }: { values: Record<string, unknown> }) {
  const [state, action, pending] = useActionState<FormState, FormData>(saveSettings, {});

  return (
    <form action={action} className="space-y-8">
      {settingsGroups.map((g) => (
        <fieldset key={g.title} className="space-y-6 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-ink/5 md:p-8">
          <legend className="float-left mb-2 w-full font-display text-2xl">{g.title}</legend>
          {g.fields.map((f) => (
            <FieldInput key={f.name} field={f} value={values[f.name]} folder="settings" />
          ))}
        </fieldset>
      ))}
      <div className="sticky bottom-4 flex items-center gap-4 rounded-full bg-ink/95 p-2 pl-6 text-canvas shadow-xl backdrop-blur">
        <p className="flex-1 text-sm" role="status">
          {state.error ? <span className="text-pink">{state.error}</span> : state.ok ? <span className="text-lime">Saved ✓ — the site is updated.</span> : "Changes go live as soon as you save."}
        </p>
        <button
          type="submit"
          disabled={pending}
          className="rounded-full bg-lime px-6 py-3 font-grotesk text-sm font-medium text-ink disabled:opacity-60"
        >
          {pending ? "Saving…" : "Save settings"}
        </button>
      </div>
    </form>
  );
}
