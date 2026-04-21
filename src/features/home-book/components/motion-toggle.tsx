"use client";

type MotionToggleProps = {
  enabled: boolean;
  onToggle: () => void;
};

export function MotionToggle({ enabled, onToggle }: MotionToggleProps) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className="surface-card absolute right-4 top-4 z-30 inline-flex items-center gap-3 rounded-full px-3 py-2 text-xs uppercase tracking-[0.18em] text-foreground md:right-6 md:top-6"
      aria-pressed={enabled}
    >
      <span>Bewegung</span>
      <span
        className={`relative h-5 w-10 rounded-full transition ${
          enabled ? "bg-olive/75" : "bg-foreground/15"
        }`}
      >
        <span
          className={`absolute top-0.5 h-4 w-4 rounded-full bg-paper transition ${
            enabled ? "left-5" : "left-0.5"
          }`}
        />
      </span>
    </button>
  );
}
