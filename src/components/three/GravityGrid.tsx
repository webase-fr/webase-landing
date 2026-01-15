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
    
    // Calculate distance from center (0.5, 0.5 in UV space, or 0,0 in local space)
    // Position is centered, range approx -10 to 10
    float dist = length(pos.xy);
    
    // Gravity Well Effect: Exponential or Lorentzian dip
    // Deeper and smoother
    float depth = 3.0; // Depth of the hole
    float width = 4.0; // Width of the influence
    float z = -depth / (1.0 + pow(dist / width, 2.0));
    
    pos.z += z;
    vElevation = z;

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
    float dist = distance(vUv, vec2(0.5));
    float mask = 1.0 - smoothstep(0.3, 0.5, dist);

    vec3 color = uColor;
    
    gl_FragColor = vec4(color, alpha * mask * 0.3); // 0.3 overall opacity
  }
`;

export function GravityGrid() {
  const meshRef = useRef<THREE.Mesh>(null!);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uGridSize: { value: 40.0 }, // Number of squares
      uColor: { value: new THREE.Color("#345bff") }, // Brand blue
    }),
    []
  );

  useFrame((state) => {
    if (meshRef.current) {
      // meshRef.current.rotation.z += 0.001; 
      meshRef.current.rotation.z += 0.0005;
    }
  });

  return (
    // Rotate to face camera appropriately. Adjusted position for better mobile visibility (moved closer/higher)
    <mesh ref={meshRef} rotation={[-Math.PI / 3, 0, 0]} position={[0, -1, -5]}>
      <planeGeometry args={[25, 25, 100, 100]} />
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
