"use client";

import React, { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { cn } from "@/lib/utils/cn";

type ModalSize = "sm" | "md" | "lg" | "xl";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children?: React.ReactNode;
  size?: ModalSize;
}

const sizeClasses: Record<ModalSize, string> = {
  sm: "max-w-sm",
  md: "max-w-md",
  lg: "max-w-lg",
  xl: "max-w-xl",
};

export function Modal({
  isOpen,
  onClose,
  title,
  children,
  size = "md",
}: ModalProps) {
  const dialogRef = useRef<HTMLDivElement>(null);

  // Close on Escape
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) onClose();
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [isOpen, onClose]);

  // Focus trap
  useEffect(() => {
    if (!isOpen) return;
    const el = dialogRef.current;
    if (!el) return;

    const focusable = el.querySelectorAll<HTMLElement>(
      'a, button, input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    if (focusable.length > 0) focusable[0].focus();

    const handleTab = (e: KeyboardEvent) => {
      if (e.key !== "Tab" || focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", handleTab);
    return () => document.removeEventListener("keydown", handleTab);
  }, [isOpen]);

  const portal =
    typeof document !== "undefined"
      ? createPortal(
          <AnimatePresence>
            {isOpen && (
              <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                {/* Backdrop */}
                <motion.div
                  className="absolute inset-0 bg-black/40 backdrop-blur-sm"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={onClose}
                  aria-hidden="true"
                />

                {/* Dialog */}
                <motion.div
                  ref={dialogRef}
                  role="dialog"
                  aria-modal="true"
                  aria-labelledby={title ? "modal-title" : undefined}
                  className={cn(
                    "relative z-10 w-full bg-white rounded-2xl shadow-xl overflow-hidden",
                    sizeClasses[size]
                  )}
                  initial={{ opacity: 0, scale: 0.92, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.92, y: 20 }}
                  transition={{ type: "spring", stiffness: 350, damping: 25 }}
                >
                  {/* Header */}
                  {title && (
                    <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
                      <h2
                        id="modal-title"
                        className="text-lg font-bold text-text font-heading"
                      >
                        {title}
                      </h2>
                      <button
                        onClick={onClose}
                        className="p-1.5 rounded-xl hover:bg-gray-100 transition-colors"
                        aria-label="Close modal"
                      >
                        <X size={18} />
                      </button>
                    </div>
                  )}

                  {/* Body */}
                  <div className="p-6">{children}</div>
                </motion.div>
              </div>
            )}
          </AnimatePresence>,
          document.body
        )
      : null;

  return portal;
}
