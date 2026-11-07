import type { SiteSettings } from "@/lib/types";
import { ButtonLink } from "../ButtonLink";
import { Reveal } from "../Reveal";
import { SmartImage } from "../SmartImage";

/** Splits "A. B. C." into sentences so each line can be styled differently. */
function splitHeadline(text: string) {
  return text.split(/(?<=\.)\s+/).filter(Boolean);
}

export function Hero({ settings }: { settings: SiteSettings }) {
  const lines = splitHeadline(settings.hero_headline ?? "");
  const lineStyles = ["", "italic text-violet", ""];

  return (
    <section className="relative overflow-hidden pb-16 pt-32 md:pb-24 md:pt-40" aria-labelledby="hero-title">
      <div className="container-x grid items-center gap-14 lg:grid-cols-[1.35fr_1fr] lg:gap-10">
        <div>
          <Reveal>
            <p className="eyebrow mb-8 flex flex-wrap items-center gap-x-3 gap-y-2 text-ink/70">
              <span className="inline-block size-2 rounded-full bg-coral" aria-hidden />
              {settings.roles.slice(0, 4).join(" · ")}
            </p>
          </Reveal>

          <h1 id="hero-title" className="display text-[clamp(2.9rem,7.4vw,6.75rem)]">
            {lines.map((line, i) => (
              <Reveal key={line} delay={0.08 * (i + 1)} className="block">
                {i === lines.length - 1 ? (
                  <span className="relative isolate inline-block">
                    <span
                      aria-hidden
                      className="absolute inset-x-[-0.08em] bottom-[0.08em] -z-10 h-[0.38em] -rotate-1 rounded-sm bg-lime"
                    />
                    {line}
                  </span>
                ) : (
                  <span className={lineStyles[i] ?? ""}>{line}</span>
                )}
              </Reveal>
            ))}
          </h1>

          {settings.hero_intro && (
            <Reveal delay={0.35}>
              <p className="mt-10 max-w-xl text-lg leading-relaxed text-ink/75 md:text-xl">{settings.hero_intro}</p>
            </Reveal>
          )}

          <Reveal delay={0.45}>
            <div className="mt-10 flex flex-wrap gap-4">
              <ButtonLink href="#explore">Explore My Work</ButtonLink>
              <ButtonLink href="/contact" variant="outline" arrow={false}>
                Let&apos;s Connect
              </ButtonLink>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.2} className="relative mx-auto w-full max-w-[460px]">
          <div aria-hidden className="absolute -left-6 top-10 size-24 rounded-full bg-pink md:-left-10 md:size-32" />
          <div
            aria-hidden
            className="absolute -bottom-6 -right-4 h-28 w-28 rotate-12 rounded-2xl border-2 border-violet md:h-36 md:w-36"
          />
          <div className="relative aspect-[4/5] overflow-hidden rounded-t-full bg-lavender">
            {settings.portrait_url ? (
              <SmartImage
                src={settings.portrait_url}
                alt={`Portrait of ${settings.full_name}`}
                fill
                priority
                sizes="(min-width: 1024px) 460px, 90vw"
                className="object-cover"
              />
            ) : null}
          </div>
          {settings.roles[0] && (
            <div className="absolute -bottom-5 left-6 rounded-full bg-ink px-5 py-3 font-grotesk text-sm text-canvas shadow-lg">
              <span className="text-lime" aria-hidden>●</span> {settings.roles[0]}
            </div>
          )}
        </Reveal>
      </div>

      <div className="mt-24 overflow-hidden border-y border-ink/15 py-5" aria-hidden>
        <div className="flex w-max animate-[marquee_40s_linear_infinite] gap-12 whitespace-nowrap font-display text-3xl italic text-ink/80 md:text-4xl">
          {[...settings.roles, ...settings.roles, ...settings.roles, ...settings.roles].map((r, i) => (
            <span key={i} className="flex items-center gap-12">
              {r}
              <span className="text-2xl not-italic text-coral">✦</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
