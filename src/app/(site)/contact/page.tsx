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
    <section className="container-x pb-24 pt-32 md:pb-32 md:pt-44">
      <div className="grid gap-16 lg:grid-cols-[1fr_1.2fr] lg:gap-24">
        <Reveal>
          <p className="eyebrow mb-6 text-violet">Let&apos;s connect</p>
          <h1 className="display text-5xl sm:text-6xl lg:text-7xl">
            Let&apos;s build something <span className="italic text-violet">together</span>
          </h1>
          <p className="mt-8 max-w-md text-lg text-ink/75">
            Workshops, mentoring, speaking, collaborations or just a question about AI — send a message and I&apos;ll
            reply as soon as I can.
          </p>
          {s.email && (
            <a href={`mailto:${s.email}`} className="link-underline mt-10 inline-block font-display text-2xl text-violet md:text-3xl">
              {s.email}
            </a>
          )}
          <SocialLinks settings={s} className="mt-8 text-ink" />
        </Reveal>
        <Reveal delay={0.1}>
          <ContactForm />
        </Reveal>
      </div>
    </section>
  );
}
