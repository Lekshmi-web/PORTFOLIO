import type { SiteSettings } from "@/lib/types";
import { ButtonLink } from "../ButtonLink";
import { Reveal } from "../Reveal";

export function ContactCTA({ settings }: { settings: SiteSettings }) {
  return (
    <section className="container-x pb-20 md:pb-28" aria-labelledby="cta-title">
      <Reveal>
        <div className="relative isolate overflow-hidden rounded-3xl border border-white/10 bg-night px-6 py-14 sm:px-10 md:px-16 md:py-20">
          <div aria-hidden className="absolute inset-0 -z-10">
            <div className="bg-grid absolute inset-0" />
            <div className="glow-violet absolute -right-20 -top-32 size-[520px]" />
            <div className="glow-pink absolute -bottom-40 left-10 size-[420px]" />
          </div>
          <div className="max-w-2xl">
            <p className="mono-label mb-5 text-lime">// 07 — let&apos;s connect</p>
            <h2 id="cta-title" className="heading text-3xl sm:text-4xl lg:text-5xl">
              Have a workshop, project or <span className="accent-serif gradient-text">idea</span> in mind?
            </h2>
            <p className="mt-5 max-w-xl text-canvas/70">
              I&apos;m always happy to talk about AI, teaching, collaborations and speaking.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink href="/contact">Let&apos;s Connect</ButtonLink>
              {settings.email && (
                <ButtonLink href={`mailto:${settings.email}`} variant="outline" arrow={false} external>
                  {settings.email}
                </ButtonLink>
              )}
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
