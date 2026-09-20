import { describe, it, expect } from "vitest";
import {
  midnightRoseDraftSchema,
  midnightRosePublishSchema,
} from "@/templates/midnight-rose/v1/schema";
import { normalizeMidnightRoseConfig } from "@/templates/midnight-rose/v1/normalize";
import {
  DEFAULT_VALENTINE_DECOR,
  normalizeValentineDecor,
} from "@/types/decor";

describe("Template Schemas and Normalization", () => {
  describe("Lenient Draft Schema", () => {
    it("accepts empty object and provides defaults", () => {
      const result = midnightRoseDraftSchema.safeParse({});
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.accentTheme).toBe("crimson-rose");
        expect(result.data.partnerName).toBe("");
        expect(result.data.decor).toEqual(DEFAULT_VALENTINE_DECOR);
      }
    });

    it("accepts canonical decoration selections", () => {
      const result = midnightRoseDraftSchema.safeParse({
        decor: {
          blooms: "wildflower",
          charms: "sparkle",
          paper: "soft-lavender",
          ribbon: "silk-ivory",
          waxSeal: "champagne-gold",
        },
      });
      expect(result.success).toBe(true);
    });

    it("rejects invalid decoration values", () => {
      const result = midnightRoseDraftSchema.safeParse({
        decor: {
          blooms: "neon-flowers",
          charms: "heart",
          paper: "ivory-cream",
          ribbon: "velvet-crimson",
          waxSeal: "crimson-heart",
        },
      });
      expect(result.success).toBe(false);
    });

    it("rejects names longer than 60 graphemes", () => {
      const longName = "A".repeat(61);
      const result = midnightRoseDraftSchema.safeParse({ partnerName: longName });
      expect(result.success).toBe(false);
    });

    it("rejects messages longer than 2000 graphemes", () => {
      const longMessage = "🌹".repeat(2001);
      const result = midnightRoseDraftSchema.safeParse({ message: longMessage });
      expect(result.success).toBe(false);
    });
  });

  describe("Strict Publish Schema", () => {
    it("requires partnerName, senderName, message, while accepting decor", () => {
      const invalid = midnightRosePublishSchema.safeParse({
        partnerName: "",
        senderName: "",
        message: "",
      });
      expect(invalid.success).toBe(false);

      const valid = midnightRosePublishSchema.safeParse({
        partnerName: "Ananya",
        senderName: "Rohan",
        message: "You are the light of my life.",
        accentTheme: "champagne-gold",
        decor: {
          blooms: "rose",
          charms: "heart",
          paper: "petal-blush",
          ribbon: "satin-rose",
          waxSeal: "rose-quartz",
        },
      });
      expect(valid.success).toBe(true);
    });

    it("rejects accents outside the approved palette", () => {
      const result = midnightRosePublishSchema.safeParse({
        partnerName: "Maya",
        senderName: "Chris",
        message: "Always and forever.",
        accentTheme: "neon-green" as any,
        decor: DEFAULT_VALENTINE_DECOR,
      });
      expect(result.success).toBe(false);
    });

    it("rejects invalid decor during publish", () => {
      const result = midnightRosePublishSchema.safeParse({
        partnerName: "Maya",
        senderName: "Chris",
        message: "Always and forever.",
        decor: {
          ...DEFAULT_VALENTINE_DECOR,
          waxSeal: "neon-gold",
        },
      });
      expect(result.success).toBe(false);
    });
  });

  describe("Config Normalization", () => {
    it("fills missing defaults and sanitizes text", () => {
      const normalized = normalizeMidnightRoseConfig({
        partnerName: "  Maya  ",
        senderName: "Chris \u202Ereversed",
        message: "A heartfelt message\nwith lines.",
      });

      expect(normalized.partnerName).toBe("Maya");
      expect(normalized.senderName).toBe("Chris reversed");
      expect(normalized.greeting).toBe("To my favorite person");
      expect(normalized.signOff).toBe("With all my love");
      expect(normalized.accentTheme).toBe("crimson-rose");
      expect(normalized.heroMediaId).toBeNull();
      expect(normalized.decor).toEqual(DEFAULT_VALENTINE_DECOR);
    });

    it("normalizes legacy flowers/seal keys into the canonical decoration shape", () => {
      const normalized = normalizeValentineDecor({
        flowers: "wildflower",
        charms: "star",
        paper: "deckled-parchment",
        ribbon: "plum-mist",
        seal: "royal-burgundy",
      });

      expect(normalized).toEqual({
        blooms: "wildflower",
        charms: "star",
        paper: "deckled-parchment",
        ribbon: "plum-mist",
        waxSeal: "royal-burgundy",
      });
    });

    it("falls back deterministically when decoration payload is malformed", () => {
      expect(normalizeValentineDecor(null)).toEqual(DEFAULT_VALENTINE_DECOR);
      expect(
        normalizeValentineDecor({
          blooms: "unknown",
          charms: "unknown",
          paper: "unknown",
          ribbon: "unknown",
          waxSeal: "unknown",
        })
      ).toEqual(DEFAULT_VALENTINE_DECOR);
    });
  });
});
