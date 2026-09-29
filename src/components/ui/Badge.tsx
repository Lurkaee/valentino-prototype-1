import React from "react";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "neutral" | "rose" | "gold" | "violet";
  size?: "sm" | "md";
}

export const Badge: React.FC<BadgeProps> = ({
  className = "",
  variant = "neutral",
  size = "md",
  children,
  ...props
}) => {
  const sizeStyles = {
    sm: "text-[10px] px-2.5 py-0.5 tracking-wider",
    md: "text-xs px-3 py-1 tracking-widest",
  }[size];

  const variantStyles = {
    neutral: "bg-white/[0.05] text-[#D5CEBF] border-white/10",
    rose: "bg-rose-950/50 text-rose-300 border-rose-800/40",
    gold: "bg-amber-950/50 text-amber-300 border-amber-800/40",
    violet: "bg-purple-950/50 text-purple-300 border-purple-800/40",
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
