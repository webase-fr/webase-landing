"use client";

import { useRef, useMemo } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";

const vertexShader = `
  uniform float uTime;
  varying vec2 vUv;
  varying float vElevation;

  void main() {
    vUv = uv;
    vec3 pos = position;

    // "Growth" Waves: Vertical sine waves moving UP (-uTime)
    // We mix multiple frequencies for organic feel
    float wave1 = sin(pos.x * 2.0 - uTime * 0.5);
    float wave2 = sin(pos.x * 5.0 + uTime * 0.2);
    
    // Combine waves
    float elevation = (wave1 + wave2) * 0.5;

    // Apply elevation to Z (towards camera)
    pos.z += elevation;

    vElevation = elevation;

    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`;

const fragmentShader = `
  uniform float uTime;
  uniform vec3 uColorA;
  uniform vec3 uColorB;
  varying vec2 vUv;
  varying float vElevation;

  void main() {
    // Gradient from bottom to top
    // Mix based on UV.y and some time
    float mixStrength = vUv.y + sin(vUv.x * 10.0 + uTime) * 0.1;
    mixStrength = smoothstep(0.0, 1.0, mixStrength);

    vec3 color = mix(uColorA, uColorB, mixStrength);

    // Add "lines" or "grid" effect for structure
    // Vertical lines
    float lineStrength = step(0.98, fract(vUv.x * 20.0));
    
    // Horizontal moving lines (Growth indicators)
    float growthLine = step(0.95, fract(vUv.y * 10.0 - uTime * 0.2));

    // Combine
    float alpha = 0.3 + lineStrength * 0.2 + growthLine * 0.3;
    
    // Fade edges
    float edgeFade = 1.0 - distance(vUv, vec2(0.5)) * 1.5;
    alpha *= smoothstep(0.0, 0.5, edgeFade);

    gl_FragColor = vec4(color, alpha * 0.6);
  }
`;

export function GrowthField() {
  const meshRef = useRef<THREE.Mesh>(null!);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uColorA: { value: new THREE.Color("#1e3a8a") }, // Dark Blue
      uColorB: { value: new THREE.Color("#60a5fa") }, // Light Blue
    }),
    []
  );

  useFrame((state) => {
    if (meshRef.current) {
      const material = meshRef.current.material as THREE.ShaderMaterial;
      if (material.uniforms) {
        material.uniforms.uTime.value = state.clock.getElapsedTime();
      }
    }
  });

  return (
    // Large plane covering the background
    // Rotated slightly to give depth
    <mesh ref={meshRef} position={[0, 0, -5]} rotation={[0, 0, 0]}>
      <planeGeometry args={[30, 20, 64, 64]} />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        transparent
        side={THREE.DoubleSide}
        uniforms={uniforms}
      />
    </mesh>
  );
}
