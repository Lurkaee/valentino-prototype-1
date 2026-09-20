import React, { forwardRef } from "react";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "glass" | "solid" | "elevated" | "bordered";
  glow?: "none" | "rose" | "gold" | "violet";
}

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className = "", variant = "glass", glow = "none", children, ...props }, ref) => {
    const baseStyles = "relative rounded-2xl transition-all duration-300";

    const variantStyles = {
      glass: "bg-white/[0.03] backdrop-blur-xl border border-white/[0.08] shadow-2xl",
      solid: "bg-obsidian-900 border border-white/[0.06] shadow-xl",
      elevated: "bg-obsidian-850 border border-white/[0.1] shadow-2xl shadow-black/80",
      bordered: "bg-transparent border border-white/15",
    }[variant];

    const glowStyles = {
      none: "",
      rose: "shadow-rose-950/40 border-rose-500/20",
      gold: "shadow-amber-950/40 border-amber-500/20",
      violet: "shadow-purple-950/40 border-purple-500/20",
    }[glow];

    return (
      <div ref={ref} className={`${baseStyles} ${variantStyles} ${glowStyles} ${className}`} {...props}>
        {children}
      </div>
    );
  }
);

Card.displayName = "Card";
