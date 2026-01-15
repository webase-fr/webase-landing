"use client";

import { Canvas } from "@react-three/fiber";
import React, { Suspense, useEffect, useState } from "react";

class ErrorBoundary extends React.Component<{ children: React.ReactNode }, { hasError: boolean }> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // Suppress console error in dev if it's the known WebGL issue to avoid overlay? 
    // Usually console.error is what shows up in the overlay.
    // For now just log.
    console.error("WebGL/Canvas Error captured by boundary:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return null;
    }
    return this.props.children;
  }
}

interface SceneProps {
  children: React.ReactNode;
  className?: string;
}

export function Scene({ children, className }: SceneProps) {
  const [isSupported, setIsSupported] = useState(true);

  useEffect(() => {
    try {
      const canvas = document.createElement("canvas");
      const gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
      if (!gl) {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setIsSupported(false);
      }
    } catch {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setIsSupported(false);
    }
  }, []);

  if (!isSupported) {
    return null;
  }

  return (
    <div className={className}>
      <ErrorBoundary>
        <Canvas
          dpr={[1, 1.5]}
          camera={{ position: [0, 0, 5], fov: 45 }}
          gl={{ antialias: true, alpha: true }}
          onError={(e) => console.error("Canvas error:", e)}
          onCreated={(state) => {
            state.gl.domElement.addEventListener('webglcontextlost', (event) => {
              event.preventDefault();
              state.gl.forceContextLoss();
            }, false);
          }}
        >
          <Suspense fallback={null}>
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} intensity={1} />
            {children}
          </Suspense>
        </Canvas>
      </ErrorBoundary>
    </div>
  );
}
