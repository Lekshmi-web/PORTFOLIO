# Lekshmi R — Portfolio

Personal website with an admin panel. Next.js · TypeScript · Tailwind CSS · Supabase · Vercel.

- **Public site:** Home, About, Projects, Workshops, Resources, Content, Achievements, Testimonials, Contact
- **Admin panel** (`/admin`): edit everything — photo, hero text, bio, links, the 4 Explore categories,
  projects, workshops, resources, content, achievements, testimonials — and read contact messages.
- **Sample content:** the site works immediately, before any setup. Placeholder items carry a pink
  **Sample** tag; replace them in the admin panel.

---

## 1 · Run it on your laptop (5 min)

You need [Node.js LTS](https://nodejs.org) and [VS Code](https://code.visualstudio.com).

```bash
cd lekshmi-portfolio
npm install
npm run dev
```

Open http://localhost:3000. You'll see the full site with sample content.
(The admin panel needs step 2.)

---

## 2 · Connect Supabase (15 min) — turns on the admin panel

1. Go to [supabase.com](https://supabase.com) → **New project** (free plan is fine). Save the database password somewhere safe.
2. **SQL Editor → New query** → paste all of `supabase/migrations/0001_init.sql` → **Run**.
3. New query → paste all of `supabase/seed.sql` → **Run**. (Adds your brand text, 4 categories, your 4 GitHub projects, your First Rank achievement, and samples.)
4. **Project Settings → API**: copy the **Project URL** and the **anon public** key.
5. In the project folder, copy `.env.example` to `.env.local` and paste them in:
   ```
   NEXT_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
   ```
6. Stop and restart `npm run dev`.

### Create your admin login
1. Supabase → **Authentication → Users → Add user → Create new user**. Enter your email and a strong password, tick **Auto confirm**.
2. Supabase → **Authentication → Sign In / Providers** → turn **off** "Allow new users to sign up" (so nobody else can create accounts).
3. Open http://localhost:3000/admin and sign in. You'll see an "Almost there" page with one SQL line — copy it into **SQL Editor** and run it. That makes your account the admin.
4. Refresh. You're in. ✨

---

## 3 · Put it on GitHub

In VS Code's terminal, inside the project folder:

```bash
git add -A
git commit -m "feat: initial portfolio"
git branch -M main
git remote add origin https://github.com/Lekshmi-web/lekshmi-portfolio.git
git push -u origin main
```

(Create the empty `lekshmi-portfolio` repo on GitHub first, without a README.)

## 4 · Go live on Vercel

1. [vercel.com](https://vercel.com) → sign in with GitHub → **Add New → Project** → import `lekshmi-portfolio`.
2. **Environment Variables** — add:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `NEXT_PUBLIC_SITE_URL` → your live URL, e.g. `https://lekshmi-portfolio.vercel.app`
   - `NEXT_PUBLIC_SHOW_SAMPLES` → `true` for now; `false` once your real content is in
3. **Deploy.** Every `git push` redeploys automatically.

---

## Using the admin panel

| Section | What you edit |
|---|---|
| Site settings | Portrait, name, roles, hero headline & intro, bio, skills, résumé PDF, email & social links |
| Explore categories | The 4 "Explore My World" items: title, text, image, link, order |
| Projects / Workshops / Resources / Content / Achievements / Testimonials | Add, edit, delete, reorder, hide |
| Messages | Contact-form messages |

Each item has:
- **Show on homepage** — appears in the homepage section
- **Published** — visible on the site at all
- **Order** — lower numbers first
- **This is sample content** — untick once it's real

### Before launch checklist
- [ ] Portrait + 4 category photos uploaded (real photos only)
- [ ] Email and social links added
- [ ] Every item with a **Sample** tag replaced or deleted (the dashboard counts them)
- [ ] Testimonials are real, with permission
- [ ] `NEXT_PUBLIC_SHOW_SAMPLES=false` in Vercel

---

## Project structure

```
src/
  app/
    (site)/            public pages (home, about, projects, …)
    admin/             admin panel (login, dashboard, settings, sections, messages)
  components/
    site/              public components + homepage sections
    admin/             admin form components
  data/samples.ts      fallback / sample content
  lib/
    data.ts            reads content (Supabase → falls back to samples)
    admin/             admin section config, auth, settings fields
    supabase/          Supabase clients
supabase/
  migrations/0001_init.sql   database tables, security rules, storage
  seed.sql                   starter content
public/samples/        placeholder images (palette-coloured SVGs)
```

### Design system
Colours are Tailwind tokens: `canvas` `ink` `violet` `lavender` `pink` `lime` `coral`
(e.g. `bg-violet text-canvas`). Fonts: `font-display` (Playfair Display), `font-grotesk` (Space Grotesk), `font-sans` (DM Sans).

**Contrast rule:** never put pink, coral, lime or lavender **text** on the canvas background — use them for shapes and highlights. See `src/app/globals.css`.

### Security notes
- Content tables are protected by Row Level Security: anyone can read published content; only users in the `admins` table can write.
- Contact form: anyone can submit; only admins can read.
- Never commit `.env.local`.
