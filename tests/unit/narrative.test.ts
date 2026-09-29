import { describe, it, expect } from "vitest";
import {
  storyChapterSchema,
  narrativeDraftSchema,
  narrativePublishSchema,
  normalizeNarrativeConfig,
  DEFAULT_STORY_CHAPTERS,
} from "@/narrative/schema";
import { normalizeTimelineConfig, timelineDraftSchema, timelinePublishSchema } from "@/modules/timeline/schema";
import { normalizeMemoriesConfig, memoriesDraftSchema, memoriesPublishSchema } from "@/modules/memories/schema";
import { normalizeFinaleConfig } from "@/modules/finale/schema";
import { normalizeOpenWhenConfig } from "@/modules/open-when/schema";

describe("Phase 5D — Relationship Story & Personalization System", () => {
  describe("Narrative Schema & Story Journey Normalization", () => {
    it("generates 4 default canonical story chapters when empty", () => {
      const normalized = normalizeNarrativeConfig({});
      expect(normalized.chapters.length).toBe(4);
      expect(normalized.chapters[0].title).toBe("How We Started");
      expect(normalized.chapters[1].title).toBe("What I Love About Us");
      expect(normalized.chapters[2].title).toBe("Where We're Going");
      expect(normalized.chapters[3].title).toBe("Our Forever");
    });

    it("prevents orphan modules by attaching unreferenced active modules", () => {
      const customConfig = {
        chapters: [
          {
            id: "ch-1",
            title: "Custom Chapter",
            moduleRefs: ["memories"],
            order: 0,
          },
        ],
        pacing: "cinematic",
      };

      const normalized = normalizeNarrativeConfig(customConfig);
      expect(normalized.chapters.length).toBeGreaterThanOrEqual(1);
      expect(normalized.pacing).toBe("cinematic");

      // Verify that all referenced module IDs are preserved
      const allModuleRefs = normalized.chapters.flatMap((c) => c.moduleRefs);
      expect(allModuleRefs).toContain("memories");
    });

    it("sanitizes custom section titles and prevents empty titles", () => {
      const raw = {
        customSectionTitles: {
          memories: "  The Little Things That Count  ",
          reasons: "  Things I Never Say Enough  ",
          timeline: "", // empty title should be pruned
        },
      };

      const normalized = normalizeNarrativeConfig(raw);
      expect(normalized.customSectionTitles.memories).toBe("The Little Things That Count");
      expect(normalized.customSectionTitles.reasons).toBe("Things I Never Say Enough");
      expect(normalized.customSectionTitles.timeline).toBeUndefined();
    });

    it("normalizes personal welcome and personal closing", () => {
      const raw = {
        welcome: {
          enabled: true,
          greeting: "Good Morning, My Star",
          recipientName: "Maya",
          message: "Step softly into what I built for you.",
        },
        closing: {
          enabled: true,
          title: "My Forever Promise",
          message: "No matter what happens, you are my home.",
          signature: "Always, Rohan",
          date: "February 14, 2026",
          promise: "To hold your hand in every crowd.",
        },
      };

      const normalized = normalizeNarrativeConfig(raw);
      expect(normalized.welcome?.enabled).toBe(true);
      expect(normalized.welcome?.greeting).toBe("Good Morning, My Star");
      expect(normalized.welcome?.recipientName).toBe("Maya");
      expect(normalized.closing?.enabled).toBe(true);
      expect(normalized.closing?.promise).toBe("To hold your hand in every crowd.");
    });
  });

  describe("Enhanced Timeline Module & Milestones", () => {
    it("supports milestone categories, location, and connected memories", () => {
      const raw = {
        enabled: true,
        title: "Our Journey",
        items: [
          {
            id: "m-1",
            title: "First Meeting at the Cafe",
            date: "Autumn 2023",
            category: "FIRSTS",
            location: "Le Petit Cafe, Paris",
            description: "You wore the brown scarf and ordered oat milk cappuccino.",
            relatedMemoryId: "photo-cafe-1",
            nextStepMessage: "Remember the laugh that followed?",
          },
        ],
      };

      const normalized = normalizeTimelineConfig(raw);
      expect(normalized.enabled).toBe(true);
      expect(normalized.items.length).toBe(1);
      expect(normalized.items[0].category).toBe("FIRSTS");
      expect(normalized.items[0].location).toBe("Le Petit Cafe, Paris");
      expect(normalized.items[0].relatedMemoryId).toBe("photo-cafe-1");
      expect(normalized.items[0].nextStepMessage).toBe("Remember the laugh that followed?");
    });
  });

  describe("Memory Storytelling & Milestone Connections", () => {
    it("supports location, emotionalLabel, and relatedMilestoneId", () => {
      const raw = {
        enabled: true,
        title: "Cherished Frames",
        items: [
          {
            id: "photo-cafe-1",
            url: "https://example.com/cafe.jpg",
            title: "Quiet Afternoon",
            caption: "Our first uninterrupted hours together.",
            date: "October 14, 2023",
            location: "Le Petit Cafe",
            emotionalLabel: "Unforgettable",
            relatedMilestoneId: "m-1",
          },
        ],
      };

      const normalized = normalizeMemoriesConfig(raw);
      expect(normalized.enabled).toBe(true);
      expect(normalized.items.length).toBe(1);
      expect(normalized.items[0].location).toBe("Le Petit Cafe");
      expect(normalized.items[0].emotionalLabel).toBe("Unforgettable");
      expect(normalized.items[0].relatedMilestoneId).toBe("m-1");
    });
  });

  describe("Personalized Finale & Reflection", () => {
    it("normalizes personal reflection, closing date, and promise highlight", () => {
      const raw = {
        enabled: true,
        title: "To Eternity",
        personalReflection: "Looking back at everything we built, my heart is utterly full.",
        declaration: "In every lifetime, I will choose you.",
        signature: "Yours Always & Forever",
        closingDate: "2026-02-14",
        closingPromise: "To love you through every season.",
      };

      const normalized = normalizeFinaleConfig(raw);
      expect(normalized.enabled).toBe(true);
      expect(normalized.personalReflection).toBe("Looking back at everything we built, my heart is utterly full.");
      expect(normalized.closingDate).toBe("2026-02-14");
      expect(normalized.closingPromise).toBe("To love you through every season.");
    });
  });

  describe("Expanded Open When Envelopes", () => {
    it("normalizes category classification for envelopes", () => {
      const raw = {
        enabled: true,
        envelopes: [
          {
            id: "e-1",
            title: "Open when you miss me",
            category: "miss-me",
            message: "Close your eyes and feel my arms around you.",
          },
          {
            id: "e-2",
            title: "Open when today was exhausting",
            category: "hard-day",
            message: "Take off your shoes and let yourself rest. I am proud of you.",
          },
        ],
      };

      const normalized = normalizeOpenWhenConfig(raw);
      expect(normalized.enabled).toBe(true);
      expect(normalized.envelopes.length).toBe(2);
      expect(normalized.envelopes[0].category).toBe("miss-me");
      expect(normalized.envelopes[1].category).toBe("hard-day");
    });
  });
});
