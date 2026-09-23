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

  // Pass-through any future modules registered dynamically
  for (const [key, val] of Object.entries(obj)) {
    if (
      !result[key] &&
      key !== "memories" &&
      key !== "voiceNote" &&
      key !== "videoMemory" &&
      key !== "timeline" &&
      key !== "quiz" &&
      key !== "secret" &&
      key !== "openWhen"
    ) {
      const def = getModuleDefinition(key);
      if (def) {
        result[key] = def.normalizeConfig(val, isPublic);
      }
    }
  }

  return result;
}
