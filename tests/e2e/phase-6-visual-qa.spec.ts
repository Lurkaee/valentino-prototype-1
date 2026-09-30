import { test, expect } from "@playwright/test";
import path from "path";
import fs from "fs";

const APP_URL = process.env.APP_URL || "http://localhost:3000";
const QA_DIR = "C:/Users/AYUSH/.gemini/antigravity-ide/brain/f19e21a1-b911-490d-bfe6-c2b8a1fe3235/visual_qa";

test.describe("Phase 6 UI/UX Renaissance Comprehensive Visual QA", () => {
  test.beforeAll(async () => {
    if (!fs.existsSync(QA_DIR)) {
      fs.mkdirSync(QA_DIR, { recursive: true });
    }
  });

  const viewports = [
    { name: "desktop-1440x900", width: 1440, height: 900 },
    { name: "desktop-1280x800", width: 1280, height: 800 },
    { name: "tablet-landscape-1024x768", width: 1024, height: 768 },
    { name: "tablet-portrait-768x1024", width: 768, height: 1024 },
    { name: "mobile-390x844", width: 390, height: 844 },
    { name: "mobile-360x800", width: 360, height: 800 },
  ];

  // 1. Homepage & Showroom across all required viewports
  for (const vp of viewports) {
    test(`Capture Homepage & Showroom at ${vp.name}`, async ({ page }) => {
      await page.setViewportSize({ width: vp.width, height: vp.height });
      await page.goto(`${APP_URL}/`, { waitUntil: "networkidle" });
      await page.waitForTimeout(600);

      // Verify no horizontal overflow
      const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
      const clientWidth = await page.evaluate(() => document.documentElement.clientWidth);
      expect(scrollWidth).toBeLessThanOrEqual(clientWidth + 2);

      // Homepage Hero
      await page.screenshot({
        path: path.join(QA_DIR, `01_homepage_hero_${vp.name}.png`),
        fullPage: false,
      });

      // Homepage Mid-Scroll (Personalize / Story & Moments)
      const midEl = page.locator("#personalize");
      if (await midEl.isVisible()) {
        await midEl.scrollIntoViewIfNeeded();
        await page.waitForTimeout(500);
        await page.screenshot({
          path: path.join(QA_DIR, `02_homepage_mid_scroll_${vp.name}.png`),
          fullPage: false,
        });
      }

      // World Showroom on Templates page
      await page.goto(`${APP_URL}/templates`, { waitUntil: "networkidle" });
      await page.waitForTimeout(600);
      await page.screenshot({
        path: path.join(QA_DIR, `03_world_showroom_${vp.name}.png`),
        fullPage: false,
      });
    });
  }

  // 2. Comprehensive Creator Flow & Studio Stages (Desktop 1440x900)
  test("Capture Creator Studio, Story, Moments, Mood, Preview & Mobile Modes", async ({ page }) => {
    // A. Create Flow
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto(`${APP_URL}/create?template=midnight-rose`);
    await page.screenshot({
      path: path.join(QA_DIR, "04_create_flow_immediate.png"),
      fullPage: false,
    });

    // Wait for redirect to /edit/[publicId]
    await page.waitForURL(/\/edit\/[A-Za-z0-9_-]+/, { timeout: 15000 });
    await page.waitForTimeout(1000);

    // B. Editor Shell
    await page.screenshot({
      path: path.join(QA_DIR, "05_editor_shell_desktop.png"),
      fullPage: false,
    });

    // C. Story Editor Section
    const storyTab = page.locator('button:has-text("Story")').first();
    if (await storyTab.isVisible()) {
      await storyTab.click();
      await page.waitForTimeout(500);
      await page.screenshot({
        path: path.join(QA_DIR, "06_story_editor.png"),
        fullPage: false,
      });
    }

    // D. Moments Editor Section
    const momentsTab = page.locator('button:has-text("Moments")').first();
    if (await momentsTab.isVisible()) {
      await momentsTab.click();
      await page.waitForTimeout(500);
      await page.screenshot({
        path: path.join(QA_DIR, "07_moments_editor.png"),
        fullPage: false,
      });
    }

    // E. Mood / Decor Editor Section
    const moodTab = page.locator('button:has-text("Mood & Decor")').first();
    if (await moodTab.isVisible()) {
      await moodTab.click();
      await page.waitForTimeout(500);
      await page.screenshot({
        path: path.join(QA_DIR, "08_mood_decor_editor.png"),
        fullPage: false,
      });
    }

    // F. Preview Mode (Focus mode)
    const focusBtn = page.locator('button[title*="Focus mode"], button:has-text("Focus Mode")').first();
    if (await focusBtn.isVisible()) {
      await focusBtn.click();
      await page.waitForTimeout(500);
      await page.screenshot({
        path: path.join(QA_DIR, "09_preview_mode_focus.png"),
        fullPage: false,
      });
      // Exit focus mode
      const exitFocus = page.locator('button:has-text("Exit Focus Mode")').first();
      if (await exitFocus.isVisible()) {
        await exitFocus.click();
        await page.waitForTimeout(300);
      }
    }

    // G. Mobile Editor Viewport (390x844)
    await page.setViewportSize({ width: 390, height: 844 });
    await page.waitForTimeout(500);
    await page.screenshot({
      path: path.join(QA_DIR, "10_mobile_editor_form.png"),
      fullPage: false,
    });

    // Switch to Mobile Live Preview Tab
    const previewTabMobile = page.locator('button:has-text("Live Preview")').first();
    if (await previewTabMobile.isVisible()) {
      await previewTabMobile.click();
      await page.waitForTimeout(500);
      await page.screenshot({
        path: path.join(QA_DIR, "11_mobile_editor_live_preview.png"),
        fullPage: false,
      });
    }
  });
});
