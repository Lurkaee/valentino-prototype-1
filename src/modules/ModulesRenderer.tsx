"use client";

import React from "react";
import { getModuleDefinition } from "./registry";
import { ModulesConfig } from "./registry";
import { RenderMode } from "./types";

interface ModulesRendererProps {
  modules?: ModulesConfig;
  moduleOrder?: string[];
  mode: RenderMode;
  publicId?: string;
  theme?: string;
  className?: string;
}

const DEFAULT_ORDER = [
  "voiceNote",
  "videoMemory",
  "memories",
  "timeline",
  "quiz",
  "secret",
  "openWhen",
];

export const ModulesRenderer: React.FC<ModulesRendererProps> = ({
  modules,
  moduleOrder,
  mode,
  publicId,
  theme = "midnight-rose",
  className = "",
}) => {
  if (!modules || typeof modules !== "object") {
    return null;
  }

  const order = moduleOrder && moduleOrder.length > 0 ? moduleOrder : DEFAULT_ORDER;

  // Render modules in specified or default order
  const renderedModules: React.ReactNode[] = [];

  for (const moduleId of order) {
    const moduleConfig = modules[moduleId];
    if (moduleConfig && moduleConfig.enabled) {
      const def = getModuleDefinition(moduleId);
      if (def) {
        const Component = def.Component;
        renderedModules.push(
          <div key={`module-${moduleId}`} className="w-full">
            <Component
              config={moduleConfig}
              mode={mode}
              publicId={publicId}
              theme={theme}
            />
          </div>
        );
      }
    }
  }

  if (renderedModules.length === 0) {
    return null;
  }

  return (
    <div className={`w-full max-w-xl mx-auto space-y-10 my-8 ${className}`}>
      {renderedModules}
    </div>
  );
};
