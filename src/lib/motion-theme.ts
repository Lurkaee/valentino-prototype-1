/**
 * Valentino Central Motion Theme
 *
 * Restrained, editorial, and cinematic motion curves tailored for an intimate,
 * luxury romantic atmosphere. Avoids aggressive spring overshoot or distracting bounces.
 */

export const motionTheme = {
  // Editorial transitions (for hero reveals, headlines, quiet entrances)
  editorial: {
    duration: 0.9,
    ease: [0.16, 1, 0.3, 1] as const, // Quintic ease-out: smooth, elegant deceleration
  },

  // Stagger timings
  stagger: {
    slow: 0.18,
    medium: 0.12,
    fast: 0.08,
  },

  // Navigation curtain wipe
  curtain: {
    duration: 0.45,
    ease: [0.76, 0, 0.24, 1] as const, // Cinematic power ease in-out
  },

  // Micro-interactions (hover, tap)
  subtle: {
    duration: 0.25,
    ease: [0.25, 1, 0.5, 1] as const,
  },

  // Fade transitions
  fade: {
    duration: 0.4,
    ease: "easeOut",
  },
} as const;
