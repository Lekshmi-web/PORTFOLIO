"use server";

import { isSupabaseConfigured } from "@/lib/supabase/config";
import { createClient } from "@/lib/supabase/server";

export interface ContactState {
  status: "idle" | "success" | "error";
  message: string;
}

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function sendMessage(_prev: ContactState, formData: FormData): Promise<ContactState> {
  // Honeypot: real people never fill this hidden field.
  if (String(formData.get("website") ?? "")) return { status: "success", message: "Thanks!" };

  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const subject = String(formData.get("subject") ?? "").trim();
  const body = String(formData.get("body") ?? "").trim();

  if (!name || name.length > 120) return { status: "error", message: "Please enter your name." };
  if (!EMAIL.test(email) || email.length > 200) return { status: "error", message: "Please enter a valid email address." };
  if (!body || body.length > 5000) return { status: "error", message: "Please write a message (up to 5000 characters)." };

  if (!isSupabaseConfigured) {
    return { status: "error", message: "The contact form isn't connected yet — please use email instead." };
  }

  const supabase = await createClient();
  const { error } = await supabase.from("messages").insert({ name, email, subject: subject || null, body });
  if (error) {
    console.error("[contact]", error.message);
    return { status: "error", message: "Something went wrong. Please try again or email me directly." };
  }
  return { status: "success", message: "Thank you! Your message is on its way — I'll get back to you soon." };
}
