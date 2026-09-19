"use client";

import React from "react";
import { getTemplateDefinition } from "./registry";
import { RenderMode } from "./types";

interface ExperienceRendererProps {
  templateId: string;
  templateVersion: string;
  mode: RenderMode;
  rawConfig: unknown;
}

export const ExperienceRenderer: React.FC<ExperienceRendererProps> = ({
  templateId,
  templateVersion,
  mode,
  rawConfig,
}) => {
  const template = getTemplateDefinition(templateId, templateVersion);

  if (!template) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center p-8 text-center text-rose-400">
        <p>Template {templateId} ({templateVersion}) not found.</p>
      </div>
    );
  }

  // Unified contract: always normalize config before passing to component
  const normalizedConfig = template.normalizeConfig(rawConfig);
  const Component = template.Component;

  return <Component config={normalizedConfig} mode={mode} />;
};
