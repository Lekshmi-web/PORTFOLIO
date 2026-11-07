import type { Metadata } from "next";
import { ContactForm } from "@/components/site/ContactForm";
import { Reveal } from "@/components/site/Reveal";
import { SocialLinks } from "@/components/site/SocialLinks";
import { getSettings } from "@/lib/data";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch about workshops, mentoring, speaking or collaborations.",
};

export default async function ContactPage() {
  const s = await getSettings();

  return (
    <section className="relative isolate overflow-hidden">
      <div aria-hidden className="absolute inset-0 -z-10">
        <div className="bg-grid absolute inset-0" />
        <div className="glow-violet absolute -right-40 -top-20 size-[620px]" />
        <div className="glow-pink absolute -bottom-40 -left-20 size-[480px]" />
      </div>
      <div className="container-x grid gap-12 pb-24 pt-32 md:pt-40 lg:grid-cols-[1fr_1.15fr] lg:gap-16">
        <Reveal>
          <p className="mono-label mb-5 text-lime">// let&apos;s connect</p>
          <h1 className="heading text-4xl sm:text-5xl lg:text-6xl">
            Let&apos;s build something <span className="accent-serif gradient-text">together</span>
          </h1>
          <p className="mt-6 max-w-md text-canvas/70">
            Workshops, mentoring, speaking, collaborations or just a question about AI — send a message and I&apos;ll
            reply as soon as I can.
          </p>
          {s.email && (
            <a href={`mailto:${s.email}`} className="link-underline mt-8 inline-block font-mono text-lg text-lime">
              {s.email}
            </a>
          )}
          <SocialLinks settings={s} className="mt-7 text-canvas" />
        </Reveal>
        <Reveal delay={0.1}>
          <ContactForm />
        </Reveal>
      </div>
    </section>
  );
}
