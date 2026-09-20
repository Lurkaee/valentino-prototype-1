import { describe, it, expect } from "vitest";
import { getTemplateDefinition, getAllTemplates, midnightRoseV1 } from "@/templates/registry";
import { resolveTemplateDecor } from "@/templates/shared/compatibility";
import { DEFAULT_VALENTINE_DECOR, ValentineDecor } from "@/types/decor";

describe("Phase 3 Foundation Gate — Template Registry", () => {
  it("resolves registered template by valid id and version", () => {
    const template = getTemplateDefinition("midnight-rose", "v1");
    expect(template).toBeDefined();
    expect(template?.id).toBe("midnight-rose");
    expect(template?.version).toBe("v1");
    expect(template?.name).toBe("Midnight Rose");
  });

  it("returns null for unknown template id", () => {
    const template = getTemplateDefinition("unknown-galactic-romance", "v1");
    expect(template).toBeNull();
  });

  it("returns null for unsupported template version", () => {
    const template = getTemplateDefinition("midnight-rose", "v999");
    expect(template).toBeNull();
  });

  it("getAllTemplates returns a list containing all registered templates", () => {
    const all = getAllTemplates();
    expect(Array.isArray(all)).toBe(true);
    expect(all.length).toBeGreaterThanOrEqual(1);
    expect(all.some((t) => t.id === "midnight-rose" && t.version === "v1")).toBe(true);
  });
});

describe("Phase 3 Foundation Gate — Template Compatibility Layer", () => {
  it("resolves canonical decor deterministically without side-effects", () => {
    const input: ValentineDecor = {
      blooms: ["crimson-rose", "french-tulip"],
      charms: ["sparkle", "heart"],
      paper: "petal-blush",
      ribbon: "velvet-crimson",
      waxSeal: "crimson-heart",
    };

    // Deep freeze input to guarantee zero mutation
    const frozenInput = Object.freeze({
      ...input,
      blooms: Object.freeze([...input.blooms]),
      charms: Object.freeze([...input.charms]),
    }) as ValentineDecor;

    const res1 = resolveTemplateDecor(frozenInput, "midnight-rose");
    const res2 = resolveTemplateDecor(frozenInput, "midnight-rose");

    expect(res1).toEqual(res2);
    expect(res1.paper.id).toBe("petal-blush");
    expect(res1.ribbon.id).toBe("velvet-crimson");
    expect(res1.waxSeal.id).toBe("crimson-heart");
    expect(res1.blooms).toHaveLength(2);
    expect(res1.blooms[0].option.id).toBe("crimson-rose");
    expect(res1.charms).toHaveLength(2);
    expect(res1.charms[0].option.id).toBe("sparkle");
  });

  it("adapts atmosphere and ambient styling per templateId without altering user selections", () => {
    const input: ValentineDecor = {
      blooms: ["wild-lavender"],
      charms: ["butterfly"],
      paper: "handmade-cream",
      ribbon: "silk-ivory",
      waxSeal: "rose-quartz",
    };

    const midnightPresentation = resolveTemplateDecor(input, "midnight-rose");
    const cloudNinePresentation = resolveTemplateDecor(input, "cloud-nine");
    const goldenHourPresentation = resolveTemplateDecor(input, "golden-hour");

    // Canonical decor semantic IDs are preserved across all templates
    expect(midnightPresentation.paper.id).toBe("handmade-cream");
    expect(cloudNinePresentation.paper.id).toBe("handmade-cream");
    expect(goldenHourPresentation.paper.id).toBe("handmade-cream");

    expect(midnightPresentation.ribbon.id).toBe("silk-ivory");
    expect(cloudNinePresentation.ribbon.id).toBe("silk-ivory");
    expect(goldenHourPresentation.ribbon.id).toBe("silk-ivory");

    expect(midnightPresentation.waxSeal.id).toBe("rose-quartz");
    expect(cloudNinePresentation.waxSeal.id).toBe("rose-quartz");
    expect(goldenHourPresentation.waxSeal.id).toBe("rose-quartz");

    // Atmosphere styling adapts to template world
    expect(midnightPresentation.atmosphereGlowClass).toContain("rose-600");
    expect(cloudNinePresentation.atmosphereGlowClass).toContain("sky-300");
    expect(goldenHourPresentation.atmosphereGlowClass).toContain("amber-500");
  });

  it("safely handles null/undefined/partial decor inputs gracefully", () => {
    const presentation = resolveTemplateDecor(null, "midnight-rose");
    expect(presentation).toBeDefined();
    expect(presentation.paper).toBeDefined();
    expect(presentation.ribbon).toBeDefined();
    expect(presentation.waxSeal).toBeDefined();
    expect(presentation.blooms.length).toBeGreaterThan(0);
  });
});
