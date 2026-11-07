import { deleteMessage, setMessageRead } from "@/app/admin/actions";
import { ConfirmButton } from "@/components/admin/ConfirmButton";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { createClient } from "@/lib/supabase/server";
import type { Message } from "@/lib/types";

export const dynamic = "force-dynamic";

export default async function MessagesPage() {
  if (!isSupabaseConfigured) return null; // the layout shows setup steps
  const supabase = await createClient();
  const { data } = await supabase.from("messages").select("*").order("created_at", { ascending: false }).limit(200);
  const messages = (data ?? []) as Message[];

  return (
    <div className="max-w-4xl">
      <h1 className="font-display text-4xl">Messages</h1>
      <p className="mb-8 mt-2 text-ink/60">Sent through the contact form on your website.</p>

      {messages.length === 0 ? (
        <p className="rounded-2xl bg-white p-10 text-center text-ink/60 ring-1 ring-ink/5">No messages yet.</p>
      ) : (
        <ul className="space-y-4">
          {messages.map((m) => (
            <li
              key={m.id}
              className={`rounded-2xl bg-white p-6 shadow-sm ring-1 ${m.is_read ? "ring-ink/5" : "ring-violet"}`}
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="font-medium">
                    {!m.is_read && <span className="mr-2 inline-block size-2 rounded-full bg-violet" aria-label="Unread" />}
                    {m.name}{" "}
                    <a href={`mailto:${m.email}?subject=${encodeURIComponent(`Re: ${m.subject ?? "Your message"}`)}`} className="text-violet underline">
                      {m.email}
                    </a>
                  </p>
                  {m.subject && <p className="mt-1 font-grotesk text-sm text-ink/70">{m.subject}</p>}
                </div>
                <time className="font-grotesk text-xs text-ink/50" dateTime={m.created_at}>
                  {new Date(m.created_at).toLocaleString("en-GB", { dateStyle: "medium", timeStyle: "short", timeZone: "Asia/Kolkata" })}
                </time>
              </div>
              <p className="mt-4 whitespace-pre-line text-ink/85">{m.body}</p>
              <div className="mt-5 flex gap-4 text-sm">
                <form action={setMessageRead.bind(null, m.id, !m.is_read)}>
                  <button className="underline">{m.is_read ? "Mark unread" : "Mark read"}</button>
                </form>
                <ConfirmButton
                  action={deleteMessage.bind(null, m.id)}
                  message="Delete this message permanently?"
                  className="text-coral underline"
                >
                  Delete
                </ConfirmButton>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
