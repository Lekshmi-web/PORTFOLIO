"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/admin/auth";
import { getCollection, type Field } from "@/lib/admin/collections";
import { settingsFields } from "@/lib/admin/settings-fields";
import { slugify } from "@/lib/format";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { createClient } from "@/lib/supabase/server";

export interface FormState {
  error?: string;
  ok?: boolean;
}

/** Converts submitted form values into typed column values using the field config (acts as a whitelist). */
function parseFields(fields: Field[], formData: FormData): { values: Record<string, unknown>; error?: string } {
  const values: Record<string, unknown> = {};
  for (const f of fields) {
    const raw = formData.get(f.name);
    const str = typeof raw === "string" ? raw.trim() : "";
    switch (f.type) {
      case "boolean":
        values[f.name] = raw === "on";
        break;
      case "number":
        values[f.name] = Number.isFinite(Number.parseInt(str, 10)) ? Number.parseInt(str, 10) : 0;
        break;
      case "tags":
        values[f.name] = str
          .split(",")
          .map((t) => t.trim())
          .filter(Boolean);
        break;
      case "slug": {
        const source = f.from ? String(formData.get(f.from) ?? "") : "";
        values[f.name] = slugify(str || source);
        if (!values[f.name]) return { values, error: `${f.label} could not be generated — add a title.` };
        break;
      }
      case "url":
        if (str && !/^https?:\/\//i.test(str)) {
          return { values, error: `${f.label} must start with https://` };
        }
        values[f.name] = str || null;
        break;
      case "image":
        if (str && !str.startsWith("/") && !/^https:\/\//i.test(str)) {
          return { values, error: `${f.label}: upload a file or paste a link starting with https://` };
        }
        values[f.name] = str || null;
        break;
      default:
        values[f.name] = str || null;
    }
    if (f.required && (values[f.name] === null || values[f.name] === "")) {
      return { values, error: `${f.label} is required.` };
    }
  }
  return { values };
}

function refreshSite() {
  revalidatePath("/", "layout");
}

// ── Collections ─────────────────────────────────────────────

export async function saveItem(
  collectionKey: string,
  id: string | null,
  _prev: FormState,
  formData: FormData,
): Promise<FormState> {
  const config = getCollection(collectionKey);
  if (!config) return { error: "Unknown section." };
  const supabase = await requireAdmin();

  const { values, error } = parseFields(config.fields, formData);
  if (error) return { error };

  const result = id
    ? await supabase.from(config.key).update(values).eq("id", id)
    : await supabase.from(config.key).insert(values);

  if (result.error) {
    const msg = result.error.message.includes("duplicate key")
      ? "That URL slug is already used — choose another."
      : result.error.message;
    return { error: msg };
  }
  refreshSite();
  redirect(`/admin/${config.key}?saved=1`);
}

export async function deleteItem(collectionKey: string, id: string) {
  const config = getCollection(collectionKey);
  if (!config) return;
  const supabase = await requireAdmin();
  const { error } = await supabase.from(config.key).delete().eq("id", id);
  if (error) throw new Error(error.message);
  refreshSite();
  redirect(`/admin/${config.key}?deleted=1`);
}

export async function togglePublished(collectionKey: string, id: string, published: boolean) {
  const config = getCollection(collectionKey);
  if (!config) return;
  const supabase = await requireAdmin();
  await supabase.from(config.key).update({ published }).eq("id", id);
  refreshSite();
  revalidatePath(`/admin/${config.key}`);
}

// ── Site settings ───────────────────────────────────────────

export async function saveSettings(_prev: FormState, formData: FormData): Promise<FormState> {
  const supabase = await requireAdmin();
  const { values, error } = parseFields(settingsFields, formData);
  if (error) return { error };
  const { error: dbError } = await supabase.from("site_settings").upsert({ id: 1, ...values });
  if (dbError) return { error: dbError.message };
  refreshSite();
  return { ok: true };
}

// ── Messages ────────────────────────────────────────────────

export async function setMessageRead(id: string, isRead: boolean) {
  const supabase = await requireAdmin();
  await supabase.from("messages").update({ is_read: isRead }).eq("id", id);
  revalidatePath("/admin/messages");
  revalidatePath("/admin");
}

export async function deleteMessage(id: string) {
  const supabase = await requireAdmin();
  await supabase.from("messages").delete().eq("id", id);
  revalidatePath("/admin/messages");
}

// ── Auth ────────────────────────────────────────────────────

export async function signIn(_prev: FormState, formData: FormData): Promise<FormState> {
  if (!isSupabaseConfigured) return { error: "Supabase is not connected yet. See the README." };
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");
  const next = String(formData.get("next") ?? "/admin");
  if (!email || !password) return { error: "Enter your email and password." };

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) return { error: "Incorrect email or password." };
  redirect(next.startsWith("/admin") ? next : "/admin");
}

export async function signOut() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/admin/login");
}
