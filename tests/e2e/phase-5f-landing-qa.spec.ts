import { test, expect } from "@playwright/test";
import path from "path";
import fs from "fs";

const APP_URL = process.env.APP_URL || "http://localhost:3000";
const QA_DIR = "C:/Users/AYUSH/.gemini/antigravity-ide/brain/5b3d85b7-f4f3-4d6f-88c9-6f46f38b3788/visual_qa";

test.describe("Phase 5F: Public Landing Page Renaissance Visual QA", () => {
  test.beforeAll(async () => {
    if (!fs.existsSync(QA_DIR)) {
      fs.mkdirSync(QA_DIR, { recursive: true });
    }
  });

  test("Capture Desktop 1440x900 continuous landing page journey", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto(`${APP_URL}/`, { waitUntil: "networkidle" });
    await page.waitForTimeout(1000);

    // 1. Hero: Pink Sunset Sky (01 - Enter Valentino)
    await page.screenshot({
      path: path.join(QA_DIR, "01_landing_desktop_hero.png"),
      fullPage: false,
    });

    // 2. Builder: Warm Cream Paper (05 - Make It Yours)
    const builderEl = page.locator("#build-your-valentine");
    await builderEl.scrollIntoViewIfNeeded();
    await page.waitForTimeout(600);
    await page.screenshot({
      path: path.join(QA_DIR, "02_landing_desktop_builder.png"),
      fullPage: false,
    });

    // 3. Story: Soft Peach Paper (03 - Build Their Story)
    const storyEl = page.locator("#how-it-works");
    await storyEl.scrollIntoViewIfNeeded();
    await page.waitForTimeout(600);
    await page.screenshot({
      path: path.join(QA_DIR, "03_landing_desktop_story.png"),
      fullPage: false,
    });

    // 4. Secrets: Romantic Berry Velvet (04 - Add Little Secrets)
    const secretsEl = page.locator("text=Add little secrets waiting to be discovered").first();
    await secretsEl.scrollIntoViewIfNeeded();
    await page.waitForTimeout(600);
    await page.screenshot({
      path: path.join(QA_DIR, "04_landing_desktop_secrets.png"),
      fullPage: false,
    });

    // 5. Worlds: 3 Living Worlds Showcase (02 - Choose Their World)
    const worldsEl = page.locator("#worlds");
    await worldsEl.scrollIntoViewIfNeeded();
    await page.waitForTimeout(600);
    await page.screenshot({
      path: path.join(QA_DIR, "05_landing_desktop_worlds.png"),
      fullPage: false,
    });

    // 6. Recipient Experience Preview
    const recipientEl = page.locator("text=You don't just send a page. They enter a world.").first();
    await recipientEl.scrollIntoViewIfNeeded();
    await page.waitForTimeout(600);
    await page.screenshot({
      path: path.join(QA_DIR, "06_landing_desktop_recipient_flow.png"),
      fullPage: false,
    });

    // 7. Finale & Privacy: Soft Cream Paper (07 - Seal & Send)
    const finaleEl = page.locator("text=Give them a little piece of the internet").first();
    await finaleEl.scrollIntoViewIfNeeded();
    await page.waitForTimeout(600);
    await page.screenshot({
      path: path.join(QA_DIR, "07_landing_desktop_finale.png"),
      fullPage: false,
    });
  });

  test("Capture Mobile 390x844 responsive landing page journey", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(`${APP_URL}/`, { waitUntil: "networkidle" });
    await page.waitForTimeout(1000);

    // Verify no horizontal overflow
    const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
    const clientWidth = await page.evaluate(() => document.documentElement.clientWidth);
    expect(scrollWidth).toBeLessThanOrEqual(clientWidth + 2);

    // 8. Mobile Hero
    await page.screenshot({
      path: path.join(QA_DIR, "08_landing_mobile_hero.png"),
      fullPage: false,
    });

    // 9. Mobile Builder
    const builderEl = page.locator("#build-your-valentine");
    await builderEl.scrollIntoViewIfNeeded();
    await page.waitForTimeout(600);
    await page.screenshot({
      path: path.join(QA_DIR, "09_landing_mobile_builder.png"),
      fullPage: false,
    });

    // 10. Mobile Story
    const storyEl = page.locator("#how-it-works");
    await storyEl.scrollIntoViewIfNeeded();
    await page.waitForTimeout(600);
    await page.screenshot({
      path: path.join(QA_DIR, "10_landing_mobile_story.png"),
      fullPage: false,
    });

    // 11. Mobile Secrets
    const secretsEl = page.locator("text=Add little secrets waiting to be discovered").first();
    await secretsEl.scrollIntoViewIfNeeded();
    await page.waitForTimeout(600);
    await page.screenshot({
      path: path.join(QA_DIR, "11_landing_mobile_secrets.png"),
      fullPage: false,
    });

    // 12. Mobile Finale
    const finaleEl = page.locator("text=Give them a little piece of the internet").first();
    await finaleEl.scrollIntoViewIfNeeded();
    await page.waitForTimeout(600);
    await page.screenshot({
      path: path.join(QA_DIR, "12_landing_mobile_finale.png"),
      fullPage: false,
    });
  });
});
