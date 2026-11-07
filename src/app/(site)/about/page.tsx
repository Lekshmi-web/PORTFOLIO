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
      <section className="container-x pb-20 pt-32 md:pb-28 md:pt-44">
        <div className="grid gap-14 lg:grid-cols-[1fr_1.3fr] lg:gap-20">
          <Reveal className="relative mx-auto w-full max-w-[420px] lg:mx-0">
            <span aria-hidden className="absolute -right-6 -top-6 size-28 rounded-full bg-lime" />
            <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] rounded-br-[8rem] bg-lavender">
              {s.portrait_url && (
                <SmartImage src={s.portrait_url} alt={`Portrait of ${s.full_name}`} fill priority sizes="420px" className="object-cover" />
              )}
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <p className="eyebrow mb-6 text-violet">About me</p>
            <h1 className="display text-5xl sm:text-6xl lg:text-7xl">
              Hi, I&apos;m {s.full_name.split(" ")[0]}<span className="text-pink">.</span>
            </h1>
            {s.about_short && <p className="mt-8 font-display text-2xl leading-snug md:text-3xl">{s.about_short}</p>}
            {paragraphs.map((p) => (
              <p key={p.slice(0, 24)} className="mt-6 text-lg leading-relaxed text-ink/80">
                {p}
              </p>
            ))}
            <div className="mt-10 flex flex-wrap gap-4">
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

      <section className="bg-ink py-20 text-canvas md:py-28" aria-labelledby="roles-title">
        <div className="container-x grid gap-12 md:grid-cols-2">
          <div>
            <p className="eyebrow mb-5 text-lime">What I am</p>
            <h2 id="roles-title" className="display text-4xl md:text-5xl">
              {s.core_message ?? "I build AI. I teach technology. I inspire people to create."}
            </h2>
          </div>
          <ul className="space-y-1 self-end">
            {s.roles.map((r, i) => (
              <li key={r} className="flex items-baseline gap-5 border-b border-canvas/15 py-4">
                <span className="eyebrow text-lime">{String(i + 1).padStart(2, "0")}</span>
                <span className="font-display text-3xl italic">{r}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {s.skills.length > 0 && (
        <section className="container-x py-20 md:py-28" aria-labelledby="skills-title">
          <p className="eyebrow mb-5 text-violet">Toolkit</p>
          <h2 id="skills-title" className="display mb-10 text-4xl md:text-5xl">Skills</h2>
          <ul className="flex flex-wrap gap-3">
            {s.skills.map((k, i) => (
              <li
                key={k}
                className={`rounded-full px-5 py-2.5 font-grotesk text-base ${
                  ["bg-lavender", "bg-lime", "bg-canvas ring-1 ring-ink/20", "bg-pink"][i % 4]
                } text-ink`}
              >
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
