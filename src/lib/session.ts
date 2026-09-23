import { NextRequest } from "next/server";

export const SLIDING_EXPIRATION_SECONDS = 90 * 24 * 60 * 60; // 90 days
export const ABSOLUTE_MAX_LIFETIME_MS = 180 * 24 * 60 * 60 * 1000; // 180 days

export function isProduction(): boolean {
  return process.env.NODE_ENV === "production";
}

export function getCookieName(publicId: string): string {
  // Use __Host- prefix in production over HTTPS
  return isProduction()
    ? `__Host-edit-token-${publicId}`
    : `edit-token-${publicId}`;
}

export function isSessionExpired(issuedAt: Date): boolean {
  const elapsedMs = Date.now() - new Date(issuedAt).getTime();
  return elapsedMs > ABSOLUTE_MAX_LIFETIME_MS;
}

export function calculateRemainingMaxAge(issuedAt: Date): number {
  const elapsedMs = Date.now() - new Date(issuedAt).getTime();
  const remainingMs = ABSOLUTE_MAX_LIFETIME_MS - elapsedMs;
  if (remainingMs <= 0) return 0;
  const remainingSecs = Math.floor(remainingMs / 1000);
  return Math.min(SLIDING_EXPIRATION_SECONDS, remainingSecs);
}

export function getEditCredentialFromRequest(
  req: NextRequest,
  publicId: string
): string | null {
  const cookieName = getCookieName(publicId);
  const cookie = req.cookies.get(cookieName);
  return cookie?.value || null;
}

export function buildSetCookieHeader(
  publicId: string,
  credential: string,
  issuedAt: Date = new Date()
): { name: string; value: string; options: Record<string, unknown> } {
  const cookieName = getCookieName(publicId);
  const maxAge = calculateRemainingMaxAge(issuedAt);

  return {
    name: cookieName,
    value: credential,
    options: {
      httpOnly: true,
      sameSite: "lax" as const,
      secure: isProduction(),
      path: "/",
      maxAge,
    },
  };
}

export async function verifySessionCookie(
  req: NextRequest,
  publicId: string,
  storedHash: string
): Promise<{ authenticated: boolean; error?: string }> {
  const token = getEditCredentialFromRequest(req, publicId);
  if (!token) {
    return { authenticated: false, error: "Missing session token" };
  }
  const { verifyEditCredential } = await import("@/lib/security");
  const valid = verifyEditCredential(token, storedHash);
  return { authenticated: valid, error: valid ? undefined : "Invalid session token" };
}
