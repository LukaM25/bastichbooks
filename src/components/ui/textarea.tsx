import * as React from "react";
import { cn } from "@/lib/utils";

export function Textarea({
  className,
  ...props
}: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      className={cn(
        "min-h-32 w-full rounded-[1.75rem] border border-line bg-white/70 px-4 py-3 text-sm text-foreground shadow-sm outline-none transition placeholder:text-muted focus:border-gold focus:bg-white",
        className,
      )}
      {...props}
    />
  );
}
