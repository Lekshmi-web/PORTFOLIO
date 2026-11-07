import { Reveal } from "./Reveal";

interface PageHeaderProps {
  label: string;
  title: React.ReactNode;
  intro?: string | null;
  accent?: "lime" | "pink" | "coral" | "lavender";
}

const accents = {
  lime: "bg-lime",
  pink: "bg-pink",
  coral: "bg-coral",
  lavender: "bg-lavender",
};

export function PageHeader({ label, title, intro, accent = "lime" }: PageHeaderProps) {
  return (
    <header className="container-x relative pb-16 pt-36 md:pb-24 md:pt-48">
      <span
        aria-hidden
        className={`absolute right-6 top-28 size-24 rounded-full md:right-16 md:top-36 md:size-40 ${accents[accent]}`}
      />
      <Reveal className="relative max-w-4xl">
        <p className="eyebrow mb-6 text-violet">{label}</p>
        <h1 className="display text-5xl sm:text-6xl lg:text-8xl">{title}</h1>
        {intro && <p className="mt-8 max-w-2xl text-lg leading-relaxed text-ink/75">{intro}</p>}
      </Reveal>
    </header>
  );
}
