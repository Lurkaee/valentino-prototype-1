type LogLevel = "info" | "warn" | "error";

const SENSITIVE_KEYS = new Set([
  "cookie",
  "set-cookie",
  "authorization",
  "token",
  "secret",
  "credential",
  "editcredential",
  "editsecret",
  "partnername",
  "sendername",
  "message",
  "draftconfig",
  "publishedconfig",
]);

export function redactSensitiveData(obj: unknown): unknown {
  if (obj === null || obj === undefined) return obj;

  if (typeof obj === "string") {
    // Check if the string looks like a cookie or auth string
    return obj;
  }

  if (Array.isArray(obj)) {
    return obj.map(redactSensitiveData);
  }

  if (typeof obj === "object") {
    const redacted: Record<string, unknown> = {};
    for (const [key, value] of Object.entries(obj)) {
      const lowerKey = key.toLowerCase();
      if (SENSITIVE_KEYS.has(lowerKey)) {
        redacted[key] = "[REDACTED]";
      } else if (typeof value === "object" && value !== null) {
        redacted[key] = redactSensitiveData(value);
      } else {
        redacted[key] = value;
      }
    }
    return redacted;
  }

  return obj;
}

export function log(level: LogLevel, message: string, meta?: Record<string, unknown>): void {
  const payload = {
    timestamp: new Date().toISOString(),
    level,
    message,
    ...(meta ? { meta: redactSensitiveData(meta) } : {}),
  };

  const jsonStr = JSON.stringify(payload);
  if (level === "error") {
    console.error(jsonStr);
  } else if (level === "warn") {
    console.warn(jsonStr);
  } else {
    console.log(jsonStr);
  }
}

export const logger = {
  info: (msg: string, meta?: Record<string, unknown>) => log("info", msg, meta),
  warn: (msg: string, meta?: Record<string, unknown>) => log("warn", msg, meta),
  error: (msg: string, meta?: Record<string, unknown>) => log("error", msg, meta),
};
