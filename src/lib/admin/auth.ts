import { redirect } from "next/navigation";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { createClient } from "@/lib/supabase/server";

export type AdminStatus =
  | { state: "not-configured" }
  | { state: "signed-out" }
  | { state: "not-admin"; email: string; userId: string }
  | { state: "admin"; email: string; userId: string };

export async function getAdminStatus(): Promise<AdminStatus> {
  if (!isSupabaseConfigured) return { state: "not-configured" };
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { state: "signed-out" };
  const { data: isAdmin } = await supabase.rpc("is_admin");
  const base = { email: user.email ?? "", userId: user.id };
  return isAdmin === true ? { state: "admin", ...base } : { state: "not-admin", ...base };
}

/** Use at the top of every admin Server Action. */
export async function requireAdmin() {
  const status = await getAdminStatus();
  if (status.state !== "admin") redirect("/admin/login");
  return createClient();
}
