import { describe, it, expect } from "vitest";
import fs from "fs";
import path from "path";
import crypto from "crypto";
import {
  VALENTINE_PLASMA_THEMES,
  type ValentinePlasmaTheme,
} from "@/components/ui/ValentinePlasmaButton";

describe("ThreeUI Plasma Button Source Integrity & Color Configuration", () => {
  const OFFICIAL_SPECS = [
    {
      file: "src/shaders/neuform-isolated/NeuformIsolatedEffects.tsx",
      expectedSha256:
        "fe9856234253bc3c1a13b3afb84f3d84644dfa6d578e7203bb3e1dd5eced1b75",
      role: "Authored ThreeUI isolated iframe wrapper",
    },
    {
      file: "src/shaders/neuform-isolated/sources/aetheris-labs.html",
      expectedSha256:
        "eea617fe0e37a79be7aee44f00a53ec3ae41e006e771a8aad53acce3648147e0",
      role: "Authored WebGL plasma shader & button source",
    },
    {
      file: "src/shaders/threeui.css",
      expectedSha256:
        "efe4447139f1358dd8e9be68edf6fa46cbefbd1de423a4d6c439ca61d2c8eccf",
      role: "Shared ThreeUI layout and frame stylesheet",
    },
  ];

  it("verifies all three official ThreeUI source files exist and match official SHA-256 hashes", () => {
    for (const spec of OFFICIAL_SPECS) {
      const fullPath = path.resolve(process.cwd(), spec.file);
      expect(fs.existsSync(fullPath), `File must exist: ${spec.file}`).toBe(true);

      const content = fs.readFileSync(fullPath, "utf8");
      const computedHash = crypto
        .createHash("sha256")
        .update(content)
        .digest("hex");

      expect(
        computedHash,
        `SHA-256 mismatch for ${spec.file} (${spec.role})`
      ).toBe(spec.expectedSha256);
    }
  });

  it("verifies the authored WebGL shader contains authentic plasma mathematics and reduced motion support", () => {
    const htmlPath = path.resolve(
      process.cwd(),
      "src/shaders/neuform-isolated/sources/aetheris-labs.html"
    );
    const html = fs.readFileSync(htmlPath, "utf8");

    // Must contain original noise and fractional Brownian motion functions
    expect(html).toContain("float hash(vec2 p)");
    expect(html).toContain("float noise(vec2 p)");
    expect(html).toContain("float fbm(vec2 p)");
    expect(html).toContain("gl_FragColor = vec4(col, 1.0);");

    // Must contain reduced motion handling
    expect(html).toContain("prefers-reduced-motion: reduce");
    expect(html).toContain("gl.uniform1f(uTime, reduced ? 6.0 : churn);");

    // Must contain button id and webgl canvas id
    expect(html).toContain('id="btn"');
    expect(html).toContain('id="gl"');
  });

  it("verifies the primary Valentine theme delivers baby-pink and lavender color world", () => {
    const primary = VALENTINE_PLASMA_THEMES.valentine;
    expect(primary).toBeDefined();

    // Hue rotation must be around 115° - 125° to transform laboratory cyan/blue (204°) into baby pink (320°+)
    expect(primary.hue).toBeGreaterThanOrEqual(110);
    expect(primary.hue).toBeLessThanOrEqual(125);

    // Saturation and brightness must maintain vibrant plasma clarity
    expect(primary.saturation).toBeGreaterThanOrEqual(1.0);
    expect(primary.saturation).toBeLessThanOrEqual(1.2);
    expect(primary.brightness).toBeGreaterThanOrEqual(1.0);
    expect(primary.brightness).toBeLessThanOrEqual(1.15);
    expect(primary.mode).toBe("dark");
  });

  it("verifies all theme presets maintain valid clamp bounds for ThreeUI NeuformIsolatedEffects", () => {
    const themeKeys: ValentinePlasmaTheme[] = [
      "valentine",
      "midnightRose",
      "cloudNine",
      "goldenHour",
      "stardust",
    ];

    for (const key of themeKeys) {
      const theme = VALENTINE_PLASMA_THEMES[key];
      expect(theme, `Theme config for ${key} must exist`).toBeDefined();
      expect(theme.hue).toBeGreaterThanOrEqual(-180);
      expect(theme.hue).toBeLessThanOrEqual(180);
      expect(theme.saturation).toBeGreaterThanOrEqual(0);
      expect(theme.saturation).toBeLessThanOrEqual(2);
      expect(theme.brightness).toBeGreaterThanOrEqual(0.35);
      expect(theme.brightness).toBeLessThanOrEqual(1.65);
      expect(["light", "dark"]).toContain(theme.mode);
      expect(theme.glowColor).toBeTruthy();
      expect(theme.borderColor).toBeTruthy();
      expect(theme.textColor).toBeTruthy();
    }
  });
});
