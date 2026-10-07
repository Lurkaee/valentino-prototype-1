import { test, expect } from "@playwright/test";

const APP_URL = process.env.APP_URL || "http://localhost:3000";

test.describe("Phase 6.7.2: Mobile Studio Ergonomics & Bottom Sheet Friction", () => {
  for (const device of [
    { name: "iPhone 14 (390x844)", width: 390, height: 844 },
    { name: "Android (360x800)", width: 360, height: 800 },
  ]) {
    test(`Mobile Studio full ergonomics journey on ${device.name}`, async ({ page, context, request }) => {
      // 1. Create a draft experience and set auth cookies
      const createRes = await request.post(`${APP_URL}/api/experiences`, {
        headers: {
          "Content-Type": "application/json",
          Origin: APP_URL,
        },
        data: {
          templateId: "midnight-rose",
          templateVersion: "v1",
        },
      });
      expect(createRes.ok()).toBeTruthy();
      const { publicId } = await createRes.json();

      const storage = await request.storageState();
      await context.addCookies(storage.cookies);

      // 2. Set mobile viewport
      await page.setViewportSize({ width: device.width, height: device.height });
      await page.goto(`${APP_URL}/edit/${publicId}`);

      // Verify save status pill is ready
      const savePill = page.locator('[data-testid="save-status-pill"]');
      await expect(savePill).toHaveAttribute("data-status", "saved", { timeout: 15000 });

      // Verify mobile workspace switcher is visible in lower thumb zone
      const switcher = page.locator('[data-testid="mobile-workspace-switcher"]');
      await expect(switcher).toBeVisible();

      const tabEdit = page.locator('[data-testid="mobile-tab-edit"]');
      const tabPreview = page.locator('[data-testid="mobile-tab-preview"]');
      await expect(tabEdit).toBeVisible();
      await expect(tabPreview).toBeVisible();

      const inspectorPane = page.locator("#studio-inspector-pane");
      const previewCanvas = page.locator('[data-testid="studio-preview-canvas"]');

      // Verify initial state: form active
      await expect(inspectorPane).toBeVisible();
      await expect(previewCanvas).toBeHidden();

      // Check 1: Switch editor <-> preview repeatedly
      await tabPreview.click();
      await expect(previewCanvas).toBeVisible();
      await expect(inspectorPane).toBeHidden();

      await tabEdit.click();
      await expect(inspectorPane).toBeVisible();
      await expect(previewCanvas).toBeHidden();

      // Check 2: Scroll editor, switch to preview, return to editor -> scroll position preserved
      await inspectorPane.evaluate((el) => {
        el.scrollTop = 280;
      });
      const initialScroll = await inspectorPane.evaluate((el) => el.scrollTop);
      expect(initialScroll).toBeGreaterThan(200);

      await tabPreview.click();
      await expect(previewCanvas).toBeVisible();

      await tabEdit.click();
      await expect(inspectorPane).toBeVisible();
      // Wait a tick for requestAnimationFrame scroll restoration
      await page.waitForTimeout(100);
      const restoredScroll = await inspectorPane.evaluate((el) => el.scrollTop);
      expect(Math.abs(restoredScroll - initialScroll)).toBeLessThan(15);

      // Navigate to Moments stage
      await page.locator('[data-testid="stage-tab-moments"]').click();

      // Check 3: Open Moments sheet via "+ Add a moment"
      const addMomentBtn = page.locator('[data-testid="add-moment-trigger"]');
      await addMomentBtn.scrollIntoViewIfNeeded();
      await addMomentBtn.click();

      const momentsSheet = page.locator('[data-testid="moment-library-overlay"]');
      await expect(momentsSheet).toBeVisible();

      // Check 4: Tap backdrop dismisses sheet
      await momentsSheet.click({ position: { x: 20, y: 50 } });
      await expect(momentsSheet).toBeHidden();

      // Check 5 & 6: Reopen and close via explicit close button
      await addMomentBtn.click();
      await expect(momentsSheet).toBeVisible();
      const closeBtn = page.locator('[data-testid="close-moment-library"]');
      await closeBtn.click();
      await expect(momentsSheet).toBeHidden();

      // Check 7 & 8: Reopen, scroll inside sheet, and add a moment
      await addMomentBtn.click();
      await expect(momentsSheet).toBeVisible();

      // Select Secret Note module (automatically enables and dismisses sheet)
      const secretNoteItem = page.locator('[data-testid="toggle-module-secret"]');
      await secretNoteItem.scrollIntoViewIfNeeded();
      await secretNoteItem.click();

      // Sheet closes upon selection
      await expect(momentsSheet).toBeHidden();

      // Verify moment is now active in "Your Moments"
      await expect(page.getByTestId("experience-module-manager").getByText("Secret Note", { exact: true })).toBeVisible();

      // Check 9: Remove or toggle moment
      const removeBtn = page.locator('button[title="Remove moment"]').first();
      await expect(removeBtn).toBeVisible();

      // Navigate to Personalize/Letter stage
      await page.locator('[data-testid="stage-tab-personalize"]').click();

      // Check 10: Open letter accordion in Stage 04
      const accordionToggle = page.locator("#accordion-toggle-salutation");
      await accordionToggle.scrollIntoViewIfNeeded();
      await expect(accordionToggle).toHaveAttribute("aria-expanded", "false");
      await accordionToggle.click();
      await expect(accordionToggle).toHaveAttribute("aria-expanded", "true");

      const greetingInput = page.locator('[data-testid="input-greeting"]');
      await expect(greetingInput).toBeVisible();

      // Check 11: Virtual keyboard focus hides floating switcher
      await greetingInput.focus();
      await page.waitForTimeout(50);
      const switcherClasses = await switcher.getAttribute("class");
      expect(switcherClasses).toContain("opacity-0");

      await greetingInput.blur();
      await page.waitForTimeout(50);
      const switcherRestoredClasses = await switcher.getAttribute("class");
      expect(switcherRestoredClasses).toContain("opacity-100");

      // Fill in necessary fields
      await page.locator('[data-testid="input-partner-name"]').fill("Alex");
      await page.locator('[data-testid="input-sender-name"]').fill("Jordan");
      await page.locator('[data-testid="input-message"]').fill("Every day with you is a quiet joy that makes the entire world soft and bright.");

      // Check 12: Save Draft
      const saveDraftBtn = page.locator('[data-testid="save-draft-button"]');
      await saveDraftBtn.scrollIntoViewIfNeeded();
      await saveDraftBtn.click();
      await expect(savePill).toHaveAttribute("data-status", "saved", { timeout: 15000 });

      // Check 13: Stage 06 reachability
      const stepperStage6 = page.locator('[data-testid="stage-tab-preview"]');
      await stepperStage6.click();

      // Check 14: Publish Valentine
      const publishBtn = page.locator('[data-testid="publish-button"]');
      await expect(publishBtn).toBeVisible();
      await publishBtn.click();

      const successModal = page.locator('[data-testid="publish-success-modal"]');
      await expect(successModal).toBeVisible({ timeout: 15000 });

      const closeSuccessBtn = page.locator('[data-testid="close-publish-modal-button"]');
      await closeSuccessBtn.click();
      await expect(successModal).toBeHidden();
    });
  }
});
