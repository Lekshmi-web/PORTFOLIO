-- ════════════════════════════════════════════════════════════
--  Lekshmi R portfolio — database schema
--  Run once in Supabase → SQL Editor (or `supabase db push`).
-- ════════════════════════════════════════════════════════════

-- ── Admins ──────────────────────────────────────────────────
-- Only users listed here can edit content. Add yourself after
-- creating your login (see README, step "Make yourself admin").
create table if not exists public.admins (
  user_id uuid primary key references auth.users (id) on delete cascade,
  created_at timestamptz not null default now()
);
alter table public.admins enable row level security;

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (select 1 from public.admins where user_id = auth.uid());
$$;

drop policy if exists "admins can read admins" on public.admins;
create policy "admins can read admins" on public.admins
  for select using (public.is_admin());

-- ── Shared trigger for updated_at ───────────────────────────
create or replace function public.touch_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

-- ── Site settings (single row, id = 1) ──────────────────────
create table if not exists public.site_settings (
  id int primary key default 1 check (id = 1),
  full_name text not null default 'Lekshmi R',
  roles text[] not null default '{}',
  hero_headline text,
  hero_intro text,
  about_short text,
  about_long text,
  core_message text,
  portrait_url text,
  location text,
  email text,
  linkedin_url text,
  github_url text,
  youtube_url text,
  instagram_url text,
  resume_url text,
  skills text[] not null default '{}',
  updated_at timestamptz not null default now()
);

-- ── Explore My World categories ─────────────────────────────
create table if not exists public.explore_categories (
  id uuid primary key default gen_random_uuid(),
  number text not null,
  title text not null,
  description text,
  image_url text,
  href text not null,
  sort_order int not null default 0,
  published boolean not null default true,
  is_sample boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ── Projects ────────────────────────────────────────────────
create table if not exists public.projects (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  summary text,
  problem text,
  role text,
  outcome text,
  tech text[] not null default '{}',
  image_url text,
  live_url text,
  repo_url text,
  featured boolean not null default false,
  published boolean not null default true,
  sort_order int not null default 0,
  is_sample boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ── Workshops ───────────────────────────────────────────────
create table if not exists public.workshops (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  summary text,
  details text,
  event_date date,
  location text,
  audience text,
  format text,
  topics text[] not null default '{}',
  image_url text,
  register_url text,
  featured boolean not null default false,
  published boolean not null default true,
  sort_order int not null default 0,
  is_sample boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ── Resources ───────────────────────────────────────────────
create table if not exists public.resources (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  kind text not null default 'Guide',
  url text,
  image_url text,
  featured boolean not null default false,
  published boolean not null default true,
  sort_order int not null default 0,
  is_sample boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ── Content (videos, articles, posts) ───────────────────────
create table if not exists public.content_items (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  summary text,
  platform text not null default 'Article',
  url text,
  image_url text,
  published_on date,
  featured boolean not null default false,
  published boolean not null default true,
  sort_order int not null default 0,
  is_sample boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ── Achievements, speaking & events ─────────────────────────
create table if not exists public.achievements (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  kind text not null default 'Milestone',
  happened_on date,
  organisation text,
  image_url text,
  link_url text,
  featured boolean not null default false,
  published boolean not null default true,
  sort_order int not null default 0,
  is_sample boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ── Testimonials ────────────────────────────────────────────
create table if not exists public.testimonials (
  id uuid primary key default gen_random_uuid(),
  quote text not null,
  name text not null,
  role text,
  image_url text,
  featured boolean not null default false,
  published boolean not null default true,
  sort_order int not null default 0,
  is_sample boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ── Contact messages ────────────────────────────────────────
create table if not exists public.messages (
  id uuid primary key default gen_random_uuid(),
  name text not null check (char_length(name) between 1 and 120),
  email text not null check (char_length(email) between 3 and 200),
  subject text check (char_length(subject) <= 200),
  body text not null check (char_length(body) between 1 and 5000),
  is_read boolean not null default false,
  created_at timestamptz not null default now()
);

-- ── RLS: public reads published rows, admins do everything ──
do $$
declare t text;
begin
  foreach t in array array[
    'explore_categories','projects','workshops','resources',
    'content_items','achievements','testimonials'
  ] loop
    execute format('alter table public.%I enable row level security', t);
    execute format('drop policy if exists "public reads published %1$s" on public.%1$I', t);
    execute format('drop policy if exists "admins write %1$s" on public.%1$I', t);
    execute format('drop trigger if exists touch_%1$s on public.%1$I', t);
    execute format(
      'create policy "public reads published %1$s" on public.%1$I for select using (published or public.is_admin())', t);
    execute format(
      'create policy "admins write %1$s" on public.%1$I for all using (public.is_admin()) with check (public.is_admin())', t);
    execute format(
      'create trigger touch_%1$s before update on public.%1$I for each row execute function public.touch_updated_at()', t);
  end loop;
end $$;

alter table public.site_settings enable row level security;
drop policy if exists "public reads settings" on public.site_settings;
create policy "public reads settings" on public.site_settings for select using (true);
drop policy if exists "admins write settings" on public.site_settings;
create policy "admins write settings" on public.site_settings
  for all using (public.is_admin()) with check (public.is_admin());
drop trigger if exists touch_site_settings on public.site_settings;
create trigger touch_site_settings before update on public.site_settings
  for each row execute function public.touch_updated_at();

alter table public.messages enable row level security;
drop policy if exists "anyone can send a message" on public.messages;
create policy "anyone can send a message" on public.messages
  for insert with check (true);
drop policy if exists "admins read messages" on public.messages;
create policy "admins read messages" on public.messages
  for select using (public.is_admin());
drop policy if exists "admins update messages" on public.messages;
create policy "admins update messages" on public.messages
  for update using (public.is_admin()) with check (public.is_admin());
drop policy if exists "admins delete messages" on public.messages;
create policy "admins delete messages" on public.messages
  for delete using (public.is_admin());

-- ── Storage bucket for images & files ───────────────────────
insert into storage.buckets (id, name, public)
values ('media', 'media', true)
on conflict (id) do nothing;

drop policy if exists "public reads media" on storage.objects;
create policy "public reads media" on storage.objects
  for select using (bucket_id = 'media');
drop policy if exists "admins upload media" on storage.objects;
create policy "admins upload media" on storage.objects
  for insert with check (bucket_id = 'media' and public.is_admin());
drop policy if exists "admins update media" on storage.objects;
create policy "admins update media" on storage.objects
  for update using (bucket_id = 'media' and public.is_admin());
drop policy if exists "admins delete media" on storage.objects;
create policy "admins delete media" on storage.objects
  for delete using (bucket_id = 'media' and public.is_admin());

-- ── Explicit grants (RLS above still decides what each user may do) ──
grant usage on schema public to anon, authenticated;
grant select on all tables in schema public to anon, authenticated;
grant insert on public.messages to anon, authenticated;
grant insert, update, delete on all tables in schema public to authenticated;
grant execute on function public.is_admin() to anon, authenticated;
