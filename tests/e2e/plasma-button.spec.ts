import { test, expect } from "@playwright/test";

test.describe("Valentine Plasma Visual Primitive (ThreeUI ShaderButtons)", () => {
  test("mounts the plasma showcase, verifies ThreeUI iframe sandbox, and handles click interaction", async ({
    page,
  }) => {
    await page.goto("/plasma");
    await expect(page.locator("h1")).toContainText("Valentine Plasma");

    // Primary button should exist with role="button"
    const plasmaBtn = page.locator("#test-valentine-plasma-btn");
    await expect(plasmaBtn).toBeVisible();
    await expect(plasmaBtn).toHaveAttribute("role", "button");
    await expect(plasmaBtn).toHaveAttribute("aria-label", "SURPRISE ME");

    // Click interaction should update counter
    await plasmaBtn.click();
    await expect(page.locator("#plasma-status-text")).toContainText("Activated at");

    // Verify ThreeUI iframe is mounted inside the button
    const iframe = plasmaBtn.locator('iframe[title="Aetheris Labs plasma button"]');
    await expect(iframe).toBeAttached();
    await expect(iframe).toHaveAttribute("sandbox", "allow-scripts");
  });

  test("supports keyboard activation with Enter and Space", async ({ page }) => {
    await page.goto("/plasma");
    const plasmaBtn = page.locator("#test-valentine-plasma-btn");

    // Focus the button
    await plasmaBtn.focus();
    await expect(plasmaBtn).toBeFocused();

    // Trigger with Enter
    await page.keyboard.press("Enter");
    await expect(page.locator("#plasma-status-text")).toContainText("Activated at");

    // Trigger with Space
    await page.keyboard.press("Space");
    await expect(page.locator("#plasma-status-text")).toContainText("Activated at");
  });

  test("supports theme switching across romantic palette presets", async ({ page }) => {
    await page.goto("/plasma");

    // Switch to Midnight Rose
    await page.getByRole("button", { name: "Midnight Rose" }).click();
    await expect(page.locator("#test-valentine-plasma-btn")).toHaveAttribute(
      "aria-label",
      "MIDNIGHTROSE"
    );

    // Switch to Cloud Nine
    await page.getByRole("button", { name: "Cloud Nine" }).click();
    await expect(page.locator("#test-valentine-plasma-btn")).toHaveAttribute(
      "aria-label",
      "CLOUDNINE"
    );

    // Switch to Stardust
    await page.getByRole("button", { name: "Stardust" }).click();
    await expect(page.locator("#test-valentine-plasma-btn")).toHaveAttribute(
      "aria-label",
      "STARDUST"
    );
  });

  test("integrates smoothly into /templates page as Surprise Me CTA", async ({ page }) => {
    await page.goto("/templates");

    const surpriseBtn = page.getByRole("button", { name: "SURPRISE ME" });
    await expect(surpriseBtn).toBeVisible();

    await surpriseBtn.click();
    // Should display match notification
    await expect(page.locator("text=Matched with")).toBeVisible();
  });

  test("verifies zero horizontal overflow across 360px and 390px mobile viewports", async ({
    page,
  }) => {
    for (const width of [360, 390]) {
      await page.setViewportSize({ width, height: 740 });
      await page.goto("/plasma");

      const hasOverflow = await page.evaluate(() => {
        return document.documentElement.scrollWidth > document.documentElement.clientWidth;
      });
      expect(hasOverflow, `Must have zero horizontal overflow at ${width}px`).toBe(false);
    }
  });

  test("supports prefers-reduced-motion without breaking", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/plasma");

    const plasmaBtn = page.locator("#test-valentine-plasma-btn");
    await expect(plasmaBtn).toBeVisible();
    await plasmaBtn.click();
    await expect(page.locator("#plasma-status-text")).toContainText("Activated at");
  });
});
