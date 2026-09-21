import { chromium } from "@playwright/test";
import path from "path";
import fs from "fs";

async function main() {
  const artifactDir = "C:\\Users\\AYUSH\\.gemini\\antigravity-ide\\brain\\e5eae4f4-e648-40a2-9962-cbe0c413455d";
  fs.mkdirSync(artifactDir, { recursive: true });

  const browser = await chromium.launch({
    channel: process.platform === "win32" ? "msedge" : undefined,
    headless: true,
  });

  // 1. Desktop 1280x800 Initial State
  const page = await browser.newPage({ viewport: { width: 1280, height: 850 } });
  await page.goto("http://localhost:3000/plasma");
  await page.waitForSelector("#test-valentine-plasma-btn");
  // Wait a moment for WebGL shader to render
  await page.waitForTimeout(1000);

  await page.screenshot({
    path: path.join(artifactDir, "plasma_desktop_initial.png"),
    fullPage: false,
  });
  console.log("Captured: plasma_desktop_initial.png");

  // 2. Desktop Button Hover State
  const btn = page.locator("#test-valentine-plasma-btn");
  await btn.hover();
  await page.waitForTimeout(400);
  await page.screenshot({
    path: path.join(artifactDir, "plasma_desktop_hover.png"),
    fullPage: false,
  });
  console.log("Captured: plasma_desktop_hover.png");

  // 3. Desktop Theme: Midnight Rose
  await page.getByRole("button", { name: "Midnight Rose" }).click();
  await page.waitForTimeout(500);
  await page.screenshot({
    path: path.join(artifactDir, "plasma_theme_midnight_rose.png"),
    fullPage: false,
  });
  console.log("Captured: plasma_theme_midnight_rose.png");

  // 4. Desktop Theme: Cloud Nine
  await page.getByRole("button", { name: "Cloud Nine" }).click();
  await page.waitForTimeout(500);
  await page.screenshot({
    path: path.join(artifactDir, "plasma_theme_cloud_nine.png"),
    fullPage: false,
  });
  console.log("Captured: plasma_theme_cloud_nine.png");

  // 5. Mobile 390x844 Viewport
  const mobilePage = await browser.newPage({ viewport: { width: 390, height: 844 } });
  await mobilePage.goto("http://localhost:3000/plasma");
  await mobilePage.waitForSelector("#test-valentine-plasma-btn");
  await mobilePage.waitForTimeout(1000);
  await mobilePage.screenshot({
    path: path.join(artifactDir, "plasma_mobile_390.png"),
    fullPage: false,
  });
  console.log("Captured: plasma_mobile_390.png");

  // 6. Mobile 360x640 Viewport
  const mobile360Page = await browser.newPage({ viewport: { width: 360, height: 640 } });
  await mobile360Page.goto("http://localhost:3000/plasma");
  await mobile360Page.waitForSelector("#test-valentine-plasma-btn");
  await mobile360Page.waitForTimeout(1000);
  await mobile360Page.screenshot({
    path: path.join(artifactDir, "plasma_mobile_360.png"),
    fullPage: false,
  });
  console.log("Captured: plasma_mobile_360.png");

  // 7. Templates page with Surprise Me CTA
  const templatesPage = await browser.newPage({ viewport: { width: 1280, height: 850 } });
  await templatesPage.goto("http://localhost:3000/templates");
  const surpriseBtn = templatesPage.getByRole("button", { name: "SURPRISE ME" });
  await surpriseBtn.waitFor({ state: "visible" });
  await surpriseBtn.click();
  await templatesPage.waitForTimeout(600);
  await templatesPage.screenshot({
    path: path.join(artifactDir, "templates_surprise_me.png"),
    fullPage: false,
  });
  console.log("Captured: templates_surprise_me.png");

  await browser.close();
  console.log("Visual QA capture completed successfully!");
}

main().catch((err) => {
  console.error("Error in capture:", err);
  process.exit(1);
});
