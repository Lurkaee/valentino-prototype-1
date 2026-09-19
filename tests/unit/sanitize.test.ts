import { describe, it, expect } from "vitest";
import { countGraphemes, sanitizeText } from "@/lib/sanitize";

describe("Unicode Sanitization and Grapheme Counting", () => {
  it("accurately counts graphemes for compound emoji and Indic scripts", () => {
    // Single ASCII
    expect(countGraphemes("Hello")).toBe(5);

    // Rose emoji 🌹
    expect(countGraphemes("Rose 🌹")).toBe(6);

    // Compound emoji with ZWJ: 👨‍👩‍👧‍👦 (multiple codepoints, 1 grapheme)
    expect(countGraphemes("Family 👨‍👩‍👧‍👦")).toBe(8);

    // Hindi / Devanagari text with ligatures
    const devanagari = "नमस्ते"; // Namaste
    expect(countGraphemes(devanagari)).toBeGreaterThan(0);
    expect(countGraphemes(devanagari)).toBeLessThanOrEqual(devanagari.length);
  });

  it("normalizes to NFC and trims whitespace", () => {
    // Decomposed 'e' + combining acute accent -> composed 'é'
    const decomposed = "e\u0301";
    const normalized = sanitizeText(decomposed);
    expect(normalized).toBe("é");

    const padded = "   Ananya Sharma   ";
    expect(sanitizeText(padded)).toBe("Ananya Sharma");
  });

  it("strips directional bidi override characters while preserving ZWJ and ZWNJ", () => {
    // Bidi override U+202E (RIGHT-TO-LEFT OVERRIDE)
    const dangerousInput = "Hello \u202Ereversed\u202C text";
    const cleaned = sanitizeText(dangerousInput);
    expect(cleaned).not.toContain("\u202E");
    expect(cleaned).not.toContain("\u202C");
    expect(cleaned).toBe("Hello reversed text");

    // Preserves ZWJ \u200D
    const emojiSequence = "👨\u200D👩\u200D👧";
    const preserved = sanitizeText(emojiSequence);
    expect(preserved).toContain("\u200D");
  });
});
