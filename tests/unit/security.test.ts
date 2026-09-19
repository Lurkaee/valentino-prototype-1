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
});
