import {
  FeatureDefinition,
  FeatureCategory,
  FeatureAvailability,
} from "./types";

export const FEATURES: FeatureDefinition[] = [
  // =========================================================================
  // 1. ADD A MOMENT (Interactive Experiences)
  // =========================================================================
  {
    id: "timeline",
    name: "Our Story Timeline",
    tagline: "Chronicle the milestones and memories of your journey together.",
    description:
      "A chronological journey through your key dates, milestones, and photo memories, beautifully formatted into a timeline.",
    category: "moments",
    availability: "available",
    icon: "⏳",
    actionType: "toggle-module",
    targetModuleKey: "timeline",
    targetSection: "moments",
    compatibleTemplates: ["midnight-rose", "cloud-nine"],
    discoveryContext: ["moments", "story"],
    badges: ["Interactive", "Milestones"],
    samplePreview: {
      type: "timeline",
      caption: "Chronological milestone entries with dates & memories",
    },
  },
  {
    id: "quiz",
    name: "Love Quiz",
    tagline: "Turn your shared memories into a playful little challenge.",
    description:
      "A personalized multiple-choice challenge with custom explanations, playful scoring, and a celebratory finale message.",
    category: "moments",
    availability: "available",
    icon: "💘",
    actionType: "toggle-module",
    targetModuleKey: "quiz",
    targetSection: "moments",
    compatibleTemplates: ["midnight-rose", "cloud-nine"],
    discoveryContext: ["moments", "story"],
    badges: ["Playful", "Questions"],
    samplePreview: {
      type: "quiz",
      caption: "Interactive questions with instant reveals & finale note",
    },
  },
  {
    id: "secret",
    name: "Secret Note",
    tagline: "Hide something special that they have to tap to uncover.",
    description:
      "A concealed, tamper-proof private message with customizable mystery prompt and tap-to-reveal blur interaction.",
    category: "moments",
    availability: "available",
    icon: "🔐",
    actionType: "toggle-module",
    targetModuleKey: "secret",
    targetSection: "moments",
    compatibleTemplates: ["midnight-rose", "kage"],
    discoveryContext: ["moments", "story"],
    badges: ["Intimate", "Hidden"],
    samplePreview: {
      type: "secret",
      caption: "Tap-to-reveal concealed message with glowing unlock",
    },
  },
  {
    id: "openWhen",
    name: "Open When Letters",
    tagline: "Leave heartfelt envelopes for specific days and moments ahead.",
    description:
      "A collection of sealed virtual envelopes tailored for future occasions: when they miss you, need a laugh, or celebrate.",
    category: "moments",
    availability: "available",
    icon: "💌",
    actionType: "toggle-module",
    targetModuleKey: "openWhen",
    targetSection: "moments",
    compatibleTemplates: ["midnight-rose", "cloud-nine"],
    discoveryContext: ["moments", "story"],
    badges: ["Future-Facing", "Envelopes"],
    samplePreview: {
      type: "envelope",
      caption: "Individual envelopes sealed with wax for future moments",
    },
  },
  {
    id: "reasons",
    name: "Reasons I Love You",
    tagline: "Reveal the individual reasons why your heart chose them.",
    description:
      "A tender, stepped or browseable collection of specific reasons, memories, and personal notes celebrating your love.",
    category: "moments",
    availability: "available",
    icon: "💖",
    actionType: "toggle-module",
    targetModuleKey: "reasons",
    targetSection: "moments",
    compatibleTemplates: ["midnight-rose", "cloud-nine", "kage"],
    discoveryContext: ["moments", "story"],
    badges: ["Interactive", "Devotion"],
    samplePreview: {
      type: "reasons",
      caption: "Step-by-step reveals of heartfelt reasons and memories",
    },
  },
  {
    id: "compliments",
    name: "Compliment Machine",
    tagline: "A virtual fountain of sweet words whenever they need a reminder.",
    description:
      "A warm pool of creator-authored compliments that reveal one by one without repetition when tapped.",
    category: "moments",
    availability: "available",
    icon: "✨",
    actionType: "toggle-module",
    targetModuleKey: "compliments",
    targetSection: "moments",
    compatibleTemplates: ["midnight-rose", "cloud-nine", "kage"],
    discoveryContext: ["moments"],
    badges: ["Interactive", "Sweet"],
  },
  {
    id: "fortune-cookie",
    name: "Fortune Cookie",
    tagline: "Crack open virtual fortunes about your future together.",
    description:
      "An interactive fortune cookie with cracking animations that unveils creator-written fortunes and promises.",
    category: "moments",
    availability: "available",
    icon: "🥠",
    actionType: "toggle-module",
    targetModuleKey: "fortuneCookie",
    targetSection: "moments",
    compatibleTemplates: ["midnight-rose", "cloud-nine", "kage"],
    discoveryContext: ["moments"],
    badges: ["Playful", "Tactile"],
  },
  {
    id: "scratch-card",
    name: "Scratch to Reveal Card",
    tagline: "A tactile scratch-off surprise to unveil hidden notes.",
    description:
      "Digital scratch-off foil revealing hidden messages with touch, mouse, and keyboard accessible alternatives.",
    category: "moments",
    availability: "available",
    icon: "🪄",
    actionType: "toggle-module",
    targetModuleKey: "scratchCard",
    targetSection: "moments",
    compatibleTemplates: ["midnight-rose", "cloud-nine", "kage"],
    discoveryContext: ["moments"],
    badges: ["Tactile", "Surprise"],
  },
  {
    id: "promises",
    name: "Promise Wall & Vows",
    tagline: "Vows and promises etched together in a beautiful gallery.",
    description:
      "A collection of vows and lifelong promises with categories and interactive heart acknowledgements.",
    category: "moments",
    availability: "available",
    icon: "💍",
    actionType: "toggle-module",
    targetModuleKey: "promises",
    targetSection: "moments",
    compatibleTemplates: ["midnight-rose", "cloud-nine", "kage"],
    discoveryContext: ["moments"],
    badges: ["Vows", "Devotion"],
  },
  {
    id: "bucket-list",
    name: "Future Adventures & Bucket List",
    tagline: "Co-op dreams and adventures to check off together.",
    description:
      "An interactive collection of trips, dates, and dreams categorized by planned, completed, or someday.",
    category: "moments",
    availability: "available",
    icon: "🗺️",
    actionType: "toggle-module",
    targetModuleKey: "futureAdventures",
    targetSection: "moments",
    compatibleTemplates: ["midnight-rose", "cloud-nine", "kage"],
    discoveryContext: ["moments"],
    badges: ["Adventures", "Bucket List"],
  },
  {
    id: "spinner",
    name: "Adventure & Date Spinner",
    tagline: "Can't decide on date night? Spin the wheel of love.",
    description:
      "A smooth interactive spinner wheel with button fallback to choose from your favorite date night ideas.",
    category: "moments",
    availability: "available",
    icon: "🎡",
    actionType: "toggle-module",
    targetModuleKey: "adventureSpinner",
    targetSection: "moments",
    compatibleTemplates: ["midnight-rose", "cloud-nine", "kage"],
    discoveryContext: ["moments"],
    badges: ["Playful", "Interactive"],
  },
  {
    id: "finale",
    name: "Emotional Finale & Declaration",
    tagline: "The breathtaking culmination of your romantic journey.",
    description:
      "A grand finale declaration summarizing your memories, reasons, and promises before sealing your forever.",
    category: "moments",
    availability: "available",
    icon: "🌹",
    actionType: "toggle-module",
    targetModuleKey: "finale",
    targetSection: "moments",
    compatibleTemplates: ["midnight-rose", "cloud-nine", "kage"],
    discoveryContext: ["moments", "story"],
    badges: ["Finale", "Emotional"],
  },
  {
    id: "milestones",
    name: "Relationship Milestones & Timeline",
    tagline: "Unfold the key dates and milestones that shaped your journey.",
    description:
      "A chronological path revealing first glances, first trips, and anniversaries.",
    category: "moments",
    availability: "coming-soon",
    icon: "🌟",
    actionType: "info",
    compatibleTemplates: ["midnight-rose", "cloud-nine", "kage"],
    discoveryContext: ["moments"],
    badges: ["Roadmap", "Milestones"],
  },

  // =========================================================================
  // 2. MAKE IT PERSONAL (Story & Words)
  // =========================================================================
  {
    id: "letter-craft",
    name: "Romantic Writing Desk",
    tagline: "The central heartbeat of your Valentine experience.",
    description:
      "Expressive letter authoring with customizable partner names, formal greetings, intimate prose, and romantic sign-offs.",
    category: "personal",
    availability: "available",
    icon: "✍️",
    actionType: "scroll-section",
    targetSection: "story",
    compatibleTemplates: ["midnight-rose", "cloud-nine", "kage"],
    discoveryContext: ["story"],
    badges: ["Core", "Essential"],
  },
  {
    id: "memories",
    name: "Photo Memories & Captions",
    tagline: "Curate a tactile photo album with dates, places, and heartfelt captions.",
    description:
      "Upload private photos, arrange them into a romantic gallery with captions, and let your partner swipe or tap to view high-resolution memories.",
    category: "personal",
    availability: "available",
    icon: "📸",
    actionType: "scroll-section",
    targetSection: "story",
    compatibleTemplates: ["midnight-rose", "cloud-nine", "kage"],
    discoveryContext: ["story", "moments"],
    badges: ["Photos", "Captions", "Memories"],
    samplePreview: {
      type: "polaroid",
      caption: "Curated photo memories with dates and tender captions",
    },
  },
  {
    id: "voice-note",
    name: "Voice Note Audio Seal",
    tagline: "Let them hear your voice when they open your letter.",
    description:
      "Record or attach a high-fidelity voice note that plays seamlessly as ambient audio upon envelope unsealing.",
    category: "personal",
    availability: "available",
    icon: "🎙️",
    actionType: "scroll-section",
    targetSection: "story",
    compatibleTemplates: ["midnight-rose", "cloud-nine", "kage"],
    discoveryContext: ["story", "moments"],
    badges: ["Audio", "Voice"],
    samplePreview: {
      type: "audio",
      caption: "Intimate voice note with interactive waveform scrubber",
    },
  },
  {
    id: "video-capsule",
    name: "Video Memory Capsule",
    tagline: "Live video memories embedded right into your letter.",
    description:
      "Embed a private video memory that reveals itself dynamically with soft lighting and film grain effects.",
    category: "personal",
    availability: "available",
    icon: "🎞️",
    actionType: "scroll-section",
    targetSection: "story",
    compatibleTemplates: ["midnight-rose", "cloud-nine", "kage"],
    discoveryContext: ["story"],
    badges: ["Video", "Capsule"],
  },
  {
    id: "read-aloud",
    name: "Spoken Letter Read-Aloud",
    tagline: "An elegant spoken rendition of your letter.",
    description:
      "Enable a warm, expressive voice narration of your love letter directly in your partner's browser using web speech synthesis.",
    category: "personal",
    availability: "available",
    icon: "🗣️",
    actionType: "scroll-section",
    targetSection: "story",
    compatibleTemplates: ["midnight-rose", "cloud-nine", "kage"],
    discoveryContext: ["story"],
    badges: ["Voice", "Accessibility"],
  },
  {
    id: "romance-copilot",
    name: "Romance Co-pilot",
    tagline: "Subtle poetic inspiration and wordsmithing partner.",
    description:
      "A quiet assistant to suggest heartfelt metaphors, help articulate tender feelings, or polish opening greetings.",
    category: "personal",
    availability: "coming-soon",
    icon: "🪶",
    actionType: "info",
    compatibleTemplates: ["midnight-rose", "cloud-nine", "kage"],
    discoveryContext: ["story"],
    badges: ["Roadmap", "Words"],
  },

  // =========================================================================
  // 3. SET THE MOOD (Decor & Atmosphere)
  // =========================================================================
  {
    id: "paper-wax-craft",
    name: "Handmade Paper & Wax Seals",
    tagline: "Physical craftsmanship translated into digital grace.",
    description:
      "Choose from Deckled Parchment or Handmade Cream, sealed with Velvet Crimson, Antique Gold, or Pearl Luster digital wax.",
    category: "mood",
    availability: "available",
    icon: "📜",
    actionType: "scroll-section",
    targetSection: "mood",
    compatibleTemplates: ["midnight-rose", "cloud-nine", "kage"],
    discoveryContext: ["mood"],
    badges: ["Craft", "Physical"],
    samplePreview: {
      type: "decor",
      caption: "Paper stock, satin ribbons & 3D wax seal styles",
    },
  },
  {
    id: "floral-charms",
    name: "Bouquet Blooms & Orbiting Charms",
    tagline: "Botanical life and floating talismans for your world.",
    description:
      "Decorate the canvas with Velvet Roses, White Lilies, or Wild Peonies, surrounded by gentle floating golden stars or crystals.",
    category: "mood",
    availability: "available",
    icon: "🌹",
    actionType: "scroll-section",
    targetSection: "mood",
    compatibleTemplates: ["midnight-rose", "cloud-nine", "kage"],
    discoveryContext: ["mood"],
    badges: ["Botanical", "Atmosphere"],
    samplePreview: {
      type: "decor",
      caption: "Curated flowers and orbiting talismans",
    },
  },

  // =========================================================================
  // 4. MAKE IT IMMERSIVE (Worlds & Shaders)
  // =========================================================================
  {
    id: "visual-worlds",
    name: "Atmospheric Visual Worlds",
    tagline: "Step inside complete interactive environments.",
    description:
      "Switch non-destructively between Midnight Rose starlight, Cloud Nine pastel sanctuary, and Kyoto Temple Kage mist.",
    category: "immersive",
    availability: "available",
    icon: "🌌",
    actionType: "open-world-modal",
    targetSection: "world",
    compatibleTemplates: ["midnight-rose", "cloud-nine", "kage"],
    discoveryContext: ["world", "templates"],
    badges: ["3D", "Cinematic"],
  },
  {
    id: "plasma-interaction",
    name: "Valentine Plasma Touch",
    tagline: "Futuristic romantic energy with ThreeUI WebGL shaders.",
    description:
      "Touch-responsive baby-pink, blush, and lavender plasma filaments that spark and react to recipient interaction.",
    category: "immersive",
    availability: "available",
    icon: "🔮",
    actionType: "scroll-section",
    targetSection: "moments",
    compatibleTemplates: ["midnight-rose", "cloud-nine", "kage"],
    discoveryContext: ["moments", "preview"],
    badges: ["WebGL", "Sensory"],
  },
  {
    id: "acoustic-soundtrack",
    name: "Ambient Acoustic Soundtrack",
    tagline: "A delicate melodic landscape for your love letter.",
    description:
      "Gentle acoustic guitar, cello, or soft rainfall audio that begins softly as the envelope seal cracks open.",
    category: "immersive",
    availability: "available",
    icon: "🎵",
    actionType: "scroll-section",
    targetSection: "preview",
    compatibleTemplates: ["midnight-rose", "cloud-nine", "kage"],
    discoveryContext: ["mood", "preview"],
    badges: ["Ambient", "Audio", "Soundtrack"],
  },

  // =========================================================================
  // 5. MAKE IT LAST (Keepsakes & Reveal)
  // =========================================================================
  {
    id: "scheduled-reveal",
    name: "Midnight Time-Lock Scheduled Reveal",
    tagline: "Lock your experience until the exact romantic moment.",
    description:
      "Create your experience ahead of time and set a live countdown that unseals the letter automatically at midnight.",
    category: "keepsake",
    availability: "available",
    icon: "⏱️",
    actionType: "scroll-section",
    targetSection: "preview",
    compatibleTemplates: ["midnight-rose", "cloud-nine", "kage"],
    discoveryContext: ["preview"],
    badges: ["Time-Lock", "Scheduled"],
  },
  {
    id: "recipient-reactions",
    name: "Recipient Reactions & Confessions",
    tagline: "Interactive sparks and tender replies from your partner.",
    description:
      "Allow your partner to tap heart sparks, leave inline voice reactions, or write a secret reply back to you.",
    category: "keepsake",
    availability: "available",
    icon: "💬",
    actionType: "scroll-section",
    targetSection: "preview",
    compatibleTemplates: ["midnight-rose", "cloud-nine", "kage"],
    discoveryContext: ["preview"],
    badges: ["Reactions", "Replies"],
  },
  {
    id: "qr-keepsake",
    name: "Wax-Sealed Printable QR Keepsake",
    tagline: "Turn your digital devotion into a tangible physical keepsake.",
    description:
      "Generate a high-resolution QR card with an embossed wax-seal aesthetic to slip into a real card or gift.",
    category: "keepsake",
    availability: "available",
    icon: "🏷️",
    actionType: "scroll-section",
    targetSection: "preview",
    compatibleTemplates: ["midnight-rose", "cloud-nine", "kage"],
    discoveryContext: ["preview"],
    badges: ["QR", "Printable"],
  },
  {
    id: "printable-keepsake",
    name: "Printable Keepsake Document",
    tagline: "A beautifully formatted printable version of your experience.",
    description:
      "Clean editorial print layout optimized for physical paper with elegant typography, letter prose, and QR seal.",
    category: "keepsake",
    availability: "available",
    icon: "🖨️",
    actionType: "scroll-section",
    targetSection: "preview",
    compatibleTemplates: ["midnight-rose", "cloud-nine", "kage"],
    discoveryContext: ["preview"],
    badges: ["Print", "Physical", "Keepsake"],
  },
];

// Helper Functions
export function getFeatures(): FeatureDefinition[] {
  return FEATURES;
}

export function getAvailableFeatures(): FeatureDefinition[] {
  return FEATURES.filter((f) => f.availability === "available");
}

export function getRoadmapFeatures(): FeatureDefinition[] {
  return FEATURES.filter((f) => f.availability === "coming-soon");
}

export function getFeaturesByCategory(category: FeatureCategory): FeatureDefinition[] {
  return FEATURES.filter((f) => f.category === category);
}

export function getFeaturesByContext(
  context: "moments" | "story" | "mood" | "preview" | "templates" | "world"
): FeatureDefinition[] {
  return FEATURES.filter((f) => f.discoveryContext.includes(context));
}

export function getFeatureById(id: string): FeatureDefinition | undefined {
  return FEATURES.find((f) => f.id === id);
}

export function getCompatibleFeatures(templateId: string): FeatureDefinition[] {
  return FEATURES.filter((f) => f.compatibleTemplates.includes(templateId));
}
