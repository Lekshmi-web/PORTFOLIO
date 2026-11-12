"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/lib/types";
import { SampleTag } from "../SampleTag";
import { SmartImage } from "../SmartImage";

function ProjectCard({ p, index }: { p: Project; index: number }) {
  return (
    <Link
      href={`/projects/${p.slug}`}
      data-cursor="view"
      className={`group spotlight glass flex h-full flex-col overflow-hidden transition-colors duration-500 hover:border-white/20`}
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-night">
        {p.image_url && (
          <SmartImage
            src={p.image_url}
            alt={`${p.title} preview`}
            fill
            sizes="(min-width: 1024px) 520px, 100vw"
            className="object-cover transition-transform duration-700 ease-[var(--ease-soft)] group-hover:scale-[1.05]"
          />
        )}
        <span className="chip absolute left-4 top-4 bg-void/60 backdrop-blur">
          <span className="text-lime">{String(index + 1).padStart(2, "0")}</span>
        </span>
      </div>
      <div className="flex flex-1 flex-col p-6">
        <h3 className="heading flex flex-wrap items-center gap-2 text-2xl group-hover:text-lime">
          {p.title} <SampleTag show={p.is_sample} />
        </h3>
        {p.summary && <p className="mt-2 text-sm text-canvas/70">{p.summary}</p>}
        <div className="mt-auto flex items-end justify-between gap-4 pt-6">
          {p.tech.length > 0 ? (
            <ul className="flex flex-wrap gap-1.5">
              {p.tech.slice(0, 4).map((t) => (
                <li key={t} className="chip">
                  {t}
                </li>
              ))}
            </ul>
          ) : (
            <span />
          )}
          <ArrowUpRight aria-hidden className="size-5 shrink-0 text-canvas/50 transition-all group-hover:rotate-45 group-hover:text-lime" />
        </div>
      </div>
    </Link>
  );
}

function Intro({ count }: { count: number }) {
  return (
    <div className="flex h-full flex-col justify-between">
      <div>
        <p className="mono-label mb-4 text-lime">// 02 — selected work</p>
        <h2 className="heading text-4xl lg:text-5xl">
          Things I&apos;ve <span className="accent-serif gradient-text">built</span>
        </h2>
        <p className="mt-4 max-w-xs text-canvas/65">
          {count} project{count === 1 ? "" : "s"} across AI, data and the web. Keep scrolling →
        </p>
      </div>
      <Link href="/projects" className="mt-8 inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-widest text-lavender hover:text-lime">
        All projects <ArrowUpRight className="size-4" aria-hidden />
      </Link>
    </div>
  );
}

/**
 * Desktop: the section pins and projects slide sideways as you scroll down.
 * Mobile / reduced motion: a normal stacked grid (CSS decides which is shown).
 */
export function PinnedProjects({ projects }: { projects: Project[] }) {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [distance, setDistance] = useState(0);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end end"] });
  const x = useTransform(scrollYProgress, [0, 1], [0, -distance]);

  useEffect(() => {
    const measure = () => {
      const track = trackRef.current;
      if (!track) return;
      setDistance(Math.max(0, track.scrollWidth - window.innerWidth));
    };
    measure();
    const ro = new ResizeObserver(measure);
    if (trackRef.current) ro.observe(trackRef.current);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [projects.length]);

  if (!projects.length) return null;

  return (
    <>
      {/* Desktop pinned horizontal scroll */}
      <section
        ref={sectionRef}
        aria-label="Featured projects"
        className="relative hidden lg:block lg:motion-reduce:hidden"
        style={{ height: `calc(100vh + ${distance}px)` }}
      >
        <div className="sticky top-0 flex h-screen items-center overflow-hidden">
          <motion.div ref={trackRef} style={{ x }} className="flex w-max items-stretch gap-5 pl-[max(2.5rem,calc((100vw-1240px)/2+2.5rem))] pr-16">
            <div className="w-[340px] shrink-0 py-2">
              <Intro count={projects.length} />
            </div>
            {projects.map((p, i) => (
              <div key={p.id} className="h-[min(560px,72vh)] w-[480px] shrink-0">
                <ProjectCard p={p} index={i} />
              </div>
            ))}
          </motion.div>
          <div className="container-x absolute inset-x-0 bottom-10">
            <div className="h-px w-full bg-white/10">
              <motion.div className="h-full origin-left bg-lime" style={{ scaleX: scrollYProgress }} />
            </div>
          </div>
        </div>
      </section>

      {/* Mobile / reduced motion */}
      <section aria-label="Featured projects" className="py-20 lg:hidden lg:motion-reduce:block">
        <div className="container-x">
          <div className="mb-10">
            <Intro count={projects.length} />
          </div>
          <ul className="grid gap-4 md:grid-cols-2">
            {projects.map((p, i) => (
              <li key={p.id}>
                <ProjectCard p={p} index={i} />
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
