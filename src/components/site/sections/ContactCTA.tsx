import type { SiteSettings } from "@/lib/types";
import { ButtonLink } from "../ButtonLink";
import { Reveal } from "../Reveal";
import { TerminalTyping } from "../fx/TerminalTyping";

export function ContactCTA({ settings }: { settings: SiteSettings }) {
  const handle = settings.full_name.split(" ")[0]?.toLowerCase() ?? "me";
  return (
    <section className="container-x pb-20 md:pb-28" aria-labelledby="cta-title">
      <Reveal>
        <div className="relative isolate grid items-center gap-10 overflow-hidden rounded-3xl border border-white/10 bg-night px-6 py-14 sm:px-10 md:px-14 md:py-16 lg:grid-cols-[1.1fr_1fr]">
          <div aria-hidden className="absolute inset-0 -z-10">
            <div className="bg-grid absolute inset-0" />
            <div className="glow-violet absolute -right-20 -top-32 size-[520px]" />
            <div className="glow-pink absolute -bottom-40 left-10 size-[420px]" />
          </div>
          <div>
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
          <TerminalTyping
            title={`zsh — ${handle}`}
            lines={[
              { kind: "cmd", text: `connect --with ${handle}` },
              { kind: "out", text: "› resolving host ............ ok" },
              { kind: "out", text: "› opening secure channel .... ok" },
              { kind: "cmd", text: "send --message \"hello\"" },
              { kind: "out", text: "› ready when you are.", accent: true },
            ]}
          />
        </div>
      </Reveal>
    </section>
  );
}
