# CLAUDE.md — Lekshmi R portfolio

Personal portfolio + admin CMS for Lekshmi R (AI Engineer · Technical Mentor · Educator · Content Creator).
Read README.md for setup. Work in small, reviewable steps.

## Stack
Next.js 15 App Router · TypeScript strict · Tailwind CSS v4 (tokens in `src/app/globals.css`) ·
Supabase (Postgres + Auth + Storage via `@supabase/ssr`) · framer-motion · lucide-react · Vercel.

## Architecture
- Public pages: `src/app/(site)/`. Admin: `src/app/admin/` (`(panel)` group is auth-gated).
- All content reads go through `src/lib/data.ts`, which falls back to `src/data/samples.ts`
  when Supabase isn't configured or a table is empty (if `NEXT_PUBLIC_SHOW_SAMPLES` isn't "false").
- Admin sections are config-driven: `src/lib/admin/collections.ts`. To add a field:
  1. new migration in `supabase/migrations/` (never edit old migrations),
  2. add it to `src/lib/types.ts`, 3. add it to the collection config, 4. render it on the public page.
- Admin writes happen in server actions (`src/app/admin/actions.ts`), each starting with `requireAdmin()`.
  RLS (`public.is_admin()`) is the real security boundary — never weaken policies.

## Content rules
- Never invent projects, metrics, events, testimonials or links. Placeholders must be marked `is_sample`.
- Use Lekshmi's real photos; no stock or AI-generated faces.

## Design rules — "Neural Studio" (dark)
- Public site is dark (wrapper class `.site`); admin stays light.
- Surfaces: void #0E0B14 (page), night #161120 (panels), ink #211B2B (raised). Text: canvas #F1EBDD.
- Accents: lime #D8F16B (signal: CTAs, live dots, labels), lavender #D9C9F5 (accent text), pink #FF6E91, coral #E76B45,
  violet #5427A8 (glows, gradients, borders, button backgrounds ONLY — never text on dark, it's 2:1).
- Muted text no lower than `text-canvas/60`.
- Type: headings `.heading` (Space Grotesk), italic accents `.accent-serif` (Playfair), labels `.mono-label` (JetBrains Mono),
  body DM Sans. Keep sizes moderate: section h2 max `lg:text-5xl`, page h1 max `lg:text-6xl`.
- Building blocks in globals.css: `.glass`, `.glass-hover`, `.chip`, `.gradient-text`, `.bg-grid`, `.glow-violet`, `.glow-pink`.
- Effects live in `src/components/site/fx/`: NeuralBackground, DecodeText, TypingRoles, BootIntro, CustomCursor,
  SpotlightTracker (+ `.spotlight` class), SmoothScroll (Lenis; pause with `lenis:stop` / `lenis:start` window events),
  ScrollProgress, Magnetic, TiltCard, Counter, TimelineTrack, ScrollWords, ScrambleText, TerminalTyping, Gallery,
  VideoModal, Countdown, CopyButton, confetti. Every effect must respect `prefers-reduced-motion`
  (framer-motion follows it via MotionProvider) and pause when off-screen.
- Cursor labels: add `data-cursor="view"` (or any short word) to an element.
- Never put a `position: fixed` modal inside an element with transform/filter/backdrop-filter (e.g. `.glass`).
- Mobile-first; check 375 / 768 / 1280px.

## Workflow
- Plan first for anything non-trivial; wait for "go".
- After changes run `npm run typecheck` and `npm run build`.
- Conventional commits. Never commit `.env.local`.
