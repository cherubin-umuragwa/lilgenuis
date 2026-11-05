import React from "react";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils/cn";

type BadgeVariant =
  | "primary"
  | "blue"
  | "turquoise"
  | "coral"
  | "yellow"
  | "pink"
  | "mint"
  | "default";

type BadgeSize = "sm" | "md";

interface BadgeProps {
  children?: React.ReactNode;
  variant?: BadgeVariant;
  size?: BadgeSize;
  icon?: LucideIcon;
  className?: string;
}

const variantClasses: Record<BadgeVariant, string> = {
  primary: "bg-primary/15 text-primary",
  blue: "bg-blue/15 text-blue",
  turquoise: "bg-turquoise/15 text-turquoise",
  coral: "bg-coral/15 text-coral",
  yellow: "bg-yellow/20 text-amber-700",
  pink: "bg-pink/15 text-pink",
  mint: "bg-mint/15 text-mint",
  default: "bg-gray-100 text-gray-700",
};

const sizeClasses: Record<BadgeSize, string> = {
  sm: "px-2 py-0.5 text-xs gap-1",
  md: "px-3 py-1 text-sm gap-1.5",
};

export function Badge({
  children,
  variant = "default",
  size = "md",
  icon: Icon,
  className,
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full font-semibold",
        variantClasses[variant],
        sizeClasses[size],
        className
      )}
    >
      {Icon && <Icon size={size === "sm" ? 10 : 12} aria-hidden="true" />}
      {children}
    </span>
  );
}
