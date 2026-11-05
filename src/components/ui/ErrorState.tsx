import React from "react";
import { AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils/cn";

interface ErrorStateProps {
  title?: string;
  message: string;
  onRetry?: () => void;
  className?: string;
}

export function ErrorState({
  title = "Something went wrong",
  message,
  onRetry,
  className,
}: ErrorStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-4 py-12 px-6 text-center rounded-2xl bg-coral/10 border border-coral/20",
        className
      )}
      role="alert"
    >
      <AlertCircle size={40} className="text-coral" aria-hidden="true" />
      <div>
        <h3 className="text-lg font-bold text-text font-heading">{title}</h3>
        <p className="mt-1 text-gray-600 font-body text-sm">{message}</p>
      </div>
      {onRetry && (
        <button
          onClick={onRetry}
          className="px-5 py-2.5 bg-coral text-white rounded-2xl font-semibold hover:opacity-90 transition-opacity"
        >
          Try Again
        </button>
      )}
    </div>
  );
}
