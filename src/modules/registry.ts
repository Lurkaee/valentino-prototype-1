import { z } from "zod";
import { ModuleDefinition } from "./types";

import {
  timelineDraftSchema,
  timelinePublishSchema,
  normalizeTimelineConfig,
  TimelineDraftConfig,
  TimelinePublishedConfig,
} from "./timeline/schema";
import { TimelineModule } from "./timeline";

import {
  quizDraftSchema,
  quizPublishSchema,
  normalizeQuizConfig,
  QuizDraftConfig,
  QuizPublishedConfig,
} from "./quiz/schema";
import { QuizModule } from "./quiz";

import {
  secretDraftSchema,
  secretPublishSchema,
  normalizeSecretConfig,
  SecretDraftConfig,
  SecretPublishedConfig,
} from "./secret/schema";
import { SecretModule } from "./secret";

import {
  openWhenDraftSchema,
  openWhenPublishSchema,
  normalizeOpenWhenConfig,
  OpenWhenDraftConfig,
  OpenWhenPublishedConfig,
} from "./open-when/schema";
import { OpenWhenModule } from "./open-when";

import {
  memoriesDraftSchema,
  memoriesPublishSchema,
  normalizeMemoriesConfig,
  MemoriesDraftConfig,
  MemoriesPublishedConfig,
} from "./memories/schema";
import { MemoriesModule } from "./memories";

import {
  voiceNoteDraftSchema,
  voiceNotePublishSchema,
  normalizeVoiceNoteConfig,
  VoiceNoteDraftConfig,
  VoiceNotePublishedConfig,
} from "./voice-note/schema";
import { VoiceNoteModule } from "./voice-note";

import {
  videoMemoryDraftSchema,
  videoMemoryPublishSchema,
  normalizeVideoMemoryConfig,
  VideoMemoryDraftConfig,
  VideoMemoryPublishedConfig,
} from "./video-memory/schema";
import { VideoMemoryModule } from "./video-memory";

import {
  reasonsDraftSchema,
  reasonsPublishSchema,
  normalizeReasonsConfig,
  ReasonsDraftConfig,
  ReasonsPublishedConfig,
} from "./reasons/schema";
import { ReasonsModule } from "./reasons";

import {
  complimentsDraftSchema,
  complimentsPublishSchema,
  normalizeComplimentsConfig,
  ComplimentsDraftConfig,
  ComplimentsPublishedConfig,
} from "./compliments/schema";
import { ComplimentsModule } from "./compliments";

import {
  fortuneCookieDraftSchema,
  fortuneCookiePublishSchema,
  normalizeFortuneCookieConfig,
  FortuneCookieDraftConfig,
  FortuneCookiePublishedConfig,
} from "./fortune-cookie/schema";
import { FortuneCookieModule } from "./fortune-cookie";

import {
  scratchCardDraftSchema,
  scratchCardPublishSchema,
  normalizeScratchCardConfig,
  ScratchCardDraftConfig,
  ScratchCardPublishedConfig,
} from "./scratch-card/schema";
import { ScratchCardModule } from "./scratch-card";

import {
  promisesDraftSchema,
  promisesPublishSchema,
  normalizePromisesConfig,
  PromisesDraftConfig,
  PromisesPublishedConfig,
} from "./promises/schema";
import { PromisesModule } from "./promises";

import {
  futureAdventuresDraftSchema,
  futureAdventuresPublishSchema,
  normalizeFutureAdventuresConfig,
  FutureAdventuresDraftConfig,
  FutureAdventuresPublishedConfig,
} from "./future-adventures/schema";
import { FutureAdventuresModule } from "./future-adventures";

import {
  adventureSpinnerDraftSchema,
  adventureSpinnerPublishSchema,
  normalizeAdventureSpinnerConfig,
  AdventureSpinnerDraftConfig,
  AdventureSpinnerPublishedConfig,
} from "./adventure-spinner/schema";
import { AdventureSpinnerModule } from "./adventure-spinner";

import {
  finaleDraftSchema,
  finalePublishSchema,
  normalizeFinaleConfig,
  FinaleDraftConfig,
  FinalePublishedConfig,
} from "./finale/schema";
import { FinaleModule } from "./finale";

export const memoriesModuleDef: ModuleDefinition<
  MemoriesDraftConfig,
  MemoriesPublishedConfig
> = {
  id: "memories",
  version: "v1",
  name: "Photo Memories",
  description: "Cherished photos, milestones, and romantic captions.",
  icon: "📸",
  draftSchema: memoriesDraftSchema,
  publishSchema: memoriesPublishSchema,
  defaultConfig: {
    enabled: false,
    title: "Our Cherished Memories",
    subtitle: "Fragments of light and laughter we hold forever",
    items: [],
  },
  normalizeConfig: normalizeMemoriesConfig,
  Component: MemoriesModule,
};

export const voiceNoteModuleDef: ModuleDefinition<
  VoiceNoteDraftConfig,
  VoiceNotePublishedConfig
> = {
  id: "voiceNote",
  version: "v1",
  name: "Voice Note",
  description: "A whispered personal message from your heart.",
  icon: "🎙️",
  draftSchema: voiceNoteDraftSchema,
  publishSchema: voiceNotePublishSchema,
  defaultConfig: {
    enabled: false,
    url: "",
    title: "Voice Note",
    caption: "A personal message from my heart to yours",
    duration: 0,
  },
  normalizeConfig: normalizeVoiceNoteConfig,
  Component: VoiceNoteModule,
};

export const videoMemoryModuleDef: ModuleDefinition<
  VideoMemoryDraftConfig,
  VideoMemoryPublishedConfig
> = {
  id: "videoMemory",
  version: "v1",
  name: "Video Memory Capsule",
  description: "A motion memory preserved in time.",
  icon: "🎞️",
  draftSchema: videoMemoryDraftSchema,
  publishSchema: videoMemoryPublishSchema,
  defaultConfig: {
    enabled: false,
    url: "",
    posterUrl: "",
    caption: "A motion memory preserved in time",
    title: "Video Memory",
  },
  normalizeConfig: normalizeVideoMemoryConfig,
  Component: VideoMemoryModule,
};


export const timelineModuleDef: ModuleDefinition<
  TimelineDraftConfig,
  TimelinePublishedConfig
> = {
  id: "timeline",
  version: "v1",
  name: "Timeline of Us",
  description: "Chronicle the milestones and memories of your journey together.",
  icon: "⏳",
  draftSchema: timelineDraftSchema,
  publishSchema: timelinePublishSchema,
  defaultConfig: {
    enabled: false,
    title: "Our Journey Together",
    subtitle: "The moments that brought us here",
    items: [],
  },
  normalizeConfig: normalizeTimelineConfig,
  Component: TimelineModule,
};

export const quizModuleDef: ModuleDefinition<
  QuizDraftConfig,
  QuizPublishedConfig
> = {
  id: "quiz",
  version: "v1",
  name: "Love Quiz",
  description: "A sweet, playful quiz to test how well you know each other.",
  icon: "💘",
  draftSchema: quizDraftSchema,
  publishSchema: quizPublishSchema,
  defaultConfig: {
    enabled: false,
    title: "How Well Do You Know Us?",
    subtitle: "A sweet little test of our story",
    completionMessage: "No matter what, my favorite place is with you. ❤️",
    questions: [],
  },
  normalizeConfig: normalizeQuizConfig,
  Component: QuizModule,
};

export const secretModuleDef: ModuleDefinition<
  SecretDraftConfig,
  SecretPublishedConfig
> = {
  id: "secret",
  version: "v1",
  name: "Secret Note",
  description: "A private concealed note with tap-to-reveal privacy.",
  icon: "🔐",
  draftSchema: secretDraftSchema,
  publishSchema: secretPublishSchema,
  defaultConfig: {
    enabled: false,
    title: "A Little Secret",
    prompt: "Tap to reveal what's hidden inside",
    hint: "Only for your eyes",
    secretContent: "",
  },
  normalizeConfig: normalizeSecretConfig,
  Component: SecretModule,
};

export const openWhenModuleDef: ModuleDefinition<
  OpenWhenDraftConfig,
  OpenWhenPublishedConfig
> = {
  id: "openWhen",
  version: "v1",
  name: "Open When Letters",
  description: "A series of heartfelt envelopes to open across future moments.",
  icon: "💌",
  draftSchema: openWhenDraftSchema,
  publishSchema: openWhenPublishSchema,
  defaultConfig: {
    enabled: false,
    title: "Open When...",
    subtitle: "Envelopes for the days ahead",
    envelopes: [],
  },
  normalizeConfig: normalizeOpenWhenConfig,
  Component: OpenWhenModule,
};

export const reasonsModuleDef: ModuleDefinition<
  ReasonsDraftConfig,
  ReasonsPublishedConfig
> = {
  id: "reasons",
  version: "v1",
  name: "Reasons I Love You",
  description: "Countless little things that make you irreplaceable.",
  icon: "💌",
  draftSchema: reasonsDraftSchema,
  publishSchema: reasonsPublishSchema,
  defaultConfig: {
    enabled: false,
    title: "Reasons I Love You",
    subtitle: "Countless little things that make you irreplaceable",
    viewMode: "step",
    items: [],
  },
  normalizeConfig: normalizeReasonsConfig,
  Component: ReasonsModule,
};

export const complimentsModuleDef: ModuleDefinition<
  ComplimentsDraftConfig,
  ComplimentsPublishedConfig
> = {
  id: "compliments",
  version: "v1",
  name: "Compliment Machine",
  description: "Press the button for an uplifting reminder of why you are cherished.",
  icon: "✨",
  draftSchema: complimentsDraftSchema,
  publishSchema: complimentsPublishSchema,
  defaultConfig: {
    enabled: false,
    title: "Compliment Machine",
    subtitle: "Press the button whenever you need a reminder of how wonderful you are",
    items: [],
    buttonLabel: "Tell Me Something Sweet",
  },
  normalizeConfig: normalizeComplimentsConfig,
  Component: ComplimentsModule,
};

export const fortuneCookieModuleDef: ModuleDefinition<
  FortuneCookieDraftConfig,
  FortuneCookiePublishedConfig
> = {
  id: "fortuneCookie",
  version: "v1",
  name: "A Fortune For Us",
  description: "Crack open a fortune cookie to discover romantic predictions.",
  icon: "🥠",
  draftSchema: fortuneCookieDraftSchema,
  publishSchema: fortuneCookiePublishSchema,
  defaultConfig: {
    enabled: false,
    title: "A Fortune For Us",
    subtitle: "Crack open the cookie to reveal what destiny has in store",
    fortunes: [],
  },
  normalizeConfig: normalizeFortuneCookieConfig,
  Component: FortuneCookieModule,
};

export const scratchCardModuleDef: ModuleDefinition<
  ScratchCardDraftConfig,
  ScratchCardPublishedConfig
> = {
  id: "scratchCard",
  version: "v1",
  name: "Scratch Card Surprise",
  description: "A tactile scratch-off foil hiding an intimate note or surprise.",
  icon: "🎁",
  draftSchema: scratchCardDraftSchema,
  publishSchema: scratchCardPublishSchema,
  defaultConfig: {
    enabled: false,
    title: "A Mystery Surprise",
    subtitle: "Scratch off the silver foil to uncover what's waiting for you",
    frontMessage: "Scratch to Reveal ✦",
    hiddenMessage: "",
  },
  normalizeConfig: normalizeScratchCardConfig,
  Component: ScratchCardModule,
};

export const promisesModuleDef: ModuleDefinition<
  PromisesDraftConfig,
  PromisesPublishedConfig
> = {
  id: "promises",
  version: "v1",
  name: "Our Promise Wall",
  description: "Heartfelt vows and commitments etched into your shared future.",
  icon: "💍",
  draftSchema: promisesDraftSchema,
  publishSchema: promisesPublishSchema,
  defaultConfig: {
    enabled: false,
    title: "Our Promise Wall",
    subtitle: "Words etched into our shared future",
    items: [],
  },
  normalizeConfig: normalizePromisesConfig,
  Component: PromisesModule,
};

export const futureAdventuresModuleDef: ModuleDefinition<
  FutureAdventuresDraftConfig,
  FutureAdventuresPublishedConfig
> = {
  id: "futureAdventures",
  version: "v1",
  name: "Future Adventures & Bucket List",
  description: "Trips, spontaneous dates, and lifetime dreams for both of you.",
  icon: "🗺️",
  draftSchema: futureAdventuresDraftSchema,
  publishSchema: futureAdventuresPublishSchema,
  defaultConfig: {
    enabled: false,
    title: "Future Adventures",
    subtitle: "Places we'll go, memories we've made, and dreams yet to unfold",
    items: [],
  },
  normalizeConfig: normalizeFutureAdventuresConfig,
  Component: FutureAdventuresModule,
};

export const adventureSpinnerModuleDef: ModuleDefinition<
  AdventureSpinnerDraftConfig,
  AdventureSpinnerPublishedConfig
> = {
  id: "adventureSpinner",
  version: "v1",
  name: "The Adventure Wheel",
  description: "Interactive spinning wheel for date night and spontaneous adventures.",
  icon: "🎡",
  draftSchema: adventureSpinnerDraftSchema,
  publishSchema: adventureSpinnerPublishSchema,
  defaultConfig: {
    enabled: false,
    title: "The Adventure Wheel",
    subtitle: "Can't decide on date night? Let destiny take the wheel",
    options: [],
  },
  normalizeConfig: normalizeAdventureSpinnerConfig,
  Component: AdventureSpinnerModule,
};

export const finaleModuleDef: ModuleDefinition<
  FinaleDraftConfig,
  FinalePublishedConfig
> = {
  id: "finale",
  version: "v1",
  name: "Emotional Finale",
  description: "A breathtaking declaration and forever keepsake to conclude the journey.",
  icon: "🌹",
  draftSchema: finaleDraftSchema,
  publishSchema: finalePublishSchema,
  defaultConfig: {
    enabled: false,
    title: "Forever Yours",
    declaration: "In every lifetime, across every galaxy, my heart would always find you.",
    signature: "Always & Forever",
    showKeepsakePrompt: true,
  },
  normalizeConfig: normalizeFinaleConfig,
  Component: FinaleModule,
};

// Extensible registry map (supports future gates: scratchCard, fortuneCookie, etc.)
const modulesMap = new Map<string, ModuleDefinition<any, any>>();

function getModuleKey(id: string, version: string = "v1"): string {
  return `${id}@${version}`;
}

export function registerModule(definition: ModuleDefinition<any, any>) {
  modulesMap.set(getModuleKey(definition.id, definition.version), definition);
  // Also index by id default
  modulesMap.set(definition.id, definition);
}

// Initial registered active modules
registerModule(memoriesModuleDef);
registerModule(voiceNoteModuleDef);
registerModule(videoMemoryModuleDef);
registerModule(timelineModuleDef);
registerModule(quizModuleDef);
registerModule(secretModuleDef);
registerModule(openWhenModuleDef);
registerModule(reasonsModuleDef);
registerModule(complimentsModuleDef);
registerModule(fortuneCookieModuleDef);
registerModule(scratchCardModuleDef);
registerModule(promisesModuleDef);
registerModule(futureAdventuresModuleDef);
registerModule(adventureSpinnerModuleDef);
registerModule(finaleModuleDef);

export function getModuleDefinition(
  id: string,
  version: string = "v1"
): ModuleDefinition<any, any> | null {
  return modulesMap.get(getModuleKey(id, version)) || modulesMap.get(id) || null;
}

export function getAllModules(): ModuleDefinition<any, any>[] {
  const unique = new Set<ModuleDefinition<any, any>>();
  for (const def of modulesMap.values()) {
    unique.add(def);
  }
  return Array.from(unique);
}

// Composed Zod schemas for experience templates
export const modulesDraftSchema = z
  .object({
    memories: memoriesDraftSchema.optional(),
    voiceNote: voiceNoteDraftSchema.optional(),
    videoMemory: videoMemoryDraftSchema.optional(),
    timeline: timelineDraftSchema.optional(),
    quiz: quizDraftSchema.optional(),
    secret: secretDraftSchema.optional(),
    openWhen: openWhenDraftSchema.optional(),
    reasons: reasonsDraftSchema.optional(),
    compliments: complimentsDraftSchema.optional(),
    fortuneCookie: fortuneCookieDraftSchema.optional(),
    scratchCard: scratchCardDraftSchema.optional(),
    promises: promisesDraftSchema.optional(),
    futureAdventures: futureAdventuresDraftSchema.optional(),
    adventureSpinner: adventureSpinnerDraftSchema.optional(),
    finale: finaleDraftSchema.optional(),
  })
  .passthrough()
  .optional();

export const modulesPublishSchema = z
  .object({
    memories: memoriesPublishSchema.optional(),
    voiceNote: voiceNotePublishSchema.optional(),
    videoMemory: videoMemoryPublishSchema.optional(),
    timeline: timelinePublishSchema.optional(),
    quiz: quizPublishSchema.optional(),
    secret: secretPublishSchema.optional(),
    openWhen: openWhenPublishSchema.optional(),
    reasons: reasonsPublishSchema.optional(),
    compliments: complimentsPublishSchema.optional(),
    fortuneCookie: fortuneCookiePublishSchema.optional(),
    scratchCard: scratchCardPublishSchema.optional(),
    promises: promisesPublishSchema.optional(),
    futureAdventures: futureAdventuresPublishSchema.optional(),
    adventureSpinner: adventureSpinnerPublishSchema.optional(),
    finale: finalePublishSchema.optional(),
  })
  .passthrough()
  .optional();

export interface ModulesConfig {
  memories?: MemoriesPublishedConfig;
  voiceNote?: VoiceNotePublishedConfig;
  videoMemory?: VideoMemoryPublishedConfig;
  timeline?: TimelinePublishedConfig;
  quiz?: QuizPublishedConfig;
  secret?: SecretPublishedConfig;
  openWhen?: OpenWhenPublishedConfig;
  reasons?: ReasonsPublishedConfig;
  compliments?: ComplimentsPublishedConfig;
  fortuneCookie?: FortuneCookiePublishedConfig;
  scratchCard?: ScratchCardPublishedConfig;
  promises?: PromisesPublishedConfig;
  futureAdventures?: FutureAdventuresPublishedConfig;
  adventureSpinner?: AdventureSpinnerPublishedConfig;
  finale?: FinalePublishedConfig;
  [key: string]: any;
}

export function normalizeAllModules(
  rawModules: unknown,
  isPublic: boolean = false
): ModulesConfig {
  if (!rawModules || typeof rawModules !== "object") {
    return {};
  }

  const obj = rawModules as Record<string, any>;
  const result: ModulesConfig = {};

  if (obj.memories) {
    result.memories = normalizeMemoriesConfig(obj.memories, isPublic);
  }
  if (obj.voiceNote) {
    result.voiceNote = normalizeVoiceNoteConfig(obj.voiceNote, isPublic);
  }
  if (obj.videoMemory) {
    result.videoMemory = normalizeVideoMemoryConfig(obj.videoMemory, isPublic);
  }
  if (obj.timeline) {
    result.timeline = normalizeTimelineConfig(obj.timeline);
  }
  if (obj.quiz) {
    result.quiz = normalizeQuizConfig(obj.quiz);
  }
  if (obj.secret) {
    result.secret = normalizeSecretConfig(obj.secret, isPublic);
  }
  if (obj.openWhen) {
    result.openWhen = normalizeOpenWhenConfig(obj.openWhen);
  }
  if (obj.reasons) {
    result.reasons = normalizeReasonsConfig(obj.reasons, isPublic);
  }
  if (obj.compliments) {
    result.compliments = normalizeComplimentsConfig(obj.compliments, isPublic);
  }
  if (obj.fortuneCookie) {
    result.fortuneCookie = normalizeFortuneCookieConfig(obj.fortuneCookie, isPublic);
  }
  if (obj.scratchCard) {
    result.scratchCard = normalizeScratchCardConfig(obj.scratchCard, isPublic);
  }
  if (obj.promises) {
    result.promises = normalizePromisesConfig(obj.promises, isPublic);
  }
  if (obj.futureAdventures) {
    result.futureAdventures = normalizeFutureAdventuresConfig(obj.futureAdventures, isPublic);
  }
  if (obj.adventureSpinner) {
    result.adventureSpinner = normalizeAdventureSpinnerConfig(obj.adventureSpinner, isPublic);
  }
  if (obj.finale) {
    result.finale = normalizeFinaleConfig(obj.finale, isPublic);
  }

  // Pass-through any future modules registered dynamically
  for (const [key, val] of Object.entries(obj)) {
    if (
      !result[key] &&
      ![
        "memories",
        "voiceNote",
        "videoMemory",
        "timeline",
        "quiz",
        "secret",
        "openWhen",
        "reasons",
        "compliments",
        "fortuneCookie",
        "scratchCard",
        "promises",
        "futureAdventures",
        "adventureSpinner",
        "finale",
      ].includes(key)
    ) {
      const def = getModuleDefinition(key);
      if (def) {
        result[key] = def.normalizeConfig(val, isPublic);
      }
    }
  }

  return result;
}
