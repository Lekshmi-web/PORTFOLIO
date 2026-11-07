import { SettingsForm } from "@/components/admin/SettingsForm";
import { getSettings } from "@/lib/data";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { createClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export default async function SettingsPage() {
  if (!isSupabaseConfigured) return null; // the layout shows setup steps
  const supabase = await createClient();
  const { data } = await supabase.from("site_settings").select("*").eq("id", 1).maybeSingle();
  // If the settings row doesn't exist yet, start from the current site defaults.
  const values = (data ?? (await getSettings())) as unknown as Record<string, unknown>;

  return (
    <div className="max-w-3xl">
      <h1 className="font-display text-4xl">Site settings</h1>
      <p className="mb-8 mt-2 text-ink/60">Your photo, homepage text, bio and links.</p>
      <SettingsForm values={values} />
    </div>
  );
}
