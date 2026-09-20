import { describe, it, expect } from "vitest";
import {
  midnightRoseDraftSchema,
  midnightRosePublishSchema,
} from "@/templates/midnight-rose/v1/schema";
import { normalizeMidnightRoseConfig } from "@/templates/midnight-rose/v1/normalize";

describe("Template Schemas and Normalization", () => {
  describe("Lenient Draft Schema", () => {
    it("accepts empty object and provides defaults", () => {
      const result = midnightRoseDraftSchema.safeParse({});
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.accentTheme).toBe("crimson-rose");
        expect(result.data.partnerName).toBe("");
      }
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
    it("requires partnerName, senderName, and message", () => {
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
      });
      expect(valid.success).toBe(true);
    });

    it("rejects accents outside the approved palette", () => {
      const result = midnightRosePublishSchema.safeParse({
        partnerName: "Maya",
        senderName: "Chris",
        message: "Always and forever.",
        accentTheme: "neon-green" as any,
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
      expect(normalized.decor).toBeDefined();
      expect(normalized.decor?.paper).toBe("petal-blush");
      expect(normalized.decor?.ribbon).toBe("satin-rose");
      expect(normalized.decor?.waxSeal).toBe("crimson-heart");
    });
  });


  describe("ValentineDecor Serialization and Slots", () => {
    it("encodes and decodes compact URL decor params correctly", async () => {
      const { encodeDecorParam, decodeDecorParam } = await import("@/types/decor");
      const sample = {
        blooms: ["crimson-rose" as const, "blush-peony" as const],
        charms: ["sparkle" as const],
        paper: "handmade-cream" as const,
        ribbon: "velvet-crimson" as const,
        waxSeal: "champagne-gold" as const,
      };

      const encoded = encodeDecorParam(sample);
      expect(encoded).toBe("crimson-rose,blush-peony|sparkle|handmade-cream|velvet-crimson|champagne-gold");

      const decoded = decodeDecorParam(encoded);
      expect(decoded.blooms).toEqual(["crimson-rose", "blush-peony"]);
      expect(decoded.charms).toEqual(["sparkle"]);
      expect(decoded.paper).toBe("handmade-cream");
      expect(decoded.ribbon).toBe("velvet-crimson");
      expect(decoded.waxSeal).toBe("champagne-gold");
    });


    it("falls back safely when decoding invalid decor params", async () => {
      const { decodeDecorParam, DEFAULT_VALENTINE_DECOR } = await import("@/types/decor");
      expect(decodeDecorParam("")).toEqual(DEFAULT_VALENTINE_DECOR);
      expect(decodeDecorParam("garbage|data|invalid")).toEqual(DEFAULT_VALENTINE_DECOR);
    });

    it("provides dynamic, balanced bloom slots based on count", async () => {
      const { getBloomSlots } = await import("@/types/decor");
      // 1 bloom -> single hero placement
      expect(getBloomSlots(1)).toHaveLength(1);
      expect(getBloomSlots(1)[0].slotId).toBe("hero-top");

      // 2 blooms -> balanced left/right
      expect(getBloomSlots(2)).toHaveLength(2);
      expect(getBloomSlots(2).map((s) => s.slotId)).toEqual(["balanced-left", "balanced-right"]);

      // 3 blooms -> triangle
      expect(getBloomSlots(3)).toHaveLength(3);
      expect(getBloomSlots(3).map((s) => s.slotId)).toEqual(["triangle-top", "triangle-bottom-left", "triangle-bottom-right"]);
    });
  });
});

