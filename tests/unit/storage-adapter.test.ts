import { describe, it, expect, beforeEach } from "vitest";
import {
  ConfigurableMediaStorageService,
  MemoryStorageAdapter,
  LocalFileSystemStorageAdapter,
} from "@/lib/storage";

describe("Media Storage Service & Adapters", () => {
  describe("MemoryStorageAdapter", () => {
    let adapter: MemoryStorageAdapter;

    beforeEach(() => {
      adapter = new MemoryStorageAdapter();
    });

    it("writes and reads media buffers correctly", async () => {
      const buffer = Buffer.from("test media content");
      await adapter.write("test_media.jpg", buffer, { mimeType: "image/jpeg" });

      const exists = await adapter.exists("test_media.jpg");
      expect(exists).toBe(true);

      const readBuffer = await adapter.read("test_media.jpg");
      expect(readBuffer).not.toBeNull();
      expect(readBuffer?.toString()).toBe("test media content");
    });

    it("deletes media buffers cleanly", async () => {
      const buffer = Buffer.from("to be deleted");
      await adapter.write("delete_me.mp3", buffer, { mimeType: "audio/mpeg" });

      const deleted = await adapter.delete("delete_me.mp3");
      expect(deleted).toBe(true);

      const exists = await adapter.exists("delete_me.mp3");
      expect(exists).toBe(false);

      const readBuffer = await adapter.read("delete_me.mp3");
      expect(readBuffer).toBeNull();
    });

    it("handles non-existent files gracefully", async () => {
      const exists = await adapter.exists("nonexistent.jpg");
      expect(exists).toBe(false);

      const deleted = await adapter.delete("nonexistent.jpg");
      expect(deleted).toBe(false);

      const read = await adapter.read("nonexistent.jpg");
      expect(read).toBeNull();
    });
  });

  describe("ConfigurableMediaStorageService", () => {
    it("allows switching adapters dynamically without data loss", async () => {
      const memoryAdapter = new MemoryStorageAdapter();
      const service = new ConfigurableMediaStorageService(memoryAdapter);

      const buffer = Buffer.from("persisted through service");
      await service.write("photo_1.png", buffer, { mimeType: "image/png" });

      expect(await service.exists("photo_1.png")).toBe(true);
      const readBack = await service.read("photo_1.png");
      expect(readBack?.toString()).toBe("persisted through service");

      await service.delete("photo_1.png");
      expect(await service.exists("photo_1.png")).toBe(false);
    });
  });
});
