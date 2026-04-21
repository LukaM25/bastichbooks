import * as React from "react";
import { cn } from "@/lib/utils";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "ghost" | "danger";
};

const variants: Record<NonNullable<ButtonProps["variant"]>, string> = {
  primary:
    "bg-olive text-paper hover:bg-olive-deep focus-visible:ring-olive/40 shadow-[0_12px_24px_rgba(49,61,38,0.22)]",
  secondary:
    "bg-paper text-foreground ring-1 ring-line hover:bg-[#f8f0df] focus-visible:ring-gold/35",
  ghost:
    "bg-transparent text-foreground hover:bg-white/40 focus-visible:ring-gold/35",
  danger:
    "bg-[#7d2a1d] text-white hover:bg-[#642217] focus-visible:ring-[#7d2a1d]/35",
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", type = "button", ...props }, ref) => (
    <button
      ref={ref}
      type={type}
      className={cn(
        "inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-medium transition duration-200 focus-visible:outline-none focus-visible:ring-4 disabled:cursor-not-allowed disabled:opacity-60",
        variants[variant],
        className,
      )}
      {...props}
    />
  ),
);

Button.displayName = "Button";
