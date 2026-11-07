export const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
export const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";

/** True when Supabase keys are present. Without them the site runs on samples only. */
export const isSupabaseConfigured = Boolean(SUPABASE_URL && SUPABASE_ANON_KEY);

/** Show placeholder content where the database is empty. Defaults to on. */
export const showSamples = process.env.NEXT_PUBLIC_SHOW_SAMPLES !== "false";
