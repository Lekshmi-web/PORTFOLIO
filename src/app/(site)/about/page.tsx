import type { Metadata } from "next";
import { ButtonLink } from "@/components/site/ButtonLink";
import { Reveal } from "@/components/site/Reveal";
import { SkillOrbit } from "@/components/site/SkillOrbit";
import { SmartImage } from "@/components/site/SmartImage";
import { ScrambleText } from "@/components/site/fx/ScrambleText";
import { ScrollWords } from "@/components/site/fx/ScrollWords";
import { TiltCard } from "@/components/site/fx/TiltCard";
import { Journey } from "@/components/site/sections/Journey";
import { getAchievements, getProjects, getSettings } from "@/lib/data";
import { uniqueTags } from "@/lib/format";

export const metadata: Metadata = {
  title: "About",
  description: "My story, skills, experience and journey.",
};

export default async function AboutPage() {
  const [s, achievements, projects] = await Promise.all([getSettings(), getAchievements(), getProjects()]);
  const paragraphs = (s.about_long ?? "").split(/\n{2,}/).filter(Boolean);
  const toolkit = uniqueTags(s.skills, ...projects.map((p) => p.tech));
  const first = s.full_name.split(" ")[0] ?? s.full_name;

  return (
    <>
      <section className="relative isolate overflow-hidden">
        <div aria-hidden className="absolute inset-0 -z-10">
          <div className="bg-grid absolute inset-0" />
          <div className="glow-violet absolute -left-40 top-0 size-[620px]" />
        </div>
        <div className="container-x grid gap-12 pb-16 pt-32 md:pt-40 lg:grid-cols-[380px_1fr] lg:gap-16">
          <Reveal className="relative mx-auto w-full max-w-[380px] lg:mx-0">
            <TiltCard max={6}>
              <div className="relative overflow-hidden rounded-3xl p-[2px]">
                <div
                  aria-hidden
                  className="absolute left-1/2 top-1/2 aspect-square w-[160%] -translate-x-1/2 -translate-y-1/2 animate-spin-slow bg-[conic-gradient(from_0deg,var(--color-violet),var(--color-pink),var(--color-lime),var(--color-violet))]"
                />
                <div className="relative aspect-[4/5] overflow-hidden rounded-[calc(1.5rem-2px)] bg-night">
                  {s.portrait_url && (
                    <SmartImage src={s.portrait_url} alt={`Portrait of ${s.full_name}`} fill priority sizes="380px" className="object-cover" />
                  )}
                  <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
                    <div className="h-1/3 w-full animate-scan bg-linear-to-b from-transparent via-lime/15 to-transparent" />
                  </div>
                </div>
              </div>
            </TiltCard>
          </Reveal>

          <div>
            <Reveal>
              <p className="mono-label mb-5 text-lime">// about_me.md</p>
              <h1 className="heading text-4xl sm:text-5xl lg:text-6xl">
                Hi, I&apos;m <span className="accent-serif gradient-text">{first}</span>
              </h1>
            </Reveal>
            {s.about_short && (
              <ScrollWords text={s.about_short} className="mt-6 text-xl leading-relaxed text-canvas md:text-2xl" />
            )}
            {paragraphs.map((p) => (
              <Reveal key={p.slice(0, 24)}>
                <p className="mt-5 leading-relaxed text-canvas/70">{p}</p>
              </Reveal>
            ))}
            <Reveal>
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
        </div>
      </section>

      <section className="border-y border-white/10 bg-night py-20" aria-labelledby="roles-title">
        <div className="container-x grid gap-10 md:grid-cols-2 md:items-end">
          <Reveal>
            <p className="mono-label mb-4 text-lime">// what i am</p>
            <h2 id="roles-title" className="heading text-3xl md:text-4xl">
              {s.core_message ?? "I build AI. I teach technology. I inspire people to create."}
            </h2>
            <p className="mt-4 font-mono text-xs text-canvas/60">hover a role ↘</p>
          </Reveal>
          <ul>
            {s.roles.map((r, i) => (
              <Reveal as="li" key={r} delay={i * 0.06}>
                <div
                  tabIndex={0}
                  className="group flex items-baseline gap-4 border-b border-white/10 py-3.5 outline-none transition-colors hover:border-lime/40 focus-visible:border-lime"
                >
                  <span className="font-mono text-xs text-lime">{String(i + 1).padStart(2, "0")}</span>
                  <ScrambleText text={r} className="heading text-2xl transition-colors group-hover:text-lime" />
                  <span aria-hidden className="ml-auto font-mono text-xs text-canvas/0 transition-colors group-hover:text-lime">
                    ●
                  </span>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {toolkit.length >= 3 && (
        <section className="container-x py-20 md:py-24" aria-labelledby="skills-title">
          <div className="grid items-center gap-10 lg:grid-cols-[1fr_1.4fr]">
            <Reveal>
              <p className="mono-label mb-4 text-lime">// toolkit</p>
              <h2 id="skills-title" className="heading text-3xl md:text-4xl">
                My <span className="accent-serif gradient-text">constellation</span>
              </h2>
              <p className="mt-4 max-w-sm text-canvas/65">
                The tools and technologies I build and teach with. Hover to pause the orbit.
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <SkillOrbit skills={toolkit} centre={`${first.toLowerCase()}.ai`} />
            </Reveal>
          </div>
        </section>
      )}

      <Journey achievements={achievements} />
    </>
  );
}
