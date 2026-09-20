import React from "react";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "rose" | "gold" | "violet" | "neutral";
  size?: "sm" | "md";
}

export const Badge: React.FC<BadgeProps> = ({
  className = "",
  variant = "rose",
  size = "md",
  children,
  ...props
}) => {
  const sizeStyles = {
    sm: "text-[10px] px-2.5 py-0.5 tracking-wider",
    md: "text-xs px-3 py-1 tracking-widest",
  }[size];

  const variantStyles = {
    rose: "bg-rose-950/60 text-rose-300 border-rose-800/40",
    gold: "bg-amber-950/60 text-amber-300 border-amber-800/40",
    violet: "bg-purple-950/60 text-purple-300 border-purple-800/40",
    neutral: "bg-white/[0.06] text-ivory-200 border-white/10",
  }[variant];

  return (
    <span
      className={`inline-flex items-center gap-1.5 uppercase font-medium rounded-full border ${sizeStyles} ${variantStyles} ${className}`}
      {...props}
    >
      {children}
    </span>
  );
};
