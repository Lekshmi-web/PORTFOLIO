"use client";

import { useActionState, useEffect, useRef } from "react";
import { sendMessage, type ContactState } from "@/app/(site)/contact/actions";
import { burst, originOf } from "./fx/confetti";

const initial: ContactState = { status: "idle", message: "" };

// user-valid / user-invalid only kick in after the visitor has interacted with a field.
const input =
  "w-full rounded-xl border border-white/10 bg-void/60 px-4 py-3 text-canvas placeholder:text-canvas/40 transition-[border-color,box-shadow] duration-300 focus:border-lavender focus:outline-none user-valid:border-lime/60 user-valid:shadow-[0_0_0_3px_rgba(216,241,107,0.08)] user-invalid:border-coral/70";

export function ContactForm() {
  const [state, action, pending] = useActionState(sendMessage, initial);
  const successRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (state.status === "success" && successRef.current) void burst(originOf(successRef.current));
  }, [state.status]);

  if (state.status === "success") {
    return (
      <div ref={successRef} role="status" className="glass border-lime/40 p-8">
        <p className="font-mono text-sm text-lime">// status: 200 OK</p>
        <p className="heading mt-3 text-3xl">Message sent ✦</p>
        <p className="mt-3 text-canvas/75">{state.message}</p>
        <pre className="mt-6 overflow-x-auto rounded-xl border border-white/10 bg-void/70 p-4 font-mono text-xs text-canvas/70">
          {`{\n  "delivered": true,\n  "reply": "soon"\n}`}
        </pre>
      </div>
    );
  }

  return (
    <form action={action} className="glass space-y-5 p-6 md:p-8">
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
        <textarea name="body" required minLength={2} rows={5} maxLength={5000} className={`${input} resize-y`} />
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
        {pending ? (
          <span className="inline-flex items-center gap-2">
            <span className="size-3 animate-spin rounded-full border-2 border-void border-t-transparent" aria-hidden />
            Sending…
          </span>
        ) : (
          "Send message →"
        )}
      </button>
    </form>
  );
}
