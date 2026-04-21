import { cn } from "@/lib/utils";

export function StatusPill({
  label,
  tone = "neutral",
}: {
  label: string;
  tone?: "neutral" | "success" | "warning";
}) {
  return (
    <span
      className={cn(
        "inline-flex rounded-full px-3 py-1 text-xs font-medium uppercase tracking-[0.18em]",
        tone === "success" && "bg-olive/10 text-olive",
        tone === "warning" && "bg-gold/12 text-brown",
        tone === "neutral" && "bg-foreground/6 text-muted",
      )}
    >
      {label}
    </span>
  );
}
