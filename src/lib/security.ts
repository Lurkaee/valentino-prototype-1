import crypto from "crypto";
import { customAlphabet } from "nanoid";

// 128+ bit cryptographic random publicId (22 chars with alphabet of 64 chars = 64^22 = 2^132)
const nanoid128 = customAlphabet(
  "useandom-26T198340PX75pxJACKVERYMINDBUSQUITFlProcessheldhomsg_k",
  22
);

export function generatePublicId(): string {
  return nanoid128();
}

export function generateEditCredential(): string {
  return crypto.randomBytes(32).toString("hex"); // 256 bits of cryptographically secure entropy
}

export function getPepper(): string {
  const pepper = process.env.EDIT_SECRET_PEPPER;
  if (!pepper) {
    if (process.env.NODE_ENV === "production") {
      throw new Error("EDIT_SECRET_PEPPER must be configured in production");
    }
    return "dev-fallback-pepper-at-least-32-chars-long";
  }
  return pepper;
}

export function hashEditCredential(credential: string): string {
  const pepper = getPepper();
  return crypto.createHmac("sha256", pepper).update(credential).digest("hex");
}

export function verifyEditCredential(credential: string, storedHash: string): boolean {
  try {
    const computedHash = hashEditCredential(credential);
    const computedBuf = Buffer.from(computedHash, "hex");
    const storedBuf = Buffer.from(storedHash, "hex");
    if (computedBuf.length !== storedBuf.length) {
      return false;
    }
    return crypto.timingSafeEqual(computedBuf, storedBuf);
  } catch {
    return false;
  }
}
