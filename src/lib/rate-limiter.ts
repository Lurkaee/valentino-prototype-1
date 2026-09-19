import crypto from "crypto";

export interface RateLimitResult {
  allowed: boolean;
  remaining: number;
  resetSeconds: number;
}

export interface RateLimiter {
  check(key: string, limit: number, windowMs: number): Promise<RateLimitResult>;
  reset(key: string): Promise<void>;
}

interface WindowEntry {
  count: number;
  resetAt: number;
}

export class InMemoryRateLimiter implements RateLimiter {
  private store: Map<string, WindowEntry> = new Map();

  async check(key: string, limit: number, windowMs: number): Promise<RateLimitResult> {
    const now = Date.now();
    const entry = this.store.get(key);

    if (!entry || now >= entry.resetAt) {
      const resetAt = now + windowMs;
      this.store.set(key, { count: 1, resetAt });
      return {
        allowed: true,
        remaining: limit - 1,
        resetSeconds: Math.ceil(windowMs / 1000),
      };
    }

    if (entry.count >= limit) {
      const resetSeconds = Math.max(1, Math.ceil((entry.resetAt - now) / 1000));
      return {
        allowed: false,
        remaining: 0,
        resetSeconds,
      };
    }

    entry.count += 1;
    const resetSeconds = Math.max(1, Math.ceil((entry.resetAt - now) / 1000));
    return {
      allowed: true,
      remaining: limit - entry.count,
      resetSeconds,
    };
  }

  async reset(key: string): Promise<void> {
    this.store.delete(key);
  }
}

const globalForLimiter = globalThis as unknown as {
  rateLimiter: RateLimiter | undefined;
};

export const rateLimiter: RateLimiter =
  globalForLimiter.rateLimiter ?? new InMemoryRateLimiter();

if (process.env.NODE_ENV !== "production") {
  globalForLimiter.rateLimiter = rateLimiter;
}

// Generate non-personal anonymized hashed rate-limit keys
export function getAnonymizedKey(prefix: string, identifier: string): string {
  const hash = crypto.createHash("sha256").update(identifier).digest("hex").slice(0, 16);
  return `${prefix}:${hash}`;
}
