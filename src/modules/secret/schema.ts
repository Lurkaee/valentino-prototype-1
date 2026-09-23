import { z } from "zod";
import { countGraphemes } from "@/lib/sanitize";

const graphemeMax = (max: number) =>
  z.string().refine((val) => countGraphemes(val) <= max, {
    message: `Must not exceed ${max} characters`,
  });

export const questionLockDraftSchema = z.object({
  enabled: z.boolean().default(false),
  question: z.string().max(200).default(""),
  answer: z.string().max(100).default(""),
  answerHash: z.string().optional(),
  answerSalt: z.string().optional(),
});

export const secretDraftSchema = z.object({
  enabled: z.boolean().default(false),
  title: graphemeMax(100).default("A Little Secret"),
  prompt: graphemeMax(100).default("Tap to reveal what's hidden inside"),
  hint: graphemeMax(100).optional().default("Only for your eyes"),
  secretContent: graphemeMax(2000).optional().default(""),
  concealedSecret: graphemeMax(2000).optional(),
  question: z.string().max(200).optional(),
  answer: z.string().max(100).optional(),
  questionLock: questionLockDraftSchema.optional(),
});

export type SecretDraftConfig = z.infer<typeof secretDraftSchema>;

export const secretPublishSchema = z.object({
  enabled: z.boolean().default(false),
  title: z.string().max(100).default("A Little Secret"),
  prompt: z.string().min(1, "Prompt required").max(100).default("Tap to reveal what's hidden inside"),
  hint: z.string().max(100).optional(),
  secretContent: z.string().max(2000).optional(),
  concealedSecret: z.string().max(2000).optional(),
  question: z.string().max(200).optional(),
  answer: z.string().max(100).optional(),
  salt: z.string().optional(),
  answerHash: z.string().optional(),
  encryptedSecret: z.any().optional(),
  isRevealed: z.boolean().optional(),
  questionLock: z
    .object({
      enabled: z.boolean().default(false),
      question: z.string().max(200).default(""),
      answer: z.string().max(100).optional(),
      answerHash: z.string().optional(),
      answerSalt: z.string().optional(),
    })
    .optional(),
});

export interface SecretPublishedConfig {
  enabled: boolean;
  title: string;
  prompt: string;
  hint?: string;
  secretContent?: string;
  concealedSecret?: string;
  question?: string;
  answer?: string;
  salt?: string;
  answerHash?: string;
  encryptedSecret?: any;
  isRevealed?: boolean;
  questionLock?: {
    enabled: boolean;
    question: string;
    answer?: string;
    answerHash?: string;
    answerSalt?: string;
  };
}

export function normalizeSecretConfig(raw: unknown, isPublic: boolean = false): SecretPublishedConfig {
  if (!raw || typeof raw !== "object") {
    return {
      enabled: false,
      title: "A Little Secret",
      prompt: "Tap to reveal what's hidden inside",
      hint: "Only for your eyes",
    };
  }

  const obj = raw as Record<string, any>;
  const rawContent =
    typeof obj.secretContent === "string"
      ? obj.secretContent.trim()
      : typeof obj.concealedSecret === "string"
      ? obj.concealedSecret.trim()
      : "";
  const hasContent = rawContent.length > 0;

  const base: SecretPublishedConfig = {
    enabled: Boolean(obj.enabled && hasContent),
    title: typeof obj.title === "string" && obj.title.trim() ? obj.title.trim() : "A Little Secret",
    prompt: typeof obj.prompt === "string" && obj.prompt.trim() ? obj.prompt.trim() : "Tap to reveal what's hidden inside",
    hint: typeof obj.hint === "string" && obj.hint.trim() ? obj.hint.trim() : undefined,
  };

  const question =
    typeof obj.question === "string"
      ? obj.question.trim()
      : typeof obj.questionLock?.question === "string"
      ? obj.questionLock.question.trim()
      : "";

  if (question) {
    base.question = question;
  }

  if (obj.salt) {
    base.salt = obj.salt;
  }
  if (obj.answerHash) {
    base.answerHash = obj.answerHash;
  }
  if (obj.encryptedSecret) {
    base.encryptedSecret = obj.encryptedSecret;
  }

  const rawLock = obj.questionLock;
  if ((rawLock && rawLock.enabled && rawLock.question) || question) {
    const qText = question || String(rawLock?.question).trim();
    if (isPublic) {
      base.questionLock = {
        enabled: true,
        question: qText,
      };
    } else {
      base.questionLock = {
        enabled: true,
        question: qText,
        answer: typeof obj.answer === "string" ? obj.answer : rawLock?.answer,
        answerHash: obj.answerHash || rawLock?.answerHash,
        answerSalt: obj.salt || rawLock?.answerSalt,
      };
    }
  }

  // When public, DO NOT expose plain text secretContent or concealedSecret in initial payload
  if (isPublic) {
    return {
      ...base,
      isRevealed: false,
    };
  }

  // When in editor / draft preview, creator can see the secret content
  return {
    ...base,
    secretContent: rawContent,
    concealedSecret: rawContent,
    isRevealed: false,
  };
}
