import { cn } from "@/lib/utils";
import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
}

export const buttonVariants = {
  primary: "bg-brand text-brand-foreground hover:bg-brand/90 hover:shadow-sm",
  secondary: "bg-surface-2 text-text hover:bg-surface-2/80",
  outline: "bg-transparent border border-border text-text hover:bg-surface-1 hover:border-text",
  ghost: "bg-transparent text-text hover:bg-surface-1",
};

export const buttonSizes = {
  sm: "h-9 px-4 text-sm",
  md: "h-11 px-6 text-base",
  lg: "h-14 px-8 text-lg",
};

export function Button({
  className,
  variant = "primary",
  size = "md",
  children,
  asChild,
  ...props
}: ButtonProps & { asChild?: boolean }) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center font-semibold transition-all duration-200 cursor-pointer border border-transparent",
        "rounded-[var(--radius-sm)]", // Use token for sharp radius
        "focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2",
        buttonVariants[variant],
        buttonSizes[size],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
