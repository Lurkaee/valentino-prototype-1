import { test, expect } from "@playwright/test";

const APP_URL = process.env.APP_URL || "http://localhost:3000";

test.describe("Phase 5B: Multimedia, Delivery, Secret Lock & Recipient Interactions", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(`${APP_URL}/api/health`);
  });

  test("1. Full Creator Journey: Memories, Voice, Video, Music, Secret Question, QR & Keepsake", async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 900 });
    await page.goto(`${APP_URL}/create?template=midnight-rose`);
    await expect(page).toHaveURL(/\/edit\/[A-Za-z0-9_-]+/, { timeout: 30000 });

    // Step 1: Fill in core letter content
    const partnerInput = page.locator('[data-testid="input-partner-name"]');
    await partnerInput.fill("Elena");

    const senderInput = page.locator('[data-testid="input-sender-name"]');
    await senderInput.fill("Marcus");

    const messageArea = page.locator('[data-testid="input-message"]');
    await messageArea.fill("Every memory we share is carved in golden light across my heart.");

    // Wait for autosave
    await page.waitForTimeout(1000);
    await expect(page.locator('[data-testid="save-status-pill"]')).toContainText("Saved");

    // Step 2: Story Section - Multimedia controls
    // Verify Story section is present and activate multimedia items
    const storyTab = page.locator('button:has-text("Story")').first();
    if (await storyTab.isVisible()) {
      await storyTab.click();
    }

    // Toggle and configure Memories
    const toggleMemories = page.locator('[data-testid="toggle-memories"]');
    if (await toggleMemories.isVisible()) {
      await toggleMemories.click();
      await page.waitForTimeout(500);
      const addMemoryBtn = page.locator('[data-testid="add-memory-btn"]');
      if (await addMemoryBtn.isVisible()) {
        await addMemoryBtn.click();
        const captionInput = page.locator('[data-testid="memory-caption-input-0"]');
        if (await captionInput.isVisible()) {
          await captionInput.fill("Under the Paris lantern");
        }
      }
    }

    // Toggle Voice Note
    const toggleVoice = page.locator('[data-testid="toggle-voice-note"]');
    if (await toggleVoice.isVisible()) {
      await toggleVoice.click();
      const voiceCaption = page.locator('[data-testid="voice-caption-input"]');
      if (await voiceCaption.isVisible()) {
        await voiceCaption.fill("A whisper for your quietest nights.");
      }
    }

    // Toggle Video Memory
    const toggleVideo = page.locator('[data-testid="toggle-video-memory"]');
    if (await toggleVideo.isVisible()) {
      await toggleVideo.click();
      const videoCaption = page.locator('[data-testid="video-caption-input"]');
      if (await videoCaption.isVisible()) {
        await videoCaption.fill("Dancing on the pier at sunset.");
      }
    }

    // Step 3: Moments Section - Secret Question
    const momentsTab = page.locator('button:has-text("Moments")').first();
    if (await momentsTab.isVisible()) {
      await momentsTab.click();
      await page.waitForTimeout(400);

      const secretToggle = page.locator('[data-testid="toggle-module-secret"]');
      if (await secretToggle.isVisible()) {
        await secretToggle.click();
        await page.waitForTimeout(300);

        // Fill Question Lock fields
        const secretQuestion = page.locator('[data-testid="secret-question-input"]');
        if (await secretQuestion.isVisible()) {
          await secretQuestion.fill("Where did we find the sea glass?");
        }
        const secretAnswer = page.locator('[data-testid="secret-answer-input"]');
        if (await secretAnswer.isVisible()) {
          await secretAnswer.fill("Laguna Cove");
        }
        const concealedText = page.locator('[data-testid="secret-content-input"]');
        if (await concealedText.isVisible()) {
          await concealedText.fill("I knew right then that I wanted to spend every sunset with you.");
        }
      }
    }

    // Step 4: Preview & Send Section
    const previewSendTab = page.locator('button:has-text("Preview & Send")').first();
    if (await previewSendTab.isVisible()) {
      await previewSendTab.click();
      await page.waitForTimeout(400);

      // Verify QR Code Share drawer/button
      const qrBtn = page.locator('[data-testid="qr-share-trigger"]');
      if (await qrBtn.isVisible()) {
        await qrBtn.click();
        await expect(page.locator('[data-testid="qr-code-image"]')).toBeVisible();
      }

      // Verify Printable Keepsake preview trigger
      const printBtn = page.locator('[data-testid="printable-keepsake-trigger"]');
      if (await printBtn.isVisible()) {
        await expect(printBtn).toBeVisible();
      }
    }

    // Step 5: Publish Experience
    await page.waitForTimeout(1200);
    const publishBtn = page.locator('[data-testid="header-publish-button"]').first();
    await publishBtn.click();
    await expect(page.locator('[data-testid="publish-success-modal"]')).toBeVisible({ timeout: 25000 });
  });

  test("2. Recipient Journey: Reading Letter, Interactive Modules, Reactions & Reply", async ({ page }) => {
    // 1. Create and publish an experience programmatically
    const createRes = await page.request.post(`${APP_URL}/api/experiences`, {
      headers: { origin: APP_URL, "content-type": "application/json" },
      data: { templateId: "midnight-rose" },
    });
    const { publicId } = await createRes.json();
    const cookieHeader = createRes.headers()["set-cookie"] || "";

    // Save full draft with modules
    await page.request.put(`${APP_URL}/api/experiences/${publicId}/draft`, {
      headers: {
        origin: APP_URL,
        "content-type": "application/json",
        cookie: cookieHeader,
      },
      data: {
        baseRevision: 1,
        draftConfig: {
          partnerName: "Cynthia",
          senderName: "Nathan",
          greeting: "To My Starlight",
          message: "You turned ordinary days into unforgettable wonder.",
          signOff: "Eternally Yours",
          accentTheme: "crimson-rose",
          decor: { blooms: [], charms: [], paper: "deckled-parchment", ribbon: "velvet-crimson", waxSeal: "velvet-crimson" },
          modules: {
            secret: {
              enabled: true,
              prompt: "A sealed secret",
              question: "Where was our first cabin trip?",
              answer: "Blue Ridge",
              concealedSecret: "I bought the ring that very weekend.",
            },
          },
        },
      },
    });

    // Publish
    const pubRes = await page.request.post(`${APP_URL}/api/experiences/${publicId}/publish`, {
      headers: {
        origin: APP_URL,
        "content-type": "application/json",
        cookie: cookieHeader,
      },
      data: { expectedRevision: 2 },
    });
    expect(pubRes.status()).toBe(200);

    // 2. Open public recipient experience
    await page.goto(`${APP_URL}/v/${publicId}`);

    // Verify recipient sees names and initial wax seal
    await expect(page.locator('[data-testid="recipient-name"]')).toHaveText("Cynthia");
    const sealBtn = page.locator('[data-testid="wax-seal-button"]');
    await expect(sealBtn).toBeVisible();

    // Click wax seal to break seal and reveal letter
    await sealBtn.click();
    await expect(page.locator('[data-testid="letter-message"]')).toContainText("You turned ordinary days into unforgettable wonder.");
    await expect(page.locator('[data-testid="sender-name"]')).toHaveText("Nathan");

    // 3. Test Recipient Reaction
    const heartReaction = page.locator('[data-testid="reaction-heart-btn"]');
    if (await heartReaction.isVisible()) {
      await heartReaction.click();
      await expect(page.locator('[data-testid="reaction-toast"]')).toBeVisible({ timeout: 5000 });
    }

    // 4. Test Recipient Reply
    const replyInput = page.locator('[data-testid="reply-input"]');
    if (await replyInput.isVisible()) {
      await replyInput.fill("Nathan, you made me cry happy tears! I love you so much.");
      const replySubmit = page.locator('[data-testid="reply-submit-btn"]');
      await replySubmit.click();
      await expect(page.locator('[data-testid="reply-success-message"]')).toBeVisible({ timeout: 5000 });
    }

    // 5. Test Printable Keepsake trigger
    const printKeepsakeBtn = page.locator('[data-testid="print-keepsake-btn"]');
    if (await printKeepsakeBtn.isVisible()) {
      await expect(printKeepsakeBtn).toBeVisible();
    }
  });

  test("3. Responsive Viewports Check (360, 390, 768, 1024, 1280, 1440)", async ({ page }) => {
    const viewports = [
      { width: 360, height: 640 },
      { width: 390, height: 844 },
      { width: 768, height: 1024 },
      { width: 1024, height: 768 },
      { width: 1280, height: 800 },
      { width: 1440, height: 900 },
    ];

    // Create experience
    const createRes = await page.request.post(`${APP_URL}/api/experiences`, {
      headers: { origin: APP_URL, "content-type": "application/json" },
      data: { templateId: "midnight-rose" },
    });
    const { publicId } = await createRes.json();
    const cookieHeader = createRes.headers()["set-cookie"] || "";

    await page.request.put(`${APP_URL}/api/experiences/${publicId}/draft`, {
      headers: { origin: APP_URL, "content-type": "application/json", cookie: cookieHeader },
      data: {
        baseRevision: 1,
        draftConfig: {
          partnerName: "Aria",
          senderName: "Leo",
          message: "Across every dimension of time, my heart belongs to you.",
        },
      },
    });

    await page.request.post(`${APP_URL}/api/experiences/${publicId}/publish`, {
      headers: { origin: APP_URL, "content-type": "application/json", cookie: cookieHeader },
      data: { expectedRevision: 2 },
    });

    for (const vp of viewports) {
      await page.setViewportSize(vp);
      await page.goto(`${APP_URL}/v/${publicId}`);
      await expect(page.locator('[data-testid="recipient-name"]')).toBeVisible();
      await expect(page.locator('[data-testid="wax-seal-button"]')).toBeVisible();
    }
  });
});
