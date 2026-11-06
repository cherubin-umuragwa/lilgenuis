"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils/cn";

interface CardProps {
  children?: React.ReactNode;
  className?: string;
  accent?: string; // CSS color applied as a top border
  hoverable?: boolean;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
}

export function Card({
  children,
  className,
  accent,
  hoverable = false,
  onClick,
}: CardProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      onClick={onClick}
      whileHover={
        hoverable && !shouldReduceMotion
          ? { y: -6, boxShadow: "0 12px 40px rgba(118,86,232,0.18)" }
          : undefined
      }
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className={cn(
        "bg-white rounded-3xl shadow-lg overflow-hidden",
        hoverable && "cursor-pointer",
        accent && "border-t-4",
        className
      )}
      style={accent ? { borderTopColor: accent } : undefined}
    >
      {children}
    </motion.div>
  );
}

export function CardHeader({
  children,
  className,
}: {
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("px-5 pt-5 pb-3", className)}>{children}</div>
  );
}

export function CardBody({
  children,
  className,
}: {
  children?: React.ReactNode;
  className?: string;
}) {
  return <div className={cn("px-5 py-3", className)}>{children}</div>;
}

export function CardFooter({
  children,
  className,
}: {
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "px-5 pt-3 pb-5 border-t border-gray-100",
        className
      )}
    >
      {children}
    </div>
  );
}
