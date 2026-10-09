import { test, expect } from "@playwright/test";
import path from "path";

const VIEWPORTS = [
  { name: "desktop_1440x900", width: 1440, height: 900 },
  { name: "desktop_1280x800", width: 1280, height: 800 },
  { name: "tablet_1024x768", width: 1024, height: 768 },
  { name: "tablet_768x1024", width: 768, height: 1024 },
  { name: "mobile_390x844", width: 390, height: 844 },
  { name: "mobile_360x800", width: 360, height: 800 },
];

const OUTPUT_DIR = "C:/Users/AYUSH/.gemini/antigravity-ide/brain/9d610088-6efa-4241-82b7-70b0cc3a4a13/phase7_captures";

test.describe("Phase 7 Spatial Composition Reset Visual Gate", () => {
  for (const vp of VIEWPORTS) {
    test(`Visual capture at ${vp.name}`, async ({ page }) => {
      test.setTimeout(120000);
      await page.setViewportSize({ width: vp.width, height: vp.height });
      await page.goto("/", { waitUntil: "networkidle" });
      await page.waitForTimeout(1000);

      // 1. Protected Homepage Hero
      const hero = page.locator("#hero");
      await hero.scrollIntoViewIfNeeded();
      await page.waitForTimeout(500);
      await hero.screenshot({
        path: path.join(OUTPUT_DIR, `hero_${vp.name}.png`),
      });

      // 2. Area A: SpatialStationeryUnfold (#personalize)
      const stationery = page.locator("#personalize");
      await stationery.scrollIntoViewIfNeeded();
      await page.waitForTimeout(800);
      await stationery.screenshot({
        path: path.join(OUTPUT_DIR, `stationery_${vp.name}.png`),
      });

      // 3. Area B: SpatialDiscoveredObjects (#moments)
      const moments = page.locator("#moments");
      await moments.scrollIntoViewIfNeeded();
      await page.waitForTimeout(800);
      await moments.screenshot({
        path: path.join(OUTPUT_DIR, `moments_${vp.name}.png`),
      });

      // 4. World Vista: Cloud Nine
      const cloudNine = page.locator(".world-vista-scene").filter({ hasText: "Cloud Nine" });
      await cloudNine.scrollIntoViewIfNeeded();
      await page.waitForTimeout(600);
      await cloudNine.screenshot({
        path: path.join(OUTPUT_DIR, `world_cloud_nine_${vp.name}.png`),
      });

      // 5. World Vista: Kage
      const kage = page.locator(".world-vista-scene").filter({ hasText: "Kage" });
      await kage.scrollIntoViewIfNeeded();
      await page.waitForTimeout(600);
      await kage.screenshot({
        path: path.join(OUTPUT_DIR, `world_kage_${vp.name}.png`),
      });

      // 6. World Vista: Wildflower Paper
      const wildflower = page.locator(".world-vista-scene").filter({ hasText: "Wildflower Paper" });
      await wildflower.scrollIntoViewIfNeeded();
      await page.waitForTimeout(600);
      await wildflower.screenshot({
        path: path.join(OUTPUT_DIR, `world_wildflower_${vp.name}.png`),
      });

      // 7. Area C: Final Resolution and CTA (#create)
      const finale = page.locator("#create");
      await finale.scrollIntoViewIfNeeded();
      await page.waitForTimeout(600);
      await finale.screenshot({
        path: path.join(OUTPUT_DIR, `finale_${vp.name}.png`),
      });
    });
  }

  test("Test interactive states on Discovered Objects (Desktop)", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("/", { waitUntil: "networkidle" });
    await page.waitForTimeout(1000);

    const moments = page.locator("#moments");
    await moments.scrollIntoViewIfNeeded();
    await page.waitForTimeout(600);

    // Open envelope
    const envBtn = moments.locator('button[aria-label="Folded velvet envelope with wax seal"]');
    await envBtn.click();
    await page.waitForTimeout(600);

    // Open whisper note
    const whisperBtn = moments.locator('button[aria-label="Origami folded secret whisper note"]');
    await whisperBtn.click();
    await page.waitForTimeout(600);

    // Open brass keepsake
    const brassBtn = moments.locator('button[aria-label="Heavy aged hammered brass talisman"]');
    await brassBtn.click();
    await page.waitForTimeout(600);

    await moments.screenshot({
      path: path.join(OUTPUT_DIR, "moments_interactive_revealed_desktop.png"),
    });

    // Verify all revealed contents are visible in the DOM
    await expect(page.locator("text=Close your eyes. Take a breath. I am right here with you.")).toBeVisible();
    await expect(page.locator("text=Where did we share our very first secret?")).toBeVisible();
    await expect(page.locator("text=Every morning with you is my favorite thing on earth.")).toBeVisible();
  });
});
