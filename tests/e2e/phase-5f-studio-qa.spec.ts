import { test, expect } from "@playwright/test";
import path from "path";

const APP_URL = process.env.APP_URL || "http://localhost:3000";
const QA_DIR = "C:/Users/AYUSH/.gemini/antigravity-ide/brain/5b3d85b7-f4f3-4d6f-88c9-6f46f38b3788/visual_qa";

test.describe("Phase 5F Step 5: Creator Studio Renaissance Visual QA & UX Architecture", () => {
  test("Desktop (1440x900): 7-Stage Creation Journey, Stage Stepper, Canvas, & QA Screenshots", async ({
    page,
    context,
    request,
  }) => {
    await page.setViewportSize({ width: 1440, height: 900 });

    // 1. Create an experience and transfer cookie
    const createRes = await request.post(`${APP_URL}/api/experiences`, {
      headers: { origin: APP_URL, "content-type": "application/json" },
      data: { templateId: "midnight-rose", templateVersion: "v1" },
    });
    expect(createRes.ok()).toBe(true);
    const { publicId } = await createRes.json();

    const storage = await request.storageState();
    await context.addCookies(storage.cookies);

    // 2. Open Creator Studio
    await page.goto(`${APP_URL}/edit/${publicId}`);

    // Verify Shell and Stage Stepper
    const stepper = page.locator('[data-testid="studio-stage-stepper"]');
    await expect(stepper).toBeVisible();
    await expect(page.locator('[data-testid="stage-tab-world"]')).toBeVisible();
    await expect(page.locator('[data-testid="stage-tab-story"]')).toBeVisible();
    await expect(page.locator('[data-testid="stage-tab-moments"]')).toBeVisible();
    await expect(page.locator('[data-testid="stage-tab-personalize"]')).toBeVisible();
    await expect(page.locator('[data-testid="stage-tab-mood"]')).toBeVisible();
    await expect(page.locator('[data-testid="stage-tab-preview"]')).toBeVisible();
    await expect(page.locator('[data-testid="stage-tab-send"]')).toBeVisible();

    // Verify Save Status Pill
    const savePill = page.locator('[data-testid="save-status-pill"]');
    await expect(savePill).toHaveAttribute("data-status", "saved", { timeout: 15000 });

    // Stage 01: World
    await expect(page.locator("#section-world")).toBeVisible();
    await expect(page.locator('[data-testid="change-world-trigger"]')).toContainText("Midnight Rose");

    // Capture Desktop Overview (World & Workspace)
    await page.screenshot({
      path: path.join(QA_DIR, "01_studio_desktop_overview.png"),
      fullPage: false,
    });

    // Stage 02: Story & Narrative Architecture
    await page.locator('[data-testid="stage-tab-story"]').click();
    await expect(page.locator("#section-story")).toBeVisible();
    const visualizer = page.locator('[data-testid="story-chapters-visualizer"]');
    await expect(visualizer).toBeVisible();
    await expect(page.locator('[data-testid="chapter-step-welcome"]')).toBeVisible();
    await expect(page.locator('[data-testid="chapter-step-finale"]')).toBeVisible();

    // Capture Desktop Story Chapters & Narrative Pacing
    await page.screenshot({
      path: path.join(QA_DIR, "02_studio_desktop_story_chapters.png"),
      fullPage: false,
    });

    // Stage 04: Personalization
    await page.locator('[data-testid="stage-tab-personalize"]').click();
    await expect(page.locator("#section-personalize")).toBeVisible();
    const partnerInput = page.locator('[data-testid="input-partner-name"]');
    await partnerInput.fill("Elena Rostova");
    await partnerInput.blur();

    const senderInput = page.locator('[data-testid="input-sender-name"]');
    await senderInput.fill("Alexander");
    await senderInput.blur();

    const messageInput = page.locator('[data-testid="input-message"]');
    await messageInput.fill("Every quiet heartbeat of mine whispers your name across worlds.");
    await messageInput.blur();

    // Stage 05: Mood & Physical Styling
    await page.locator('[data-testid="stage-tab-mood"]').click();
    await expect(page.locator("#section-mood")).toBeVisible();

    // Select Wildflower Preset
    const wildflowerBtn = page.locator('[data-testid="preset-option-wildflower"]');
    await expect(wildflowerBtn).toBeVisible();
    await wildflowerBtn.click();

    // Capture Desktop Mood & Decor Swatches
    await page.screenshot({
      path: path.join(QA_DIR, "03_studio_desktop_mood_decor.png"),
      fullPage: false,
    });

    // Stage 06: Preview Experience
    await page.locator('[data-testid="stage-tab-preview"]').click();
    await expect(page.locator("#section-preview")).toBeVisible();
    await expect(page.locator('[data-testid="experience-container"]')).toBeVisible();

    // Stage 07: Seal & Send
    await page.locator('[data-testid="stage-tab-send"]').click();
    await expect(page.locator("#section-send")).toBeVisible();
    await expect(page.locator('[data-testid="publish-button"]')).toBeVisible();
    await expect(page.locator('[data-testid="save-draft-button"]')).toBeVisible();

    // Verify autosave persisted all edits
    await expect(savePill).toHaveAttribute("data-status", "saved", { timeout: 10000 });
  });

  test("Tablet (1024x768): Studio Layout Adaptation, Live Canvas, & Stepper", async ({
    page,
    context,
    request,
  }) => {
    await page.setViewportSize({ width: 1024, height: 768 });

    const createRes = await request.post(`${APP_URL}/api/experiences`, {
      headers: { origin: APP_URL, "content-type": "application/json" },
      data: { templateId: "cloud-nine", templateVersion: "v1" },
    });
    expect(createRes.ok()).toBe(true);
    const { publicId } = await createRes.json();

    const storage = await request.storageState();
    await context.addCookies(storage.cookies);

    await page.goto(`${APP_URL}/edit/${publicId}`);

    // Verify stepper and canvas side-by-side
    await expect(page.locator('[data-testid="studio-stage-stepper"]')).toBeVisible();
    await expect(page.locator('[data-testid="experience-container"]')).toBeVisible();

    // Capture Tablet Screenshot
    await page.screenshot({
      path: path.join(QA_DIR, "04_studio_tablet_workspace.png"),
      fullPage: false,
    });
  });

  test("Mobile (390x844): Compact Navigation, Tab Toggle, Zero Horizontal Overflow", async ({
    page,
    context,
    request,
  }) => {
    await page.setViewportSize({ width: 390, height: 844 });

    const createRes = await request.post(`${APP_URL}/api/experiences`, {
      headers: { origin: APP_URL, "content-type": "application/json" },
      data: { templateId: "midnight-rose", templateVersion: "v1" },
    });
    expect(createRes.ok()).toBe(true);
    const { publicId } = await createRes.json();

    const storage = await request.storageState();
    await context.addCookies(storage.cookies);

    await page.goto(`${APP_URL}/edit/${publicId}`);

    // 1. Check zero horizontal overflow
    const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
    const clientWidth = await page.evaluate(() => document.documentElement.clientWidth);
    expect(scrollWidth).toBeLessThanOrEqual(clientWidth + 1);

    // 2. Compact Stage Stepper visible
    const stepper = page.locator('[data-testid="studio-stage-stepper"]');
    await expect(stepper).toBeVisible();

    // Capture Mobile Stepper & Form View
    await page.screenshot({
      path: path.join(QA_DIR, "05_studio_mobile_stepper.png"),
      fullPage: false,
    });

    // 3. Switch to Preview Canvas tab
    const mobilePreviewTab = page.locator('[data-testid="mobile-tab-preview"]');
    await expect(mobilePreviewTab).toBeVisible();
    await mobilePreviewTab.click();

    const previewContainer = page.locator('[data-testid="experience-container"]');
    await expect(previewContainer).toBeVisible();

    // Capture Mobile Preview Canvas
    await page.screenshot({
      path: path.join(QA_DIR, "06_studio_mobile_canvas.png"),
      fullPage: false,
    });

    // 4. Switch back to Edit tab
    const mobileEditTab = page.locator('[data-testid="mobile-tab-edit"]');
    await mobileEditTab.click();
    await expect(page.locator('[data-testid="input-partner-name"]')).toBeVisible();
  });
});
