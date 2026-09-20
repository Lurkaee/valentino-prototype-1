import { test, expect } from "@playwright/test";

const APP_URL = process.env.APP_URL || "http://localhost:3000";

test.describe("M2 Template Discovery & Landing Page", () => {
  test("Landing page loads with cinematic hero and navigates to templates", async ({
    page,
  }) => {
    await page.goto(`${APP_URL}/`);
    await expect(page.locator("h1")).toContainText("Create something they'll remember");

    // Click Explore Templates
    await page.locator('a:has-text("Explore Templates")').click();
    await page.waitForURL("**/templates");
    expect(page.url()).toContain("/templates");

    // Verify Template Card is visible
    await expect(page.locator("h1")).toContainText("Choose Your Atmosphere");
    await expect(page.locator("h2:has-text('Midnight Rose')")).toBeVisible();

    // Verify interactive color palette switcher on template card
    const goldSwatch = page.locator('button:has-text("Gold")');
    await expect(goldSwatch).toBeVisible();
    await goldSwatch.click();

    // Verify Customize Midnight Rose button points to /create
    const customizeBtn = page.locator('a:has-text("Customize Midnight Rose")');
    await expect(customizeBtn).toBeVisible();
    await expect(customizeBtn).toHaveAttribute("href", "/create");
  });
});
