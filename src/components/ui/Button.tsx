"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils/cn";

type ButtonVariant =
  | "primary"
  | "secondary"
  | "outline"
  | "ghost"
  | "danger";

type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  loading?: boolean;
  leftIcon?: LucideIcon;
  rightIcon?: LucideIcon;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  children?: React.ReactNode;
  className?: string;
  type?: "button" | "submit" | "reset";
}

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-primary text-white hover:opacity-90 focus-visible:ring-primary",
  secondary:
    "bg-blue text-white hover:opacity-90 focus-visible:ring-blue",
  outline:
    "border-2 border-primary text-primary bg-transparent hover:bg-primary/10 focus-visible:ring-primary",
  ghost:
    "bg-transparent text-text hover:bg-black/5 focus-visible:ring-primary",
  danger:
    "bg-coral text-white hover:opacity-90 focus-visible:ring-coral",
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "px-3 py-1.5 text-sm gap-1.5 rounded-xl",
  md: "px-5 py-2.5 text-base gap-2 rounded-2xl",
  lg: "px-7 py-3.5 text-lg gap-2.5 rounded-2xl",
};

// Inline spinner SVG for loading state
function ButtonSpinner() {
  return (
    <svg
      className="animate-spin h-4 w-4"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8v8H4z"
      />
    </svg>
  );
}

export function Button({
  variant = "primary",
  size = "md",
  disabled = false,
  loading = false,
  leftIcon: LeftIcon,
  rightIcon: RightIcon,
  onClick,
  children,
  className,
  type = "button",
}: ButtonProps) {
  const shouldReduceMotion = useReducedMotion();
  const isDisabled = disabled || loading;

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={isDisabled}
      aria-disabled={isDisabled}
      aria-busy={loading}
      whileHover={shouldReduceMotion ? undefined : { scale: 1.03 }}
      whileTap={shouldReduceMotion ? undefined : { scale: 0.97 }}
      transition={{ type: "spring", stiffness: 400, damping: 20 }}
      className={cn(
        "inline-flex items-center justify-center font-semibold font-body",
        "transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
        "disabled:opacity-50 disabled:cursor-not-allowed",
        variantClasses[variant],
        sizeClasses[size],
        className
      )}
    >
      {loading && <ButtonSpinner />}
      {!loading && LeftIcon && <LeftIcon className="shrink-0" size={size === "sm" ? 14 : size === "lg" ? 20 : 16} />}
      {children}
      {!loading && RightIcon && <RightIcon className="shrink-0" size={size === "sm" ? 14 : size === "lg" ? 20 : 16} />}
    </motion.button>
  );
}
