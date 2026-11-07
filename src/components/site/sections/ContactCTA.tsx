import type { SiteSettings } from "@/lib/types";
import { ButtonLink } from "../ButtonLink";
import { Reveal } from "../Reveal";

export function ContactCTA({ settings }: { settings: SiteSettings }) {
  return (
    <section className="container-x pb-20 md:pb-32" aria-labelledby="cta-title">
      <Reveal>
        <div className="relative overflow-hidden rounded-[2.5rem] bg-violet px-6 py-16 text-canvas sm:px-12 md:px-20 md:py-24">
          <span aria-hidden className="absolute -right-16 -top-16 hidden size-64 rounded-full bg-pink/90 lg:block" />
          <span aria-hidden className="absolute -bottom-20 right-32 size-40 rounded-full border-2 border-lime" />
          <div className="relative max-w-3xl">
            <p className="eyebrow mb-6 text-lime">07 — Let&apos;s connect</p>
            <h2 id="cta-title" className="display text-5xl sm:text-6xl lg:text-7xl">
              Have a workshop, project or idea in mind?
            </h2>
            <p className="mt-6 max-w-xl text-lg text-canvas/85">
              I&apos;m always happy to talk about AI, teaching, collaborations and speaking.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <ButtonLink href="/contact" variant="lime">
                Let&apos;s Connect
              </ButtonLink>
              {settings.email && (
                <ButtonLink href={`mailto:${settings.email}`} variant="outline-light" arrow={false} external>
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
