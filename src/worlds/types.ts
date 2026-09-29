export type DeviceTier = "high" | "mid" | "low";

export type WorldTheme =
  | "cloud-nine"
  | "midnight-rose"
  | "kage"
  | "apricot-film"
  | "wildflower-paper"
  | "ocean-letter";

export type EmotionalScene =
  | "welcome"
  | "story"
  | "memories"
  | "moments"
  | "promises"
  | "future"
  | "finale";

export interface DepthLayerConfig {
  depth: number; // 0 (deep background) to 1 (near foreground)
  blur?: number; // px blur
  opacity?: number;
  scale?: number;
  parallaxSpeed?: number; // relative to scroll/pointer
}

export interface AtmosphereSettings {
  ambientLightColor: string;
  horizonGlowColor: string;
  hazeOpacity: number;
  particleType: "clouds-and-petals" | "fireflies-and-stars" | "embers-and-mist";
  particleCount: {
    high: number;
    mid: number;
    low: number;
  };
}

export interface DimensionalWorldProps {
  theme: WorldTheme;
  accentVariant?: string;
  activeScene?: EmotionalScene;
  pacing?: "calm" | "balanced" | "cinematic";
  children: React.ReactNode;
  recipientName?: string;
  greeting?: string;
  isSealed?: boolean;
  className?: string;
  interactivePointer?: boolean;
}
