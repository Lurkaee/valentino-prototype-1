"use client";

import React, { type CSSProperties } from "react";
import {
  PlasmaButton,
  type NeuformIsolatedEffectProps,
} from "./neuform-isolated/NeuformIsolatedEffects";

export interface ShaderButtonsProps extends NeuformIsolatedEffectProps {
  variant: "plasma-button" | string;
  className?: string;
  style?: CSSProperties;
}

/**
 * ThreeUI ShaderButtons component
 * Exact-source integration of the official ThreeUI visual primitive.
 */
export function ShaderButtons({
  variant = "plasma-button",
  mode = "dark",
  hue = 0,
  saturation = 1.0,
  brightness = 1.0,
  className,
  style,
  ...rest
}: ShaderButtonsProps) {
  if (variant === "plasma-button") {
    return (
      <PlasmaButton
        mode={mode}
        hue={hue}
        saturation={saturation}
        brightness={brightness}
        className={className}
        style={style}
        {...rest}
      />
    );
  }

  // Fallback / default to PlasmaButton
  return (
    <PlasmaButton
      mode={mode}
      hue={hue}
      saturation={saturation}
      brightness={brightness}
      className={className}
      style={style}
      {...rest}
    />
  );
}

export default ShaderButtons;
