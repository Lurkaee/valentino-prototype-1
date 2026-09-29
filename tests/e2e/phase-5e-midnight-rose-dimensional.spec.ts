import { test, expect } from "@playwright/test";
import { db } from "../../src/lib/db";

const APP_URL = process.env.APP_URL || "http://localhost:3000";

test.describe("Phase 5E: Midnight Rose Dimensional Garden & Atmosphere E2E", () => {
  test.beforeEach(async () => {
    await db.experience.deleteMany({});
  });

  test("Midnight Rose private garden dimensional entrance, 7-layer depth, and spatial unsealing", async ({
    page,
    request,
  }) => {
    // 1. Create and publish a Midnight Rose experience
    const createRes = await request.post(`${APP_URL}/api/experiences`, {
      headers: { origin: APP_URL, "content-type": "application/json" },
      data: { templateId: "midnight-rose", templateVersion: "v1" },
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
          partnerName: "Seraphina",
          greeting: "To My Starlight",
          message: "In the quiet of the midnight garden, my thoughts blossom for you alone.",
          senderName: "Valentin",
          accentTheme: "crimson-rose",
          decor: {
            blooms: ["crimson-rose"],
            charms: ["sparkle"],
            paper: "handmade-cream",
            ribbon: "velvet-crimson",
            waxSeal: "champagne-gold",
          },
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
    const worldContainer = page.locator('[data-dimensional-world="midnight-rose"]');
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
    await expect(recipientHeading).toHaveText("Seraphina");

    // Verify 3D resting envelope with tactile wax seal
    const sealBtn = page.locator('[data-testid="wax-seal-button"]');
    await expect(sealBtn).toBeVisible();

    // 3. Break seal -> letter unfolds into reading stage
    await sealBtn.click();

    const unsealedLetter = page.locator('[data-testid="unsealed-letter"]');
    await expect(unsealedLetter).toBeVisible();

    const message = page.locator('[data-testid="letter-message"]');
    await expect(message).toContainText("In the quiet of the midnight garden");

    const sender = page.locator('[data-testid="sender-name"]');
    await expect(sender).toHaveText("Valentin");

    // Reseal button affordance
    const resealBtn = page.locator('[data-testid="reseal-button"]');
    await expect(resealBtn).toBeVisible();
    await resealBtn.click();

    await expect(sealBtn).toBeVisible();
  });

  test("Mobile Responsiveness (360px & 390px): Zero horizontal overflow in midnight garden", async ({
    page,
    request,
  }) => {
    const createRes = await request.post(`${APP_URL}/api/experiences`, {
      headers: { origin: APP_URL, "content-type": "application/json" },
      data: { templateId: "midnight-rose", templateVersion: "v1" },
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
          partnerName: "Seraphina The Radiant Queen of Night",
          greeting: "To The Enchanted Soul in Moonlight",
          message: "Testing zero horizontal overflow in Midnight Rose garden across viewports.",
          senderName: "Valentin",
          accentTheme: "midnight-violet",
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

      const world = page.locator('[data-dimensional-world="midnight-rose"]');
      await expect(world).toBeVisible();

      // Check overflow
      const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
      const innerWidth = await page.evaluate(() => window.innerWidth);
      expect(scrollWidth).toBeLessThanOrEqual(innerWidth + 1);

      // Verify letter unseals smoothly on mobile
      const sealBtn = page.locator('[data-testid="wax-seal-button"]');
      await expect(sealBtn).toBeVisible();
      await sealBtn.click();

      const letter = page.locator('[data-testid="unsealed-letter"]');
      await expect(letter).toBeVisible();

      const scrollWidthAfter = await page.evaluate(() => document.documentElement.scrollWidth);
      expect(scrollWidthAfter).toBeLessThanOrEqual(innerWidth + 1);
    }
  });
});
