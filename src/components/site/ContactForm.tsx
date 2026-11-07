"use client";

import { useActionState } from "react";
import { sendMessage, type ContactState } from "@/app/(site)/contact/actions";

const initial: ContactState = { status: "idle", message: "" };

const input =
  "w-full rounded-xl border border-white/10 bg-void/60 px-4 py-3 text-canvas placeholder:text-canvas/40 transition-colors focus:border-lime focus:outline-none";

export function ContactForm() {
  const [state, action, pending] = useActionState(sendMessage, initial);

  if (state.status === "success") {
    return (
      <div role="status" className="glass border-lime/40 p-8">
        <p className="font-mono text-sm text-lime">// status: 200 OK</p>
        <p className="heading mt-3 text-3xl">Message sent ✦</p>
        <p className="mt-3 text-canvas/75">{state.message}</p>
      </div>
    );
  }

  return (
    <form action={action} className="glass space-y-5 p-6 md:p-8" noValidate>
      <p className="font-mono text-xs text-canvas/60">
        <span className="text-lime">POST</span> /api/hello
      </p>
      <div className="hidden" aria-hidden>
        <label>
          Website <input name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="block">
          <span className="mono-label mb-2 block text-canvas/70">name</span>
          <input name="name" required maxLength={120} autoComplete="name" className={input} />
        </label>
        <label className="block">
          <span className="mono-label mb-2 block text-canvas/70">email</span>
          <input name="email" type="email" required maxLength={200} autoComplete="email" className={input} />
        </label>
      </div>
      <label className="block">
        <span className="mono-label mb-2 block text-canvas/70">subject (optional)</span>
        <input name="subject" maxLength={200} placeholder="Workshop, collaboration, speaking…" className={input} />
      </label>
      <label className="block">
        <span className="mono-label mb-2 block text-canvas/70">message</span>
        <textarea name="body" required rows={5} maxLength={5000} className={`${input} resize-y`} />
      </label>

      {state.status === "error" && (
        <p role="alert" className="rounded-xl border border-coral/40 bg-coral/10 px-4 py-3 text-sm text-canvas">
          {state.message}
        </p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="w-full rounded-full bg-lime px-6 py-3.5 font-grotesk text-sm font-medium text-void transition-shadow hover:shadow-[0_0_32px_-4px_rgba(216,241,107,0.6)] disabled:opacity-60 sm:w-auto"
      >
        {pending ? "Sending…" : "Send message →"}
      </button>
    </form>
  );
}
