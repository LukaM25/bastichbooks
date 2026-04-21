import * as React from "react";
import { cn } from "@/lib/utils";

export function Select({
  className,
  ...props
}: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select
      className={cn(
        "w-full rounded-full border border-line bg-white/70 px-4 py-3 text-sm text-foreground shadow-sm outline-none transition focus:border-gold focus:bg-white",
        className,
      )}
      {...props}
    />
  );
}
