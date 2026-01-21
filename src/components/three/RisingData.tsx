"use client";

import { useFrame } from "@react-three/fiber";
import { useRef, useMemo } from "react";
import * as THREE from "three";

export function RisingData() {
  const count = 200;
  const mesh = useRef<THREE.InstancedMesh>(null);

  // Arrange in a grid
  const gridSize = 15;

  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      // Create a floor of bars
      const x = (i % gridSize) - gridSize / 2;
      const z = Math.floor(i / gridSize) - gridSize / 2;

      const speed = 0.5 + Math.random();
      const offset = Math.random() * 100;
      const maxHeight = 4 + Math.random() * 6; // Taller bars

      // Spread them out
      temp.push({ x: x * 1.5, z: z * 1.5, speed, offset, maxHeight });
    }
    return temp;
  }, [count, gridSize]);

  const dummy = useMemo(() => new THREE.Object3D(), []);

  useFrame((state) => {
    if (!mesh.current) return;

    // Gentle rotation of the whole platform
    mesh.current.rotation.y = state.clock.getElapsedTime() * 0.05;

    const t = state.clock.getElapsedTime();

    particles.forEach((particle, i) => {
      const wave = Math.sin(t * particle.speed + particle.offset);
      const height = (wave + 1) * 0.5 * particle.maxHeight + 0.5;

      // Position: centered on x/z, y grows up from 0
      dummy.position.set(particle.x, height / 2, particle.z);
      dummy.scale.set(0.4, height, 0.4);

      dummy.updateMatrix();
      mesh.current!.setMatrixAt(i, dummy.matrix);
    });
    mesh.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <>
      {/* 
        Positioning Strategy borrowed from GravityGrid:
        Move the OBJECT, not the camera.
        Default Camera is at [0, 0, 5].
        We place this object down (-5 Y) and back (-10 Z) 
        and tilt it (PI/6) so we look down at it.
      */}
      <group position={[0, -10, -25]} rotation={[Math.PI / 8, 0, 0]}>
        <instancedMesh ref={mesh} args={[undefined, undefined, count]}>
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial
            color="#3B82F6"
            emissive="#1d4ed8"
            emissiveIntensity={0.5}
            roughness={0.2}
            metalness={0.8}
            transparent
            opacity={0.8}
          />
        </instancedMesh>
      </group>

      <ambientLight intensity={1} />
      <pointLight position={[10, 10, 10]} intensity={3} color="#60A5FA" />
      <directionalLight position={[-10, 5, -5]} intensity={2} color="#ffffff" />
    </>
  );
}
