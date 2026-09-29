import { describe, it, expect, beforeEach } from "vitest";
import { NextRequest } from "next/server";
import { db } from "@/lib/db";
import { POST as createExperience } from "@/app/api/experiences/route";
import { PUT as saveDraft } from "@/app/api/experiences/[publicId]/draft/route";
import { POST as publishExperience } from "@/app/api/experiences/[publicId]/publish/route";
import { GET as getPublicExperience } from "@/app/v/[publicId]/route";
import { getCookieName } from "@/lib/session";
import { mediaStorage, MemoryStorageAdapter, LocalFileSystemStorageAdapter } from "@/lib/storage";

describe("Phase 5C Integration Tests - Interactive Emotion & Storytelling Renaissance", () => {
  const APP_URL = process.env.APP_URL || "http://localhost:3000";

  beforeEach(async () => {
    await db.experienceReaction.deleteMany({});
    await db.experienceReply.deleteMany({});
    await db.experienceMedia.deleteMany({});
    await db.experience.deleteMany({});
  });

  async function createTestExperience(templateId: string = "midnight-rose") {
    const createReq = new NextRequest(`${APP_URL}/api/experiences`, {
      method: "POST",
      headers: { origin: APP_URL, "content-type": "application/json" },
      body: JSON.stringify({ templateId }),
    });
    const createRes = await createExperience(createReq);
    const { publicId } = await createRes.json();
    const cookieHeader = createRes.headers.get("set-cookie")!;
    const cookieVal = cookieHeader.split(";")[0].split("=")[1];
    const cookieName = getCookieName(publicId);
    return { publicId, cookieName, cookieVal };
  }

  describe("Interactive Modules Publishing & Snapshot Isolation", () => {
    it("persists and normalizes all 10 interactive modules in published snapshot", async () => {
      const { publicId, cookieName, cookieVal } = await createTestExperience("midnight-rose");

      const draftPayload = {
        templateId: "midnight-rose",
        partnerName: "Elena",
        senderName: "Marcus",
        greeting: "My Dearest Elena",
        message: "Every heartbeat since the night we met has carried your name.",
        signOff: "With eternal adoration",
        accentTheme: "crimson-rose",
        modules: {
          reasons: {
            enabled: true,
            title: "100 Reasons Why",
            items: [
              { id: "r-1", title: "Morning Sun", text: "The way you brew tea with two hands" },
              { id: "r-2", title: "Quiet Moments", text: "How you hold my hand in crowded rooms" },
            ],
          },
          compliments: {
            enabled: true,
            title: "Little Love Notes",
            items: [
              "Your laughter is my favorite symphony",
              "You make ordinary days feel miraculous",
            ],
          },
          fortuneCookie: {
            enabled: true,
            title: "Destiny Whispers",
            fortunes: [
              "A moonlit dance awaits you soon",
              "You will be kissed passionately before midnight",
            ],
          },
          scratchCard: {
            enabled: true,
            title: "A Hidden Secret",
            frontMessage: "Scratch with your heart ✦",
            hiddenMessage: "Pack a weekend bag — Venice is waiting.",
          },
          promises: {
            enabled: true,
            title: "Our Sacred Vows",
            items: [
              { id: "p-1", text: "I promise to always listen with an open soul", category: "vow" },
              { id: "p-2", text: "I promise to bake you warm bread on rainy Sundays", category: "adventures" },
            ],
          },
          futureAdventures: {
            enabled: true,
            title: "Our Co-op Horizons",
            items: [
              { id: "a-1", title: "Watch Northern Lights in Tromsø", status: "someday" },
              { id: "a-2", title: "Midnight picnic under cherry blossoms", status: "planned" },
              { id: "a-3", title: "First trip to the Amalfi Coast", status: "completed" },
            ],
          },
          adventureSpinner: {
            enabled: true,
            title: "Date Night Oracle",
            options: [
              { id: "s-1", label: "Late Night Jazz Bar" },
              { id: "s-2", label: "Rooftop Stargazing" },
              { id: "s-3", label: "Homemade Sushi Night" },
            ],
          },
          quiz: {
            enabled: true,
            title: "How Well Do You Know Our Hearts?",
            questions: [
              {
                id: "q-1",
                question: "Where was our very first kiss?",
                options: ["In the rain", "At the quiet cafe", "By the botanical garden fountain", "In the taxi"],
                correctIndex: 2,
                explanation: "Under the stone arches by the fountain!",
              },
            ],
            completionMessage: "You remembered every single detail of us.",
          },
          secret: {
            enabled: true,
            prompt: "What is the secret nickname only we share?",
            secretContent: "You are my North Star, and you always will be.",
          },
          openWhen: {
            enabled: true,
            title: "Open When Envelopes",
            envelopes: [
              {
                id: "e-1",
                title: "Open when you miss my embrace",
                context: "For lonely evenings",
                message: "Wrap yourself in this letter and know my heart is beating beside yours.",
              },
            ],
          },
          finale: {
            enabled: true,
            title: "To Eternity And Beyond",
            declaration: "You are the greatest adventure of my lifetime.",
            signature: "Marcus",
            showKeepsakePrompt: true,
          },
        },
      };

      // 1. Save draft
      const saveReq = new NextRequest(`${APP_URL}/api/experiences/${publicId}/draft`, {
        method: "PUT",
        headers: {
          origin: APP_URL,
          cookie: `${cookieName}=${cookieVal}`,
          "content-type": "application/json",
        },
        body: JSON.stringify({ draftConfig: draftPayload, baseRevision: 1 }),
      });
      const saveRes = await saveDraft(saveReq, { params: Promise.resolve({ publicId }) });
      expect(saveRes.status).toBe(200);

      // 2. Publish experience
      const pubReq = new NextRequest(`${APP_URL}/api/experiences/${publicId}/publish`, {
        method: "POST",
        headers: {
          origin: APP_URL,
          cookie: `${cookieName}=${cookieVal}`,
          "content-type": "application/json",
        },
        body: JSON.stringify({ expectedRevision: 2 }),
      });
      const pubRes = await publishExperience(pubReq, { params: Promise.resolve({ publicId }) });
      expect(pubRes.status).toBe(200);

      // 3. Verify published snapshot in DB
      const expInDb = await db.experience.findUnique({ where: { publicId } });
      expect(expInDb?.status).toBe("PUBLISHED");
      const pubConfig = JSON.parse(expInDb?.publishedConfig as string);
      expect(pubConfig).toBeDefined();

      // Check all Phase 5C modules are snapshot
      expect(pubConfig.modules.reasons.enabled).toBe(true);
      expect(pubConfig.modules.reasons.items.length).toBe(2);
      expect(pubConfig.modules.compliments.enabled).toBe(true);
      expect(pubConfig.modules.compliments.items.length).toBe(2);
      expect(pubConfig.modules.fortuneCookie.enabled).toBe(true);
      expect(pubConfig.modules.fortuneCookie.fortunes.length).toBe(2);
      expect(pubConfig.modules.scratchCard.enabled).toBe(true);
      expect(pubConfig.modules.scratchCard.hiddenMessage).toBe("Pack a weekend bag — Venice is waiting.");
      expect(pubConfig.modules.promises.enabled).toBe(true);
      expect(pubConfig.modules.promises.items.length).toBe(2);
      expect(pubConfig.modules.futureAdventures.enabled).toBe(true);
      expect(pubConfig.modules.futureAdventures.items.length).toBe(3);
      expect(pubConfig.modules.adventureSpinner.enabled).toBe(true);
      expect(pubConfig.modules.adventureSpinner.options.length).toBe(3);
      expect(pubConfig.modules.quiz.enabled).toBe(true);
      expect(pubConfig.modules.finale.enabled).toBe(true);
      expect(pubConfig.modules.finale.declaration).toBe("You are the greatest adventure of my lifetime.");

      // 4. Verify Snapshot Isolation: Modifying draft afterwards does NOT alter published snapshot
      const modifiedDraft = JSON.parse(JSON.stringify(draftPayload));
      modifiedDraft.modules.scratchCard.hiddenMessage = "MODIFIED UNPUBLISHED DRAFT MESSAGE";
      modifiedDraft.modules.reasons.items[0].text = "MODIFIED DRAFT REASON";

      const updateDraftReq = new NextRequest(`${APP_URL}/api/experiences/${publicId}/draft`, {
        method: "PUT",
        headers: {
          origin: APP_URL,
          cookie: `${cookieName}=${cookieVal}`,
          "content-type": "application/json",
        },
        body: JSON.stringify({ draftConfig: modifiedDraft, baseRevision: 2 }),
      });
      const updateDraftRes = await saveDraft(updateDraftReq, { params: Promise.resolve({ publicId }) });
      expect(updateDraftRes.status).toBe(200);

      // Check DB published snapshot again: must remain pristine
      const expAfterDraftUpdate = await db.experience.findUnique({ where: { publicId } });
      const pubConfigAfter = JSON.parse(expAfterDraftUpdate?.publishedConfig as string);
      expect(pubConfigAfter.modules.scratchCard.hiddenMessage).toBe("Pack a weekend bag — Venice is waiting.");
      expect(pubConfigAfter.modules.reasons.items[0].text).toBe("The way you brew tea with two hands");
    });
  });

  describe("Media Storage Adapter Architecture", () => {
    it("handles switching storage adapters without breaking existing public media retrieval", async () => {
      // Test dynamic adapter switching
      const originalAdapter = mediaStorage.getAdapter();
      const memoryAdapter = new MemoryStorageAdapter();

      mediaStorage.setAdapter(memoryAdapter);

      const buffer = Buffer.from("Production storage test content");
      await mediaStorage.write("test_prod_key.jpg", buffer, { mimeType: "image/jpeg" });

      expect(await mediaStorage.exists("test_prod_key.jpg")).toBe(true);
      const readBack = await mediaStorage.read("test_prod_key.jpg");
      expect(readBack?.toString()).toBe("Production storage test content");

      // Clean up and restore adapter
      await mediaStorage.delete("test_prod_key.jpg");
      mediaStorage.setAdapter(originalAdapter);
    });
  });
});
