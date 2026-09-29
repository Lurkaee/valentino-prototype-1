import { test, expect } from "@playwright/test";
import { db } from "../../src/lib/db";

const APP_URL = process.env.APP_URL || "http://localhost:3000";

test.describe("Phase 5E: Cloud Nine Dimensional World & Atmosphere E2E", () => {
  test.beforeEach(async () => {
    await db.experience.deleteMany({});
  });

  test("Cloud Nine flagship dimensional entrance, 7-layer depth, and spatial letter sequence", async ({
    page,
    request,
  }) => {
    // 1. Create and publish a Cloud Nine experience
    const createRes = await request.post(`${APP_URL}/api/experiences`, {
      headers: { origin: APP_URL, "content-type": "application/json" },
      data: { templateId: "cloud-nine", templateVersion: "v1" },
    });
    expect(createRes.status()).toBe(201);
    const { publicId } = await createRes.json();
    const cookieHeader = createRes.headers()["set-cookie"];

    const draftRes = await request.put(`${APP_URL}/api/experiences/${publicId}/draft`, {
      headers: {
        origin: APP_URL,
        "content-type": "application/json",
        cookie: cookieHeader,
      },
      data: {
        draftConfig: {
          partnerName: "Aria",
          greeting: "To My Starlight",
          message: "You turned my entire world into a dreamy celestial haven.",
          senderName: "Leo",
          accentTheme: "blush-sky",
        },
        baseRevision: 1,
      },
    });
    expect(draftRes.status()).toBe(200);

    const publishRes = await request.post(`${APP_URL}/api/experiences/${publicId}/publish`, {
      headers: {
        origin: APP_URL,
        "content-type": "application/json",
        cookie: cookieHeader,
      },
      data: { expectedRevision: 2 },
    });
    expect(publishRes.status()).toBe(200);

    // 2. Recipient enters the dimensional experience
    await page.goto(`${APP_URL}/v/${publicId}`);

    // Verify dimensional world container and attributes
    const worldContainer = page.locator('[data-dimensional-world="cloud-nine"]');
    await expect(worldContainer).toBeVisible({ timeout: 10000 });
    await expect(worldContainer).toHaveAttribute("data-scene", "welcome");

    // Verify 7-layer depth hierarchy
    await expect(page.locator('[data-layer="0-deep-background"]')).toBeAttached();
    await expect(page.locator('[data-layer="1-distant-environment"]')).toBeAttached();
    await expect(page.locator('[data-layer="2-atmosphere"]')).toBeAttached();
    await expect(page.locator('[data-layer="4-primary-story"]')).toBeAttached();
    await expect(page.locator('[data-layer="5-foreground-wrap"]')).toBeAttached();

    // Verify recipient name appears in the world
    const recipientHeading = page.locator('[data-testid="recipient-name"]');
    await expect(recipientHeading).toBeVisible();
    await expect(recipientHeading).toHaveText("Aria");

    // Verify 3D resting envelope with tactile wax seal
    const sealBtn = page.locator('[data-testid="wax-seal-button"]');
    await expect(sealBtn).toBeVisible();

    // 3. Break seal -> letter unfolds into reading stage
    await sealBtn.click();

    const unsealedLetter = page.locator('[data-testid="unsealed-letter"]');
    await expect(unsealedLetter).toBeVisible();

    const message = page.locator('[data-testid="letter-message"]');
    await expect(message).toContainText("You turned my entire world into a dreamy celestial haven.");

    const sender = page.locator('[data-testid="sender-name"]');
    await expect(sender).toHaveText("Leo");

    // Reseal button affordance
    const resealBtn = page.locator('[data-testid="reseal-button"]');
    await expect(resealBtn).toBeVisible();
    await resealBtn.click();

    await expect(sealBtn).toBeVisible();
  });

  test("Mobile Responsiveness (360px & 390px): Zero horizontal overflow in dimensional world", async ({
    page,
    request,
  }) => {
    const createRes = await request.post(`${APP_URL}/api/experiences`, {
      headers: { origin: APP_URL, "content-type": "application/json" },
      data: { templateId: "cloud-nine", templateVersion: "v1" },
    });
    expect(createRes.status()).toBe(201);
    const { publicId } = await createRes.json();
    const cookieHeader = createRes.headers()["set-cookie"];

    const draftRes = await request.put(`${APP_URL}/api/experiences/${publicId}/draft`, {
      headers: {
        origin: APP_URL,
        "content-type": "application/json",
        cookie: cookieHeader,
      },
      data: {
        draftConfig: {
          partnerName: "Dearest Celeste of The Endless Starlight Sky",
          greeting: "To The Most Beautiful Soul Above All Clouds",
          message: "A heartfelt message testing mobile boundaries and atmospheric layers.",
          senderName: "Orion",
          accentTheme: "blush-sky",
        },
        baseRevision: 1,
      },
    });
    expect(draftRes.status()).toBe(200);

    const publishRes = await request.post(`${APP_URL}/api/experiences/${publicId}/publish`, {
      headers: {
        origin: APP_URL,
        "content-type": "application/json",
        cookie: cookieHeader,
      },
      data: { expectedRevision: 2 },
    });
    expect(publishRes.status()).toBe(200);

    for (const width of [360, 390]) {
      await page.setViewportSize({ width, height: 740 });
      await page.goto(`${APP_URL}/v/${publicId}`);

      const world = page.locator('[data-dimensional-world="cloud-nine"]');
      await expect(world).toBeVisible({ timeout: 10000 });

      // Verify zero horizontal scrolling/overflow
      const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
      const innerWidth = await page.evaluate(() => window.innerWidth);
      expect(scrollWidth).toBeLessThanOrEqual(innerWidth + 1);
    }
  });
});
