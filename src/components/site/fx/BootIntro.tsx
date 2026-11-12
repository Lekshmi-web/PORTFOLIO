import { BootSkip } from "./BootSkip";

const KEY = "lk-booted";

/**
 * First-visit boot sequence. Animation and fade-out are pure CSS (see .boot in globals.css),
 * so it always ends even without JavaScript. The inline script hides it instantly for visitors
 * who already saw it this session; reduced-motion visitors never see it.
 */
export function BootIntro({ name }: { name: string }) {
  const handle = name.toLowerCase().replace(/\s+/g, "_");
  const lines = [
    { t: `> initializing ${handle}.ai`, d: 0.1 },
    { t: "> loading neural modules ......... ok", d: 0.45 },
    { t: "> mounting workshops & projects .. ok", d: 0.8 },
    { t: "> system online ●", d: 1.2, accent: true },
  ];

  return (
    <>
      <script
        // Runs before the overlay is parsed, so returning visitors never see a flash.
        dangerouslySetInnerHTML={{
          __html: `try{if(sessionStorage.getItem("${KEY}"))document.documentElement.setAttribute("data-booted","1")}catch(e){}`,
        }}
      />
      <div
        id="boot"
        className="boot fixed inset-0 z-[100] flex items-center justify-center bg-void px-6"
        aria-hidden
      >
        <div className="bg-grid absolute inset-0" />
        <div className="glow-violet absolute left-1/2 top-1/2 size-[520px] -translate-x-1/2 -translate-y-1/2" />
        <div className="relative w-full max-w-md font-mono text-sm">
          <p className="mb-6 text-2xl font-medium tracking-tight text-canvas">
            {name.split(" ")[0]}
            <span className="text-lime">.ai</span>
          </p>
          {lines.map((l) => (
            <p
              key={l.t}
              className={`boot-line leading-7 ${l.accent ? "text-lime" : "text-canvas/70"}`}
              style={{ animationDelay: `${l.d}s` }}
            >
              {l.t}
            </p>
          ))}
          <div className="mt-6 h-px w-full overflow-hidden bg-white/10">
            <div className="boot-bar h-full w-full bg-linear-to-r from-violet via-pink to-lime" />
          </div>
          <p className="mt-3 text-[11px] text-canvas/60">press any key to skip</p>
        </div>
      </div>
      <BootSkip storageKey={KEY} />
    </>
  );
}
