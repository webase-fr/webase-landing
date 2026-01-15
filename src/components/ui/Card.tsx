import { cn } from "@/lib/utils";
import React from "react";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  noHover?: boolean;
}

export function Card({ className, children, noHover = false, ...props }: CardProps) {
  return (
    <div
      className={cn(
        "bg-surface-1 border border-border transition-all duration-300",
        "rounded-[var(--radius-md)]", // Sharp corners
        !noHover && "hover:border-brand hover:shadow-lg hover:shadow-brand/5",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
