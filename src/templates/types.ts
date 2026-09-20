import React from "react";
import { z } from "zod";

export type RenderMode = "preview" | "public";

export type AccentTheme = "crimson-rose" | "midnight-violet" | "champagne-gold";

export interface TemplateRenderProps<T = unknown> {
  config: T;
  mode: RenderMode;
}

export interface TemplateDefinition<TDraft = any, TPublished = any> {
  id: string;
  version: string;
  name: string;
  description: string;
  draftSchema: z.ZodType<TDraft, z.ZodTypeDef, any>;
  publishSchema: z.ZodType<TPublished, z.ZodTypeDef, any>;
  defaultConfig: TDraft;
  normalizeConfig: (raw: unknown) => TPublished;
  Component: React.ComponentType<TemplateRenderProps<TPublished>>;
  renderSsrHtml?: (config: TPublished) => string;
}
