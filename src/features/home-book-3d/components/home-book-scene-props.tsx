"use client";

import { useMemo } from "react";
import { useGLTF } from "@react-three/drei";
import { Mesh } from "three";
import { homeBook3DAssets } from "@/features/home-book-3d/config/assets";

type DeskPropModelProps = {
  path: string;
  position: [number, number, number];
  rotation: [number, number, number];
  scale: number;
};

function DeskPropModel({ path, position, rotation, scale }: DeskPropModelProps) {
  const gltf = useGLTF(path);

  const clonedScene = useMemo(() => {
    const scene = gltf.scene.clone(true);

    scene.traverse((child) => {
      if (child instanceof Mesh) {
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });

    return scene;
  }, [gltf.scene]);

  return (
    <primitive
      object={clonedScene}
      position={position}
      rotation={rotation}
      scale={scale}
    />
  );
}

export function HomeBookScenePropsGroup() {
  return (
    <group>
      <DeskPropModel
        path={homeBook3DAssets.models.encyclopediaSet}
        position={[-4.1, -0.38, -2.2]}
        rotation={[0, 0.92, 0]}
        scale={1.02}
      />
      <DeskPropModel
        path={homeBook3DAssets.models.magnifyingGlass}
        position={[-3.9, -0.34, 1.75]}
        rotation={[-0.08, -0.12, -0.4]}
        scale={1.6}
      />
      <DeskPropModel
        path={homeBook3DAssets.models.vintageOilLamp}
        position={[4.15, -0.24, -2.45]}
        rotation={[0, -0.92, 0]}
        scale={1.46}
      />
      <DeskPropModel
        path={homeBook3DAssets.models.postcardSet}
        position={[4.6, -0.33, 2.38]}
        rotation={[-0.06, 0.38, 0.18]}
        scale={1.28}
      />
    </group>
  );
}

useGLTF.preload(homeBook3DAssets.models.encyclopediaSet);
useGLTF.preload(homeBook3DAssets.models.magnifyingGlass);
useGLTF.preload(homeBook3DAssets.models.postcardSet);
useGLTF.preload(homeBook3DAssets.models.vintageOilLamp);
