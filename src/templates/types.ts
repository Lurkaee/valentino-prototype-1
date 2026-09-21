import React from "react";
import { z } from "zod";

export type RenderMode = "preview" | "public";

export type AccentTheme = "crimson-rose" | "midnight-violet" | "champagne-gold";

export interface TemplateRenderProps<T = unknown> {
  config: T;
  mode: RenderMode;
  publicId?: string;
}


export type TemplateAvailability = "available" | "experimental" | "coming-soon";

export interface TemplateDefinition<TDraft = any, TPublished = any> {
  id: string;
  version: string;
  name: string;
  description: string;
  tagline?: string;
  atmosphere?: string;
  signature?: string;
  availability?: TemplateAvailability;
  category?: string;
  supportedModules?: string[];
  draftSchema: z.ZodType<TDraft, z.ZodTypeDef, any>;
  publishSchema: z.ZodType<TPublished, z.ZodTypeDef, any>;
  defaultConfig: TDraft;
  normalizeConfig: (raw: unknown, isPublic?: boolean) => TPublished;
  Component: React.ComponentType<TemplateRenderProps<TPublished>>;

  renderSsrHtml?: (config: TPublished) => string;
}
