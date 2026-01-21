"use client";

import { useFrame } from "@react-three/fiber";
import { useRef, useMemo } from "react";
import * as THREE from "three";

function FloatingStep({ position, scale, delay, color, emissiveIntensity }: {
  position: [number, number, number];
  scale: [number, number, number];
  delay: number;
  color: string;
  emissiveIntensity: number;
}) {
  const mesh = useRef<THREE.Mesh>(null);

  // Random start phase for organic feel
  const randomPhase = useMemo(() => Math.random() * Math.PI, []);

  useFrame((state) => {
    if (!mesh.current) return;
    const t = state.clock.getElapsedTime();
    // Gentle floating sine wave
    mesh.current.position.y = position[1] + Math.sin(t * 2 + delay + randomPhase) * 0.1;
    // Gentle rotation
    mesh.current.rotation.x = Math.sin(t * 0.5 + delay) * 0.05;
    mesh.current.rotation.z = Math.sin(t * 0.3 + delay) * 0.05;
  });

  return (
    <mesh ref={mesh} position={position} scale={scale}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial
        color={color}
        emissive="#3B82F6"
        emissiveIntensity={emissiveIntensity}
        transparent
        opacity={0.9}
        roughness={0.1}
        metalness={0.8}
      />
    </mesh>
  );
}

export function RisingSteps() {
  // Configuration: 7 steps rising
  const steps = useMemo(() => {
    return Array.from({ length: 7 }).map((_, i) => ({
      // Position: Staircase going up and right
      // i - 3 to center it roughly
      position: [(i - 3) * 1.5, (i - 2) * 1.0, 0] as [number, number, number],
      scale: [1.2, 0.2, 1.2] as [number, number, number],
      delay: i * 0.2,
      color: i === 6 ? "#3B82F6" : "#60A5FA", // Index 6 is the last of 7
      emissiveIntensity: i === 6 ? 0.8 : 0.2
    }));
  }, []);

  return (
    <>
      <group position={[0, -2, -10]} rotation={[Math.PI / 8, -Math.PI / 6, 0]}>
        {steps.map((step, i) => (
          <FloatingStep
            key={i}
            position={step.position}
            scale={step.scale}
            delay={step.delay}
            color={step.color}
            emissiveIntensity={step.emissiveIntensity}
          />
        ))}
      </group>

      {/* Lighting to enhance the 3D form */}
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={2} color="#ffffff" />
      <spotLight
        position={[-10, 20, 10]}
        angle={0.3}
        penumbra={1}
        intensity={2}
        color="#3B82F6"
      />
    </>
  );
}
