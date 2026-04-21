"use client";

import { Suspense, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import type { PublishedBookCard } from "@/features/books/queries";
import { HomeBookPageOverlay } from "@/features/home-book-3d/components/home-book-page-overlay";
import { HomeBookPoster } from "@/features/home-book-3d/components/home-book-poster";
import { HomeBookScene } from "@/features/home-book-3d/components/home-book-scene";
import { HomeBookSceneControls } from "@/features/home-book-3d/components/home-book-scene-controls";
import { homeBook3DScene } from "@/features/home-book-3d/config/scene";
import { useHomeBookGesture } from "@/features/home-book-3d/hooks/use-home-book-gesture";
import {
  DEFAULT_ROTATION_TARGET,
  useHomeBookRuntimeState,
} from "@/features/home-book-3d/hooks/use-home-book-runtime-state";

type HomeBook3DExperienceProps = {
  featuredBooks: PublishedBookCard[];
  latestBooks: PublishedBookCard[];
};

export function HomeBook3DExperience({
  featuredBooks,
  latestBooks,
}: HomeBook3DExperienceProps) {
  const sceneRef = useRef<HTMLDivElement | null>(null);
  const [sceneReady, setSceneReady] = useState(false);
  const {
    selectedChapter,
    setSelectedChapter,
    touchActivated,
    setTouchActivated,
    isTouchLike,
    motionEnabled,
    setMotionEnabled,
    rotationTarget,
    setRotationTarget,
  } = useHomeBookRuntimeState();

  const bind = useHomeBookGesture({
    sceneRef,
    isTouchLike,
    touchActivated,
    motionEnabled,
    setTouchActivated,
    setRotationTarget,
  });

  function handleSelectChapter(chapterId: Parameters<typeof setSelectedChapter>[0]) {
    if (isTouchLike) {
      setTouchActivated(true);
    }

    setSelectedChapter(chapterId);
  }

  return (
    <section className="relative left-1/2 -mt-8 w-screen -translate-x-1/2 overflow-hidden">
      <div
        ref={(node) => {
          sceneRef.current = node;
        }}
        className="relative h-[clamp(44rem,calc(100svh-5rem),62rem)] min-h-[44rem] overflow-hidden"
        {...bind()}
      >
        <HomeBookPoster />

        <div
          className={`absolute inset-0 transition-opacity duration-700 ${
            sceneReady ? "opacity-100" : "opacity-0"
          }`}
        >
          <Canvas
            dpr={[1, 1.75]}
            shadows
            gl={{ antialias: true }}
            camera={{
              fov: homeBook3DScene.camera.fov,
              position: [...homeBook3DScene.camera.position],
            }}
          >
            <Suspense fallback={null}>
              <HomeBookScene
                selectedChapter={selectedChapter}
                rotationTarget={
                  motionEnabled || (isTouchLike && touchActivated)
                    ? rotationTarget
                    : DEFAULT_ROTATION_TARGET
                }
                motionEnabled={motionEnabled}
                onSceneReady={() => setSceneReady(true)}
              />
            </Suspense>
          </Canvas>
        </div>

        <HomeBookPageOverlay
          selectedChapter={selectedChapter}
          featuredBooks={featuredBooks}
          latestBooks={latestBooks}
          onSelectChapter={handleSelectChapter}
        />

        <HomeBookSceneControls
          motionEnabled={motionEnabled}
          onToggleMotion={() => {
            setMotionEnabled(!motionEnabled);
            setRotationTarget(DEFAULT_ROTATION_TARGET);
          }}
          showTouchHint={isTouchLike && !touchActivated}
        />
      </div>
    </section>
  );
}
