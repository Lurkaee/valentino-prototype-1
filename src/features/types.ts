export type FeatureCategory =
  | "personal"
  | "moments"
  | "mood"
  | "immersive"
  | "keepsake";

export interface FeatureCategoryMeta {
  id: FeatureCategory;
  name: string;
  tagline: string;
  description: string;
  icon: string;
}

export const FEATURE_CATEGORIES: Record<FeatureCategory, FeatureCategoryMeta> = {
  personal: {
    id: "personal",
    name: "MAKE IT PERSONAL",
    tagline: "Tell your story and shape the message",
    description: "Core love letter, custom names, greetings, sign-offs, and emotional expressions.",
    icon: "✍️",
  },
  moments: {
    id: "moments",
    name: "ADD A MOMENT",
    tagline: "Interactive recipient experiences",
    description: "Playful quizzes, milestone timelines, hidden secret notes, and open-when letters.",
    icon: "✨",
  },
  mood: {
    id: "mood",
    name: "SET THE MOOD",
    tagline: "Decor, atmosphere, and tactile craft",
    description: "Handmade paper textures, satin ribbons, wax seals, bouquet blooms, and orbiting charms.",
    icon: "🕯️",
  },
  immersive: {
    id: "immersive",
    name: "MAKE IT IMMERSIVE",
    tagline: "Atmospheric 3D worlds and environments",
    description: "Cinematic night envelopes, dreamy pastel clouds, Kyoto temple shadows, and interactive plasma shaders.",
    icon: "🌌",
  },
  keepsake: {
    id: "keepsake",
    name: "MAKE IT LAST",
    tagline: "Keepsakes, time-locks, and lasting artifacts",
    description: "Scheduled midnight reveals, partner response sparks, audio notes, and printable QR keepsakes.",
    icon: "⏳",
  },
};

export type FeatureAvailability = "available" | "coming-soon";

export type FeatureActionType =
  | "toggle-module"
  | "scroll-section"
  | "open-world-modal"
  | "info";

export interface FeatureDefinition {
  id: string;
  name: string;
  tagline: string;
  description: string;
  category: FeatureCategory;
  availability: FeatureAvailability;
  icon: string;
  actionType?: FeatureActionType;
  targetModuleKey?: "timeline" | "quiz" | "secret" | "openWhen";
  targetSection?: "world" | "story" | "moments" | "mood" | "preview";
  compatibleTemplates: string[];
  discoveryContext: ("moments" | "story" | "mood" | "preview" | "templates" | "world")[];
  badges?: string[];
  samplePreview?: {
    type: "timeline" | "quiz" | "secret" | "envelope" | "decor" | "world" | "audio" | "qr" | "polaroid";
    caption?: string;
  };
}
