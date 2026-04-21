"use client";

import { useEffect, useState } from "react";
import type { HomeChapterId } from "@/features/home-book/config/chapters";
import { homeBookRuntimeState } from "@/features/home-book/lib/runtime-state";

type RotationTarget = {
  x: number;
  y: number;
};

export const DEFAULT_ROTATION_TARGET: RotationTarget = {
  x: -0.18,
  y: 0.02,
};

export function useHomeBookRuntimeState() {
  const [selectedChapter, setSelectedChapterState] = useState<HomeChapterId | null>(
    homeBookRuntimeState.selectedChapter,
  );
  const [touchActivated, setTouchActivatedState] = useState(
    homeBookRuntimeState.touchActivated,
  );
  const [isTouchLike, setIsTouchLike] = useState(false);
  const [motionEnabled, setMotionEnabledState] = useState(() => {
    if (homeBookRuntimeState.motionEnabled !== null) {
      return homeBookRuntimeState.motionEnabled;
    }

    return true;
  });
  const [rotationTarget, setRotationTarget] = useState(DEFAULT_ROTATION_TARGET);

  useEffect(() => {
    const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const touchQuery = window.matchMedia("(hover: none), (pointer: coarse)");

    if (homeBookRuntimeState.motionEnabled === null) {
      setMotionEnabledState(!reducedMotionQuery.matches);
    }

    setIsTouchLike(touchQuery.matches);
  }, []);

  useEffect(() => {
    homeBookRuntimeState.selectedChapter = selectedChapter;
  }, [selectedChapter]);

  useEffect(() => {
    homeBookRuntimeState.touchActivated = touchActivated;
  }, [touchActivated]);

  useEffect(() => {
    homeBookRuntimeState.motionEnabled = motionEnabled;
  }, [motionEnabled]);

  function setSelectedChapter(chapterId: HomeChapterId | null) {
    setSelectedChapterState(chapterId);
  }

  function setTouchActivated(value: boolean) {
    setTouchActivatedState(value);
  }

  function setMotionEnabled(value: boolean) {
    setMotionEnabledState(value);
  }

  return {
    selectedChapter,
    setSelectedChapter,
    touchActivated,
    setTouchActivated,
    isTouchLike,
    motionEnabled,
    setMotionEnabled,
    rotationTarget,
    setRotationTarget,
  };
}
