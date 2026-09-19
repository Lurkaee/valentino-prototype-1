export interface ResolvedMedia {
  url: string;
  altText?: string;
  width?: number;
  height?: number;
}

export interface MediaStore {
  resolve(mediaIdOrKey?: string | null): Promise<ResolvedMedia | null>;
}

export class SafeMediaStore implements MediaStore {
  async resolve(mediaIdOrKey?: string | null): Promise<ResolvedMedia | null> {
    if (!mediaIdOrKey || typeof mediaIdOrKey !== "string") {
      return null;
    }
    // In M1, media uploads are deferred. If a valid URL is passed or fixture key:
    if (mediaIdOrKey.startsWith("https://") || mediaIdOrKey.startsWith("http://")) {
      return { url: mediaIdOrKey, altText: "Valentine Media" };
    }
    return null;
  }
}

export const mediaStore: MediaStore = new SafeMediaStore();
