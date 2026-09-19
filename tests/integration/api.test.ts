import { describe, it, expect, beforeEach } from "vitest";
import { NextRequest } from "next/server";
import { db } from "@/lib/db";
import { POST as createExperience } from "@/app/api/experiences/route";
import { GET as getDraft, PUT as saveDraft } from "@/app/api/experiences/[publicId]/draft/route";
import { POST as publishExperience } from "@/app/api/experiences/[publicId]/publish/route";
import { GET as checkStatus } from "@/app/api/internal/status/[publicId]/route";
import { getCookieName } from "@/lib/session";

describe("API Integration Tests", () => {
  const APP_URL = process.env.APP_URL || "http://localhost:3000";

  beforeEach(async () => {
    // Clean up test experiences
    await db.experience.deleteMany({});
  });

  it("POST /api/experiences: rejects requests with missing or mismatching Origin", async () => {
    const req = new NextRequest(`${APP_URL}/api/experiences`, {
      method: "POST",
      headers: {
        origin: "https://malicious-attacker.com",
        "content-type": "application/json",
      },
    });

    const res = await createExperience(req);
    expect(res.status).toBe(403);
  });

  it("POST /api/experiences: creates experience, sets HttpOnly cookie, and returns publicId", async () => {
    const req = new NextRequest(`${APP_URL}/api/experiences`, {
      method: "POST",
      headers: {
        origin: APP_URL,
        "content-type": "application/json",
      },
    });

    const res = await createExperience(req);
    expect(res.status).toBe(201);

    const body = await res.json();
    expect(body.publicId).toBeDefined();
    expect(body.publicId).toHaveLength(22);
    // Crucial: Credential must NEVER appear in JSON response body
    expect(body.credential).toBeUndefined();
    expect(body.secret).toBeUndefined();

    // Verify Set-Cookie header is present
    const cookieHeader = res.headers.get("set-cookie");
    expect(cookieHeader).toBeDefined();
    expect(cookieHeader).toContain(getCookieName(body.publicId));
    expect(cookieHeader?.toLowerCase()).toContain("httponly");
    expect(cookieHeader?.toLowerCase()).toContain("samesite=lax");

    // Verify DB record created
    const record = await db.experience.findUnique({ where: { publicId: body.publicId } });
    expect(record).not.toBeNull();
    expect(record?.status).toBe("DRAFT");
    expect(record?.draftRevision).toBe(1);
    expect(record?.editCredentialIssuedAt).toBeDefined();
  });

  it("GET & PUT /api/experiences/[publicId]/draft: enforces auth and optimistic revision locking", async () => {
    // 1. Create an experience
    const createReq = new NextRequest(`${APP_URL}/api/experiences`, {
      method: "POST",
      headers: { origin: APP_URL, "content-type": "application/json" },
    });
    const createRes = await createExperience(createReq);
    const { publicId } = await createRes.json();
    const cookieHeader = createRes.headers.get("set-cookie")!;
    const cookieVal = cookieHeader.split(";")[0].split("=")[1];
    const cookieName = getCookieName(publicId);

    // 2. Unauthenticated GET must fail with 401
    const unauthGetReq = new NextRequest(`${APP_URL}/api/experiences/${publicId}/draft`, {
      method: "GET",
    });
    const unauthGetRes = await getDraft(unauthGetReq, { params: Promise.resolve({ publicId }) });
    expect(unauthGetRes.status).toBe(401);

    // 3. Authenticated GET succeeds
    const authGetReq = new NextRequest(`${APP_URL}/api/experiences/${publicId}/draft`, {
      method: "GET",
      headers: {
        cookie: `${cookieName}=${cookieVal}`,
      },
    });
    const authGetRes = await getDraft(authGetReq, { params: Promise.resolve({ publicId }) });
    expect(authGetRes.status).toBe(200);
    const draftData = await authGetRes.json();
    expect(draftData.draftRevision).toBe(1);

    // 4. PUT with wrong/stale baseRevision returns 409 Conflict
    const conflictReq = new NextRequest(`${APP_URL}/api/experiences/${publicId}/draft`, {
      method: "PUT",
      headers: {
        origin: APP_URL,
        "content-type": "application/json",
        cookie: `${cookieName}=${cookieVal}`,
      },
      body: JSON.stringify({
        draftConfig: { partnerName: "Ananya", senderName: "Rohan" },
        baseRevision: 99, // Stale!
      }),
    });
    const conflictRes = await saveDraft(conflictReq, { params: Promise.resolve({ publicId }) });
    expect(conflictRes.status).toBe(409);

    // 5. PUT with correct baseRevision succeeds and increments revision to 2
    const validSaveReq = new NextRequest(`${APP_URL}/api/experiences/${publicId}/draft`, {
      method: "PUT",
      headers: {
        origin: APP_URL,
        "content-type": "application/json",
        cookie: `${cookieName}=${cookieVal}`,
      },
      body: JSON.stringify({
        draftConfig: { partnerName: "Ananya", senderName: "Rohan", message: "Initial message" },
        baseRevision: 1,
      }),
    });
    const validSaveRes = await saveDraft(validSaveReq, { params: Promise.resolve({ publicId }) });
    expect(validSaveRes.status).toBe(200);
    const saveResult = await validSaveRes.json();
    expect(saveResult.draftRevision).toBe(2);
  });

  it("POST /api/experiences/[publicId]/publish: rejects incomplete draft, requires revision match, snapshots atomically", async () => {
    // 1. Create experience
    const createRes = await createExperience(
      new NextRequest(`${APP_URL}/api/experiences`, {
        method: "POST",
        headers: { origin: APP_URL, "content-type": "application/json" },
      })
    );
    const { publicId } = await createRes.json();
    const cookieHeader = createRes.headers.get("set-cookie")!;
    const cookieVal = cookieHeader.split(";")[0].split("=")[1];
    const cookieName = getCookieName(publicId);

    // 2. Publish incomplete draft fails with 422
    const publishIncompleteReq = new NextRequest(`${APP_URL}/api/experiences/${publicId}/publish`, {
      method: "POST",
      headers: {
        origin: APP_URL,
        "content-type": "application/json",
        cookie: `${cookieName}=${cookieVal}`,
      },
      body: JSON.stringify({ expectedRevision: 1 }),
    });
    const publishIncompleteRes = await publishExperience(publishIncompleteReq, {
      params: Promise.resolve({ publicId }),
    });
    expect(publishIncompleteRes.status).toBe(422);

    // 3. Save valid complete draft
    await saveDraft(
      new NextRequest(`${APP_URL}/api/experiences/${publicId}/draft`, {
        method: "PUT",
        headers: {
          origin: APP_URL,
          "content-type": "application/json",
          cookie: `${cookieName}=${cookieVal}`,
        },
        body: JSON.stringify({
          draftConfig: {
            partnerName: "Ananya",
            senderName: "Rohan",
            message: "I love you more than words can express.",
            accentTheme: "crimson-rose",
          },
          baseRevision: 1,
        }),
      }),
      { params: Promise.resolve({ publicId }) }
    );

    // 4. Publish with expectedRevision: 2 succeeds
    const publishReq = new NextRequest(`${APP_URL}/api/experiences/${publicId}/publish`, {
      method: "POST",
      headers: {
        origin: APP_URL,
        "content-type": "application/json",
        cookie: `${cookieName}=${cookieVal}`,
      },
      body: JSON.stringify({ expectedRevision: 2 }),
    });
    const publishRes = await publishExperience(publishReq, { params: Promise.resolve({ publicId }) });
    expect(publishRes.status).toBe(200);

    const publishData = await publishRes.json();
    expect(publishData.success).toBe(true);
    expect(publishData.publicUrl).toBe(`${APP_URL}/v/${publicId}`);

    // Verify DB snapshot
    const record = await db.experience.findUnique({ where: { publicId } });
    expect(record?.status).toBe("PUBLISHED");
    expect(record?.publishedConfig).toBeDefined();
    const published = JSON.parse(record!.publishedConfig!);
    expect(published.partnerName).toBe("Ananya");
    expect(published.senderName).toBe("Rohan");
  });

  it("enforces server-side 180-day absolute expiration cutoff regardless of client cookie", async () => {
    // 1. Create experience
    const createRes = await createExperience(
      new NextRequest(`${APP_URL}/api/experiences`, {
        method: "POST",
        headers: { origin: APP_URL, "content-type": "application/json" },
      })
    );
    const { publicId } = await createRes.json();
    const cookieHeader = createRes.headers.get("set-cookie")!;
    const cookieVal = cookieHeader.split(";")[0].split("=")[1];
    const cookieName = getCookieName(publicId);

    // 2. Artificially age the experience past 180 days
    const pastDate = new Date(Date.now() - 181 * 24 * 60 * 60 * 1000);
    await db.experience.update({
      where: { publicId },
      data: { editCredentialIssuedAt: pastDate },
    });

    // 3. Attempt to save draft with unexpired cookie
    const saveReq = new NextRequest(`${APP_URL}/api/experiences/${publicId}/draft`, {
      method: "PUT",
      headers: {
        origin: APP_URL,
        "content-type": "application/json",
        cookie: `${cookieName}=${cookieVal}`,
      },
      body: JSON.stringify({
        draftConfig: { partnerName: "Maya" },
        baseRevision: 1,
      }),
    });
    const saveRes = await saveDraft(saveReq, { params: Promise.resolve({ publicId }) });
    expect(saveRes.status).toBe(401);
    const data = await saveRes.json();
    expect(data.error).toContain("180-day");
  });

  it("checks internal status endpoint for DISABLED / DELETED experiences", async () => {
    // 1. Create and disable an experience
    const createRes = await createExperience(
      new NextRequest(`${APP_URL}/api/experiences`, {
        method: "POST",
        headers: { origin: APP_URL, "content-type": "application/json" },
      })
    );
    const { publicId } = await createRes.json();

    await db.experience.update({
      where: { publicId },
      data: { status: "DISABLED" },
    });

    const statusReq = new NextRequest(`${APP_URL}/api/internal/status/${publicId}`, { method: "GET" });
    const statusRes = await checkStatus(statusReq, { params: Promise.resolve({ publicId }) });
    expect(statusRes.status).toBe(200);
    const data = await statusRes.json();
    expect(data.status).toBe("DISABLED");
  });
});
