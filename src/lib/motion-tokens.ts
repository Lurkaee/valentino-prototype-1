/**
 * Valentino Phase 6 Motion Tokens
 * Centralized easing, durations, and spatial choreography constants.
 */

export const MOTION_TOKENS = {
  ease: {
    editorial: "cubic-bezier(0.16, 1, 0.3, 1)", // Smooth luxury decelerate
    gentle: "cubic-bezier(0.25, 1, 0.5, 1)",
    snappy: "cubic-bezier(0.2, 0.8, 0.2, 1)",
    tactilePress: "cubic-bezier(0.4, 0, 0.2, 1)",
    gsapEditorial: "power3.out",
    gsapAtmosphere: "sine.inOut",
  },
  duration: {
    instant: 0.12,
    tactile: 0.2,
    reveal: 0.45,
    editorial: 0.8,
    atmospheric: 1.4,
  },
  spatial: {
    staggerNormal: 0.08,
    staggerSlow: 0.14,
    parallaxFactor: 0.12,
  },
} as const;
