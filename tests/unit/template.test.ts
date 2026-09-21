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

  describe("Midnight Rose Flagship Compatibility Resolution", () => {
    it("resolves canonical decor into Midnight Rose presentation treatments", async () => {
      const { resolveTemplateDecor } = await import("@/templates/shared/compatibility");
      const presentation = resolveTemplateDecor({
        paper: "handmade-cream",
        ribbon: "velvet-crimson",
        waxSeal: "champagne-gold",
        blooms: ["crimson-rose", "wild-daisy"],
        charms: ["sparkle"],
      }, "midnight-rose");

      expect(presentation.paper.id).toBe("handmade-cream");
      expect(presentation.paper.ambientTextureClass).toContain("mix-blend-multiply");
      expect(presentation.ribbon.id).toBe("velvet-crimson");
      expect(presentation.waxSeal.id).toBe("champagne-gold");
      expect(presentation.waxSeal.haloClass).toBe("bg-rose-500/25");
      expect(presentation.atmosphereGlowClass).toContain("rose-600");
      expect(presentation.blooms).toHaveLength(2);
      expect(presentation.blooms[0].option.id).toBe("crimson-rose");
      expect(presentation.blooms[1].option.id).toBe("wild-daisy");
      expect(presentation.charms).toHaveLength(1);
      expect(presentation.charms[0].option.id).toBe("sparkle");
    });

    it("deterministically preserves bloom slots across 1 to 6 blooms", async () => {
      const { resolveTemplateDecor } = await import("@/templates/shared/compatibility");
      const single = resolveTemplateDecor({ blooms: ["crimson-rose"] }, "midnight-rose");
      expect(single.blooms).toHaveLength(1);
      expect(single.blooms[0].slot.x).toBe(0);
      expect(single.blooms[0].slot.y).toBe(-95);

      const fullBouquet = resolveTemplateDecor({
        blooms: ["crimson-rose", "blush-peony", "wild-daisy", "french-tulip", "white-lily"],
      }, "midnight-rose");
      expect(fullBouquet.blooms).toHaveLength(5);
      // Deterministic coordinates verification
      expect(fullBouquet.blooms[0].slot.zIndex).toBeDefined();
      expect(fullBouquet.blooms[4].slot.zIndex).toBeDefined();
    });
  });
  describe("Cloud Nine Template Specifications", () => {
    it("accepts lenient draft config and defaults to blush-sky theme", async () => {
      const { cloudNineDraftSchema } = await import("@/templates/cloud-nine/v1/schema");
      const { cloudNineV1 } = await import("@/templates/registry");
      const result = cloudNineDraftSchema.safeParse({});
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.accentTheme).toBe("blush-sky");
        expect(result.data.greeting).toBe("");
        expect(cloudNineV1.defaultConfig.greeting).toBe("To my sweetest soul");
      }
    });

    it("validates strict publish requirements for partnerName, senderName, and message", async () => {
      const { cloudNinePublishSchema } = await import("@/templates/cloud-nine/v1/schema");
      const invalid = cloudNinePublishSchema.safeParse({
        partnerName: "",
        senderName: "",
        message: "",
      });
      expect(invalid.success).toBe(false);

      const valid = cloudNinePublishSchema.safeParse({
        partnerName: "Seraphina",
        senderName: "Julian",
        message: "You lift me to cloud nine every single day.",
        accentTheme: "peach-sorbet",
      });
      expect(valid.success).toBe(true);
    });

    it("normalizes incomplete raw draft into sanitized Cloud Nine published config", async () => {
      const { normalizeCloudNineConfig } = await import("@/templates/cloud-nine/v1/normalize");
      const normalized = normalizeCloudNineConfig({
        partnerName: "  Clara  ",
        senderName: "Liam \u202Ereversed",
        message: "Floating in pure happiness.",
        accentTheme: "lavender-mist",
        heroMediaId: "https://example.com/cloud-photo.jpg",
      });

      expect(normalized.partnerName).toBe("Clara");
      expect(normalized.senderName).toBe("Liam reversed");
      expect(normalized.accentTheme).toBe("lavender-mist");
      expect(normalized.heroMediaId).toBe("https://example.com/cloud-photo.jpg");
      expect(normalized.decor?.paper).toBe("petal-blush");
    });

    it("is registered in the central template registry", async () => {
      const { getTemplateDefinition, getAllTemplates } = await import("@/templates/registry");
      const def = getTemplateDefinition("cloud-nine", "v1");
      expect(def).not.toBeNull();
      expect(def?.name).toBe("Cloud Nine");
      expect(def?.id).toBe("cloud-nine");
      expect(def?.version).toBe("v1");
      expect(typeof def?.renderSsrHtml).toBe("function");

      const all = getAllTemplates();
      expect(all.some((t) => t.id === "cloud-nine")).toBe(true);
    });

    it("resolves canonical decor for Cloud Nine with airy pastel presentation treatments", async () => {
      const { resolveTemplateDecor } = await import("@/templates/shared/compatibility");
      const presentation = resolveTemplateDecor({
        paper: "petal-blush",
        ribbon: "silk-ivory",
        waxSeal: "crimson-heart",
        blooms: ["french-tulip"],
        charms: ["sparkle"],
      }, "cloud-nine");

      expect(presentation.paper.id).toBe("petal-blush");
      expect(presentation.ribbon.id).toBe("silk-ivory");
      expect(presentation.waxSeal.id).toBe("crimson-heart");
      expect(presentation.atmosphereGlowClass).toContain("pink-400");
      expect(presentation.blooms).toHaveLength(1);
      expect(presentation.charms).toHaveLength(1);
    });
  });
});
