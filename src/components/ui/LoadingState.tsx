import React from "react";
import { Spinner } from "./Spinner";
import { cn } from "@/lib/utils/cn";

interface LoadingStateProps {
  message?: string;
  className?: string;
}

export function LoadingState({ message, className }: LoadingStateProps) {
  return (
    <div
      role="status"
      aria-label={message ?? "Loading"}
      className={cn(
        "flex flex-col items-center justify-center gap-4 py-16",
        className
      )}
    >
      <Spinner size={40} />
      {message && (
        <p className="text-gray-500 font-body text-sm">{message}</p>
      )}
    </div>
  );
}
