"use client";

import { useRef, useState } from "react";
import { ArrowLeft, ArrowRight, ImagePlus, Loader2, X } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

const MAX_MB = 8;

/** Multi-image uploader. Each URL is submitted as a repeated hidden input with the same name. */
export function GalleryField({ name, defaultValue, folder }: { name: string; defaultValue: string[]; folder: string }) {
  const [urls, setUrls] = useState<string[]>(defaultValue);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  async function onFiles(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files ?? []);
    if (!files.length) return;
    setBusy(true);
    setError(null);
    const supabase = createClient();
    const added: string[] = [];
    for (const file of files) {
      if (file.size > MAX_MB * 1024 * 1024) {
        setError(`${file.name} is larger than ${MAX_MB} MB — skipped.`);
        continue;
      }
      const ext = file.name.split(".").pop()?.toLowerCase() ?? "jpg";
      const path = `${folder}/gallery/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
      const { error: upErr } = await supabase.storage.from("media").upload(path, file, {
        cacheControl: "31536000",
        contentType: file.type || undefined,
      });
      if (upErr) {
        setError(upErr.message);
        continue;
      }
      added.push(supabase.storage.from("media").getPublicUrl(path).data.publicUrl);
    }
    setUrls((u) => [...u, ...added]);
    setBusy(false);
    if (inputRef.current) inputRef.current.value = "";
  }

  function move(i: number, dir: -1 | 1) {
    setUrls((u) => {
      const next = [...u];
      const j = i + dir;
      if (j < 0 || j >= next.length) return u;
      [next[i], next[j]] = [next[j], next[i]];
      return next;
    });
  }

  return (
    <div className="space-y-3">
      {urls.map((u) => (
        <input key={u} type="hidden" name={name} value={u} />
      ))}
      {urls.length > 0 && (
        <ul className="grid grid-cols-3 gap-3 sm:grid-cols-4">
          {urls.map((u, i) => (
            <li key={u} className="group relative aspect-square overflow-hidden rounded-lg border border-ink/10 bg-ink/5">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={u} alt="" className="size-full object-cover" />
              <div className="absolute inset-x-0 bottom-0 flex justify-between bg-ink/70 p-1 opacity-0 transition-opacity group-hover:opacity-100 group-focus-within:opacity-100">
                <button type="button" onClick={() => move(i, -1)} aria-label="Move earlier" className="rounded p-1 text-canvas hover:bg-white/10">
                  <ArrowLeft className="size-3.5" aria-hidden />
                </button>
                <button type="button" onClick={() => move(i, 1)} aria-label="Move later" className="rounded p-1 text-canvas hover:bg-white/10">
                  <ArrowRight className="size-3.5" aria-hidden />
                </button>
              </div>
              <button
                type="button"
                onClick={() => setUrls((list) => list.filter((x) => x !== u))}
                className="absolute right-1 top-1 rounded-full bg-ink p-1 text-canvas"
                aria-label="Remove image"
              >
                <X className="size-3" aria-hidden />
              </button>
            </li>
          ))}
        </ul>
      )}
      <label className="inline-flex cursor-pointer items-center gap-2 rounded-lg bg-ink px-4 py-2 font-grotesk text-sm text-canvas hover:bg-violet">
        {busy ? <Loader2 className="size-4 animate-spin" aria-hidden /> : <ImagePlus className="size-4" aria-hidden />}
        {busy ? "Uploading…" : "Add photos"}
        <input ref={inputRef} type="file" accept="image/*" multiple onChange={onFiles} className="sr-only" disabled={busy} />
      </label>
      {error && <p className="text-sm text-coral">{error}</p>}
    </div>
  );
}
