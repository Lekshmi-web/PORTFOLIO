import type { Metadata } from "next";
import { ButtonLink } from "@/components/site/ButtonLink";
import { Reveal } from "@/components/site/Reveal";
import { SmartImage } from "@/components/site/SmartImage";
import { Journey } from "@/components/site/sections/Journey";
import { getAchievements, getSettings } from "@/lib/data";

export const metadata: Metadata = {
  title: "About",
  description: "My story, skills, experience and journey.",
};

export default async function AboutPage() {
  const [s, achievements] = await Promise.all([getSettings(), getAchievements()]);
  const paragraphs = (s.about_long ?? "").split(/\n{2,}/).filter(Boolean);

  return (
    <>
      <section className="relative isolate overflow-hidden">
        <div aria-hidden className="absolute inset-0 -z-10">
          <div className="bg-grid absolute inset-0" />
          <div className="glow-violet absolute -left-40 top-0 size-[620px]" />
        </div>
        <div className="container-x grid gap-12 pb-20 pt-32 md:pt-40 lg:grid-cols-[380px_1fr] lg:gap-16">
          <Reveal className="relative mx-auto w-full max-w-[380px] lg:mx-0">
            <div className="relative overflow-hidden rounded-3xl p-[2px]">
              <div
                aria-hidden
                className="absolute left-1/2 top-1/2 aspect-square w-[160%] -translate-x-1/2 -translate-y-1/2 animate-spin-slow bg-[conic-gradient(from_0deg,var(--color-violet),var(--color-pink),var(--color-lime),var(--color-violet))]"
              />
              <div className="relative aspect-[4/5] overflow-hidden rounded-[calc(1.5rem-2px)] bg-night">
                {s.portrait_url && (
                  <SmartImage src={s.portrait_url} alt={`Portrait of ${s.full_name}`} fill priority sizes="380px" className="object-cover" />
                )}
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <p className="mono-label mb-5 text-lime">// about_me.md</p>
            <h1 className="heading text-4xl sm:text-5xl lg:text-6xl">
              Hi, I&apos;m <span className="accent-serif gradient-text">{s.full_name.split(" ")[0]}</span>
            </h1>
            {s.about_short && <p className="mt-6 text-lg leading-relaxed text-canvas/90 md:text-xl">{s.about_short}</p>}
            {paragraphs.map((p) => (
              <p key={p.slice(0, 24)} className="mt-5 leading-relaxed text-canvas/70">
                {p}
              </p>
            ))}
            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink href="/contact">Let&apos;s Connect</ButtonLink>
              {s.resume_url && (
                <ButtonLink href={s.resume_url} variant="outline" external arrow={false}>
                  Download résumé
                </ButtonLink>
              )}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="border-y border-white/10 bg-night py-20" aria-labelledby="roles-title">
        <div className="container-x grid gap-10 md:grid-cols-2 md:items-end">
          <div>
            <p className="mono-label mb-4 text-lime">// what i am</p>
            <h2 id="roles-title" className="heading text-3xl md:text-4xl">
              {s.core_message ?? "I build AI. I teach technology. I inspire people to create."}
            </h2>
          </div>
          <ul>
            {s.roles.map((r, i) => (
              <li key={r} className="flex items-baseline gap-4 border-b border-white/10 py-3.5">
                <span className="font-mono text-xs text-lime">{String(i + 1).padStart(2, "0")}</span>
                <span className="heading text-2xl">{r}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {s.skills.length > 0 && (
        <section className="container-x py-20" aria-labelledby="skills-title">
          <p className="mono-label mb-4 text-lime">// toolkit</p>
          <h2 id="skills-title" className="heading mb-8 text-3xl md:text-4xl">
            Skills
          </h2>
          <ul className="flex flex-wrap gap-2">
            {s.skills.map((k) => (
              <li key={k} className="chip px-4 py-2 text-xs transition-colors hover:border-lime hover:text-lime">
                {k}
              </li>
            ))}
          </ul>
        </section>
      )}

      <Journey achievements={achievements} />
    </>
  );
}
