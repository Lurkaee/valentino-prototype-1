"use client";

import { useState, useEffect } from "react";
import { DeviceTier } from "./types";

interface DeviceCapabilities {
  tier: DeviceTier;
  isReducedMotion: boolean;
  isMobile: boolean;
  canHover: boolean;
}

export function useDeviceTier(): DeviceCapabilities {
  const [capabilities, setCapabilities] = useState<DeviceCapabilities>({
    tier: "mid",
    isReducedMotion: false,
    isMobile: false,
    canHover: true,
  });

  useEffect(() => {
    if (typeof window === "undefined") return;

    // 1. Reduced motion check
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const isReducedMotion = motionQuery.matches;

    // 2. Hover capability
    const hoverQuery = window.matchMedia("(hover: hover)");
    const canHover = hoverQuery.matches;

    // 3. Mobile screen size & touch check
    const isSmallScreen = window.innerWidth < 768;
    const isTouch = "ontouchstart" in window || navigator.maxTouchPoints > 0;
    const isMobile = isSmallScreen || isTouch;

    // 4. Hardware concurrency & device memory heuristics
    const cores = navigator.hardwareConcurrency || 4;
    // @ts-expect-error deviceMemory is supported on modern Chromium
    const memory = navigator.deviceMemory || 4;

    let tier: DeviceTier = "high";

    if (isReducedMotion || cores <= 2 || memory <= 2) {
      tier = "low";
    } else if (isMobile || cores <= 4 || memory <= 4) {
      tier = "mid";
    } else {
      tier = "high";
    }

    setCapabilities({
      tier,
      isReducedMotion,
      isMobile,
      canHover,
    });

    const handleMotionChange = (e: MediaQueryListEvent) => {
      setCapabilities((prev) => ({
        ...prev,
        isReducedMotion: e.matches,
        tier: e.matches ? "low" : prev.tier,
      }));
    };

    motionQuery.addEventListener("change", handleMotionChange);
    return () => motionQuery.removeEventListener("change", handleMotionChange);
  }, []);

  return capabilities;
}
