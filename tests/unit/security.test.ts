import { describe, it, expect } from "vitest";
import {
  generatePublicId,
  generateEditCredential,
  hashEditCredential,
  verifyEditCredential,
} from "@/lib/security";

describe("Security & Cryptographic Helpers", () => {
  it("generates 128+ bit unguessable publicId with 22 characters", () => {
    const id1 = generatePublicId();
    const id2 = generatePublicId();

    expect(id1).toHaveLength(22);
    expect(id2).toHaveLength(22);
    expect(id1).not.toBe(id2);
  });

  it("generates 256-bit cryptographically secure edit credential", () => {
    const cred1 = generateEditCredential();
    const cred2 = generateEditCredential();

    // 32 bytes in hex = 64 characters
    expect(cred1).toHaveLength(64);
    expect(cred2).toHaveLength(64);
    expect(cred1).not.toBe(cred2);
  });

  it("hashes and verifies edit credential correctly using constant-time comparison", () => {
    const cred = generateEditCredential();
    const hash = hashEditCredential(cred);

    expect(hash).toHaveLength(64); // SHA-256 hex digest
    expect(verifyEditCredential(cred, hash)).toBe(true);

    // Tampered credential must fail
    const wrongCred = generateEditCredential();
    expect(verifyEditCredential(wrongCred, hash)).toBe(false);

    // Empty or malformed inputs must return false without throwing
    expect(verifyEditCredential("", hash)).toBe(false);
    expect(verifyEditCredential(cred, "invalid-hex")).toBe(false);
  });

  describe("validateOrigin CSRF protection", () => {
    it("rejects request with missing Origin header", async () => {
      const { validateOrigin } = await import("@/lib/csrf");
      const { NextRequest } = await import("next/server");
      const req = new NextRequest("http://localhost:3000/api/experiences", { method: "POST" });
      const result = validateOrigin(req);
      expect(result.valid).toBe(false);
      expect(result.reason).toContain("Missing Origin");
    });

    it("accepts request with matching APP_URL origin in production", async () => {
      const { validateOrigin } = await import("@/lib/csrf");
      const { NextRequest } = await import("next/server");
      const req = new NextRequest("http://localhost:3000/api/experiences", {
        method: "POST",
        headers: { origin: "http://localhost:3000" },
      });
      const result = validateOrigin(req);
      expect(result.valid).toBe(true);
    });

    it("rejects unauthorized third-party origin", async () => {
      const { validateOrigin } = await import("@/lib/csrf");
      const { NextRequest } = await import("next/server");
      const req = new NextRequest("http://localhost:3000/api/experiences", {
        method: "POST",
        headers: { origin: "https://malicious-attacker.com" },
      });
      const result = validateOrigin(req);
      expect(result.valid).toBe(false);
      expect(result.reason).toContain("Origin mismatch");
    });

    it("in Vercel preview, accepts same-origin matching host and rejects third-party", async () => {
      const originalEnv = process.env.VERCEL_ENV;
      process.env.VERCEL_ENV = "preview";
      try {
        const { validateOrigin } = await import("@/lib/csrf");
        const { NextRequest } = await import("next/server");
        const previewHost = "valentino-preview-abc123.vercel.app";

        // Same-origin preview request
        const validReq = new NextRequest(`https://${previewHost}/api/experiences`, {
          method: "POST",
          headers: {
            origin: `https://${previewHost}`,
            host: previewHost,
          },
        });
        expect(validateOrigin(validReq).valid).toBe(true);

        // Attacker request to preview deployment
        const attackerReq = new NextRequest(`https://${previewHost}/api/experiences`, {
          method: "POST",
          headers: {
            origin: "https://evil-site.com",
            host: previewHost,
          },
        });
        expect(validateOrigin(attackerReq).valid).toBe(false);
      } finally {
        process.env.VERCEL_ENV = originalEnv;
      }
    });
  });
});
