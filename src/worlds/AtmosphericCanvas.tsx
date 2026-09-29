"use client";

import React, { useEffect, useRef } from "react";
import { DeviceTier, WorldTheme } from "./types";

interface AtmosphericCanvasProps {
  theme: WorldTheme;
  tier: DeviceTier;
  isReducedMotion: boolean;
  className?: string;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
  maxAlpha: number;
  rotation: number;
  rotationSpeed: number;
  pulsePhase: number;
  type: "petal" | "mote" | "ember" | "firefly";
}

export const AtmosphericCanvas: React.FC<AtmosphericCanvasProps> = ({
  theme,
  tier,
  isReducedMotion,
  className = "",
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const pointerRef = useRef<{ x: number; y: number; active: boolean }>({
    x: -1000,
    y: -1000,
    active: false,
  });

  useEffect(() => {
    if (isReducedMotion) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let animationFrameId: number;
    let isVisible = true;
    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };

    window.addEventListener("resize", handleResize);

    // Particle Count by Tier
    const countMap: Record<DeviceTier, number> = {
      low: 10,
      mid: 24,
      high: 44,
    };
    const count = countMap[tier];

    // Seed Particles
    const particles: Particle[] = [];
    for (let i = 0; i < count; i++) {
      const isMote = Math.random() > 0.45;
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.45,
        vy: theme === "cloud-nine" ? 0.35 + Math.random() * 0.4 : theme === "kage" ? -0.25 - Math.random() * 0.35 : 0.2 + Math.random() * 0.4,
        size: isMote ? 2 + Math.random() * 2.5 : 5 + Math.random() * 6,
        alpha: Math.random() * 0.7,
        maxAlpha: 0.35 + Math.random() * 0.5,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.02,
        pulsePhase: Math.random() * Math.PI * 2,
        type: theme === "cloud-nine"
          ? (isMote ? "mote" : "petal")
          : theme === "midnight-rose"
          ? (isMote ? "firefly" : "petal")
          : (isMote ? "mote" : "ember"),
      });
    }

    // Pointer Interaction
    const handlePointerMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      pointerRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        active: true,
      };
    };

    const handlePointerLeave = () => {
      pointerRef.current.active = false;
    };

    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerleave", handlePointerLeave);

    // Visibility-aware lifecycle (Page Visibility API & Intersection Observer)
    const handleVisibilityChange = () => {
      isVisible = document.visibilityState === "visible";
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);

    const observer = new IntersectionObserver(([entry]) => {
      isVisible = entry.isIntersecting && document.visibilityState === "visible";
    });
    observer.observe(canvas);

    // Animation Loop
    const render = () => {
      if (!isVisible) {
        animationFrameId = requestAnimationFrame(render);
        return;
      }

      ctx.clearRect(0, 0, width, height);

      const pointer = pointerRef.current;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Motion physics
        p.x += p.vx;
        p.y += p.vy;
        p.rotation += p.rotationSpeed;
        p.pulsePhase += 0.025;

        // Pointer deflection
        if (pointer.active) {
          const dx = p.x - pointer.x;
          const dy = p.y - pointer.y;
          const distSq = dx * dx + dy * dy;
          if (distSq < 10000 && distSq > 1) {
            const dist = Math.sqrt(distSq);
            const force = (100 - dist) / 100;
            p.x += (dx / dist) * force * 1.8;
            p.y += (dy / dist) * force * 1.8;
          }
        }

        // Boundary wrapping
        if (p.y > height + 20) p.y = -20;
        if (p.y < -20) p.y = height + 20;
        if (p.x > width + 20) p.x = -20;
        if (p.x < -20) p.x = width + 20;

        // Opacity oscillation
        const alpha = Math.min(
          p.maxAlpha,
          p.maxAlpha * (0.6 + 0.4 * Math.sin(p.pulsePhase))
        );

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);

        if (p.type === "mote" || p.type === "firefly") {
          // Luminous celestial mote / firefly
          const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, p.size * 2);
          if (theme === "cloud-nine") {
            gradient.addColorStop(0, `rgba(255, 240, 245, ${alpha})`);
            gradient.addColorStop(0.5, `rgba(251, 207, 232, ${alpha * 0.6})`);
            gradient.addColorStop(1, "rgba(251, 207, 232, 0)");
          } else if (theme === "midnight-rose") {
            gradient.addColorStop(0, `rgba(255, 230, 200, ${alpha * 1.2})`);
            gradient.addColorStop(0.6, `rgba(244, 63, 94, ${alpha * 0.5})`);
            gradient.addColorStop(1, "rgba(244, 63, 94, 0)");
          } else {
            gradient.addColorStop(0, `rgba(224, 35, 28, ${alpha})`);
            gradient.addColorStop(0.7, `rgba(16, 185, 129, ${alpha * 0.4})`);
            gradient.addColorStop(1, "rgba(0, 0, 0, 0)");
          }
          ctx.fillStyle = gradient;
          ctx.beginPath();
          ctx.arc(0, 0, p.size * 2, 0, Math.PI * 2);
          ctx.fill();
        } else if (p.type === "petal") {
          // Soft curved organic petal
          ctx.fillStyle =
            theme === "cloud-nine"
              ? `rgba(244, 114, 182, ${alpha * 0.7})`
              : `rgba(225, 29, 72, ${alpha * 0.8})`;
          ctx.beginPath();
          ctx.ellipse(0, 0, p.size, p.size * 0.55, 0, 0, Math.PI * 2);
          ctx.fill();
        } else {
          // Kyoto ember
          ctx.fillStyle = `rgba(224, 35, 28, ${alpha})`;
          ctx.beginPath();
          ctx.arc(0, 0, p.size * 0.7, 0, Math.PI * 2);
          ctx.fill();
        }

        ctx.restore();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerleave", handlePointerLeave);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      observer.disconnect();
    };
  }, [theme, tier, isReducedMotion]);

  if (isReducedMotion) return null;

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 w-full h-full will-change-transform z-15 ${className}`}
    />
  );
};
