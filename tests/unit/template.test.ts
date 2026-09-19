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
    });
  });
});
