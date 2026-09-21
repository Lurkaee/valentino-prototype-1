import { describe, it, expect } from "vitest";
import {
  FEATURES,
  getFeatures,
  getAvailableFeatures,
  getRoadmapFeatures,
  getFeaturesByCategory,
  getFeaturesByContext,
  getFeatureById,
  getCompatibleFeatures,
} from "@/features/registry";
import { FEATURE_CATEGORIES } from "@/features/types";

describe("Gate 4D - Feature Discovery & Capability Catalog", () => {
  it("exports a non-empty registry of well-formed features", () => {
    expect(FEATURES.length).toBeGreaterThanOrEqual(12);
    FEATURES.forEach((feature) => {
      expect(feature.id).toBeTruthy();
      expect(feature.name).toBeTruthy();
      expect(feature.tagline).toBeTruthy();
      expect(feature.description).toBeTruthy();
      expect(feature.icon).toBeTruthy();
      expect(["available", "coming-soon"]).toContain(feature.availability);
      expect(FEATURE_CATEGORIES[feature.category]).toBeDefined();
      expect(feature.compatibleTemplates.length).toBeGreaterThan(0);
    });
  });

  it("truthfully divides available vs roadmap features", () => {
    const available = getAvailableFeatures();
    const roadmap = getRoadmapFeatures();

    expect(available.length).toBeGreaterThan(0);
    expect(roadmap.length).toBeGreaterThan(0);
    expect(available.length + roadmap.length).toBe(FEATURES.length);

    // Available features must correspond to real functioning features
    const availableIds = available.map((f) => f.id);
    expect(availableIds).toContain("timeline");
    expect(availableIds).toContain("quiz");
    expect(availableIds).toContain("secret");
    expect(availableIds).toContain("openWhen");
    expect(availableIds).toContain("letter-craft");
    expect(availableIds).toContain("paper-wax-craft");
    expect(availableIds).toContain("floral-charms");
    expect(availableIds).toContain("visual-worlds");
    expect(availableIds).toContain("plasma-interaction");

    // Coming soon features must be roadmap only
    const roadmapIds = roadmap.map((f) => f.id);
    expect(roadmapIds).toContain("acoustic-soundtrack");
    expect(roadmapIds).toContain("voice-note");
    expect(roadmapIds).toContain("video-capsule");
    expect(roadmapIds).toContain("scheduled-reveal");
    expect(roadmapIds).toContain("recipient-reactions");
    expect(roadmapIds).toContain("bucket-list");
    expect(roadmapIds).toContain("scratch-card");
    expect(roadmapIds).toContain("qr-keepsake");
    expect(roadmapIds).toContain("romance-copilot");
  });

  it("filters features correctly by category", () => {
    const momentFeatures = getFeaturesByCategory("moments");
    expect(momentFeatures.length).toBeGreaterThanOrEqual(4);
    momentFeatures.forEach((f) => expect(f.category).toBe("moments"));

    const personalFeatures = getFeaturesByCategory("personal");
    expect(personalFeatures.length).toBeGreaterThanOrEqual(2);
    personalFeatures.forEach((f) => expect(f.category).toBe("personal"));
  });

  it("filters features correctly by discovery context", () => {
    const momentsContext = getFeaturesByContext("moments");
    expect(momentsContext.length).toBeGreaterThanOrEqual(4);

    const storyContext = getFeaturesByContext("story");
    expect(storyContext.length).toBeGreaterThanOrEqual(2);
  });

  it("retrieves a feature by unique id", () => {
    const timeline = getFeatureById("timeline");
    expect(timeline).toBeDefined();
    expect(timeline?.name).toBe("Our Story Timeline");
    expect(timeline?.availability).toBe("available");

    const nonExistent = getFeatureById("non-existent-feature-xyz");
    expect(nonExistent).toBeUndefined();
  });

  it("respects template compatibility", () => {
    const midnightFeatures = getCompatibleFeatures("midnight-rose");
    expect(midnightFeatures.length).toBeGreaterThan(0);

    const kageFeatures = getCompatibleFeatures("kage");
    expect(kageFeatures.length).toBeGreaterThan(0);
    const kageIds = kageFeatures.map((f) => f.id);
    expect(kageIds).toContain("secret"); // Secret note is supported on Kage
  });
});
