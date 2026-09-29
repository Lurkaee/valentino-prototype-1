import { test, expect } from "@playwright/test";
import { db } from "../../src/lib/db";

const APP_URL = process.env.APP_URL || "http://localhost:3000";

test.describe("Gate 2: Cloud Nine Celestial Experience Journey", () => {
  test.beforeEach(async () => {
    await db.experience.deleteMany({});
  });

  test("Complete E2E Journey: /templates -> Cloud Nine -> /create -> editor -> publish -> recipient experience", async ({
    page,
  }) => {
    // 1. Visit /templates showcase
    await page.goto(`${APP_URL}/templates`);
    const cloudNineHeading = page.getByRole("heading", { name: "Cloud Nine", exact: true });
    await expect(cloudNineHeading).toBeVisible();

    // 2. Click Customize Cloud Nine -> navigates to /create?template=cloud-nine
    const customizeBtn = page.getByRole("link", { name: /Customize Cloud Nine/i });
    await expect(customizeBtn).toBeVisible();
    await customizeBtn.click();

    // 3. /create automatically initializes Cloud Nine experience and redirects to /edit/[publicId]
    await page.waitForURL(/\/edit\/[a-zA-Z0-9_-]+/);
    const publicId = page.url().split("/edit/")[1].split("?")[0];

    // 4. In the editor, wait for initial draft load
    const saveStatusPill = page.locator('[data-testid="save-status-pill"]');
    await expect(saveStatusPill).toHaveAttribute("data-status", "saved", { timeout: 10000 });

    const partnerInput = page.locator('[data-testid="input-partner-name"]');
    await partnerInput.fill("Celeste");
    await partnerInput.blur();

    const messageInput = page.locator('[data-testid="input-message"]');
    await messageInput.fill("Every moment with you feels like floating high above the clouds.");
    await messageInput.blur();

    const senderInput = page.locator('[data-testid="input-sender-name"]');
    await senderInput.fill("Orion");
    await senderInput.blur();

    // Wait for auto-save debounce and saved status
    await expect(saveStatusPill).toHaveAttribute("data-status", "saved", { timeout: 10000 });

    // Click Publish Valentine
    const publishBtn = page.locator('[data-testid="publish-button"]');
    await expect(publishBtn).toBeVisible();
    await publishBtn.click();

    // Wait for the publish success modal with link
    const publishModal = page.locator('[data-testid="publish-success-modal"]');
    await expect(publishModal).toBeVisible({ timeout: 10000 });

    // 5. Navigate to recipient page /v/[publicId]
    await page.goto(`${APP_URL}/v/${publicId}`);

    const experienceContainer = page.locator('[data-testid="experience-container"]');
    await expect(experienceContainer).toBeVisible();

    // Verify recipient name in airy header
    const recipientHeader = page.locator('[data-testid="recipient-name"]');
    await expect(recipientHeader).toBeVisible();
    await expect(recipientHeader).toHaveText("Celeste");

    // Verify Cloud Nine pastel envelope & pearl wax seal
    const waxSealBtn = page.locator('[data-testid="wax-seal-button"]');
    await expect(waxSealBtn).toBeVisible();

    // Verify ambient soundtrack button
    const musicBtn = page.locator("#soundtrack-toggle");
    await expect(musicBtn).toBeVisible();

    // 6. Break wax seal -> reveal letter
    await waxSealBtn.click();

    const unsealedLetter = page.locator('[data-testid="unsealed-letter"]');
    await expect(unsealedLetter).toBeVisible();

    const letterMessage = page.locator('[data-testid="letter-message"]');
    await expect(letterMessage).toContainText("Every moment with you feels like floating high above the clouds.");

    const senderName = page.locator('[data-testid="sender-name"]');
    await expect(senderName).toHaveText("Orion");

    // 7. Signature Cloud Nine interaction: Release a Celestial Blessing
    const blessingBtn = page.locator("#celestial-wish-btn");
    await expect(blessingBtn).toBeVisible();
    await blessingBtn.click();

    // Verify blessing message appears
    const blessingMsg = page.locator("#celestial-wish-msg");
    await expect(blessingMsg).toBeVisible();
    await expect(blessingMsg).toContainText("May our love always soar higher than the clouds.");

    // 8. Closing Keepsake & Reseal
    await expect(page.getByText("Cloud Nine Keepsake")).toBeVisible();
    const resealBtn = page.locator('[data-testid="reseal-button"]');
    await expect(resealBtn).toBeVisible();
    await resealBtn.click();

    // Envelope reseals
    await expect(page.locator('[data-testid="wax-seal-button"]')).toBeVisible();
  });

  test("Mobile Responsiveness (360px & 390px): Zero horizontal overflow and clean letter scaling", async ({
    page,
    request,
  }) => {
    const createRes = await request.post(`${APP_URL}/api/experiences`, {
      headers: { origin: APP_URL, "content-type": "application/json" },
      data: { templateId: "cloud-nine", templateVersion: "v1" },
    });
    const { publicId } = await createRes.json();
    const cookieHeader = createRes.headers()["set-cookie"];

    await request.put(`${APP_URL}/api/experiences/${publicId}/draft`, {
      headers: {
        origin: APP_URL,
        "content-type": "application/json",
        cookie: cookieHeader,
      },
      data: {
        draftConfig: {
          partnerName: "Aria In The Sky",
          senderName: "Leo In The Stars",
          message: "A sweet celestial confession floating across distant pastel horizons.",
          signOff: "Eternally In The Clouds",
          accentTheme: "blush-sky",
          heroMediaId: "https://images.unsplash.com/photo-1518199266791-5375a83190b7",
        },
        baseRevision: 1,
      },
    });

    await request.post(`${APP_URL}/api/experiences/${publicId}/publish`, {
      headers: {
        origin: APP_URL,
        "content-type": "application/json",
        cookie: cookieHeader,
      },
      data: { expectedRevision: 2 },
    });

    for (const width of [360, 390]) {
      await page.setViewportSize({ width, height: 740 });
      await page.goto(`${APP_URL}/v/${publicId}`);

      const waxSealBtn = page.locator('[data-testid="wax-seal-button"]');
      await expect(waxSealBtn).toBeVisible();
      await waxSealBtn.click();

      const unsealedLetter = page.locator('[data-testid="unsealed-letter"]');
      await expect(unsealedLetter).toBeVisible();

      // Verify zero horizontal overflow
      const hasOverflow = await page.evaluate(() => {
        return document.documentElement.scrollWidth > document.documentElement.clientWidth;
      });
      expect(hasOverflow).toBe(false);
    }
  });

  test("No-media state: gracefully displays without image frame", async ({
    page,
    request,
  }) => {
    const createRes = await request.post(`${APP_URL}/api/experiences`, {
      headers: { origin: APP_URL, "content-type": "application/json" },
      data: { templateId: "cloud-nine", templateVersion: "v1" },
    });
    const { publicId } = await createRes.json();
    const cookieHeader = createRes.headers()["set-cookie"];

    await request.put(`${APP_URL}/api/experiences/${publicId}/draft`, {
      headers: {
        origin: APP_URL,
        "content-type": "application/json",
        cookie: cookieHeader,
      },
      data: {
        draftConfig: {
          partnerName: "No Media Partner",
          senderName: "No Media Sender",
          message: "Words light as air.",
          heroMediaId: null,
        },
        baseRevision: 1,
      },
    });

    await request.post(`${APP_URL}/api/experiences/${publicId}/publish`, {
      headers: {
        origin: APP_URL,
        "content-type": "application/json",
        cookie: cookieHeader,
      },
      data: { expectedRevision: 2 },
    });

    await page.goto(`${APP_URL}/v/${publicId}`);
    await page.locator('[data-testid="wax-seal-button"]').click();

    // Image frame should not exist
    await expect(page.locator("img")).toHaveCount(0);
    await expect(page.getByText("Our sweetest moment above the clouds")).not.toBeVisible();
  });
});
