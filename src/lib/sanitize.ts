// Grapheme counting and Unicode sanitation

export function countGraphemes(text: string): number {
  if (!text) return 0;
  if (typeof Intl !== "undefined" && "Segmenter" in Intl) {
    const segmenter = new Intl.Segmenter("en", { granularity: "grapheme" });
    let count = 0;
    for (const _ of segmenter.segment(text)) {
      count++;
    }
    return count;
  }
  // Fallback for environments lacking Intl.Segmenter
  return Array.from(text).length;
}

// Strip bidi overrides (U+202A to U+202E) and isolates (U+2066 to U+2069),
// and ASCII control characters except \n and \r, while keeping ZWJ (\u200D) and ZWNJ (\u200C)
export function sanitizeText(
  input: string,
  options: { allowNewlines?: boolean } = {}
): string {
  if (!input) return "";

  // Normalize to NFC
  let cleaned = input.normalize("NFC");

  // Strip directional override and isolate formatting characters
  cleaned = cleaned.replace(/[\u202A-\u202E\u2066-\u2069]/g, "");

  // Strip control characters
  if (options.allowNewlines) {
    // Keep \n (\x0A) and \r (\x0D)
    cleaned = cleaned.replace(/[\x00-\x09\x0B\x0C\x0E-\x1F\x7F-\x9F]/g, "");
  } else {
    cleaned = cleaned.replace(/[\x00-\x1F\x7F-\x9F]/g, "");
  }

  // Trim and collapse whitespace
  if (options.allowNewlines) {
    // Trim leading/trailing whitespace across whole string
    cleaned = cleaned.trim();
  } else {
    cleaned = cleaned.replace(/\s+/g, " ").trim();
  }

  return cleaned;
}
