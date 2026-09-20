import { TemplateDefinition } from "./types";
import {
  midnightRoseDraftSchema,
  midnightRosePublishSchema,
  MidnightRoseDraftConfig,
  MidnightRosePublishedConfig,
} from "./midnight-rose/v1/schema";
import { normalizeMidnightRoseConfig } from "./midnight-rose/v1/normalize";
import { MidnightRoseComponent } from "./midnight-rose/v1/Component";

import { DEFAULT_VALENTINE_DECOR } from "@/types/decor";

export const midnightRoseV1: TemplateDefinition<
  MidnightRoseDraftConfig,
  MidnightRosePublishedConfig
> = {
  id: "midnight-rose",
  version: "v1",
  name: "Midnight Rose",
  description: "An intimate, starlight-themed love letter sealed with digital wax.",
  draftSchema: midnightRoseDraftSchema,
  publishSchema: midnightRosePublishSchema,
  defaultConfig: {
    partnerName: "",
    senderName: "",
    greeting: "To my favorite person",
    message: "",
    signOff: "With all my love",
    accentTheme: "crimson-rose",
    heroMediaId: null,
    decor: DEFAULT_VALENTINE_DECOR,
  },
  normalizeConfig: normalizeMidnightRoseConfig,
  Component: MidnightRoseComponent,
};

const templates = new Map<string, TemplateDefinition<any, any>>();

function getKey(id: string, version: string): string {
  return `${id}@${version}`;
}

templates.set(getKey(midnightRoseV1.id, midnightRoseV1.version), midnightRoseV1);

export function getTemplateDefinition(
  id: string,
  version: string
): TemplateDefinition<any, any> | null {
  return templates.get(getKey(id, version)) || null;
}

export function getAllTemplates(): TemplateDefinition<any, any>[] {
  return Array.from(templates.values());
}
