"use client";

import { useRef, useMemo } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";

const generateParticles = (count: number) => {
  const temp = [];
  for (let i = 0; i < count; i++) {
    // Spread wide (x/y), but keep z relatively flat or following the grid roughly
    const x = (Math.random() - 0.5) * 40;
    const y = (Math.random() - 0.5) * 40;
    const z = (Math.random() - 0.5) * 10 - 2; // Biased down

    const speed = Math.random() * 0.2 + 0.1;
    const factor = Math.random() * 10 + 5; // Randomness factor for movement

    temp.push({ x, y, z, speed, factor });
  }
  return temp;
};

export function FloatingParticles() {
  const count = 150;
  const meshRef = useRef<THREE.InstancedMesh>(null!);

  // Create random positions and speeds
  const particles = useMemo(() => generateParticles(count), [count]);

  const dummy = useMemo(() => new THREE.Object3D(), []);

  useFrame((state) => {
    if (!meshRef.current) return;

    const t = state.clock.getElapsedTime();

    particles.forEach((particle, i) => {
      // Gentle floating motion
      // X/Y oscillate slightly
      // Z moves up/down or follows a wave

      const { x, y, z } = particle;

      // Animate position
      const offset = Math.sin(t * particle.speed + particle.factor);
      const yOffset = Math.cos(t * particle.speed * 0.5 + particle.factor) * 2;

      // Update dummy object
      dummy.position.set(
        x + offset * 0.5,
        y + offset * 0.5,
        z + yOffset // Move vertically relative to camera roughly
      );

      // Rotate individually
      dummy.rotation.set(
        t * 0.2 + particle.factor,
        t * 0.1 + particle.factor,
        0
      );

      // Scale based on distance or just random
      const s = 0.3 + Math.sin(t + particle.factor) * 0.1;
      dummy.scale.set(s, s, s);

      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
    });

    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]} position={[0, 2, -5]}>
      <boxGeometry args={[0.2, 0.2, 0.2]} />
      <meshStandardMaterial
        color="#0033ff"
        emissive="#0033ff"
        emissiveIntensity={0.5}
        toneMapped={false}
        transparent
        opacity={0.6}
      />
    </instancedMesh>
  );
}
