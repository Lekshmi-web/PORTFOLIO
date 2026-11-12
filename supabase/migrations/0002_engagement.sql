-- ════════════════════════════════════════════════════════════
--  Round 2: counters, live status and photo galleries.
--  Run once in Supabase → SQL Editor, after 0001_init.sql.
--  Only ADDS columns; existing data is untouched. Safe to re-run.
-- ════════════════════════════════════════════════════════════

-- Homepage counters, one per line, e.g. "25+ Workshops run".
alter table public.site_settings add column if not exists stats text[] not null default '{}';

-- Live status shown in the hero badge, e.g. "running a GenAI workshop".
alter table public.site_settings add column if not exists status_text text;

-- Photo galleries.
alter table public.projects add column if not exists gallery text[] not null default '{}';
alter table public.workshops add column if not exists gallery text[] not null default '{}';
