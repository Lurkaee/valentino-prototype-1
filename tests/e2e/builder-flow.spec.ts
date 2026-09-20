import { test, expect } from "@playwright/test";
import { db } from "../../src/lib/db";

const APP_URL = process.env.APP_URL || "http://localhost:3000";

test.describe("Build Your Valentine composition flow", () => {
  test.beforeEach(async () => {
    await db.experience.deleteMany({});
  });

  test("carries selected decoration from landing to editor and public recipient delivery", async ({ page, browser }) => {
    await page.goto(APP_URL);

    await page.locator('[data-testid="builder-bloom-wildflower"]').click();
    await page.locator('[data-testid="builder-charm-sparkle"]').click();
    await page.locator('[data-testid="builder-paper-petal-blush"]').click();
    await page.locator('[data-testid="builder-ribbon-satin-rose"]').click();
    await page.locator('[data-testid="builder-wax-seal-rose-quartz"]').click();

    const builderPreview = page.locator('[data-testid="decor-composition"]').first();
    await expect(builderPreview).toHaveAttribute("data-decor-blooms", "wildflower");
    await expect(builderPreview).toHaveAttribute("data-decor-paper", "petal-blush");
    await expect(builderPreview).toHaveAttribute("data-decor-ribbon", "satin-rose");
    await expect(builderPreview).toHaveAttribute("data-decor-wax-seal", "rose-quartz");

    await page.locator('[data-testid="create-this-valentine"]').click();
    await page.waitForURL(/\/edit\/[a-zA-Z0-9_-]{22}/);

    const editor = page;
    await expect(editor.locator('[data-testid="save-status-pill"]')).toHaveAttribute("data-status", "saved", { timeout: 10000 });
    await expect(editor.locator('[data-testid="editor-bloom-wildflower"]')).toHaveAttribute("aria-pressed", "true");
    await expect(editor.locator('[data-testid="editor-paper-petal-blush"]')).toHaveAttribute("aria-pressed", "true");
    await expect(editor.locator('[data-testid="editor-ribbon-satin-rose"]')).toHaveAttribute("aria-pressed", "true");
    await expect(editor.locator('[data-testid="editor-wax-seal-rose-quartz"]')).toHaveAttribute("aria-pressed", "true");

    const livePreview = editor.locator('[data-testid="decor-composition"]').last();
    await expect(livePreview).toHaveAttribute("data-decor-blooms", "wildflower");
    await expect(livePreview).toHaveAttribute("data-decor-paper", "petal-blush");

    await editor.locator('[data-testid="editor-paper-soft-lavender"]').click();
    await expect(editor.locator('[data-testid="decor-composition"]').last()).toHaveAttribute("data-decor-paper", "soft-lavender");
    await expect(editor.locator('[data-testid="save-status-pill"]')).toHaveAttribute("data-status", "saved", { timeout: 10000 });

    const publicId = editor.url().split("/edit/")[1];
    await editor.locator('[data-testid="input-partner-name"]').fill("Ananya");
    await editor.locator('[data-testid="input-sender-name"]').fill("Rohan");
    await editor.locator('[data-testid="input-message"]').fill("Every little detail was chosen for you.");
    await editor.locator('[data-testid="publish-button"]').click();

    await expect(editor.locator('[data-testid="publish-success-modal"]')).toBeVisible({ timeout: 10000 });
    const publicUrl = `${APP_URL}/v/${publicId}`;

    const recipientContext = await browser.newContext();
    const recipient = await recipientContext.newPage();
    const response = await recipient.goto(publicUrl);
    expect(response?.status()).toBe(200);

    await expect(recipient.locator('[data-testid="experience-container"]')).toHaveAttribute("data-decor-blooms", "wildflower");
    await expect(recipient.locator('[data-testid="experience-container"]')).toHaveAttribute("data-decor-paper", "soft-lavender");
    await expect(recipient.locator('[data-testid="experience-container"]')).toHaveAttribute("data-decor-ribbon", "satin-rose");
    await expect(recipient.locator('[data-testid="experience-container"]')).toHaveAttribute("data-decor-wax-seal", "rose-quartz");
    await expect(recipient.locator('[data-testid="composition-bloom-top-left"]')).toBeVisible();

    await recipient.locator('[data-testid="wax-seal-button"]').click();
    await expect(recipient.locator('[data-testid="letter-message"]')).toContainText("Every little detail was chosen for you.");

    await recipientContext.close();
  });
});
