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
    if (originUrl.origin.toLowerCase() !== expectedUrl.origin.toLowerCase()) {
      return {
        valid: false,
        reason: `Origin mismatch: expected ${expectedUrl.origin}, received ${originUrl.origin}`,
      };
    }
  } catch {
    return { valid: false, reason: "Invalid Origin header URL" };
  }

  return { valid: true };
}

export function validateJsonContentType(req: NextRequest): { valid: boolean; reason?: string } {
  const contentType = req.headers.get("content-type");
  if (!contentType || !contentType.toLowerCase().includes("application/json")) {
    return { valid: false, reason: "Expected application/json content-type" };
  }
  return { valid: true };
}
