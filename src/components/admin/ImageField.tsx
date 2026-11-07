"use client";

import { useRef, useState } from "react";
import { FileText, ImageUp, Loader2, X } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

interface ImageFieldProps {
  name: string;
  defaultValue: string | null;
  folder: string;
  accept?: string;
}

const MAX_MB = 8;

/** Uploads to the Supabase "media" bucket and stores the public URL in a hidden input. */
export function ImageField({ name, defaultValue, folder, accept = "image/*" }: ImageFieldProps) {
  const [url, setUrl] = useState(defaultValue ?? "");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const isPdf = url.toLowerCase().endsWith(".pdf");

  async function onFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > MAX_MB * 1024 * 1024) {
      setError(`File is larger than ${MAX_MB} MB.`);
      return;
    }
    setBusy(true);
    setError(null);
    try {
      const supabase = createClient();
      const ext = file.name.split(".").pop()?.toLowerCase() ?? "bin";
      const path = `${folder}/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
      const { error: upErr } = await supabase.storage.from("media").upload(path, file, {
        cacheControl: "31536000",
        upsert: false,
        contentType: file.type || undefined,
      });
      if (upErr) throw upErr;
      const { data } = supabase.storage.from("media").getPublicUrl(path);
      setUrl(data.publicUrl);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed.");
    } finally {
      setBusy(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  }

  return (
    <div className="space-y-3">
      <input type="hidden" name={name} value={url} />
      {url ? (
        <div className="relative inline-block">
          {isPdf ? (
            <a href={url} target="_blank" rel="noreferrer" className="flex items-center gap-2 rounded-lg bg-lavender px-4 py-3 text-sm">
              <FileText className="size-4" aria-hidden /> View uploaded PDF
            </a>
          ) : (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={url} alt="" className="h-36 w-auto max-w-full rounded-lg border border-ink/10 object-cover" />
          )}
          <button
            type="button"
            onClick={() => setUrl("")}
            className="absolute -right-2 -top-2 rounded-full bg-ink p-1 text-canvas"
            aria-label="Remove file"
          >
            <X className="size-3.5" aria-hidden />
          </button>
        </div>
      ) : null}
      <div className="flex flex-wrap items-center gap-3">
        <label className="inline-flex cursor-pointer items-center gap-2 rounded-lg bg-ink px-4 py-2 font-grotesk text-sm text-canvas hover:bg-violet">
          {busy ? <Loader2 className="size-4 animate-spin" aria-hidden /> : <ImageUp className="size-4" aria-hidden />}
          {busy ? "Uploading…" : url ? "Replace" : "Upload"}
          <input ref={inputRef} type="file" accept={accept} onChange={onFile} className="sr-only" disabled={busy} />
        </label>
        <span className="text-xs text-ink/50">or paste a link:</span>
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="https://…"
          className="field max-w-xs py-1.5"
          aria-label="File URL"
        />
      </div>
      {error && <p className="text-sm text-coral">{error}</p>}
    </div>
  );
}
