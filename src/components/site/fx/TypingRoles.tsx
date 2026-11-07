"use client";

import { useEffect, useState } from "react";

/** Terminal-style line that types each role, pauses, deletes, and moves on. */
export function TypingRoles({ roles, user = "lekshmi", className = "" }: { roles: string[]; user?: string; className?: string }) {
  const [index, setIndex] = useState(0);
  const [shown, setShown] = useState(roles[0] ?? "");
  const [deleting, setDeleting] = useState(false);
  const [reduce, setReduce] = useState(false);

  useEffect(() => {
    setReduce(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  useEffect(() => {
    if (reduce || roles.length < 2) return;
    const full = roles[index % roles.length];
    let timeout: ReturnType<typeof setTimeout>;

    if (!deleting && shown === full) {
      timeout = setTimeout(() => setDeleting(true), 1800);
    } else if (deleting && shown === "") {
      setDeleting(false);
      setIndex((i) => (i + 1) % roles.length);
    } else {
      timeout = setTimeout(
        () => setShown(deleting ? full.slice(0, shown.length - 1) : full.slice(0, shown.length + 1)),
        deleting ? 35 : 70,
      );
    }
    return () => clearTimeout(timeout);
  }, [shown, deleting, index, roles, reduce]);

  return (
    <p className={`font-mono text-sm sm:text-base ${className}`}>
      <span className="sr-only">{roles.join(", ")}</span>
      <span aria-hidden>
        <span className="text-lime">~/{user}</span>
        <span className="text-canvas/50"> $ </span>
        <span className="text-lavender">whoami</span>
        <span className="text-canvas/50"> → </span>
        <span className="text-canvas">{reduce ? roles.join(" · ") : shown}</span>
        <span className="ml-0.5 inline-block h-[1.1em] w-[0.55em] translate-y-[0.18em] bg-lime animate-blink" />
      </span>
    </p>
  );
}
