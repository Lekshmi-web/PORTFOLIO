"use client";

import { useEffect, useRef } from "react";

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  signal: boolean;
}

const LAVENDER = "217, 201, 245";
const LIME = "216, 241, 107";

/**
 * Animated neural-network background: drifting nodes that connect when close
 * and reach toward the cursor. Pauses when off-screen or the tab is hidden.
 * Reduced-motion users get a single static frame.
 */
export function NeuralBackground({ className = "" }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let width = 0;
    let height = 0;
    let nodes: Node[] = [];
    let raf = 0;
    let visible = true;
    const mouse = { x: -9999, y: -9999, active: false };

    const linkDist = () => Math.min(160, Math.max(110, width / 9));

    function build() {
      const rect = canvas!.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas!.width = Math.floor(width * dpr);
      canvas!.height = Math.floor(height * dpr);
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.round(Math.min(90, Math.max(28, (width * height) / 16000)));
      nodes = Array.from({ length: count }, (_, i) => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        r: Math.random() * 1.4 + 1,
        signal: i % 9 === 0,
      }));
    }

    function draw() {
      ctx!.clearRect(0, 0, width, height);
      const max = linkDist();

      for (const n of nodes) {
        if (!reduce) {
          n.x += n.vx;
          n.y += n.vy;
          if (n.x < -20) n.x = width + 20;
          if (n.x > width + 20) n.x = -20;
          if (n.y < -20) n.y = height + 20;
          if (n.y > height + 20) n.y = -20;
          // Gentle pull toward the cursor.
          if (mouse.active) {
            const dx = mouse.x - n.x;
            const dy = mouse.y - n.y;
            const d = Math.hypot(dx, dy);
            if (d < 200 && d > 1) {
              n.x += (dx / d) * 0.25;
              n.y += (dy / d) * 0.25;
            }
          }
        }
      }

      // Connections
      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i];
        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j];
          const d = Math.hypot(a.x - b.x, a.y - b.y);
          if (d < max) {
            const alpha = (1 - d / max) * 0.35;
            ctx!.strokeStyle = `rgba(${a.signal || b.signal ? LIME : LAVENDER}, ${alpha})`;
            ctx!.lineWidth = 1;
            ctx!.beginPath();
            ctx!.moveTo(a.x, a.y);
            ctx!.lineTo(b.x, b.y);
            ctx!.stroke();
          }
        }
        if (mouse.active) {
          const d = Math.hypot(a.x - mouse.x, a.y - mouse.y);
          if (d < 180) {
            ctx!.strokeStyle = `rgba(${LIME}, ${(1 - d / 180) * 0.5})`;
            ctx!.beginPath();
            ctx!.moveTo(a.x, a.y);
            ctx!.lineTo(mouse.x, mouse.y);
            ctx!.stroke();
          }
        }
      }

      // Nodes
      for (const n of nodes) {
        ctx!.fillStyle = n.signal ? `rgba(${LIME}, 0.95)` : `rgba(${LAVENDER}, 0.7)`;
        ctx!.beginPath();
        ctx!.arc(n.x, n.y, n.signal ? n.r + 1.2 : n.r, 0, Math.PI * 2);
        ctx!.fill();
        if (n.signal) {
          ctx!.fillStyle = `rgba(${LIME}, 0.12)`;
          ctx!.beginPath();
          ctx!.arc(n.x, n.y, n.r + 7, 0, Math.PI * 2);
          ctx!.fill();
        }
      }
    }

    function loop() {
      draw();
      if (visible && !document.hidden) raf = requestAnimationFrame(loop);
    }

    function start() {
      cancelAnimationFrame(raf);
      if (reduce) draw();
      else raf = requestAnimationFrame(loop);
    }

    build();
    start();

    const onResize = () => {
      build();
      start();
    };
    const onMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
      mouse.active = mouse.y >= 0 && mouse.y <= rect.height;
    };
    const onLeave = () => {
      mouse.active = false;
    };
    const onVisibility = () => {
      if (!document.hidden) start();
    };

    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) start();
    });
    observer.observe(canvas);

    const resizeObserver = new ResizeObserver(onResize);
    resizeObserver.observe(canvas);
    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerleave", onLeave);
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      cancelAnimationFrame(raf);
      observer.disconnect();
      resizeObserver.disconnect();
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return <canvas ref={canvasRef} aria-hidden className={`pointer-events-none size-full ${className}`} />;
}
