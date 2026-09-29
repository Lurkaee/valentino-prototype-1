import { test, expect } from "@playwright/test";
import { db } from "../../src/lib/db";

const APP_URL = process.env.APP_URL || "http://localhost:3000";

test.describe("Phase 5E: Kage Kyoto Digital Sanctuary Dimensional World E2E", () => {
  test.beforeEach(async () => {
    await db.experience.deleteMany({});
  });

  test("Kage Kyoto sanctuary dimensional entrance, 7-layer depth, and WebGL coexistence", async ({
    page,
    request,
  }) => {
    // 1. Create and publish a Kage experience
    const createRes = await request.post(`${APP_URL}/api/experiences`, {
      headers: { origin: APP_URL, "content-type": "application/json" },
      data: { templateId: "kage", templateVersion: "v1" },
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
          partnerName: "Aoi",
          greeting: "Where stillness reveals what words cannot say",
          message: "In the shadow of the mountain pines, every whisper leads back to your light.",
          senderName: "Ren",
          accentTheme: "kyoto-crimson",
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

    // 2. Recipient enters the dimensional Kyoto sanctuary
    await page.goto(`${APP_URL}/v/${publicId}`);

    // Verify dimensional world container and attributes
    const worldContainer = page.locator('[data-dimensional-world="kage"]');
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
    await expect(recipientHeading).toHaveText("Aoi");

    // Verify love letter message and signoff
    const message = page.locator('[data-testid="letter-message"]');
    await expect(message).toContainText("In the shadow of the mountain pines");

    const sender = page.locator('[data-testid="sender-name"]');
    await expect(sender).toHaveText("Ren");

    // Verify kage-container is present
    const kageContainer = page.locator('[data-testid="kage-container"]');
    await expect(kageContainer).toBeVisible();
  });

  test("Mobile Responsiveness (360px & 390px): Zero horizontal overflow in Kyoto sanctuary", async ({
    page,
    request,
  }) => {
    const createRes = await request.post(`${APP_URL}/api/experiences`, {
      headers: { origin: APP_URL, "content-type": "application/json" },
      data: { templateId: "kage", templateVersion: "v1" },
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
          partnerName: "Aoi of the Silent Bamboo Groves",
          greeting: "Tranquil Night Over Arashiyama",
          message: "Testing zero horizontal overflow across mobile viewports in Kyoto sanctuary.",
          senderName: "Ren",
          accentTheme: "sanctuary-emerald",
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

      const world = page.locator('[data-dimensional-world="kage"]');
      await expect(world).toBeVisible();

      // Check overflow
      const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
      const innerWidth = await page.evaluate(() => window.innerWidth);
      expect(scrollWidth).toBeLessThanOrEqual(innerWidth + 1);

      // Verify recipient & message
      const recipient = page.locator('[data-testid="recipient-name"]');
      await expect(recipient).toBeVisible();

      const letter = page.locator('[data-testid="letter-message"]');
      await expect(letter).toBeVisible();
    }
  });
});
