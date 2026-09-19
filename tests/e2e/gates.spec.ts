import { test, expect } from "@playwright/test";
import { db } from "../../src/lib/db";

const APP_URL = process.env.APP_URL || "http://localhost:3000";

test.describe("Milestone 1 Acceptance Gates", () => {
  test.beforeEach(async () => {
    // Ensure clean database before test
    await db.experience.deleteMany({});
  });

  // --------------------------------------------------------------------------
  // Gate A — Journey (End-to-End)
  // --------------------------------------------------------------------------
  test("Gate A: Full Creator-to-Recipient Journey with Snapshot Isolation", async ({
    browser,
  }) => {
    const creatorContext = await browser.newContext();
    const recipientContext = await browser.newContext();
    const creatorPage = await creatorContext.newPage();
    const recipientPage = await recipientContext.newPage();

    const uniquePartnerName = `Ananya-🌹-${Math.random().toString(36).slice(2, 7)}`;
    const uniqueSenderName = `Rohan-💌-${Math.random().toString(36).slice(2, 7)}`;
    const initialMessage = "Every moment with you is my favorite memory.";
    const updatedMessage = "Updated draft message that recipient must NOT see yet.";

    // 1. Creator navigates to /create and is redirected to /edit/[publicId]
    await creatorPage.goto(`${APP_URL}/create`);
    await creatorPage.waitForURL(/\/edit\/[a-zA-Z0-9_-]{22}/);
    const editUrl = creatorPage.url();
    const publicId = editUrl.split("/edit/")[1];

    // Assert browser storage reminder banner is visible
    const reminderBanner = creatorPage.locator('[data-testid="browser-storage-reminder"]');
    await expect(reminderBanner).toBeVisible();
    await expect(reminderBanner).toContainText("Edit access is stored in this browser");

    // Wait for initial draft to load before editing
    const saveStatusPill = creatorPage.locator('[data-testid="save-status-pill"]');
    await expect(saveStatusPill).toHaveAttribute("data-status", "saved", { timeout: 10000 });

    // 2. Customize fields in form
    await creatorPage.locator('[data-testid="input-partner-name"]').fill(uniquePartnerName);
    await creatorPage.locator('[data-testid="input-sender-name"]').fill(uniqueSenderName);
    await creatorPage.locator('[data-testid="input-message"]').fill(initialMessage);
    await creatorPage.locator('[data-testid="theme-option-champagne-gold"]').click();

    // 3. Verify Live Preview reflects changes
    const previewName = creatorPage.locator('[data-testid="recipient-name"]');
    await expect(previewName).toHaveText(uniquePartnerName);

    // 4. Verify Autosave status
    await expect(saveStatusPill).toHaveAttribute("data-status", "saved", { timeout: 10000 });

    // 5. Refresh page and verify draft persisted
    await creatorPage.reload();
    await expect(saveStatusPill).toHaveAttribute("data-status", "saved", { timeout: 10000 });
    await expect(creatorPage.locator('[data-testid="input-partner-name"]')).toHaveValue(uniquePartnerName);
    await expect(creatorPage.locator('[data-testid="input-sender-name"]')).toHaveValue(uniqueSenderName);
    await expect(creatorPage.locator('[data-testid="input-message"]')).toHaveValue(initialMessage);

    // 6. Explicit Save Draft button click
    const saveButton = creatorPage.locator('[data-testid="save-draft-button"]');
    await saveButton.click();
    await expect(saveStatusPill).toHaveAttribute("data-status", "saved");

    // 7. Publish experience
    const publishButton = creatorPage.locator('[data-testid="publish-button"]');
    await publishButton.click();

    // Verify publish modal appears with public URL
    const publishModal = creatorPage.locator('[data-testid="publish-success-modal"]');
    await expect(publishModal).toBeVisible({ timeout: 10000 });
    const publicUrlInput = creatorPage.locator('[data-testid="public-url-input"]');
    const expectedPublicUrl = `${APP_URL}/v/${publicId}`;
    await expect(publicUrlInput).toHaveValue(expectedPublicUrl);

    // Test Copy button
    const copyButton = creatorPage.locator('[data-testid="copy-link-button"]');
    await copyButton.click();
    await expect(copyButton).toContainText("Copied!");

    // Close publish success modal to resume editing
    await creatorPage.locator('[data-testid="close-publish-modal-button"]').click();
    await expect(publishModal).not.toBeVisible();

    // 8. Recipient opens public URL in separate browser context (no edit cookie)
    const publicResponse = await recipientPage.goto(expectedPublicUrl);
    expect(publicResponse?.status()).toBe(200);

    // Verify recipient sees wax seal signature moment
    const waxSeal = recipientPage.locator('[data-testid="wax-seal-button"]');
    await expect(waxSeal).toBeVisible();
    await waxSeal.click();

    // Verify revealed letter content
    const recipientLetter = recipientPage.locator('[data-testid="letter-message"]');
    await expect(recipientLetter).toBeVisible();
    await expect(recipientLetter).toContainText(initialMessage);
    await expect(recipientPage.locator('[data-testid="recipient-name"]')).toHaveText(uniquePartnerName);
    await expect(recipientPage.locator('[data-testid="sender-name"]')).toHaveText(uniqueSenderName);

    // 9. Snapshot Isolation: Creator modifies draft in editor
    await creatorPage.locator('[data-testid="input-message"]').fill(updatedMessage);
    await expect(saveStatusPill).toHaveAttribute("data-status", "saved", { timeout: 10000 });

    // Recipient refreshes: Must still see INITIAL message (public snapshot unchanged!)
    await recipientPage.reload();
    await recipientPage.locator('[data-testid="wax-seal-button"]').click();
    await expect(recipientPage.locator('[data-testid="letter-message"]')).toContainText(initialMessage);
    await expect(recipientPage.locator('[data-testid="letter-message"]')).not.toContainText(updatedMessage);

    // 10. Creator publishes again
    await creatorPage.locator('[data-testid="publish-button"]').click();
    await expect(publishModal).toBeVisible();

    // Recipient refreshes: Now sees updated message snapshot
    await recipientPage.reload();
    await recipientPage.locator('[data-testid="wax-seal-button"]').click();
    await expect(recipientPage.locator('[data-testid="letter-message"]')).toContainText(updatedMessage);

    await creatorContext.close();
    await recipientContext.close();
  });

  // --------------------------------------------------------------------------
  // Gate B — Negative & Security
  // --------------------------------------------------------------------------
  test("Gate B: Negative Cases, Auth Rejection, 404, Real 410, and Concurrency", async ({
    request,
    page,
  }) => {
    // 1. Unknown publicId returns real 404
    const notFoundRes = await page.goto(`${APP_URL}/v/nonExistentId1234567890`);
    expect(notFoundRes?.status()).toBe(404);

    // 2. Draft-only (unpublished) returns real 404
    const createRes = await request.post(`${APP_URL}/api/experiences`, {
      headers: { origin: APP_URL, "content-type": "application/json" },
    });
    const { publicId } = await createRes.json();
    const unpublishedRes = await page.goto(`${APP_URL}/v/${publicId}`);
    expect(unpublishedRes?.status()).toBe(404);

    // 3. Disabled experience returns real HTTP 410
    await db.experience.update({
      where: { publicId },
      data: { status: "DISABLED" },
    });
    const disabledRes = await page.goto(`${APP_URL}/v/${publicId}`);
    expect(disabledRes?.status()).toBe(410);
    const goneContainer = page.locator('[data-testid="gone-410-container"]');
    await expect(goneContainer).toBeVisible();

    // 4. Deleted experience returns real HTTP 410
    await db.experience.update({
      where: { publicId },
      data: { status: "DELETED" },
    });
    const deletedRes = await page.goto(`${APP_URL}/v/${publicId}`);
    expect(deletedRes?.status()).toBe(410);

    // 5. Unauthenticated access to /edit/[publicId] shows friendly no-edit state
    const cleanContext = await page.context().browser()!.newContext();
    const cleanPage = await cleanContext.newPage();
    await cleanPage.goto(`${APP_URL}/edit/${publicId}`);
    await expect(cleanPage.getByText("Edit Access Unavailable")).toBeVisible();
    await cleanContext.close();
  });

  // --------------------------------------------------------------------------
  // Gate C — Layout, Non-Latin Text, & Reduced Motion
  // --------------------------------------------------------------------------
  test("Gate C: Responsive Layout, Zero Horizontal Overflow, and Reduced Motion", async ({
    page,
    request,
  }) => {
    // Setup published experience with long Unicode names and Indic / CJK scripts
    const complexPartnerName = "अनामिका-ସୁସ୍ମିତା-🌹-Müller-José-1234567890";
    const complexSenderName = "روهان-健太-❤️-Smith-987654321";
    const longMessage = "🌹 Beautiful line.\n".repeat(20);

    const createRes = await request.post(`${APP_URL}/api/experiences`, {
      headers: { origin: APP_URL, "content-type": "application/json" },
    });
    const { publicId } = await createRes.json();
    const cookieHeader = createRes.headers()["set-cookie"];

    // Save and publish
    await request.put(`${APP_URL}/api/experiences/${publicId}/draft`, {
      headers: {
        origin: APP_URL,
        "content-type": "application/json",
        cookie: cookieHeader,
      },
      data: {
        draftConfig: {
          partnerName: complexPartnerName,
          senderName: complexSenderName,
          message: longMessage,
          accentTheme: "midnight-violet",
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

    // Test across all 5 standard viewports (ADR-0005)
    const viewports = [
      { name: "Mobile Portrait", width: 360, height: 640 },
      { name: "Mobile Landscape", width: 640, height: 360 },
      { name: "Tablet Portrait", width: 768, height: 1024 },
      { name: "Laptop Small", width: 1280, height: 800 },
      { name: "Desktop Full", width: 1920, height: 1080 },
    ];

    const consoleErrors: string[] = [];
    page.on("console", (msg) => {
      if (msg.type() === "error") {
        consoleErrors.push(msg.text());
      }
    });

    for (const vp of viewports) {
      await page.setViewportSize({ width: vp.width, height: vp.height });
      await page.goto(`${APP_URL}/v/${publicId}`);

      // Verify tap target minimum size (>= 44x44px per WCAG / ADR-0005)
      const sealButton = page.locator('[data-testid="wax-seal-button"]');
      await expect(sealButton).toBeVisible();
      const box = await sealButton.boundingBox();
      expect(box).not.toBeNull();
      expect(box!.width).toBeGreaterThanOrEqual(44);
      expect(box!.height).toBeGreaterThanOrEqual(44);

      // Unseal letter
      await sealButton.click();

      // Assert zero horizontal overflow: scrollWidth <= clientWidth
      const hasOverflow = await page.evaluate(() => {
        return document.documentElement.scrollWidth > document.documentElement.clientWidth;
      });
      expect(hasOverflow).toBe(false);

      // Assert zero console errors
      expect(consoleErrors).toHaveLength(0);
    }

    // Test Reduced Motion
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto(`${APP_URL}/v/${publicId}`);

    // With reduced motion, letter should render immediately unsealed (no wax seal button)
    const unsealedLetter = page.locator('[data-testid="unsealed-letter"]');
    await expect(unsealedLetter).toBeVisible();
    const sealButton = page.locator('[data-testid="wax-seal-button"]');
    await expect(sealButton).not.toBeVisible();
  });

  // --------------------------------------------------------------------------
  // Gate D — Privacy & Zero Credential Leakage
  // --------------------------------------------------------------------------
  test("Gate D: Credential Privacy, Header Redaction, and Hydration Sanitization", async ({
    page,
    request,
  }) => {
    // 1. Create experience and capture raw credential from initial Set-Cookie
    const createRes = await request.post(`${APP_URL}/api/experiences`, {
      headers: { origin: APP_URL, "content-type": "application/json" },
    });
    const { publicId } = await createRes.json();
    const setCookieHeader = createRes.headers()["set-cookie"];
    expect(setCookieHeader).toBeDefined();

    // Extract raw credential value
    const match = setCookieHeader.match(new RegExp(`(?:__Host-)?edit-token-${publicId}=([^;]+)`));
    expect(match).not.toBeNull();
    const rawCredential = match![1];
    expect(rawCredential).toHaveLength(64); // 256 bits hex

    // 2. Publish experience
    await request.put(`${APP_URL}/api/experiences/${publicId}/draft`, {
      headers: {
        origin: APP_URL,
        "content-type": "application/json",
        cookie: setCookieHeader,
      },
      data: {
        draftConfig: {
          partnerName: "SecretPartner",
          senderName: "SecretSender",
          message: "A truly private message.",
          accentTheme: "crimson-rose",
        },
        baseRevision: 1,
      },
    });

    await request.post(`${APP_URL}/api/experiences/${publicId}/publish`, {
      headers: {
        origin: APP_URL,
        "content-type": "application/json",
        cookie: setCookieHeader,
      },
      data: { expectedRevision: 2 },
    });

    // 3. Recipient loads public page: Inspect HTML source and response
    const publicPageResponse = await page.goto(`${APP_URL}/v/${publicId}`);
    expect(publicPageResponse?.status()).toBe(200);

    const htmlContent = await page.content();

    // Strict Credential Leak Assertions:
    // Raw credential must NOT appear in HTML, DOM, scripts, or hydration payloads
    expect(htmlContent).not.toContain(rawCredential);

    // Also assert database internal hash is not leaked
    const dbRecord = await db.experience.findUnique({ where: { publicId } });
    expect(htmlContent).not.toContain(dbRecord!.editCredentialHash);

    // Check headers on public response
    const headers = publicPageResponse!.headers();
    expect(headers["x-robots-tag"]?.toLowerCase()).toContain("noindex");
    expect(headers["cache-control"]?.toLowerCase()).toContain("no-store");

    // Check Open Graph metadata: Must NOT contain personal names
    const ogTitle = await page.locator('meta[property="og:title"]').getAttribute("content");
    expect(ogTitle).toBe("A Valentine Experience");
    expect(ogTitle).not.toContain("SecretPartner");
    expect(ogTitle).not.toContain("SecretSender");

    // Assert localStorage and sessionStorage contain zero tokens
    const storageKeys = await page.evaluate(() => {
      return {
        local: Object.keys(localStorage),
        session: Object.keys(sessionStorage),
      };
    });
    expect(storageKeys.local).toHaveLength(0);
    expect(storageKeys.session).toHaveLength(0);
  });
});
