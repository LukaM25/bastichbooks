"use client";

import { useGesture } from "@use-gesture/react";
import { DEFAULT_ROTATION_TARGET } from "@/features/home-book-3d/hooks/use-home-book-runtime-state";

type RotationTarget = {
  x: number;
  y: number;
};

type UseHomeBookGestureOptions = {
  sceneRef: React.RefObject<HTMLDivElement | null>;
  isTouchLike: boolean;
  touchActivated: boolean;
  motionEnabled: boolean;
  setTouchActivated: (value: boolean) => void;
  setRotationTarget: (target: RotationTarget) => void;
};

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

export function useHomeBookGesture({
  sceneRef,
  isTouchLike,
  touchActivated,
  motionEnabled,
  setTouchActivated,
  setRotationTarget,
}: UseHomeBookGestureOptions) {
  return useGesture(
    {
      onMove: ({ xy: [clientX, clientY], dragging }) => {
        if (!motionEnabled || dragging || !sceneRef.current) {
          return;
        }

        if (isTouchLike && !touchActivated) {
          return;
        }

        const rect = sceneRef.current.getBoundingClientRect();
        const x = (clientX - rect.left) / rect.width - 0.5;
        const y = (clientY - rect.top) / rect.height - 0.5;

        setRotationTarget({
          x: clamp(DEFAULT_ROTATION_TARGET.x - y * 0.1, -0.28, -0.06),
          y: clamp(DEFAULT_ROTATION_TARGET.y + x * 0.16, -0.12, 0.18),
        });
      },
      onHover: ({ hovering }) => {
        if (!hovering) {
          setRotationTarget(DEFAULT_ROTATION_TARGET);
        }
      },
      onDrag: ({ active, offset: [offsetX, offsetY] }) => {
        if (!motionEnabled) {
          return;
        }

        if (isTouchLike && !touchActivated) {
          setTouchActivated(true);
        }

        if (!active) {
          setRotationTarget(DEFAULT_ROTATION_TARGET);
          return;
        }

        setRotationTarget({
          x: clamp(DEFAULT_ROTATION_TARGET.x - offsetY * 0.0011, -0.3, -0.04),
          y: clamp(DEFAULT_ROTATION_TARGET.y + offsetX * 0.0018, -0.18, 0.22),
        });
      },
      onPointerDown: () => {
        if (isTouchLike) {
          setTouchActivated(true);
        }
      },
    },
    {
      drag: {
        filterTaps: true,
        pointer: {
          touch: true,
        },
      },
    },
  );
}
