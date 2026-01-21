"use client";

import { useFrame } from "@react-three/fiber";
import { useRef, useMemo } from "react";
import * as THREE from "three";

export function AscendingParticles() {
  const count = 300;
  const mesh = useRef<THREE.InstancedMesh>(null);

  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      const t = Math.random() * 100;
      const factor = 20 + Math.random() * 100;
      const speed = 0.01 + Math.random() / 200;
      const xFactor = -2 + Math.random() * 4; // Spread width
      const yFactor = -2 + Math.random() * 4; // Start height vary
      const zFactor = -2 + Math.random() * 4; // Depth
      temp.push({ t, factor, speed, xFactor, yFactor, zFactor, mx: 0, my: 0 });
    }
    return temp;
  }, [count]);

  const dummy = useMemo(() => new THREE.Object3D(), []);

  useFrame((state) => {
    if (!mesh.current) return;

    // Animate color over time
    // const time = state.clock.getElapsedTime();

    particles.forEach((particle, i) => {
      let { t, factor, speed, xFactor, yFactor, zFactor } = particle;
      t = particle.t += speed / 2;
      const a = Math.cos(t) + mathMap(xFactor, -1, 1, 0, 0.2); // wide motion
      const b = Math.sin(t) + mathMap(yFactor, -5, 5, 0, 0); // vertical oscillation part

      // Use particle props to create upward motion
      // We want them to rise continuously.
      // Reset when too high
      particle.my += speed;
      if (particle.my > 5) particle.my = -5;

      const x = (particle.mx + Math.cos(t) * 0.5 + xFactor) * 2;
      const y = particle.my * 1.5;
      const z = (zFactor + Math.sin(t * 0.5)) * 1;

      // Rotate lightly
      dummy.position.set(x, y, z);
      dummy.scale.setScalar(0.05 + Math.abs(Math.cos(t * 3)) * 0.05); // Pulsing size
      dummy.rotation.x = t * 0.5;
      dummy.rotation.z = t * 0.5;

      dummy.updateMatrix();
      mesh.current!.setMatrixAt(i, dummy.matrix);
    });
    mesh.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <>
      <instancedMesh ref={mesh} args={[undefined, undefined, count]}>
        <sphereGeometry args={[0.08, 16, 16]} />
        {/* White/Blue particles for clean look */}
        <meshBasicMaterial color="#4F46E5" transparent opacity={0.6} />
      </instancedMesh>
    </>
  );
}

function mathMap(value: number, x1: number, y1: number, x2: number, y2: number) {
  return (value - x1) * (y2 - x2) / (y1 - x1) + x2;
}
