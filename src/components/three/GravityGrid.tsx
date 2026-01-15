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
    
    // Calculate distance from center
    float dist = length(pos.xy);
    
    // 1. Gravity Well (The "Base" - Deep and stable)
    float depth = 5.0; 
    float width = 10.0; 
    float wellZ = -depth / (1.0 + pow(dist / width, 2.0));
    
    // 2. Dynamic Waves (Refined - Subtle & Irregular)
    
    // A. Initial "Greeting" Wave (Strong but decays fast)
    // Starts big, disappears after ~3-4 seconds
    float initialSurge = sin(dist * 0.4 - uTime * 2.0) * 2.5 * exp(-uTime * 0.8);
    
    // B. Ambient "Breathing" (Very subtle, irregular ocean feel)
    // Mix two frequencies to avoid mechanical repetition
    float ambient1 = sin(dist * 0.5 - uTime * 0.8) * 0.2; // Slow broad wave
    float ambient2 = sin(dist * 1.2 - uTime * 1.5) * 0.1; // Faster small ripple
    float ambient = ambient1 + ambient2;

    // Combine
    // We dampen everything near the center well so it stays clean
    float dampening = smoothstep(0.0, 10.0, dist); 
    
    // Result: Deep well + Vanishing Surge + Gentle Ambient
    pos.z += wellZ + ((initialSurge + ambient) * dampening);
    
    vElevation = pos.z;

    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`;

const fragmentShader = `
  varying vec2 vUv;
  uniform float uGridSize;
  uniform vec3 uColor;

  void main() {
    // Create grid pattern based on UVs
    // Scale UVs to get number of cells
    vec2 gridParam = vUv * uGridSize;
    
    // Compute anti-aliased grid lines with width
    vec2 grid = abs(fract(gridParam - 0.5) - 0.5) / fwidth(gridParam);
    float line = min(grid.x, grid.y);
    
    // Threshold for thickness (1.0 is standard thin line)
    float thickness = 1.0;
    float alpha = 1.0 - min(line, 1.0);
    
    // Fade out at edges to blend with background
    // Smoother / wider mask
    float dist = distance(vUv, vec2(0.5));
    float mask = 1.0 - smoothstep(0.4, 0.5, dist);

    vec3 color = uColor;
    
    gl_FragColor = vec4(color, alpha * mask * 0.4); // slightly brighter
  }
`;

export function GravityGrid() {
  const meshRef = useRef<THREE.Mesh>(null!);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uGridSize: { value: 80.0 }, // Doubled for 60x60 grid
      uColor: { value: new THREE.Color("#345bff") }, // Brand blue
    }),
    []
  );

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.z += 0.0005;

      // Update shader time
      const material = meshRef.current.material as THREE.ShaderMaterial;
      if (material.uniforms) {
        material.uniforms.uTime.value = state.clock.getElapsedTime();
      }
    }
  });

  return (
    // Rotate to face camera appropriately. Adjusted position for better mobile visibility (moved closer/higher)
    // Tilted more to see the hole, moved up (-0.5 -> 1.5) to match higher content
    <mesh ref={meshRef} rotation={[-Math.PI / 2.8, 0, 0]} position={[0, 1.5, -8]}>
      <planeGeometry args={[60, 60, 100, 100]} />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        transparent
        side={THREE.DoubleSide}
        uniforms={uniforms}
        depthWrite={false}
      />
    </mesh>
  );
}
