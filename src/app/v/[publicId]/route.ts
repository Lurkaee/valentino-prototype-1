import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { ExperienceStatus } from "@prisma/client";
import { sanitizeText } from "@/lib/sanitize";

interface RouteParams {
  params: Promise<{ publicId: string }>;
}

const COMMON_HEADERS = {
  "Content-Type": "text/html; charset=utf-8",
  "Cache-Control": "no-store",
  "X-Robots-Tag": "noindex, nofollow",
  "X-Content-Type-Options": "nosniff",
};

function render404Html(): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Valentine Not Found — Valentino</title>
  <meta name="robots" content="noindex, nofollow" />
  <style>
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      background: #12030A;
      background-image: radial-gradient(ellipse at 50% 20%, #2A0815 0%, #12030A 75%, #080104 100%);
      color: #FAF8F5;
      font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      display: flex;
      align-items: center;
      justify-content: center;
      min-height: 100vh;
      text-align: center;
      padding: 1.5rem;
    }
    .card {
      max-width: 28rem;
      width: 100%;
      padding: 2.5rem 2rem;
      background: rgba(28, 5, 18, 0.85);
      border: 1px solid rgba(244, 114, 182, 0.15);
      border-radius: 1.5rem;
      box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.8);
      backdrop-filter: blur(16px);
      -webkit-backdrop-filter: blur(16px);
    }
    .icon { font-size: 2.5rem; margin-bottom: 1rem; }
    h1 {
      font-family: Georgia, Cambria, 'Times New Roman', serif;
      font-size: 1.5rem;
      margin-bottom: 0.75rem;
      font-weight: 500;
      color: #FFFFFF;
    }
    p {
      font-size: 0.875rem;
      color: #D5CEBF;
      margin-bottom: 1.75rem;
      line-height: 1.6;
      font-weight: 300;
    }
    a {
      display: inline-block;
      padding: 0.75rem 1.5rem;
      font-size: 0.75rem;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.08em;
      border-radius: 0.75rem;
      background: linear-gradient(to right, #E11D48, #BE123C);
      color: #FFFFFF;
      text-decoration: none;
      box-shadow: 0 10px 20px -5px rgba(225, 29, 72, 0.4);
      transition: opacity 0.2s;
    }
    a:hover { opacity: 0.9; }
  </style>
</head>
<body>
  <div class="card" data-testid="not-found-404-container">
    <div class="icon">🔍</div>
    <h1>Valentine Not Found</h1>
    <p>This Valentine link doesn't exist or has not been published yet.</p>
    <a href="/create">Create Your Own Valentine</a>
  </div>
</body>
</html>`;
}

function render410Html(): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Valentine Unavailable — Valentino</title>
  <meta name="robots" content="noindex, nofollow" />
  <style>
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      background: #12030A;
      background-image: radial-gradient(ellipse at 50% 20%, #2A0815 0%, #12030A 75%, #080104 100%);
      color: #FAF8F5;
      font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      display: flex;
      align-items: center;
      justify-content: center;
      min-height: 100vh;
      text-align: center;
      padding: 1.5rem;
    }
    .card {
      max-width: 28rem;
      width: 100%;
      padding: 2.5rem 2rem;
      background: rgba(28, 5, 18, 0.85);
      border: 1px solid rgba(244, 114, 182, 0.15);
      border-radius: 1.5rem;
      box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.8);
      backdrop-filter: blur(16px);
      -webkit-backdrop-filter: blur(16px);
    }
    .icon { font-size: 2.5rem; margin-bottom: 1rem; }
    h1 {
      font-family: Georgia, Cambria, 'Times New Roman', serif;
      font-size: 1.5rem;
      margin-bottom: 0.75rem;
      font-weight: 500;
      color: #FFFFFF;
    }
    p {
      font-size: 0.875rem;
      color: #D5CEBF;
      margin-bottom: 1.75rem;
      line-height: 1.6;
      font-weight: 300;
    }
    a {
      display: inline-block;
      padding: 0.75rem 1.5rem;
      font-size: 0.75rem;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.08em;
      border-radius: 0.75rem;
      background: linear-gradient(to right, #E11D48, #BE123C);
      color: #FFFFFF;
      text-decoration: none;
      box-shadow: 0 10px 20px -5px rgba(225, 29, 72, 0.4);
      transition: opacity 0.2s;
    }
    a:hover { opacity: 0.9; }
  </style>
</head>
<body>
  <div class="card" data-testid="gone-410-container">
    <div class="icon">🥀</div>
    <h1>This Experience is No Longer Available</h1>
    <p>The creator has removed or disabled this Valentine.</p>
    <a href="/create">Create Your Own Valentine</a>
  </div>
</body>
</html>`;
}

interface PublishedConfig {
  partnerName?: string;
  senderName?: string;
  greeting?: string;
  message?: string;
  signOff?: string;
  accentTheme?: string;
  heroMediaId?: string | null;
}

const ACCENTS: Record<
  string,
  {
    glow: string;
    sealBg: string;
    sealBorder: string;
    sealShadow: string;
    border: string;
    badge: string;
    accentText: string;
    paperAccent: string;
  }
> = {
  "crimson-rose": {
    glow: "radial-gradient(circle at center, rgba(225, 29, 72, 0.22) 0%, rgba(219, 39, 119, 0.1) 45%, transparent 70%)",
    sealBg: "linear-gradient(135deg, #E11D48 0%, #BE123C 60%, #881337 100%)",
    sealBorder: "#FB7185",
    sealShadow: "0 0 35px rgba(225, 29, 72, 0.4), 0 12px 24px rgba(0, 0, 0, 0.6)",
    border: "rgba(244, 63, 94, 0.25)",
    badge: "color: #FDA4AF; background: rgba(76, 5, 25, 0.6); border: 1px solid rgba(159, 18, 57, 0.5);",
    accentText: "#FDA4AF",
    paperAccent: "#9F1239",
  },
  "midnight-violet": {
    glow: "radial-gradient(circle at center, rgba(147, 51, 234, 0.22) 0%, rgba(79, 70, 229, 0.1) 45%, transparent 70%)",
    sealBg: "linear-gradient(135deg, #9333EA 0%, #7E22CE 60%, #581C87 100%)",
    sealBorder: "#C084FC",
    sealShadow: "0 0 35px rgba(147, 51, 234, 0.4), 0 12px 24px rgba(0, 0, 0, 0.6)",
    border: "rgba(168, 85, 247, 0.25)",
    badge: "color: #D8B4FE; background: rgba(59, 7, 100, 0.6); border: 1px solid rgba(107, 33, 168, 0.5);",
    accentText: "#D8B4FE",
    paperAccent: "#6B21A8",
  },
  "champagne-gold": {
    glow: "radial-gradient(circle at center, rgba(217, 119, 6, 0.22) 0%, rgba(202, 138, 4, 0.1) 45%, transparent 70%)",
    sealBg: "linear-gradient(135deg, #F59E0B 0%, #D97706 60%, #78350F 100%)",
    sealBorder: "#FBBF24",
    sealShadow: "0 0 35px rgba(217, 119, 6, 0.35), 0 12px 24px rgba(0, 0, 0, 0.6)",
    border: "rgba(245, 158, 11, 0.25)",
    badge: "color: #FDE68A; background: rgba(69, 26, 3, 0.6); border: 1px solid rgba(146, 64, 14, 0.5);",
    accentText: "#FDE68A",
    paperAccent: "#92400E",
  },
};

function renderPublicHtml(config: PublishedConfig): string {
  const theme = ACCENTS[config.accentTheme || "crimson-rose"] || ACCENTS["crimson-rose"];
  const greeting = sanitizeText(config.greeting || "To My Favorite Person");
  const partnerName = sanitizeText(config.partnerName || "Dearest");
  const message = sanitizeText(config.message || "My heart is fuller every day because of you.");
  const signOff = sanitizeText(config.signOff || "With all my love");
  const senderName = sanitizeText(config.senderName || "Yours Always");

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>A Valentine for ${partnerName} — Valentino</title>
  <meta name="robots" content="noindex, nofollow" />
  <meta property="og:title" content="A Valentine Experience" />
  <meta property="og:description" content="A personal, romantic Valentine experience." />
  <meta property="og:type" content="website" />
  <link rel="icon" href="/favicon.ico" />
  <style>
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    html, body {
      width: 100%;
      min-height: 100vh;
      overflow-x: hidden;
      background: #12030A;
      background-image: radial-gradient(ellipse at 50% 15%, #2A0815 0%, #12030A 70%, #080104 100%);
      color: #FAF8F5;
      font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    }
    .wrapper {
      position: relative;
      min-height: 100vh;
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 1.5rem 1rem;
      overflow-x: hidden;
    }
    .ambient-glow {
      position: absolute;
      inset: 0;
      background: ${theme.glow};
      pointer-events: none;
      opacity: 0.65;
    }
    .content-container {
      position: relative;
      z-index: 10;
      width: 100%;
      max-width: 32rem;
      margin: 0 auto;
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    .card {
      width: 100%;
      border-radius: 1.75rem;
      background: rgba(28, 5, 18, 0.88);
      backdrop-filter: blur(24px);
      -webkit-backdrop-filter: blur(24px);
      border: 1px solid ${theme.border};
      padding: 2.5rem 1.75rem;
      box-shadow: 0 30px 70px -15px rgba(0, 0, 0, 0.85), inset 0 1px 0 rgba(255, 255, 255, 0.08);
      transition: all 0.7s cubic-bezier(0.16, 1, 0.3, 1);
      overflow-wrap: anywhere;
      word-break: break-word;
    }
    @media (min-width: 640px) {
      .card { padding: 3rem 2.5rem; }
    }
    .header { text-align: center; margin-bottom: 2rem; }
    .badge {
      display: inline-block;
      font-size: 0.7rem;
      text-transform: uppercase;
      letter-spacing: 0.12em;
      padding: 0.3rem 0.85rem;
      border-radius: 9999px;
      margin-bottom: 1rem;
      ${theme.badge}
    }
    h1 {
      font-family: Georgia, Cambria, 'Times New Roman', serif;
      font-size: 2rem;
      font-weight: 500;
      color: #FFFFFF;
      letter-spacing: 0.02em;
      line-height: 1.25;
    }
    @media (min-width: 640px) {
      h1 { font-size: 2.5rem; }
    }
    .seal-box {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 3rem 1rem;
      text-align: center;
    }
    .seal-wrapper {
      position: relative;
    }
    .pulse-halo {
      position: absolute;
      inset: -0.75rem;
      border-radius: 9999px;
      background: rgba(225, 29, 72, 0.2);
      filter: blur(8px);
      animation: pulseHalo 3s infinite ease-in-out;
    }
    @keyframes pulseHalo {
      0%, 100% { opacity: 0.4; transform: scale(0.98); }
      50% { opacity: 0.8; transform: scale(1.05); }
    }
    .wax-seal {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 6.5rem;
      height: 6.5rem;
      min-width: 44px;
      min-height: 44px;
      border-radius: 9999px;
      border: 2px solid ${theme.sealBorder};
      background: ${theme.sealBg};
      box-shadow: ${theme.sealShadow};
      cursor: pointer;
      outline: none;
      transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
    }
    .wax-seal:hover { transform: scale(1.06); }
    .wax-seal:active { transform: scale(0.95); }
    .wax-seal-inner {
      width: 4.5rem;
      height: 4.5rem;
      border-radius: 9999px;
      border: 1px solid rgba(255, 255, 255, 0.2);
      display: flex;
      align-items: center;
      justify-content: center;
      background: rgba(0, 0, 0, 0.15);
      box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.4);
    }
    .wax-seal .emoji {
      font-size: 2.25rem;
      user-select: none;
      filter: drop-shadow(0 2px 4px rgba(0,0,0,0.4));
    }
    .seal-label {
      position: absolute;
      bottom: -2rem;
      left: 50%;
      transform: translateX(-50%);
      font-size: 0.75rem;
      color: #D5CEBF;
      text-transform: uppercase;
      letter-spacing: 0.1em;
      white-space: nowrap;
      font-family: system-ui, sans-serif;
      font-weight: 500;
    }
    .letter-box {
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
      color: #2C0D17;
      line-height: 1.8;
      font-size: 1.05rem;
    }
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(12px); }
      to { opacity: 1; transform: translateY(0); }
    }
    .animate-fadeIn {
      animation: fadeIn 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
    }
    .paper-card {
      position: relative;
      background: #FFFDF9;
      color: #2C0D17;
      border: 1px solid #F3E8DC;
      border-radius: 1.25rem;
      padding: 2rem 1.75rem;
      box-shadow: 0 15px 35px -10px rgba(0, 0, 0, 0.45);
      overflow: hidden;
    }
    @media (min-width: 640px) {
      .paper-card { padding: 2.5rem 2.25rem; }
    }
    .paper-gold-line {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 2px;
      background: linear-gradient(90deg, transparent, rgba(212, 175, 55, 0.6), transparent);
    }
    .message-card {
      white-space: pre-wrap;
      font-family: Georgia, Cambria, 'Times New Roman', serif;
      font-size: 1.125rem;
      line-height: 1.85;
      color: #2C0D17;
      font-weight: 400;
      position: relative;
      z-index: 2;
    }
    .signoff-box {
      text-align: right;
      padding-top: 1.5rem;
      margin-top: 1.5rem;
      border-top: 1px solid rgba(232, 220, 207, 0.85);
      position: relative;
      z-index: 2;
    }
    .signoff-label {
      font-size: 0.75rem;
      color: #8C5868;
      text-transform: uppercase;
      letter-spacing: 0.12em;
      margin-bottom: 0.35rem;
      font-family: system-ui, sans-serif;
    }
    .sender-title {
      font-family: Georgia, Cambria, 'Times New Roman', serif;
      font-size: 1.6rem;
      font-weight: 600;
      color: ${theme.paperAccent};
    }
    .hidden { display: none !important; }
    @media (prefers-reduced-motion: reduce) {
      *, *::before, *::after {
        animation-duration: 0.01ms !important;
        animation-iteration-count: 1 !important;
        transition-duration: 0.01ms !important;
        scroll-behavior: auto !important;
      }
      .pulse-halo { display: none; }
    }
  </style>
</head>
<body>
  <div class="wrapper" data-testid="experience-container">
    <div class="ambient-glow"></div>
    <div class="content-container">
      <div class="card">
        <div class="header">
          <span class="badge">${greeting}</span>
          <h1 data-testid="recipient-name">${partnerName}</h1>
        </div>

        <div class="seal-box" data-testid="seal-container">
          <div class="seal-wrapper">
            <div class="pulse-halo"></div>
            <button
              type="button"
              class="wax-seal"
              data-testid="wax-seal-button"
              aria-label="Break the wax seal to read letter"
            >
              <div class="wax-seal-inner">
                <span class="emoji">💌</span>
              </div>
              <span class="seal-label">Tap to open</span>
            </button>
          </div>
        </div>

        <div class="letter-box hidden" data-testid="unsealed-letter">
          <div class="paper-card">
            <div class="paper-gold-line"></div>
            <div class="message-card" data-testid="letter-message">${message}</div>
            <div class="signoff-box">
              <div class="signoff-label">${signOff}</div>
              <div class="sender-title" data-testid="sender-name">${senderName}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <script>
    (function() {
      function setup() {
        var sealBox = document.querySelector('[data-testid="seal-container"]');
        var letterBox = document.querySelector('[data-testid="unsealed-letter"]');
        var sealBtn = document.querySelector('[data-testid="wax-seal-button"]');
        if (!sealBox || !letterBox) return;

        function unseal() {
          sealBox.classList.add('hidden');
          letterBox.classList.remove('hidden');
          letterBox.classList.add('animate-fadeIn');
        }

        var mql = window.matchMedia('(prefers-reduced-motion: reduce)');
        if (mql.matches) {
          unseal();
        }
        mql.addEventListener('change', function(e) {
          if (e.matches) unseal();
        });

        if (sealBtn) {
          sealBtn.addEventListener('click', unseal);
        }
      }

      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', setup);
      } else {
        setup();
      }
    })();
  </script>
</body>
</html>`;
}

export async function GET(request: Request, { params }: RouteParams) {
  const { publicId } = await params;

  let experience;
  try {
    experience = await db.experience.findUnique({
      where: { publicId },
    });
  } catch (err) {
    console.error("Database lookup error in /v/[publicId]:", err);
    return new NextResponse(render404Html(), { status: 404, headers: COMMON_HEADERS });
  }

  // 1. Unknown experiences return real HTTP 404
  if (!experience) {
    return new NextResponse(render404Html(), { status: 404, headers: COMMON_HEADERS });
  }

  // 2. Disabled or Deleted experiences return real HTTP 410 Gone
  if (experience.status === ExperienceStatus.DISABLED || experience.status === ExperienceStatus.DELETED) {
    return new NextResponse(render410Html(), { status: 410, headers: COMMON_HEADERS });
  }

  // 3. Draft-only (unpublished) experiences return real HTTP 404
  if (experience.status === ExperienceStatus.DRAFT || !experience.publishedConfig) {
    return new NextResponse(render404Html(), { status: 404, headers: COMMON_HEADERS });
  }

  // 4. Published experience renders with real HTTP 200 OK
  if (experience.status === ExperienceStatus.PUBLISHED) {
    let config: PublishedConfig;
    try {
      config = JSON.parse(experience.publishedConfig);
    } catch {
      return new NextResponse(render404Html(), { status: 404, headers: COMMON_HEADERS });
    }

    return new NextResponse(renderPublicHtml(config), { status: 200, headers: COMMON_HEADERS });
  }

  return new NextResponse(render404Html(), { status: 404, headers: COMMON_HEADERS });
}
