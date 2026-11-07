import type { SiteSettings } from "@/lib/types";
import { ButtonLink } from "../ButtonLink";
import { Reveal } from "../Reveal";
import { SmartImage } from "../SmartImage";
import { DecodeText } from "../fx/DecodeText";
import { NeuralBackground } from "../fx/NeuralBackground";
import { TypingRoles } from "../fx/TypingRoles";

/** "A. B. C." → ["A.", "B.", "C."] so each line can be styled. */
function splitHeadline(text: string) {
  return text.split(/(?<=\.)\s+/).filter(Boolean);
}

const lineStyles = ["text-canvas", "accent-serif gradient-text pr-2", "text-lime"];

export function Hero({ settings }: { settings: SiteSettings }) {
  const lines = splitHeadline(settings.hero_headline ?? "");
  const firstName = settings.full_name.split(" ")[0]?.toLowerCase() ?? "me";
  const chips = settings.roles.slice(1, 4);

  return (
    <section className="relative isolate overflow-hidden" aria-labelledby="hero-title">
      {/* Background layers */}
      <div className="absolute inset-0 -z-10">
        <NeuralBackground className="absolute inset-0 opacity-70" />
        <div className="bg-grid absolute inset-0" />
        <div className="glow-violet absolute -left-40 -top-40 size-[640px]" />
        <div className="glow-pink absolute -right-32 top-1/3 size-[520px]" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-linear-to-b from-transparent to-void" />
      </div>

      <div className="container-x grid min-h-[100svh] items-center gap-14 pb-20 pt-32 lg:grid-cols-[1.25fr_1fr] lg:gap-12 lg:pt-28">
        <div>
          <Reveal>
            <p className="chip mb-8 gap-2.5 py-1.5">
              <span className="relative inline-flex size-2 rounded-full bg-lime animate-pulse-dot" aria-hidden />
              system online · {settings.roles[0]?.toLowerCase() ?? "ai engineer"}
            </p>
          </Reveal>

          <h1 id="hero-title" className="heading text-[clamp(2.25rem,5.2vw,4.25rem)]">
            {lines.map((line, i) => (
              <span key={line} className={`block ${lineStyles[i] ?? "text-canvas"}`}>
                <DecodeText text={line} delay={150 + i * 280} />
              </span>
            ))}
          </h1>

          <Reveal delay={0.5}>
            <TypingRoles roles={settings.roles} user={firstName} className="mt-8" />
          </Reveal>

          {settings.hero_intro && (
            <Reveal delay={0.6}>
              <p className="mt-6 max-w-xl text-base leading-relaxed text-canvas/70 md:text-lg">{settings.hero_intro}</p>
            </Reveal>
          )}

          <Reveal delay={0.7}>
            <div className="mt-10 flex flex-wrap gap-3">
              <ButtonLink href="#explore">Explore My Work</ButtonLink>
              <ButtonLink href="/contact" variant="outline" arrow={false}>
                Let&apos;s Connect
              </ButtonLink>
            </div>
          </Reveal>
        </div>

        {/* Portrait */}
        <Reveal delay={0.3} className="relative mx-auto w-full max-w-[400px]">
          {/* Spinning gradient ring */}
          <div className="relative overflow-hidden rounded-[2rem] p-[2px]">
            <div
              aria-hidden
              className="absolute left-1/2 top-1/2 aspect-square w-[160%] -translate-x-1/2 -translate-y-1/2 animate-spin-slow bg-[conic-gradient(from_0deg,var(--color-violet),var(--color-pink),var(--color-lime),var(--color-lavender),var(--color-violet))]"
            />
            <div className="relative aspect-[4/5] overflow-hidden rounded-[calc(2rem-2px)] bg-night">
              {settings.portrait_url && (
                <SmartImage
                  src={settings.portrait_url}
                  alt={`Portrait of ${settings.full_name}`}
                  fill
                  priority
                  sizes="(min-width: 1024px) 400px, 85vw"
                  className="object-cover"
                />
              )}
              {/* Scan-line sweep */}
              <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
                <div className="h-1/3 w-full animate-scan bg-linear-to-b from-transparent via-lime/15 to-transparent" />
              </div>
              <div aria-hidden className="absolute inset-x-0 bottom-0 h-1/3 bg-linear-to-t from-void/80 to-transparent" />
              <p className="mono-label absolute bottom-4 left-4 text-lime" aria-hidden>
                ● {settings.full_name.toLowerCase().replace(/\s+/g, "_")}.ai
              </p>
            </div>
          </div>

          {/* Floating role chips */}
          {chips.map((role, i) => (
            <span
              key={role}
              aria-hidden
              className={`glass absolute hidden px-3.5 py-2 font-mono text-xs text-canvas/90 shadow-2xl shadow-black/40 sm:block animate-float ${
                ["-left-10 top-12", "-right-8 top-1/2", "-left-6 bottom-16"][i]
              }`}
              style={{ animationDelay: `${i * 1.3}s` }}
            >
              <span className={["text-lime", "text-pink", "text-lavender"][i]}>▹</span> {role}
            </span>
          ))}
        </Reveal>
      </div>

      {/* Roles marquee */}
      <div className="border-y border-white/10 bg-night/60 py-4" aria-hidden>
        <div className="flex w-max animate-marquee gap-10 whitespace-nowrap font-mono text-sm uppercase tracking-[0.2em] text-canvas/60">
          {Array.from({ length: 4 }).flatMap((_, k) =>
            settings.roles.map((r) => (
              <span key={`${k}-${r}`} className="flex items-center gap-10">
                {r}
                <span className="text-lime">✦</span>
              </span>
            )),
          )}
        </div>
      </div>
    </section>
  );
}
