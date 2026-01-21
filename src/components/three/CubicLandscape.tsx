"use client";

import { useRef, useMemo } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";

function VoxelFloor() {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const count = 400; // 20x20 grid
  const dummy = useMemo(() => new THREE.Object3D(), []);

  useFrame((state) => {
    if (!meshRef.current) return;

    const t = state.clock.getElapsedTime();
    const gridSize = 20;

    for (let i = 0; i < count; i++) {
      const x = (i % gridSize) - gridSize / 2;
      const z = Math.floor(i / gridSize) - gridSize / 2;

      // Wave animation
      // Height depends on position + time
      const y = Math.sin(x * 0.3 + t * 0.5) * Math.cos(z * 0.3 + t * 0.5) * 0.5;

      dummy.position.set(x * 1.05, -2 + y, z * 1.05); // Spread slightly
      dummy.scale.set(1, 1, 1);
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
    }
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]} position={[0, -1, -5]} rotation={[0, 0, 0]}>
      <boxGeometry args={[1, 1, 1]} />
      {/* Matte Purple/Blue Material for Voxels */}
      <meshStandardMaterial
        color="#6366f1"
        roughness={0.4}
        metalness={0.1}
      />
    </instancedMesh>
  );
}

function GlassCard({ position, iconType, delay }: { position: [number, number, number], iconType: 'torus' | 'box' | 'sphere', delay: number }) {
  const meshRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.getElapsedTime();
    // Bobbing animation distinct from floor
    meshRef.current.position.y = position[1] + Math.sin(t + delay) * 0.2;
    meshRef.current.rotation.y = Math.sin(t * 0.5 + delay) * 0.1;
  });

  return (
    <group ref={meshRef} position={position}>
      {/* The Glass Container */}
      <mesh>
        <boxGeometry args={[1.5, 1.5, 0.2]} />
        <meshStandardMaterial
          roughness={0.1}
          color="#ffffff"
          transparent
          opacity={0.3}
        />
        {/* Fallback standard material if physics not avail/heavy, trying Standard for safety first if needed but Physics is better for glass. 
                    Actually MeshPhysicsMaterial is standard in three.js, good.
                 */}
      </mesh>
      {/* Inner Icon */}
      <mesh position={[0, 0, 0]} rotation={[Math.PI / 4, Math.PI / 4, 0]}>
        {iconType === 'torus' && <torusGeometry args={[0.4, 0.15, 16, 32]} />}
        {iconType === 'box' && <boxGeometry args={[0.6, 0.6, 0.6]} />}
        {iconType === 'sphere' && <octahedronGeometry args={[0.5]} />}
        <meshStandardMaterial color="#818cf8" emissive="#4f46e5" emissiveIntensity={1} />
      </mesh>
    </group>
  )
}

export function CubicLandscape() {
  return (
    <>
      <group rotation={[Math.PI / 8, 0, 0]} position={[0, 0, -10]}>
        <VoxelFloor />

        {/* Floating Cards above the floor */}
        <GlassCard position={[-3, 2, 0]} iconType="torus" delay={0} />
        <GlassCard position={[0, 2.5, 2]} iconType="box" delay={1} />
        <GlassCard position={[3, 2, 0]} iconType="sphere" delay={2} />
      </group>

      {/* Lighting */}
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 20, 5]} intensity={1.5} color="#c7d2fe" />
      <pointLight position={[-10, 10, -10]} intensity={1} color="#818cf8" />
    </>
  );
}
