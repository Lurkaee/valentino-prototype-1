import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { ExperienceStatus } from "@prisma/client";
import { sanitizeText } from "@/lib/sanitize";
import { DECOR_SLOTS, normalizeValentineDecor, ValentineDecor } from "@/types/decor";

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
  decor?: ValentineDecor;
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



const PUBLIC_BLOOM_GLYPHS: Record<ValentineDecor["blooms"], string> = {
  rose: "🌹",
  wildflower: "🌼",
  peony: "🪷",
};

const PUBLIC_CHARM_GLYPHS: Record<ValentineDecor["charms"], string> = {
  heart: "♡",
  star: "✦",
  sparkle: "✧",
};

const PUBLIC_PAPER_STYLES: Record<ValentineDecor["paper"], { background: string; color: string; border: string }> = {
  "ivory-cream": { background: "#FFFDF8", color: "#2D1720", border: "#EEDFD2" },
  "petal-blush": { background: "#FFF1F4", color: "#321820", border: "#F3D2DA" },
  "deckled-parchment": {
    background: "linear-gradient(135deg,#F3E8D3 0%,#FFFBF1 48%,#E9D8BC 100%)",
    color: "#332218",
    border: "#D9C6A7",
  },
  "soft-lavender": { background: "#F8F3FF", color: "#2B2038", border: "#DDD0F0" },
};

const PUBLIC_RIBBON_STYLES: Record<ValentineDecor["ribbon"], string> = {
  "velvet-crimson": "linear-gradient(90deg,#650D1F,#B51F3C 50%,#650D1F)",
  "satin-rose": "linear-gradient(90deg,#9F3551,#E58A9F 50%,#9F3551)",
  "silk-ivory": "linear-gradient(90deg,#B8A38E,#F8F1E7 50%,#B8A38E)",
  "plum-mist": "linear-gradient(90deg,#4E274D,#8F648C 50%,#4E274D)",
};

const PUBLIC_WAX_STYLES: Record<ValentineDecor["waxSeal"], { background: string; border: string; glyph: string }> = {
  "crimson-heart": {
    background: "radial-gradient(circle at 30% 25%,#D44763,#8B142D 72%)",
    border: "#F58BA0",
    glyph: "♥",
  },
  "rose-quartz": {
    background: "radial-gradient(circle at 30% 25%,#F09FB0,#B24D68 72%)",
    border: "#FFD1DA",
    glyph: "✿",
  },
  "royal-burgundy": {
    background: "radial-gradient(circle at 30% 25%,#7F1D3A,#4A071D 72%)",
    border: "#D76A87",
    glyph: "♜",
  },
  "champagne-gold": {
    background: "radial-gradient(circle at 30% 25%,#E8C27B,#9A6D2B 72%)",
    border: "#F8E8BA",
    glyph: "✦",
  },
};

function renderPublicDecor(decor: ValentineDecor): string {
  const blooms = Object.entries(DECOR_SLOTS)
    .map(([slot, values]) => {
      const [x, y, rotate, scale, zIndex] = values;
      return `<span class="decor-bloom" data-testid="composition-bloom-${slot}" style="left:${x}%;top:${y}%;transform:translate(-50%,-50%) rotate(${rotate}deg) scale(${scale});z-index:${zIndex};">${PUBLIC_BLOOM_GLYPHS[decor.blooms]}</span>`;
    })
    .join("");

  const charm = PUBLIC_CHARM_GLYPHS[decor.charms];
  const paper = PUBLIC_PAPER_STYLES[decor.paper];
  const ribbon = PUBLIC_RIBBON_STYLES[decor.ribbon];
  const wax = PUBLIC_WAX_STYLES[decor.waxSeal];

  return `
    <div class="decor-layer" aria-hidden="true">
      ${blooms}
      <span class="decor-charm charm-a">${charm}</span>
      <span class="decor-charm charm-b">${charm}</span>
      <span class="decor-charm charm-c">${charm}</span>
      <span class="decor-charm charm-d">${charm}</span>
    </div>
    <div class="decor-paper" data-testid="decor-paper" data-paper="${decor.paper}" style="background:${paper.background};color:${paper.color};border-color:${paper.border};">
      <div class="decor-ribbon" data-testid="decor-ribbon" data-ribbon="${decor.ribbon}" style="background:${ribbon};"></div>
      <div class="decor-paper-content"></div>
      <div class="decor-adornment-wax" data-testid="decor-wax-seal" data-wax-seal="${decor.waxSeal}" style="background:${wax.background};border-color:${wax.border};">${wax.glyph}</div>
    </div>`;
}

function renderPublicHtml(config: PublishedConfig): string {
  const theme = ACCENTS[config.accentTheme || "crimson-rose"] || ACCENTS["crimson-rose"];
  const greeting = sanitizeText(config.greeting || "To My Favorite Person");
  const partnerName = sanitizeText(config.partnerName || "Dearest");
  const message = sanitizeText(config.message || "My heart is fuller every day because of you.");
  const signOff = sanitizeText(config.signOff || "With all my love");
  const senderName = sanitizeText(config.senderName || "Yours Always");
  const decor = normalizeValentineDecor(config.decor);
  const paper = PUBLIC_PAPER_STYLES[decor.paper];
  const wax = PUBLIC_WAX_STYLES[decor.waxSeal];

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

    .decor-frame {
      position: relative;
      overflow: hidden;
      border-radius: 1.6rem;
    }
    .decor-layer {
      position: absolute;
      inset: 0;
      z-index: 1;
      pointer-events: none;
      overflow: hidden;
      border-radius: 1.6rem;
    }
    .decor-bloom {
      position: absolute;
      font-size: 2.7rem;
      line-height: 1;
      user-select: none;
      filter: drop-shadow(0 8px 12px rgba(40,10,20,0.18));
      transform-origin: center;
    }
    .decor-charm {
      position: absolute;
      z-index: 2;
      color: rgba(120, 48, 66, 0.62);
      font-family: Georgia, serif;
      user-select: none;
    }
    .charm-a { left: 16%; top: 19%; font-size: 1.25rem; }
    .charm-b { right: 16%; top: 25%; font-size: 1.1rem; }
    .charm-c { left: 18%; bottom: 18%; font-size: 1.1rem; opacity: .75; }
    .charm-d { right: 18%; bottom: 20%; font-size: 1.25rem; }
    .decor-paper {
      position: absolute;
      inset: 8px;
      z-index: 3;
      border: 1px solid;
      border-radius: 1.4rem;
      opacity: .98;
      box-shadow: 0 16px 36px rgba(24,6,12,0.20);
      pointer-events: none;
    }
    .decor-ribbon {
      position: absolute;
      left: 20px;
      right: 20px;
      top: 16px;
      height: 20px;
      border-radius: 999px;
      border: 1px solid rgba(0,0,0,.10);
      box-shadow: 0 8px 18px rgba(80,20,35,.22);
    }
    .decor-adornment-wax {
      position: absolute;
      right: 18px;
      bottom: 18px;
      width: 56px;
      height: 56px;
      border-radius: 999px;
      border: 2px solid;
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      font-family: Georgia, serif;
      font-size: 1.25rem;
      box-shadow: 0 10px 30px rgba(52,8,22,.34);
    }
    .decor-paper-content { position: absolute; inset: 0; border-radius: inherit; }
    .card-content { position: relative; z-index: 10; }

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
  <div class="wrapper" data-testid="experience-container" data-decor-blooms="${decor.blooms}" data-decor-charms="${decor.charms}" data-decor-paper="${decor.paper}" data-decor-ribbon="${decor.ribbon}" data-decor-wax-seal="${decor.waxSeal}">
    <div class="ambient-glow"></div>
    <div class="content-container">
      <div class="card decor-frame">
        ${renderPublicDecor(decor)}
        <div class="card-content">
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
                <span class="emoji">${wax.glyph}</span>
              </div>
              <span class="seal-label">Tap to open</span>
            </button>
          </div>
        </div>

        <div class="letter-box hidden" data-testid="unsealed-letter">
          <div class="paper-card" style="background:${paper.background};color:${paper.color};border-color:${paper.border};">
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
