"use client";

import { useActionState } from "react";
import { sendMessage, type ContactState } from "@/app/(site)/contact/actions";

const initial: ContactState = { status: "idle", message: "" };

const input =
  "w-full border-0 border-b-2 border-ink/25 bg-transparent px-0 py-3 text-lg text-ink placeholder:text-ink/40 focus:border-violet focus:outline-none focus:ring-0";

export function ContactForm() {
  const [state, action, pending] = useActionState(sendMessage, initial);

  if (state.status === "success") {
    return (
      <div role="status" className="rounded-[2rem] bg-lime p-10 text-ink">
        <p className="display text-4xl">Message sent ✦</p>
        <p className="mt-3 text-lg">{state.message}</p>
      </div>
    );
  }

  return (
    <form action={action} className="space-y-8" noValidate>
      <div className="hidden" aria-hidden>
        <label>
          Website <input name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>
      <div className="grid gap-8 sm:grid-cols-2">
        <label className="block">
          <span className="eyebrow text-ink/70">Your name</span>
          <input name="name" required maxLength={120} autoComplete="name" className={input} />
        </label>
        <label className="block">
          <span className="eyebrow text-ink/70">Email</span>
          <input name="email" type="email" required maxLength={200} autoComplete="email" className={input} />
        </label>
      </div>
      <label className="block">
        <span className="eyebrow text-ink/70">Subject (optional)</span>
        <input name="subject" maxLength={200} placeholder="Workshop, collaboration, speaking…" className={input} />
      </label>
      <label className="block">
        <span className="eyebrow text-ink/70">Message</span>
        <textarea name="body" required rows={5} maxLength={5000} className={`${input} resize-y`} />
      </label>

      {state.status === "error" && (
        <p role="alert" className="rounded-xl bg-coral/15 px-4 py-3 text-ink">
          {state.message}
        </p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="rounded-full bg-violet px-8 py-4 font-grotesk font-medium text-canvas transition-colors hover:bg-ink disabled:opacity-60"
      >
        {pending ? "Sending…" : "Send message"}
      </button>
    </form>
  );
}
