import Link from "next/link";
import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

type Appearance = {
  variant?: "primary" | "secondary" | "inverse" | "ghost";
  size?: "sm" | "md";
  className?: string;
};
function classes({ variant = "primary", size = "md", className }: Appearance) {
  return cn("button", `button--${variant}`, `button--${size}`, className);
}
export function Button({
  variant,
  size,
  className,
  type = "button",
  ...props
}: ComponentProps<"button"> & Appearance) {
  return <button type={type} className={classes({ variant, size, className })} {...props} />;
}
/** Navigation uses links, actions use buttons. No nested interactive elements. */
export function ButtonLink({
  variant,
  size,
  className,
  ...props
}: ComponentProps<typeof Link> & Appearance) {
  return <Link className={classes({ variant, size, className })} {...props} />;
}
