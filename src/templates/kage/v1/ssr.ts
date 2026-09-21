import { sanitizeText } from "@/lib/sanitize";
import { KagePublishedConfig } from "./schema";

export function renderKageSsrHtml(config: KagePublishedConfig): string {
  const partnerName = sanitizeText(config.partnerName || "Dearest");
  const greeting = sanitizeText(config.greeting || "Where stillness reveals the unseen");
  const message = sanitizeText(config.message || "In the quiet of the night, every thought of you is a light through the shadows.");
  const signOff = sanitizeText(config.signOff || "With all my heart");
  const senderName = sanitizeText(config.senderName || "Yours Always");

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>A Kyoto Sanctuary Valentine for ${partnerName} — Valentino</title>
  <meta name="robots" content="noindex, nofollow" />
  <meta property="og:title" content="A Valentine Experience" />
  <meta property="og:description" content="A tranquil Kyoto mountain sanctuary Valentine experience." />
  <meta property="og:type" content="website" />
  <link rel="icon" href="/favicon.ico" />
  <link rel="stylesheet" href="/landing-pages/secret-pathways-assets/fonts.css" />
  <style>
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    html, body {
      width: 100%;
      min-height: 100vh;
      overflow-x: hidden;
      background: #070B09;
      color: #DFE7E0;
      font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    }
    .wrapper {
      position: relative;
      min-height: 100vh;
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-between;
      padding: 2rem 1.5rem;
      background: radial-gradient(ellipse at 50% 15%, #121A15 0%, #070B09 70%, #030504 100%);
    }
    .badge {
      display: inline-block;
      padding: 0.35rem 1rem;
      border-radius: 9999px;
      font-size: 0.65rem;
      letter-spacing: 0.25em;
      text-transform: uppercase;
      color: #A3B8AA;
      background: rgba(16, 25, 20, 0.85);
      border: 1px solid rgba(16, 185, 129, 0.25);
      margin-bottom: 1rem;
    }
    h1 {
      font-family: Georgia, Cambria, 'Times New Roman', serif;
      font-size: 2.5rem;
      font-weight: 300;
      color: #FAF8F5;
      letter-spacing: 0.05em;
      margin-bottom: 2rem;
      text-align: center;
    }
    .card {
      max-width: 36rem;
      width: 100%;
      background: rgba(15, 23, 19, 0.9);
      border: 1px solid rgba(16, 185, 129, 0.2);
      border-radius: 1.25rem;
      padding: 2.5rem 2rem;
      box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.8);
      position: relative;
      margin-bottom: 2rem;
    }
    .gold-rim {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 2px;
      background: linear-gradient(to right, transparent, #E0231C, transparent);
    }
    .letter-message {
      font-family: Georgia, Cambria, 'Times New Roman', serif;
      font-size: 1.125rem;
      line-height: 1.75;
      color: #EDF3EF;
      font-weight: 300;
      white-space: pre-wrap;
      margin-bottom: 2rem;
    }
    .signoff {
      text-align: right;
      padding-top: 1.5rem;
      border-top: 1px solid rgba(16, 185, 129, 0.15);
    }
    .signoff-title {
      font-size: 0.7rem;
      letter-spacing: 0.2em;
      text-transform: uppercase;
      color: #88998D;
      margin-bottom: 0.25rem;
    }
    .signoff-sender {
      font-family: Georgia, Cambria, 'Times New Roman', serif;
      font-size: 1.75rem;
      color: #FAF8F5;
    }
    footer {
      font-size: 0.65rem;
      letter-spacing: 0.25em;
      text-transform: uppercase;
      color: rgba(136, 153, 141, 0.4);
      padding: 2rem 0 1rem;
      text-align: center;
    }
  </style>
</head>
<body>
  <div class="wrapper" data-testid="kage-container">
    <div style="text-align: center; width: 100%; margin: auto 0;">
      <span class="badge">${greeting}</span>
      <h1 data-testid="recipient-name">${partnerName}</h1>
      <div class="card">
        <div class="gold-rim"></div>
        <div class="letter-message" data-testid="letter-message">${message}</div>
        <div class="signoff">
          <p class="signoff-title">${signOff}</p>
          <p class="signoff-sender" data-testid="sender-name">${senderName}</p>
        </div>
      </div>
    </div>
    <footer>
      <span>VALENTINO</span> · <span>KAGE WORLD</span> · <span>KYOTO SANCTUARY</span>
    </footer>
  </div>
</body>
</html>`;
}
