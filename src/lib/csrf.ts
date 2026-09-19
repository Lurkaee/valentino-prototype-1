import { NextRequest } from "next/server";

export function validateOrigin(req: NextRequest): { valid: boolean; reason?: string } {
  const origin = req.headers.get("origin");
  if (!origin) {
    return { valid: false, reason: "Missing Origin header" };
  }

  const appUrl = process.env.APP_URL || "http://localhost:3000";

  try {
    const originUrl = new URL(origin);
    const expectedUrl = new URL(appUrl);

    // Normalize comparison (protocol + host)
    if (originUrl.origin.toLowerCase() === expectedUrl.origin.toLowerCase()) {
      return { valid: true };
    }

    // In Vercel Preview environments, allow same-origin requests matching the verified deployment host
    // (via x-forwarded-host or host header). Rejects all unrelated third-party origins.
    if (process.env.VERCEL_ENV === "preview") {
      const host = req.headers.get("x-forwarded-host") || req.headers.get("host");
      if (host) {
        const proto = req.headers.get("x-forwarded-proto") || "https";
        const expectedPreviewOrigin = `${proto}://${host}`.toLowerCase();
        if (originUrl.origin.toLowerCase() === expectedPreviewOrigin) {
          return { valid: true };
        }
        return {
          valid: false,
          reason: `Origin mismatch in preview: expected ${expectedPreviewOrigin}, received ${originUrl.origin}`,
        };
      }
    }

    return {
      valid: false,
      reason: `Origin mismatch: expected ${expectedUrl.origin}, received ${originUrl.origin}`,
    };
  } catch {
    return { valid: false, reason: "Invalid Origin header URL" };
  }
}

export function validateJsonContentType(req: NextRequest): { valid: boolean; reason?: string } {
  const contentType = req.headers.get("content-type");
  if (!contentType || !contentType.toLowerCase().includes("application/json")) {
    return { valid: false, reason: "Expected application/json content-type" };
  }
  return { valid: true };
}
