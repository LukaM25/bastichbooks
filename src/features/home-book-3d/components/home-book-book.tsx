"use client";

import { useMemo } from "react";
import { Text } from "@react-three/drei";
import { PlaneGeometry } from "three";
import type { Group, Texture } from "three";

type SurfaceTextures = {
  color: Texture;
  normal: Texture;
  roughness: Texture;
};

type HomeBookBookProps = {
  bookRef: React.RefObject<Group | null>;
  rightLeafRef: React.RefObject<Group | null>;
  coverTextures: SurfaceTextures;
  paperTextures: SurfaceTextures;
};

function createLeafGeometry({
  width,
  height,
  outerLift,
  flutter,
  mirrored,
}: {
  width: number;
  height: number;
  outerLift: number;
  flutter: number;
  mirrored: boolean;
}) {
  const geometry = new PlaneGeometry(width, height, 72, 72);
  const position = geometry.attributes.position;

  for (let index = 0; index < position.count; index += 1) {
    const x = position.getX(index);
    const y = position.getY(index);
    const horizontal = (x + width / 2) / width;
    const progress = mirrored ? 1 - horizontal : horizontal;
    const verticalWave = Math.sin(((y + height / 2) / height) * Math.PI) * 0.015;
    const edgeCurl = Math.pow(progress, 1.65) * outerLift;
    const centerLift = Math.sin(progress * Math.PI) * flutter;

    position.setZ(index, edgeCurl + centerLift + verticalWave);
  }

  geometry.computeVertexNormals();

  return geometry;
}

function PageMaterial({ color, normal, roughness }: SurfaceTextures) {
  return (
    <meshStandardMaterial
      map={color}
      normalMap={normal}
      roughnessMap={roughness}
      color="#f6efe2"
      roughness={0.98}
      metalness={0.01}
    />
  );
}

function CoverMaterial({ color, normal, roughness }: SurfaceTextures) {
  return (
    <meshStandardMaterial
      map={color}
      normalMap={normal}
      roughnessMap={roughness}
      color="#5c4a35"
      roughness={0.9}
      metalness={0.04}
    />
  );
}

export function HomeBookBook({
  bookRef,
  rightLeafRef,
  coverTextures,
  paperTextures,
}: HomeBookBookProps) {
  const leftLeafGeometry = useMemo(
    () =>
      createLeafGeometry({
        width: 2.7,
        height: 3.9,
        outerLift: 0.1,
        flutter: 0.028,
        mirrored: true,
      }),
    [],
  );
  const rightLeafGeometry = useMemo(
    () =>
      createLeafGeometry({
        width: 2.7,
        height: 3.9,
        outerLift: 0.11,
        flutter: 0.032,
        mirrored: false,
      }),
    [],
  );

  return (
    <group ref={bookRef} position={[0, -0.28, 0.32]}>
      <mesh position={[0, -0.16, 0]} castShadow receiveShadow>
        <boxGeometry args={[5.72, 0.15, 4.02]} />
        <meshStandardMaterial color="#d9c6a9" roughness={0.96} />
      </mesh>

      <mesh position={[0, -0.055, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.36, 0.24, 4.08]} />
        <meshStandardMaterial color="#7b5c42" roughness={0.88} />
      </mesh>

      <group position={[-0.05, -0.035, 0]} rotation={[0, 0, 0.14]}>
        <mesh position={[-1.44, -0.03, 0]} castShadow receiveShadow>
          <boxGeometry args={[2.92, 0.08, 4.02]} />
          <CoverMaterial
            color={coverTextures.color}
            normal={coverTextures.normal}
            roughness={coverTextures.roughness}
          />
        </mesh>

        <mesh position={[-1.42, 0.012, 0]} castShadow receiveShadow>
          <boxGeometry args={[2.74, 0.12, 3.92]} />
          <meshStandardMaterial color="#e6dac5" roughness={0.97} />
        </mesh>

        <mesh
          geometry={leftLeafGeometry}
          position={[-1.41, 0.08, 0]}
          rotation={[-Math.PI / 2, 0, 0]}
          receiveShadow
        >
          <PageMaterial
            color={paperTextures.color}
            normal={paperTextures.normal}
            roughness={paperTextures.roughness}
          />
        </mesh>
      </group>

      <group ref={rightLeafRef} position={[0.05, -0.035, 0]} rotation={[0, 0, -0.14]}>
        <mesh position={[1.44, -0.03, 0]} castShadow receiveShadow>
          <boxGeometry args={[2.92, 0.08, 4.02]} />
          <CoverMaterial
            color={coverTextures.color}
            normal={coverTextures.normal}
            roughness={coverTextures.roughness}
          />
        </mesh>

        <mesh position={[1.42, 0.012, 0]} castShadow receiveShadow>
          <boxGeometry args={[2.74, 0.12, 3.92]} />
          <meshStandardMaterial color="#e7dbc6" roughness={0.97} />
        </mesh>

        <mesh
          geometry={rightLeafGeometry}
          position={[1.41, 0.082, 0]}
          rotation={[-Math.PI / 2, 0, 0]}
          receiveShadow
        >
          <PageMaterial
            color={paperTextures.color}
            normal={paperTextures.normal}
            roughness={paperTextures.roughness}
          />
        </mesh>
      </group>

      <Text
        position={[-2.77, 0.02, 0]}
        rotation={[Math.PI / 2, 0, Math.PI / 2]}
        fontSize={0.1}
        color="#e5d4b0"
        anchorX="center"
        anchorY="middle"
        maxWidth={3.6}
      >
        BASTICH BOOKS
      </Text>
    </group>
  );
}
