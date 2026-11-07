import { cache } from "react";
import {
  sampleAchievements,
  sampleCategories,
  sampleContent,
  sampleProjects,
  sampleResources,
  sampleSettings,
  sampleTestimonials,
  sampleWorkshops,
} from "@/data/samples";
import { isSupabaseConfigured, showSamples } from "@/lib/supabase/config";
import { createClient } from "@/lib/supabase/server";
import type { CollectionKey, CollectionMap, Project, SiteSettings, Workshop } from "@/lib/types";

const fallbacks: { [K in CollectionKey]: CollectionMap[K][] } = {
  explore_categories: sampleCategories,
  projects: sampleProjects,
  workshops: sampleWorkshops,
  resources: sampleResources,
  content_items: sampleContent,
  achievements: sampleAchievements,
  testimonials: sampleTestimonials,
};

/** Fallback rows: everything if samples are on, otherwise only the real (non-sample) items. */
function fallbackFor<K extends CollectionKey>(key: K): CollectionMap[K][] {
  const rows = fallbacks[key];
  return showSamples ? rows : rows.filter((r) => !r.is_sample);
}

export const getSettings = cache(async (): Promise<SiteSettings> => {
  const defaults: SiteSettings = showSamples
    ? sampleSettings
    : { ...sampleSettings, portrait_url: null };
  if (!isSupabaseConfigured) return defaults;

  const supabase = await createClient();
  const { data, error } = await supabase.from("site_settings").select("*").eq("id", 1).maybeSingle();
  if (error || !data) {
    if (error) console.error("[site_settings]", error.message);
    return defaults;
  }
  // Database values win; empty fields fall back to defaults.
  const merged = { ...defaults } as SiteSettings;
  for (const [k, v] of Object.entries(data)) {
    const empty = v === null || v === "" || (Array.isArray(v) && v.length === 0);
    if (!empty && k in merged) (merged as unknown as Record<string, unknown>)[k] = v;
  }
  return merged;
});

interface ListOptions {
  featured?: boolean;
  limit?: number;
}

async function list<K extends CollectionKey>(
  key: K,
  { featured, limit }: ListOptions = {},
): Promise<CollectionMap[K][]> {
  const applyOpts = (rows: CollectionMap[K][]) => {
    let out = rows.filter((r) => r.published);
    if (featured) out = out.filter((r) => r.featured);
    out = [...out].sort((a, b) => a.sort_order - b.sort_order);
    return limit ? out.slice(0, limit) : out;
  };

  if (!isSupabaseConfigured) return applyOpts(fallbackFor(key));

  const supabase = await createClient();
  let query = supabase.from(key).select("*").eq("published", true).order("sort_order");
  if (featured) query = query.eq("featured", true);
  if (limit) query = query.limit(limit);
  const { data, error } = await query;

  if (error) {
    console.error(`[${key}]`, error.message);
    return applyOpts(fallbackFor(key));
  }
  if (data && data.length > 0) return data as CollectionMap[K][];

  // Nothing in the database yet → samples (if enabled).
  return showSamples ? applyOpts(fallbacks[key]) : [];
}

export const getCategories = cache(() => list("explore_categories"));
export const getProjects = cache((featured = false, limit?: number) => list("projects", { featured, limit }));
export const getWorkshops = cache((featured = false, limit?: number) => list("workshops", { featured, limit }));
export const getResources = cache((featured = false, limit?: number) => list("resources", { featured, limit }));
export const getContent = cache((featured = false, limit?: number) => list("content_items", { featured, limit }));
export const getAchievements = cache((featured = false, limit?: number) => list("achievements", { featured, limit }));
export const getTestimonials = cache((featured = false, limit?: number) => list("testimonials", { featured, limit }));

export const getProject = cache(async (slug: string): Promise<Project | null> => {
  const all = await getProjects();
  return all.find((p) => p.slug === slug) ?? null;
});

export const getWorkshop = cache(async (slug: string): Promise<Workshop | null> => {
  const all = await getWorkshops();
  return all.find((w) => w.slug === slug) ?? null;
});
