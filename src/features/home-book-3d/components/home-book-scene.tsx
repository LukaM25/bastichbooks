"use client";

import { useEffect, useRef } from "react";
import { ContactShadows, Environment, useTexture } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { EffectComposer, Bloom, Vignette } from "@react-three/postprocessing";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { RepeatWrapping } from "three";
import type { Group, PointLight } from "three";
import type { HomeChapterId } from "@/features/home-book/config/chapters";
import { HomeBookBook } from "@/features/home-book-3d/components/home-book-book";
import { HomeBookScenePropsGroup } from "@/features/home-book-3d/components/home-book-scene-props";
import { homeBook3DAssets } from "@/features/home-book-3d/config/assets";

gsap.registerPlugin(useGSAP);

type HomeBookSceneProps = {
  selectedChapter: HomeChapterId | null;
  rotationTarget: {
    x: number;
    y: number;
  };
  motionEnabled: boolean;
  onSceneReady: () => void;
};

export function HomeBookScene({
  selectedChapter,
  rotationTarget,
  motionEnabled,
  onSceneReady,
}: HomeBookSceneProps) {
  const rootRef = useRef<Group | null>(null);
  const bookRef = useRef<Group | null>(null);
  const rightLeafRef = useRef<Group | null>(null);
  const lampLightRef = useRef<PointLight | null>(null);
  const coverColor = useTexture(homeBook3DAssets.textures.cover.color);
  const coverNormal = useTexture(homeBook3DAssets.textures.cover.normal);
  const coverRoughness = useTexture(homeBook3DAssets.textures.cover.roughness);
  const paperColor = useTexture(homeBook3DAssets.textures.paper.color);
  const paperNormal = useTexture(homeBook3DAssets.textures.paper.normal);
  const paperRoughness = useTexture(homeBook3DAssets.textures.paper.roughness);
  const woodColor = useTexture(homeBook3DAssets.textures.wood.color);
  const woodNormal = useTexture(homeBook3DAssets.textures.wood.normal);
  const woodRoughness = useTexture(homeBook3DAssets.textures.wood.roughness);
  useEffect(() => {
    [
      coverColor,
      coverNormal,
      coverRoughness,
      paperColor,
      paperNormal,
      paperRoughness,
      woodColor,
      woodNormal,
      woodRoughness,
    ].forEach((texture) => {
      texture.flipY = false;
    });

    woodColor.wrapS = RepeatWrapping;
    woodColor.wrapT = RepeatWrapping;
    woodColor.repeat.set(2.4, 2.4);

    woodNormal.wrapS = RepeatWrapping;
    woodNormal.wrapT = RepeatWrapping;
    woodNormal.repeat.set(2.4, 2.4);

    woodRoughness.wrapS = RepeatWrapping;
    woodRoughness.wrapT = RepeatWrapping;
    woodRoughness.repeat.set(2.4, 2.4);

    onSceneReady();
  }, [
    coverColor,
    coverNormal,
    coverRoughness,
    onSceneReady,
    paperColor,
    paperNormal,
    paperRoughness,
    woodColor,
    woodNormal,
    woodRoughness,
  ]);

  useGSAP(
    () => {
      if (!rightLeafRef.current) {
        return;
      }

      const timeline = gsap.timeline();

      timeline
        .to(rightLeafRef.current.rotation, {
          z: -0.24,
          duration: 0.18,
          ease: "power2.in",
        })
        .to(
          rightLeafRef.current.position,
          {
            y: -0.01,
            x: 0.09,
            duration: 0.18,
            ease: "power2.in",
          },
          "<",
        )
        .to(rightLeafRef.current.rotation, {
          z: -0.14,
          duration: 0.38,
          ease: "power3.out",
        })
        .to(
          rightLeafRef.current.position,
          {
            y: -0.035,
            x: 0.05,
            duration: 0.38,
            ease: "power3.out",
          },
          "<",
        );
    },
    {
      dependencies: [selectedChapter],
      scope: rootRef,
    },
  );

  useFrame((state, delta) => {
    if (bookRef.current) {
      bookRef.current.rotation.x = gsap.utils.interpolate(
        bookRef.current.rotation.x,
        rotationTarget.x,
        1 - Math.exp(-delta * 4),
      );
      bookRef.current.rotation.y = gsap.utils.interpolate(
        bookRef.current.rotation.y,
        rotationTarget.y,
        1 - Math.exp(-delta * 4),
      );
      bookRef.current.rotation.z = gsap.utils.interpolate(
        bookRef.current.rotation.z,
        0.015,
        1 - Math.exp(-delta * 4),
      );

      if (motionEnabled) {
        bookRef.current.position.y = -0.28 + Math.sin(state.clock.elapsedTime * 0.45) * 0.01;
      } else {
        bookRef.current.position.y = gsap.utils.interpolate(
          bookRef.current.position.y,
          -0.28,
          1 - Math.exp(-delta * 4),
        );
      }
    }

    if (lampLightRef.current) {
      lampLightRef.current.intensity = 1.55 + Math.sin(state.clock.elapsedTime * 0.8) * 0.08;
    }
  });

  return (
    <>
      <color attach="background" args={["#533a2a"]} />
      <Environment files={homeBook3DAssets.hdri} />

      <group ref={rootRef}>
        <mesh position={[0, 2.25, -4.8]} receiveShadow>
          <planeGeometry args={[18, 10]} />
          <meshBasicMaterial color="#503928" />
        </mesh>

        <mesh
          rotation={[-Math.PI / 2, 0, 0]}
          position={[0, -0.44, 0.2]}
          receiveShadow
        >
          <planeGeometry args={[18, 12]} />
          <meshStandardMaterial
            map={woodColor}
            normalMap={woodNormal}
            roughnessMap={woodRoughness}
            color="#6d4a30"
            roughness={0.84}
          />
        </mesh>

        <HomeBookScenePropsGroup />

        <HomeBookBook
          bookRef={bookRef}
          rightLeafRef={rightLeafRef}
          coverTextures={{
            color: coverColor,
            normal: coverNormal,
            roughness: coverRoughness,
          }}
          paperTextures={{
            color: paperColor,
            normal: paperNormal,
            roughness: paperRoughness,
          }}
        />
      </group>

      <ambientLight intensity={0.9} color="#f6ead3" />
      <directionalLight
        position={[-2.2, 5.4, 3.8]}
        intensity={1.8}
        color="#f4d398"
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
      />
      <directionalLight
        position={[4.4, 2.8, 2.8]}
        intensity={0.5}
        color="#d0d8c9"
      />
      <pointLight
        ref={lampLightRef}
        position={[4.02, 0.72, -1.9]}
        intensity={1.55}
        distance={6.2}
        decay={2}
        color="#f6c980"
      />

      <ContactShadows
        position={[0, -0.39, 0.12]}
        scale={10}
        blur={2.2}
        opacity={0.34}
        far={3.2}
      />

      <EffectComposer>
        <Bloom mipmapBlur luminanceThreshold={0.84} intensity={0.12} />
        <Vignette eskil={false} offset={0.16} darkness={0.34} />
      </EffectComposer>
    </>
  );
}
