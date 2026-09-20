import React from "react";

export interface AtmosphericGlowProps {
  theme?: "crimson-rose" | "midnight-violet" | "champagne-gold";
  intensity?: "subtle" | "medium" | "dramatic";
  className?: string;
}

export const AtmosphericGlow: React.FC<AtmosphericGlowProps> = ({
  theme = "crimson-rose",
  intensity = "subtle",
  className = "",
}) => {
  const gradientStyles = {
    "crimson-rose":
      "from-rose-600/20 via-pink-600/10 to-transparent",
    "midnight-violet":
      "from-purple-600/20 via-indigo-600/10 to-transparent",
    "champagne-gold":
      "from-amber-600/20 via-yellow-600/10 to-transparent",
  }[theme];

  const opacityStyles = {
    subtle: "opacity-40",
    medium: "opacity-60",
    dramatic: "opacity-80",
  }[intensity];

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 overflow-hidden select-none ${className}`}
    >
      {/* Primary center/upper ambient glow */}
      <div
        className={`absolute -top-[20%] left-1/2 -translate-x-1/2 w-[700px] h-[700px] sm:w-[900px] sm:h-[900px] rounded-full bg-gradient-to-b ${gradientStyles} blur-3xl ${opacityStyles}`}
      />
      {/* Secondary accent highlight */}
      <div
        className="absolute top-[40%] right-[10%] w-[350px] h-[350px] rounded-full bg-rose-500/5 blur-3xl opacity-30"
      />
    </div>
  );
};
