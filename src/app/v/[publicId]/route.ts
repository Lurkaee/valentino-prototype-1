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
  <title>Valentine Not Found</title>
  <meta name="robots" content="noindex, nofollow" />
  <style>
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    body { background: #0B0B12; color: #F8FAFC; font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; display: flex; align-items: center; justify-content: center; min-height: 100vh; text-align: center; padding: 1.5rem; }
    .card { max-width: 28rem; width: 100%; padding: 2rem; background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.1); border-radius: 1rem; box-shadow: 0 25px 50px -12px rgba(0,0,0,0.5); }
    .icon { font-size: 2.5rem; margin-bottom: 1rem; }
    h1 { font-size: 1.25rem; margin-bottom: 0.5rem; font-weight: 500; }
    p { font-size: 0.875rem; color: #94A3B8; margin-bottom: 1.5rem; line-height: 1.5; }
    a { display: inline-block; padding: 0.625rem 1.25rem; font-size: 0.75rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; border-radius: 0.75rem; background: #E11D48; color: #FFFFFF; text-decoration: none; }
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
  <title>Valentine Unavailable</title>
  <meta name="robots" content="noindex, nofollow" />
  <style>
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    body { background: #0B0B12; color: #F8FAFC; font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; display: flex; align-items: center; justify-content: center; min-height: 100vh; text-align: center; padding: 1.5rem; }
    .card { max-width: 28rem; width: 100%; padding: 2rem; background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.1); border-radius: 1rem; box-shadow: 0 25px 50px -12px rgba(0,0,0,0.5); }
    .icon { font-size: 2.5rem; margin-bottom: 1rem; }
    h1 { font-size: 1.25rem; margin-bottom: 0.5rem; font-weight: 500; }
    p { font-size: 0.875rem; color: #94A3B8; margin-bottom: 1.5rem; line-height: 1.5; }
    a { display: inline-block; padding: 0.625rem 1.25rem; font-size: 0.75rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; border-radius: 0.75rem; background: #E11D48; color: #FFFFFF; text-decoration: none; }
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

const ACCENTS: Record<string, { glow: string; sealBg: string; sealBorder: string; sealShadow: string; border: string; badge: string; accentText: string }> = {
  "crimson-rose": {
    glow: "radial-gradient(circle at center, rgba(225, 29, 72, 0.2) 0%, rgba(219, 39, 119, 0.1) 40%, transparent 70%)",
    sealBg: "#BE123C",
    sealBorder: "#F43F5E",
    sealShadow: "rgba(136, 19, 55, 0.6)",
    border: "rgba(244, 63, 94, 0.3)",
    badge: "color: #FDA4AF; background: rgba(76, 5, 25, 0.6); border: 1px solid rgba(159, 18, 57, 0.5);",
    accentText: "#FB7185",
  },
  "midnight-violet": {
    glow: "radial-gradient(circle at center, rgba(147, 51, 234, 0.2) 0%, rgba(79, 70, 229, 0.1) 40%, transparent 70%)",
    sealBg: "#7E22CE",
    sealBorder: "#A855F7",
    sealShadow: "rgba(88, 28, 135, 0.6)",
    border: "rgba(168, 85, 247, 0.3)",
    badge: "color: #D8B4FE; background: rgba(59, 7, 100, 0.6); border: 1px solid rgba(107, 33, 168, 0.5);",
    accentText: "#C084FC",
  },
  "champagne-gold": {
    glow: "radial-gradient(circle at center, rgba(217, 119, 6, 0.2) 0%, rgba(202, 138, 4, 0.1) 40%, transparent 70%)",
    sealBg: "#B45309",
    sealBorder: "#F59E0B",
    sealShadow: "rgba(120, 53, 15, 0.6)",
    border: "rgba(245, 158, 11, 0.3)",
    badge: "color: #FCD34D; background: rgba(69, 26, 3, 0.6); border: 1px solid rgba(146, 64, 14, 0.5);",
    accentText: "#FBBF24",
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
  <title>A Valentine Experience</title>
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
      background: #0B0B12;
      color: #F8FAFC;
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
      opacity: 0.7;
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
      border-radius: 1rem;
      background: rgba(255, 255, 255, 0.04);
      backdrop-filter: blur(16px);
      -webkit-backdrop-filter: blur(16px);
      border: 1px solid ${theme.border};
      padding: 2rem 1.5rem;
      box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
      transition: all 0.7s cubic-bezier(0.16, 1, 0.3, 1);
      overflow-wrap: anywhere;
      word-break: break-word;
    }
    @media (min-width: 640px) {
      .card { padding: 2.5rem 2rem; }
    }
    .header { text-align: center; margin-bottom: 1.5rem; }
    .badge {
      display: inline-block;
      font-size: 0.75rem;
      text-transform: uppercase;
      letter-spacing: 0.1em;
      padding: 0.25rem 0.75rem;
      border-radius: 9999px;
      margin-bottom: 0.75rem;
      ${theme.badge}
    }
    h1 {
      font-family: Georgia, Cambria, 'Times New Roman', Times, serif;
      font-size: 1.75rem;
      font-weight: 500;
      color: #FFFFFF;
      letter-spacing: 0.02em;
      line-height: 1.3;
    }
    @media (min-width: 640px) {
      h1 { font-size: 2rem; }
    }
    .seal-box {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 2.5rem 1rem;
      text-align: center;
    }
    .wax-seal {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 5.5rem;
      height: 5.5rem;
      min-width: 44px;
      min-height: 44px;
      border-radius: 9999px;
      border: 2px solid ${theme.sealBorder};
      background: ${theme.sealBg};
      box-shadow: 0 10px 25px -5px ${theme.sealShadow};
      cursor: pointer;
      outline: none;
      transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
    }
    .wax-seal:hover { transform: scale(1.06); }
    .wax-seal:active { transform: scale(0.96); }
    .wax-seal .emoji { font-size: 2.25rem; user-select: none; }
    .seal-label {
      position: absolute;
      bottom: -1.75rem;
      font-size: 0.75rem;
      color: rgba(255, 255, 255, 0.6);
      text-transform: uppercase;
      letter-spacing: 0.08em;
      white-space: nowrap;
      font-family: system-ui, sans-serif;
    }
    .letter-box {
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
      color: #CBD5E1;
      line-height: 1.7;
      font-size: 1.05rem;
    }
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(8px); }
      to { opacity: 1; transform: translateY(0); }
    }
    .animate-fadeIn {
      animation: fadeIn 0.5s ease-out forwards;
    }
    .message-card {
      white-space: pre-wrap;
      border-radius: 0.75rem;
      background: rgba(0, 0, 0, 0.25);
      padding: 1.5rem;
      border: 1px solid rgba(255, 255, 255, 0.05);
      font-weight: 300;
    }
    .signoff-box { text-align: right; padding-top: 0.5rem; }
    .signoff-label {
      font-size: 0.75rem;
      color: rgba(255, 255, 255, 0.5);
      text-transform: uppercase;
      letter-spacing: 0.1em;
      margin-bottom: 0.25rem;
    }
    .sender-title {
      font-family: Georgia, Cambria, 'Times New Roman', Times, serif;
      font-size: 1.35rem;
      font-weight: 500;
      color: ${theme.accentText};
    }
    .hidden { display: none !important; }
    @media (prefers-reduced-motion: reduce) {
      *, *::before, *::after {
        animation-duration: 0.01ms !important;
        animation-iteration-count: 1 !important;
        transition-duration: 0.01ms !important;
        scroll-behavior: auto !important;
      }
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
          <button
            type="button"
            class="wax-seal"
            data-testid="wax-seal-button"
            aria-label="Break the wax seal to read letter"
          >
            <span class="emoji">💌</span>
            <span class="seal-label">Tap to open</span>
          </button>
        </div>

        <div class="letter-box hidden" data-testid="unsealed-letter">
          <div class="message-card" data-testid="letter-message">${message}</div>
          <div class="signoff-box">
            <div class="signoff-label">${signOff}</div>
            <div class="sender-title" data-testid="sender-name">${senderName}</div>
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
