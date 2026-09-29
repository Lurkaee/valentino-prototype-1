import { describe, it, expect } from "vitest";
import {
  getModuleDefinition,
  getAllModules,
  registerModule,
  normalizeAllModules,
} from "@/modules/registry";
import { normalizeSecretConfig, secretDraftSchema, secretPublishSchema } from "@/modules/secret/schema";
import { normalizeTimelineConfig, timelineDraftSchema, timelinePublishSchema } from "@/modules/timeline/schema";
import { normalizeQuizConfig, quizDraftSchema, quizPublishSchema } from "@/modules/quiz/schema";
import { normalizeOpenWhenConfig, openWhenDraftSchema, openWhenPublishSchema } from "@/modules/open-when/schema";
import { normalizeReasonsConfig, reasonsDraftSchema, reasonsPublishSchema } from "@/modules/reasons/schema";
import { normalizeComplimentsConfig, complimentsDraftSchema, complimentsPublishSchema } from "@/modules/compliments/schema";
import { normalizeFortuneCookieConfig, fortuneCookieDraftSchema, fortuneCookiePublishSchema } from "@/modules/fortune-cookie/schema";
import { normalizeScratchCardConfig, scratchCardDraftSchema, scratchCardPublishSchema } from "@/modules/scratch-card/schema";
import { normalizePromisesConfig, promisesDraftSchema, promisesPublishSchema } from "@/modules/promises/schema";
import { normalizeFutureAdventuresConfig, futureAdventuresDraftSchema, futureAdventuresPublishSchema } from "@/modules/future-adventures/schema";
import { normalizeAdventureSpinnerConfig, adventureSpinnerDraftSchema, adventureSpinnerPublishSchema } from "@/modules/adventure-spinner/schema";
import { normalizeFinaleConfig, finaleDraftSchema, finalePublishSchema } from "@/modules/finale/schema";
import { getTemplateDefinition } from "@/templates/registry";
import { kageDraftSchema, kagePublishSchema } from "@/templates/kage/v1/schema";
import { normalizeKageConfig } from "@/templates/kage/v1/normalize";

describe("Experience Module Engine", () => {
  describe("Module Registry & Extensibility", () => {
    it("has all Phase 5A, 5B, and 5C interactive modules registered", () => {
      const all = getAllModules();
      const ids = all.map((m) => m.id);
      expect(ids).toContain("timeline");
      expect(ids).toContain("quiz");
      expect(ids).toContain("secret");
      expect(ids).toContain("openWhen");
      expect(ids).toContain("reasons");
      expect(ids).toContain("compliments");
      expect(ids).toContain("fortuneCookie");
      expect(ids).toContain("scratchCard");
      expect(ids).toContain("promises");
      expect(ids).toContain("futureAdventures");
      expect(ids).toContain("adventureSpinner");
      expect(ids).toContain("finale");
      expect(all.length).toBeGreaterThanOrEqual(12);
    });

    it("allows registering future modules without rewriting engine", () => {
      const dummyDefinition = {
        id: "customFutureAddon",
        version: "v1",
        name: "Custom Addon",
        description: "Future romantic interaction",
        icon: "✨",
        draftSchema: timelineDraftSchema,
        publishSchema: timelinePublishSchema,
        defaultConfig: { enabled: false },
        normalizeConfig: (raw: unknown) => ({ enabled: true, custom: "data" }),
        Component: () => null,
      };

      registerModule(dummyDefinition as any);
      const retrieved = getModuleDefinition("customFutureAddon");
      expect(retrieved).toBeDefined();
      expect(retrieved?.name).toBe("Custom Addon");
    });
  });

  describe("Timeline Module", () => {
    it("validates draft schema and provides sensible defaults", () => {
      const parsed = timelineDraftSchema.safeParse({});
      expect(parsed.success).toBe(true);
      if (parsed.success) {
        expect(parsed.data.enabled).toBe(false);
        expect(parsed.data.items).toEqual([]);
      }
    });

    it("normalizes timeline items", () => {
      const raw = {
        enabled: true,
        title: "Our Story",
        items: [
          { title: "First Met", date: "2023-02-14", description: "At the quaint cafe on 5th street" },
          { title: "First Trip", date: "2023-08-10", description: "To the mountains" },
        ],
      };
      const normalized = normalizeTimelineConfig(raw);
      expect(normalized.enabled).toBe(true);
      expect(normalized.items.length).toBe(2);
      expect(normalized.items[0].title).toBe("First Met");
      expect(normalized.items[1].title).toBe("First Trip");
    });
  });

  describe("Love Quiz Module", () => {
    it("validates questions and choices in publish schema", () => {
      const valid = quizPublishSchema.safeParse({
        enabled: true,
        title: "How Well Do You Know Us?",
        questions: [
          {
            id: "q1",
            question: "Where was our first date?",
            options: ["The Coffee Shop", "The Park", "The Bookstore", "The Cinema"],
            correctIndex: 0,
            explanation: "You ordered a caramel latte!",
          },
        ],
        completionMessage: "You know my heart completely.",
      });
      expect(valid.success).toBe(true);

      const invalid = quizPublishSchema.safeParse({
        enabled: true,
        questions: [
          {
            id: "q2",
            question: "",
            options: ["Only one choice"],
            correctIndex: 0,
          },
        ],
      });
      expect(invalid.success).toBe(false);
    });

    it("normalizes quiz questions gracefully", () => {
      const normalized = normalizeQuizConfig({
        enabled: true,
        questions: [
          {
            id: "q1",
            question: "Where did we first travel together?",
            options: ["Tokyo", "Kyoto", "Osaka"],
            correctIndex: 1,
            explanation: "Walking through Arashiyama bamboo forest!",
          },
        ],
      });
      expect(normalized.enabled).toBe(true);
      expect(normalized.questions.length).toBe(1);
      expect(normalized.questions[0].correctIndex).toBe(1);
    });
  });

  describe("Secret Note Module Privacy Boundary", () => {
    it("preserves secretContent when isPublic = false (creator draft / editing)", () => {
      const raw = {
        enabled: true,
        prompt: "A secret for your eyes only",
        hint: "Remember our song?",
        secretContent: "I knew I loved you the third time we met under the rain.",
      };

      const normalized = normalizeSecretConfig(raw, false);
      expect(normalized.enabled).toBe(true);
      expect(normalized.prompt).toBe("A secret for your eyes only");
      expect(normalized.secretContent).toBe("I knew I loved you the third time we met under the rain.");
    });

    it("STRIPS secretContent when isPublic = true (SSR & initial recipient payload)", () => {
      const raw = {
        enabled: true,
        prompt: "A secret for your eyes only",
        hint: "Remember our song?",
        secretContent: "I knew I loved you the third time we met under the rain.",
      };

      const normalized = normalizeSecretConfig(raw, true);
      expect(normalized.enabled).toBe(true);
      expect(normalized.prompt).toBe("A secret for your eyes only");
      expect(normalized.hint).toBe("Remember our song?");
      // CRITICAL PRIVACY BOUNDARY: secretContent must be undefined on public payload
      expect(normalized.secretContent).toBeUndefined();
      expect(normalized.isRevealed).toBe(false);
    });

    it("enforces stripping via normalizeAllModules for public payload", () => {
      const rawModules = {
        secret: {
          enabled: true,
          prompt: "Tap to unlock my confession",
          secretContent: "Top secret romantic confession",
        },
      };

      const publicModules = normalizeAllModules(rawModules, true);
      expect(publicModules.secret?.enabled).toBe(true);
      expect(publicModules.secret?.prompt).toBe("Tap to unlock my confession");
      expect(publicModules.secret?.secretContent).toBeUndefined();
    });
  });

  describe("Open When Module", () => {
    it("normalizes envelopes and defaults", () => {
      const raw = {
        enabled: true,
        envelopes: [
          {
            id: "env-1",
            title: "Open when you miss me",
            context: "Late night thoughts",
            message: "Look up at the moon, we are under the same sky.",
          },
        ],
      };
      const normalized = normalizeOpenWhenConfig(raw);
      expect(normalized.enabled).toBe(true);
      expect(normalized.envelopes.length).toBe(1);
      expect(normalized.envelopes[0].title).toBe("Open when you miss me");
      expect(normalized.envelopes[0].message).toBe("Look up at the moon, we are under the same sky.");
    });
  });

  describe("Reasons I Love You Module", () => {
    it("validates and normalizes reasons config with fallback ids and defaults", () => {
      const raw = {
        enabled: true,
        title: "50 Reasons",
        items: [
          { text: "Your crooked smile every morning" },
          { title: "Laughter", text: "How we laugh until we cry" },
        ],
      };
      const normalized = normalizeReasonsConfig(raw);
      expect(normalized.enabled).toBe(true);
      expect(normalized.items.length).toBe(2);
      expect(normalized.items[0].id).toBe("reason-1");
      expect(normalized.items[0].text).toBe("Your crooked smile every morning");
      expect(normalized.items[1].title).toBe("Laughter");
    });
  });

  describe("Compliment Machine Module", () => {
    it("validates pool of compliments and filters empty strings", () => {
      const raw = {
        enabled: true,
        title: "Sweet Words",
        items: ["You light up my life", " ", "Your heart is golden"],
      };
      const normalized = normalizeComplimentsConfig(raw);
      expect(normalized.enabled).toBe(true);
      expect(normalized.items.length).toBe(2);
      expect(normalized.items[0]).toBe("You light up my life");
      expect(normalized.items[1]).toBe("Your heart is golden");
    });
  });

  describe("Fortune Cookie Module", () => {
    it("normalizes fortunes array and maintains enabled state", () => {
      const raw = {
        enabled: true,
        title: "Destiny Cookies",
        fortunes: ["A trip is in our near future", "A long warm hug awaits you tonight"],
      };
      const normalized = normalizeFortuneCookieConfig(raw);
      expect(normalized.enabled).toBe(true);
      expect(normalized.fortunes.length).toBe(2);
      expect(normalized.fortunes[0]).toContain("near future");
    });
  });

  describe("Scratch Card Module", () => {
    it("validates scratch-off front message and hidden surprise", () => {
      const valid = scratchCardPublishSchema.safeParse({
        enabled: true,
        title: "Scratch to Win My Heart",
        frontMessage: "Scratch with love ✦",
        hiddenMessage: "Pack your bags, we are going to Paris!",
      });
      expect(valid.success).toBe(true);

      const raw = {
        enabled: true,
        hiddenMessage: "Dinner is on me tonight!",
      };
      const normalized = normalizeScratchCardConfig(raw);
      expect(normalized.enabled).toBe(true);
      expect(normalized.hiddenMessage).toBe("Dinner is on me tonight!");
    });
  });

  describe("Promise Wall Module", () => {
    it("normalizes promise items and sets default category", () => {
      const raw = {
        enabled: true,
        title: "Our Vows",
        items: [
          { text: "Always make you laugh when you feel down" },
          { text: "More Sunday morning road trips", category: "adventures" },
        ],
      };
      const normalized = normalizePromisesConfig(raw);
      expect(normalized.enabled).toBe(true);
      expect(normalized.items.length).toBe(2);
      expect(normalized.items[0].category).toBe("vow");
      expect(normalized.items[1].category).toBe("adventures");
    });
  });

  describe("Future Adventures / Bucket List Module", () => {
    it("normalizes adventure items and categorizes planned vs completed vs someday", () => {
      const raw = {
        enabled: true,
        title: "Our Co-op Bucket List",
        items: [
          { title: "Northern Lights in Norway", status: "someday" },
          { title: "Watch the sunrise on the coast", status: "completed" },
          { title: "Cook handmade pasta together", status: "planned" },
        ],
      };
      const normalized = normalizeFutureAdventuresConfig(raw);
      expect(normalized.enabled).toBe(true);
      expect(normalized.items.length).toBe(3);
      expect(normalized.items[0].status).toBe("someday");
      expect(normalized.items[1].status).toBe("completed");
      expect(normalized.items[2].status).toBe("planned");
    });
  });

  describe("Adventure Spinner Module", () => {
    it("validates minimum 2 options for spinning wheel", () => {
      const invalid = adventureSpinnerPublishSchema.safeParse({
        enabled: true,
        title: "Date Night Wheel",
        options: [{ id: "1", label: "Only One Option" }],
      });
      expect(invalid.success).toBe(false);

      const raw = {
        enabled: true,
        options: [
          { label: "Stargazing Picnic" },
          { label: "Candlelit Italian Dinner" },
          { label: "Arcade and Bubble Tea" },
        ],
      };
      const normalized = normalizeAdventureSpinnerConfig(raw);
      expect(normalized.enabled).toBe(true);
      expect(normalized.options.length).toBe(3);
      expect(normalized.options[0].id).toBe("spin-1");
    });
  });

  describe("Emotional Finale Module", () => {
    it("validates declaration and keepsake prompts", () => {
      const raw = {
        enabled: true,
        title: "Forever Yours",
        declaration: "Every moment leading up to this was worth finding you.",
        signature: "Always, your love",
        showKeepsakePrompt: true,
      };
      const normalized = normalizeFinaleConfig(raw);
      expect(normalized.enabled).toBe(true);
      expect(normalized.declaration).toBe("Every moment leading up to this was worth finding you.");
      expect(normalized.signature).toBe("Always, your love");
      expect(normalized.showKeepsakePrompt).toBe(true);
    });
  });

  describe("Kage Visual World Template", () => {
    it("is registered in the template registry as an exact-source visual world", () => {
      const kage = getTemplateDefinition("kage", "v1");
      expect(kage).toBeDefined();
      expect(kage?.name).toBe("Kage");
      expect(kage?.version).toBe("v1");
    });

    it("validates draft schema with defaults", () => {
      const parsed = kageDraftSchema.safeParse({});
      expect(parsed.success).toBe(true);
      if (parsed.success) {
        expect(parsed.data.greeting).toBe("Where stillness reveals the unseen");
        expect(parsed.data.accentTheme).toBe("kyoto-crimson");
      }
    });

    it("normalizes Kage config and strips secret content in public mode", () => {
      const raw = {
        partnerName: "Aoi",
        senderName: "Ren",
        greeting: "Under the Kyoto stars",
        message: "Every step along this temple path reminds me of our quiet joy.",
        modules: {
          secret: {
            enabled: true,
            prompt: "Whisper in the wind",
            secretContent: "I will love you for a thousand seasons.",
          },
        },
      };

      const publicNormalized = normalizeKageConfig(raw, true);
      expect(publicNormalized.partnerName).toBe("Aoi");
      expect(publicNormalized.modules?.secret?.enabled).toBe(true);
      expect(publicNormalized.modules?.secret?.secretContent).toBeUndefined();

      const draftNormalized = normalizeKageConfig(raw, false);
      expect(draftNormalized.modules?.secret?.secretContent).toBe("I will love you for a thousand seasons.");
    });
  });
});
