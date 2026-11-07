import { Reveal } from "./Reveal";

interface PageHeaderProps {
  label: string;
  title: React.ReactNode;
  intro?: string | null;
  accent?: "violet" | "pink";
}

export function PageHeader({ label, title, intro, accent = "violet" }: PageHeaderProps) {
  return (
    <header className="relative isolate overflow-hidden">
      <div aria-hidden className="absolute inset-0 -z-10">
        <div className="bg-grid absolute inset-0" />
        <div className={`${accent === "pink" ? "glow-pink" : "glow-violet"} absolute -right-40 -top-40 size-[560px]`} />
      </div>
      <div className="container-x pb-12 pt-32 md:pb-16 md:pt-40">
        <Reveal className="max-w-3xl">
          <p className="mono-label mb-5 text-lime">// {label}</p>
          <h1 className="heading text-4xl sm:text-5xl lg:text-6xl">{title}</h1>
          {intro && <p className="mt-6 max-w-2xl text-base leading-relaxed text-canvas/70 md:text-lg">{intro}</p>}
        </Reveal>
      </div>
    </header>
  );
}
