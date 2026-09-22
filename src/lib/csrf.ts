import { NextRequest } from "next/server";

export function validateOrigin(req: NextRequest): { valid: boolean; reason?: string } {
  const origin = req.headers.get("origin");
  if (!origin) {
    return { valid: false, reason: "Missing Origin header" };
  }

  try {
    const originUrl = new URL(origin);
    const normalizedOrigin = originUrl.origin.toLowerCase();

    // 1. Derive the current request's own origin from trusted host & protocol headers
    const host = req.headers.get("x-forwarded-host") || req.headers.get("host");
    if (host) {
      const proto =
        req.headers.get("x-forwarded-proto") ||
        (req.nextUrl?.protocol ? req.nextUrl.protocol.replace(":", "") : "https");
      const requestOrigin = `${proto}://${host}`.toLowerCase();
      if (normalizedOrigin === requestOrigin) {
        return { valid: true };
      }
    }

    // 2. Also check against configured APP_URL if specified
    const appUrl = process.env.APP_URL;
    if (appUrl) {
      const expectedAppUrl = new URL(appUrl);
      if (normalizedOrigin === expectedAppUrl.origin.toLowerCase()) {
        return { valid: true };
      }
    } else {
      // Local fallback if no APP_URL configured
      if (normalizedOrigin === "http://localhost:3000") {
        return { valid: true };
      }
    }

    return {
      valid: false,
      reason: "Request origin not allowed",
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
