"use client";

type HomeBookSceneControlsProps = {
  motionEnabled: boolean;
  onToggleMotion: () => void;
  showTouchHint: boolean;
};

export function HomeBookSceneControls({
  motionEnabled,
  onToggleMotion,
  showTouchHint,
}: HomeBookSceneControlsProps) {
  return (
    <>
      <button
        type="button"
        onClick={onToggleMotion}
        className="surface-card absolute right-4 top-4 z-20 inline-flex items-center gap-3 rounded-full px-3 py-2 text-xs uppercase tracking-[0.18em] text-foreground md:right-6 md:top-6"
        aria-pressed={motionEnabled}
      >
        <span>Bewegung</span>
        <span
          className={`relative h-5 w-10 rounded-full transition ${
            motionEnabled ? "bg-olive/75" : "bg-foreground/15"
          }`}
        >
          <span
            className={`absolute top-0.5 h-4 w-4 rounded-full bg-paper transition ${
              motionEnabled ? "left-5" : "left-0.5"
            }`}
          />
        </span>
      </button>

      <div className="pointer-events-none absolute left-4 top-4 z-20 rounded-full border border-white/18 bg-[#23150d]/26 px-4 py-2 text-[11px] uppercase tracking-[0.22em] text-[#f8efdf] backdrop-blur md:left-6 md:top-6">
        Dom Bastich · Archivband
      </div>

      {showTouchHint ? (
        <div className="pointer-events-none absolute bottom-6 left-1/2 z-20 -translate-x-1/2 rounded-full border border-white/15 bg-[#23150d]/26 px-4 py-2 text-[11px] uppercase tracking-[0.18em] text-[#f8efdf] backdrop-blur">
          Berühre das Buch, um es zu bewegen
        </div>
      ) : null}
    </>
  );
}
