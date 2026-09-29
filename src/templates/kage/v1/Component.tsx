"use client";

import React from "react";
import { KagePublishedConfig } from "./schema";
import { RenderMode } from "../../types";
import { KageLandingPage } from "@/shaders/landing-pages/LandingPages";
import { ModulesRenderer } from "@/modules/ModulesRenderer";

interface ComponentProps {
  config: KagePublishedConfig;
  mode: RenderMode;
  publicId?: string;
}

export const KageComponent: React.FC<ComponentProps> = ({ config, mode, publicId }) => {
  const themePrimaryColor = config.accentTheme === "sanctuary-emerald"
    ? "#10b981"
    : config.accentTheme === "moonlit-stone"
    ? "#94a3b8"
    : "#e0231c"; // Kyoto Crimson default

  return (
    <KageLandingPage
      headingFont="onest"
      bodyFont="onest"
      headingWeight="400"
      bodyWeight="300"
      primaryColor={themePrimaryColor}
      headingSize={46}
      bodySize={17}
      headingLetterSpacing={-0.012}
      partnerName={config.partnerName}
      senderName={config.senderName}
      greeting={config.greeting}
      message={config.message}
      signOff={config.signOff}
      modulesNode={
        config.modules && (
          <ModulesRenderer
            modules={config.modules}
            moduleOrder={config.moduleOrder}
            mode={mode}
            publicId={publicId}
            theme="kage"
          />
        )
      }
    />
  );
};
