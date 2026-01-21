"use client";

import { useRef, useMemo, useState } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";

function GrowthMarker({ position, label, visible, delay }: { position: THREE.Vector3, label: string, visible: boolean, delay: number }) {
  const scaleRef = useRef(0);
  const meshRef = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    if (visible && scaleRef.current < 1) {
      scaleRef.current += delta * 3; // Pop up speed
      if (scaleRef.current > 1) scaleRef.current = 1;
    }
    if (meshRef.current) {
      // Elastic scale effect
      const s = scaleRef.current;
      const elastic = s === 1 ? 1 : s * (2.5 - s * 1.5); // Overshoot hint
      meshRef.current.scale.setScalar(s);
    }
  });

  return (
    <group ref={meshRef} position={position} scale={[0, 0, 0]}>
      {/* Pin Line */}
      <mesh position={[0, -1, 0]}>
        <cylinderGeometry args={[0.05, 0.05, 2]} />
        <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={0.5} />
      </mesh>
      {/* Geometric Head: Screen/Interface representation */}
      {/* Main Screen */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[0.8, 0.5, 0.05]} />
        <meshStandardMaterial color="#22c55e" emissive="#22c55e" emissiveIntensity={0.8} />
      </mesh>
      {/* Decorative Element (like a phone or sidebar) */}
      <mesh position={[0.5, -0.1, 0.05]}>
        <boxGeometry args={[0.15, 0.3, 0.05]} />
        <meshStandardMaterial color="#4ade80" emissive="#4ade80" emissiveIntensity={1} />
      </mesh>
      {/* Label - using simple Screen Space text or 3D text if dre is available generally, 
           checking package.json earlier showed drei was missing.
           I will use a simple mesh label or no label to avoid missing dependency again if Text is needed. 
           Wait, user said "photo de design un peu stylée", "landing page"...
           I will try to make simple geometric abstract icons instead of text to avoid Drei dependecy issues if possible,
           OR I will check if I can use Html from drei if I fix dependency.
           Actually, the previous error showed drei MISSING. I removed it. 
           So I MUST NOT use @react-three/drei imports.
           I will build pure Three.js markers.
        */}
    </group>
  );
}

export function GrowthGraph() {
  const lineRef = useRef<THREE.Line>(null);
  const [visibleCount, setVisibleCount] = useState(0);

  // Generate the curve points
  const { points, curve } = useMemo(() => {
    const p = [];
    const segments = 100;
    // Start (-10, -5), End (10, 5)
    for (let i = 0; i <= segments; i++) {
      const t = i / segments;
      const x = -10 + t * 20;

      // Base growth: Linear + Exponential hint
      let y = -5 + t * 10;

      // Volatility: Sin waves + Random noise
      // Ensure start and end are relatively clean
      if (t > 0.05 && t < 0.95) {
        y += Math.sin(t * 20) * 1.5; // Big waves
        y += Math.sin(t * 50) * 0.5; // Small jitter
        y -= Math.sin(t * 3.14) * 2.0; // Big dip in middle
      }

      p.push(new THREE.Vector3(x, y, 0));
    }
    const c = new THREE.CatmullRomCurve3(p);
    return { points: p, curve: c };
  }, []);

  // Geometry for the line
  const geometry = useMemo(() => new THREE.BufferGeometry().setFromPoints(points), [points]);

  // Markers placement (at 30%, 60%, 90% roughly)
  const markers = useMemo(() => [
    { pos: points[30], label: "Stratégie" },
    { pos: points[60], label: "Design" },
    { pos: points[90], label: "Croissance" },
  ], [points]);

  useFrame((state) => {
    if (lineRef.current) {
      // Animate draw range
      const duration = 3.0;
      const t = (state.clock.getElapsedTime()) % (duration + 2); // Loop every 5s
      const progress = Math.min(t / duration, 1.0);

      // Update draw range
      const drawCount = Math.floor(points.length * progress);
      lineRef.current.geometry.setDrawRange(0, drawCount);

      // Update markers visibility based on progress
      if (progress > 0.3 && visibleCount < 1) setVisibleCount(1);
      if (progress > 0.6 && visibleCount < 2) setVisibleCount(2);
      if (progress > 0.9 && visibleCount < 3) setVisibleCount(3);
      if (progress < 0.1) setVisibleCount(0); // Reset
    }
  });

  return (
    <group position={[0, 0, -5]}>
      {/* The Graph Curve */}
      {/* @ts-ignore */}
      <line ref={lineRef} geometry={geometry}>
        <lineBasicMaterial color="#4ade80" linewidth={3} />
      </line>

      {/* The Markers */}
      {markers.map((m, i) => (
        <GrowthMarker
          key={i}
          position={m.pos}
          label={m.label}
          visible={i < visibleCount}
          delay={0}
        />
      ))}

      {/* Ambient "Chart Grid" lines for context */}
      {/* @ts-ignore */}
      <line position={[0, -5, 0]}>
        <bufferGeometry attach="geometry" {...new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(-10, 0, 0), new THREE.Vector3(10, 0, 0)])} />
        <lineBasicMaterial attach="material" color="#333" transparent opacity={0.3} />
      </line>
      {/* @ts-ignore */}
      <line position={[-10, 0, 0]}>
        <bufferGeometry attach="geometry" {...new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(0, -6, 0), new THREE.Vector3(0, 6, 0)])} />
        <lineBasicMaterial attach="material" color="#333" transparent opacity={0.3} />
      </line>
    </group>
  );
}
