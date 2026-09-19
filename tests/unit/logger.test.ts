import { describe, it, expect } from "vitest";
import { redactSensitiveData } from "@/lib/logger";

describe("Logger Redaction", () => {
  it("redacts cookies, tokens, and personal message content", () => {
    const sensitivePayload = {
      userIp: "127.0.0.1",
      cookie: "edit-token-12345=secret-val",
      authorization: "Bearer secret-token",
      partnerName: "Ananya",
      senderName: "Rohan",
      message: "Personal romantic letter",
      nested: {
        token: "deeply-nested-secret",
        normalField: "public-safe-info",
      },
    };

    const redacted = redactSensitiveData(sensitivePayload) as any;

    expect(redacted.userIp).toBe("127.0.0.1");
    expect(redacted.cookie).toBe("[REDACTED]");
    expect(redacted.authorization).toBe("[REDACTED]");
    expect(redacted.partnerName).toBe("[REDACTED]");
    expect(redacted.senderName).toBe("[REDACTED]");
    expect(redacted.message).toBe("[REDACTED]");
    expect(redacted.nested.token).toBe("[REDACTED]");
    expect(redacted.nested.normalField).toBe("public-safe-info");
  });
});
