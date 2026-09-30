/**
 * Valentino World Definition Registry (Phase 6 UI / UX Renaissance)
 * Scalable art-direction and experiential specifications for Valentino worlds.
 */

export interface WorldPalette {
  background: string;
  surface: string;
  surfaceBorder: string;
  text: string;
  mutedText: string;
  accent: string;
  highlight: string;
  shadowGlow: string;
}

export interface WorldTypography {
  serifFont: string;
  sansFont: string;
  headingTracking: string;
  scaleRatio: number;
}

export interface WorldMaterial {
  name: string;
  texturePattern: string;
  sheen: string;
  borderStyle: string;
  backdropBlur: string;
  noiseOpacity: number;
}

export interface WorldInteractionSignature {
  actionLabel: string;
  description: string;
  heroObjectName: string;
  pointerBehavior: "parallax-float" | "starlight-trail" | "mist-disperse" | "light-leak" | "petal-drift" | "tidal-ripple";
}

export interface WorldDefinition {
  id: string;
  name: string;
  tagline: string;
  atmosphere: string;
  emotionalTone: string;
  category: "Celestial" | "Cinematic" | "Immersive" | "Analog" | "Botanical" | "Oceanic";
  palette: WorldPalette;
  supportingPalette: string[];
  typography: WorldTypography;
  material: WorldMaterial;
  interaction: WorldInteractionSignature;
  decorativeSvg: {
    motif: "cloud-arcs" | "rose-vine" | "temple-crest" | "film-sprocket" | "botanical-fern" | "tidal-wave";
    lineArt: string;
  };
  supportedModules: string[];
}

export const WORLDS: Record<string, WorldDefinition> = {
  "cloud-nine": {
    id: "cloud-nine",
    name: "Cloud Nine",
    tagline: "For the person who makes everything lighter",
    atmosphere: "Luminous pastel sunset sanctuary of soft clouds, pearl mist, and golden celestial devotion.",
    emotionalTone: "Ethereal, weightless, tender",
    category: "Celestial",
    palette: {
      background: "#0D0A14",
      surface: "#1A1528",
      surfaceBorder: "rgba(244, 219, 233, 0.2)",
      text: "#FAF8F5",
      mutedText: "#E2D9EC",
      accent: "#F472B6",
      highlight: "#FDE68A",
      shadowGlow: "rgba(244, 114, 182, 0.25)",
    },
    supportingPalette: ["#FFF0F5", "#FDE2ED", "#E9D5FF", "#DDD6FE"],
    typography: {
      serifFont: "var(--font-serif), Playfair Display, serif",
      sansFont: "var(--font-sans), Plus Jakarta Sans, sans-serif",
      headingTracking: "-0.02em",
      scaleRatio: 1.25,
    },
    material: {
      name: "Silk Cloud Paper",
      texturePattern: "radial-gradient(circle at 50% 50%, rgba(255,255,255,0.06) 1px, transparent 1px)",
      sheen: "linear-gradient(135deg, rgba(255,255,255,0.12) 0%, transparent 60%)",
      borderStyle: "1px solid rgba(255,255,255,0.14)",
      backdropBlur: "blur(12px)",
      noiseOpacity: 0.03,
    },
    interaction: {
      actionLabel: "Release Starlight",
      description: "Celestial blessing with floating pearl wax seal",
      heroObjectName: "Cloud Nine Letter & Halo",
      pointerBehavior: "parallax-float",
    },
    decorativeSvg: {
      motif: "cloud-arcs",
      lineArt: "M 0 50 Q 50 10 100 50 T 200 50",
    },
    supportedModules: ["letter", "memories", "voiceNote", "videoMemory", "timeline", "quiz", "openWhen"],
  },

  "midnight-rose": {
    id: "midnight-rose",
    name: "Midnight Rose",
    tagline: "For the love that feels like midnight",
    atmosphere: "Intimate starlight-themed candlelit salon with velvet wine shadows and gold leaf.",
    emotionalTone: "Intimate, nocturnal, poetic devotion",
    category: "Cinematic",
    palette: {
      background: "#080205",
      surface: "#17040C",
      surfaceBorder: "rgba(244, 63, 94, 0.22)",
      text: "#FAF8F5",
      mutedText: "#D8B4C0",
      accent: "#E11D48",
      highlight: "#FCD34D",
      shadowGlow: "rgba(225, 29, 72, 0.3)",
    },
    supportingPalette: ["#380716", "#4A061B", "#25030E", "#F43F5E"],
    typography: {
      serifFont: "var(--font-serif), Playfair Display, serif",
      sansFont: "var(--font-sans), Plus Jakarta Sans, sans-serif",
      headingTracking: "0.02em",
      scaleRatio: 1.3,
    },
    material: {
      name: "Crimson Velvet & Gold Leaf",
      texturePattern: "radial-gradient(#800020 1px, transparent 1px)",
      sheen: "linear-gradient(120deg, rgba(244,63,94,0.15) 0%, transparent 70%)",
      borderStyle: "1px solid rgba(244,63,94,0.25)",
      backdropBlur: "blur(16px)",
      noiseOpacity: 0.04,
    },
    interaction: {
      actionLabel: "Break the Wax Seal",
      description: "Physical wax seal cracking with ribbon unfold",
      heroObjectName: "Heavy Envelope with Satin Ribbon",
      pointerBehavior: "starlight-trail",
    },
    decorativeSvg: {
      motif: "rose-vine",
      lineArt: "M 10 90 C 40 10, 65 10, 95 90 S 150 150, 180 90",
    },
    supportedModules: ["letter", "memories", "voiceNote", "videoMemory", "timeline", "quiz", "secret", "openWhen"],
  },

  "kage": {
    id: "kage",
    name: "Kage",
    tagline: "A Kyoto sanctuary where shadows embrace starlight",
    atmosphere: "Tranquil Kyoto mountain temple after rain, dark cedar, moss paths, lantern amber, and Japanese mist.",
    emotionalTone: "Serene, contemplative, enduring",
    category: "Immersive",
    palette: {
      background: "#050806",
      surface: "#0D1410",
      surfaceBorder: "rgba(16, 185, 129, 0.2)",
      text: "#F3F4F6",
      mutedText: "#9CA3AF",
      accent: "#D97706",
      highlight: "#10B981",
      shadowGlow: "rgba(217, 119, 6, 0.25)",
    },
    supportingPalette: ["#0B120E", "#070B09", "#064E3B", "#F59E0B"],
    typography: {
      serifFont: "var(--font-serif), Playfair Display, serif",
      sansFont: "var(--font-sans), Plus Jakarta Sans, sans-serif",
      headingTracking: "-0.01em",
      scaleRatio: 1.2,
    },
    material: {
      name: "Charred Cedar & Handmade Washi",
      texturePattern: "radial-gradient(#10b981 0.7px, transparent 0.7px)",
      sheen: "linear-gradient(180deg, rgba(255,255,255,0.05) 0%, transparent 100%)",
      borderStyle: "1px solid rgba(255,255,255,0.08)",
      backdropBlur: "blur(8px)",
      noiseOpacity: 0.05,
    },
    interaction: {
      actionLabel: "Illuminate Lantern",
      description: "Touch to disperse sacred temple mist and illuminate path",
      heroObjectName: "Folded Washi Letter with Mizuhiki Knot",
      pointerBehavior: "mist-disperse",
    },
    decorativeSvg: {
      motif: "temple-crest",
      lineArt: "M 50 10 L 90 90 L 10 90 Z",
    },
    supportedModules: ["letter", "memories", "voiceNote", "videoMemory", "secret"],
  },

  "apricot-film": {
    id: "apricot-film",
    name: "Apricot Film",
    tagline: "For the memories that feel like warm analog cinema",
    atmosphere: "16mm golden memory reel bathed in warm sunbeams, tobacco amber, warm grain, and nostalgic warmth.",
    emotionalTone: "Nostalgic, golden, cinematic, heartwarming",
    category: "Analog",
    palette: {
      background: "#120B06",
      surface: "#1E120A",
      surfaceBorder: "rgba(231, 111, 81, 0.22)",
      text: "#FFF8F0",
      mutedText: "#D4A373",
      accent: "#E76F51",
      highlight: "#F4A261",
      shadowGlow: "rgba(231, 111, 81, 0.28)",
    },
    supportingPalette: ["#26150A", "#3D1F0E", "#F4A261", "#E76F51"],
    typography: {
      serifFont: "var(--font-serif), Playfair Display, serif",
      sansFont: "var(--font-sans), Plus Jakarta Sans, sans-serif",
      headingTracking: "-0.015em",
      scaleRatio: 1.28,
    },
    material: {
      name: "Matte 16mm Film Stock & Tobacco Leather",
      texturePattern: "radial-gradient(#e76f51 0.8px, transparent 0.8px)",
      sheen: "linear-gradient(135deg, rgba(244,162,97,0.12) 0%, transparent 60%)",
      borderStyle: "1px solid rgba(244,162,97,0.2)",
      backdropBlur: "blur(10px)",
      noiseOpacity: 0.06,
    },
    interaction: {
      actionLabel: "Advance Film Reel",
      description: "Horizontal cinematic scrub with golden light flare",
      heroObjectName: "Analog Film Slide & Gold Stamped Frame",
      pointerBehavior: "light-leak",
    },
    decorativeSvg: {
      motif: "film-sprocket",
      lineArt: "M 10 10 H 30 V 30 H 10 Z M 50 10 H 70 V 30 H 50 Z",
    },
    supportedModules: ["letter", "memories", "voiceNote", "videoMemory", "timeline", "quiz", "openWhen"],
  },

  "wildflower-paper": {
    id: "wildflower-paper",
    name: "Wildflower Paper",
    tagline: "For a love cultivated slowly with honesty and grace",
    atmosphere: "Artisan paper mill garden with deckled cotton fibers, pressed meadow botanicals, sage, and dried lilac.",
    emotionalTone: "Organic, gentle, handwritten, pastoral",
    category: "Botanical",
    palette: {
      background: "#0C110D",
      surface: "#151F18",
      surfaceBorder: "rgba(163, 184, 153, 0.25)",
      text: "#F7F9F5",
      mutedText: "#A3B899",
      accent: "#C084FC",
      highlight: "#FB7185",
      shadowGlow: "rgba(163, 184, 153, 0.25)",
    },
    supportingPalette: ["#1B281F", "#2A3D30", "#A3B899", "#C084FC"],
    typography: {
      serifFont: "var(--font-serif), Playfair Display, serif",
      sansFont: "var(--font-sans), Plus Jakarta Sans, sans-serif",
      headingTracking: "0.01em",
      scaleRatio: 1.22,
    },
    material: {
      name: "Deckled Cotton Paper & Meadow Petals",
      texturePattern: "radial-gradient(#a3b899 0.7px, transparent 0.7px)",
      sheen: "linear-gradient(150deg, rgba(192,132,252,0.1) 0%, transparent 70%)",
      borderStyle: "1px dashed rgba(163,184,153,0.3)",
      backdropBlur: "blur(12px)",
      noiseOpacity: 0.04,
    },
    interaction: {
      actionLabel: "Open Botanical Parcel",
      description: "Untie jute twine and uncover pressed wildflower flora",
      heroObjectName: "Deckled Parcel Wrapped in Botanical Twine",
      pointerBehavior: "petal-drift",
    },
    decorativeSvg: {
      motif: "botanical-fern",
      lineArt: "M 20 80 Q 50 20 80 80 T 140 80",
    },
    supportedModules: ["letter", "memories", "voiceNote", "videoMemory", "timeline", "secret", "openWhen"],
  },

  "ocean-letter": {
    id: "ocean-letter",
    name: "Ocean Letter",
    tagline: "For devotion as vast and steady as the tides",
    atmosphere: "Coastal twilight horizon where misty sea glass meets deep oceanic teal, tidal foam, and distant lighthouses.",
    emotionalTone: "Vast, tranquil, profound, eternal",
    category: "Oceanic",
    palette: {
      background: "#030A12",
      surface: "#081626",
      surfaceBorder: "rgba(56, 189, 248, 0.22)",
      text: "#F0F9FF",
      mutedText: "#7DD3FC",
      accent: "#38BDF8",
      highlight: "#FB7185",
      shadowGlow: "rgba(56, 189, 248, 0.28)",
    },
    supportingPalette: ["#0B2138", "#123354", "#38BDF8", "#0284C7"],
    typography: {
      serifFont: "var(--font-serif), Playfair Display, serif",
      sansFont: "var(--font-sans), Plus Jakarta Sans, sans-serif",
      headingTracking: "-0.01em",
      scaleRatio: 1.26,
    },
    material: {
      name: "Frosted Sea Glass & Tidal Parchment",
      texturePattern: "radial-gradient(#38bdf8 0.6px, transparent 0.6px)",
      sheen: "linear-gradient(135deg, rgba(56,189,248,0.15) 0%, transparent 60%)",
      borderStyle: "1px solid rgba(56,189,248,0.25)",
      backdropBlur: "blur(14px)",
      noiseOpacity: 0.03,
    },
    interaction: {
      actionLabel: "Uncork Message",
      description: "Release parchment with expanding oceanic tidal ripple",
      heroObjectName: "Frosted Sea Glass Bottle & Floating Parchment",
      pointerBehavior: "tidal-ripple",
    },
    decorativeSvg: {
      motif: "tidal-wave",
      lineArt: "M 0 50 C 30 20, 70 80, 100 50 S 170 20, 200 50",
    },
    supportedModules: ["letter", "memories", "voiceNote", "videoMemory", "timeline", "quiz", "secret", "openWhen"],
  },
};

export function getWorldDefinition(id: string): WorldDefinition {
  return WORLDS[id] || WORLDS["midnight-rose"];
}

export function getAllWorlds(): WorldDefinition[] {
  return Object.values(WORLDS);
}
