import * as React from "react";
import { cn } from "@/lib/utils";

export function Input({
  className,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={cn(
        "w-full rounded-3xl border border-line bg-white/70 px-4 py-3 text-sm text-foreground shadow-sm outline-none transition placeholder:text-muted focus:border-gold focus:bg-white",
        className,
      )}
      {...props}
    />
  );
}
