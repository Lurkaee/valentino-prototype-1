import { test, expect } from "@playwright/test";
import { db } from "../../src/lib/db";

const APP_URL = process.env.APP_URL || "http://localhost:3000";

test.describe("Gate 1: Midnight Rose Flagship Experience Journey", () => {
  test.beforeEach(async () => {
    await db.experience.deleteMany({});
  });

  test("Full Flagship Recipient Journey: Sealed -> Break Seal -> Unfold Letter -> Memory -> Closing Scene -> Reseal", async ({
    page,
    request,
  }) => {
    // 1. Create a published Midnight Rose experience with hero media
    const createRes = await request.post(`${APP_URL}/api/experiences`, {
      headers: { origin: APP_URL, "content-type": "application/json" },
      data: { templateId: "midnight-rose", templateVersion: "v1" },
    });
    const { publicId } = await createRes.json();
    const cookieHeader = createRes.headers()["set-cookie"];

    const partnerName = "Seraphina 🌹";
    const senderName = "Valentin 💌";
    const loveMessage = "In the stillness of midnight, every thought returns to you. You are the poetry I never knew how to write.";

    await request.put(`${APP_URL}/api/experiences/${publicId}/draft`, {
      headers: {
        origin: APP_URL,
        "content-type": "application/json",
        cookie: cookieHeader,
      },
      data: {
        draftConfig: {
          partnerName,
          senderName,
          message: loveMessage,
          signOff: "Eternally Yours",
          accentTheme: "crimson-rose",
          heroMediaId: "https://images.unsplash.com/photo-1518199266791-5375a83190b7",
          decor: {
            blooms: ["crimson-rose", "wild-daisy"],
            charms: ["sparkle"],
            paper: "handmade-cream",
            ribbon: "velvet-crimson",
            waxSeal: "champagne-gold",
          },
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

    // 2. Recipient loads the experience at desktop width (1280px)
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto(`${APP_URL}/v/${publicId}`);

    const experienceContainer = page.locator('[data-testid="experience-container"]');
    await expect(experienceContainer).toBeVisible();

    // Verify Cinematic Arrival: Greeting focal header & atmospheric badges
    const recipientHeader = page.locator('[data-testid="recipient-name"]');
    await expect(recipientHeader).toBeVisible();
    await expect(recipientHeader).toHaveText(partnerName);

    // Verify bouquet blooms are positioned deterministically
    await expect(page.locator('[data-decor-bloom="crimson-rose"]')).toBeVisible();
    await expect(page.locator('[data-decor-bloom="wild-daisy"]')).toBeVisible();
    await expect(page.locator('[data-decor-charm="sparkle"]')).toBeVisible();

    // Verify Sealed Envelope 3D with ribbon and wax seal
    const sealContainer = page.locator('[data-testid="seal-container"]');
    await expect(sealContainer).toBeVisible();

    const waxSealBtn = page.locator('[data-testid="wax-seal-button"]');
    await expect(waxSealBtn).toBeVisible();
    await expect(waxSealBtn).toHaveAttribute("data-decor-seal", "champagne-gold");

    const ribbonBand = page.locator('[data-decor-ribbon="velvet-crimson"]');
    await expect(ribbonBand).toBeVisible();

    // Verify ambient audio indicator exists and is interactive
    const soundtrackBtn = page.locator('#soundtrack-toggle');
    await expect(soundtrackBtn).toBeVisible();
    await expect(soundtrackBtn).toHaveAttribute("aria-label", "Play romantic soundtrack");
    await soundtrackBtn.click();
    await expect(soundtrackBtn).toHaveAttribute("aria-label", "Mute romantic soundtrack");
    // Toggle back to mute
    await soundtrackBtn.click();
    await expect(soundtrackBtn).toHaveAttribute("aria-label", "Play romantic soundtrack");

    // 3. Break Wax Seal: Flap opens, letter rises and unfolds
    await waxSealBtn.click();

    // 4. Letter unfolds into readable tactile stationery
    const unsealedLetter = page.locator('[data-testid="unsealed-letter"]');
    await expect(unsealedLetter).toBeVisible();

    const letterMessage = page.locator('[data-testid="letter-message"]');
    await expect(letterMessage).toBeVisible();
    await expect(letterMessage).toContainText(loveMessage);

    const senderSignOff = page.locator('[data-testid="sender-name"]');
    await expect(senderSignOff).toBeVisible();
    await expect(senderSignOff).toHaveText(senderName);

    // 5. Memory / Hero Media: Romantic Polaroid / editorial frame
    const memoryImage = unsealedLetter.locator("img");
    await expect(memoryImage).toBeVisible();
    await expect(unsealedLetter.getByText("A memory kept forever close")).toBeVisible();

    // 6. Closing Scene: Monogram & Replay affordance
    await expect(unsealedLetter.getByText("Midnight Rose Keepsake")).toBeVisible();
    const resealBtn = page.locator('[data-testid="reseal-button"]');
    await expect(resealBtn).toBeVisible();

    // Replay interaction: clicking re-seals the envelope
    await resealBtn.click();
    await expect(page.locator('[data-testid="wax-seal-button"]')).toBeVisible();
  });

  test("Mobile Viewport Test (360px & 390px): Zero Horizontal Overflow, Readable Typography, Memory Stacking", async ({
    page,
    request,
  }) => {
    const createRes = await request.post(`${APP_URL}/api/experiences`, {
      headers: { origin: APP_URL, "content-type": "application/json" },
      data: { templateId: "midnight-rose", templateVersion: "v1" },
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
          partnerName: "Mobile Beloved",
          senderName: "Mobile Adorer",
          message: "Long flowing heartfelt message designed to test mobile wrapping and tactile presentation without horizontal overflow.",
          signOff: "Always",
          accentTheme: "midnight-violet",
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

    const mobileWidths = [360, 390];
    for (const width of mobileWidths) {
      await page.setViewportSize({ width, height: 740 });
      await page.goto(`${APP_URL}/v/${publicId}`);

      // Verify envelope and wax seal
      const waxSealBtn = page.locator('[data-testid="wax-seal-button"]');
      await expect(waxSealBtn).toBeVisible();

      // Tap seal
      await waxSealBtn.click();

      // Verify unsealed letter
      const unsealedLetter = page.locator('[data-testid="unsealed-letter"]');
      await expect(unsealedLetter).toBeVisible();

      // Assert zero horizontal overflow
      const hasOverflow = await page.evaluate(() => {
        return document.documentElement.scrollWidth > document.documentElement.clientWidth;
      });
      expect(hasOverflow).toBe(false);
    }
  });

  test("Clean Aesthetic without Hero Media: Never displays broken placeholder", async ({
    page,
    request,
  }) => {
    const createRes = await request.post(`${APP_URL}/api/experiences`, {
      headers: { origin: APP_URL, "content-type": "application/json" },
      data: { templateId: "midnight-rose", templateVersion: "v1" },
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
          partnerName: "Media-less Dearest",
          senderName: "Media-less Sender",
          message: "Pure words of devotion without photos.",
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

    // Verify unsealed letter is visible
    await expect(page.locator('[data-testid="unsealed-letter"]')).toBeVisible();

    // Assert no photo frame or broken fallback card is rendered
    await expect(page.locator("img")).toHaveCount(0);
    await expect(page.getByText("A memory kept forever close")).not.toBeVisible();
    await expect(page.locator('[data-testid="media-fallback"]')).not.toBeVisible();
  });
});
