'use client';

import React, { useRef, useMemo, useState, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

// ── Particle System Component ──────────────────────────────
function ParticleNetwork() {
  const pointsRef = useRef<THREE.Points>(null);
  const linesRef = useRef<THREE.LineSegments>(null);
  const { mouse, viewport } = useThree();

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Generate deterministic points and lines
  const { positions, linePositions } = useMemo(() => {
    const count = isMobile ? 100 : 400; // Reduced count on mobile
    const pos = new Float32Array(count * 3);
    const linePos = [];
    const points = [];

    // Create random nodes across a wide, flat plane
    for (let i = 0; i < count; i++) {
      const x = (Math.random() - 0.5) * 40; // Wide X spread
      const y = (Math.random() - 0.5) * 20; // Wide Y spread
      const z = (Math.random() - 0.5) * 10; // Deep Z spread
      
      pos[i * 3] = x;
      pos[i * 3 + 1] = y;
      pos[i * 3 + 2] = z;
      
      points.push(new THREE.Vector3(x, y, z));
    }

    // Connect close nodes to form a network
    for (let i = 0; i < points.length; i++) {
      for (let j = i + 1; j < points.length; j++) {
        const dist = points[i].distanceTo(points[j]);
        if (dist < 2.5) { // Increased connection distance due to scale
          linePos.push(
            points[i].x, points[i].y, points[i].z,
            points[j].x, points[j].y, points[j].z
          );
        }
      }
    }

    return { 
      positions: pos, 
      linePositions: new Float32Array(linePos) 
    };
  }, [isMobile]);

  // Animation loop
  useFrame((state, delta) => {
    if (pointsRef.current && linesRef.current) {
      // Gentle flowing wave rotation
      pointsRef.current.rotation.y += delta * 0.03;
      pointsRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.1;
      
      linesRef.current.rotation.y += delta * 0.03;
      linesRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.1;

      // Parallax effect based on mouse movement
      const targetX = (mouse.x * viewport.width) / 15;
      const targetY = (mouse.y * viewport.height) / 15;
      
      pointsRef.current.position.x += (targetX - pointsRef.current.position.x) * 0.02;
      pointsRef.current.position.y += (targetY - pointsRef.current.position.y) * 0.02;
      
      linesRef.current.position.x = pointsRef.current.position.x;
      linesRef.current.position.y = pointsRef.current.position.y;
    }
  });

  return (
    <group>
      {/* Nodes */}
      <Points ref={pointsRef} positions={positions} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color="#FF1E2A" // Brighter red for points
          size={0.09}
          sizeAttenuation={true}
          depthWrite={false}
          opacity={0.95}
        />
      </Points>

      {/* Connections */}
      <lineSegments ref={linesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[linePositions, 3]}
            count={linePositions.length / 3}
            array={linePositions}
            itemSize={3}
          />
        </bufferGeometry>
        <lineBasicMaterial
          color="#E50914"
          transparent
          opacity={0.4}
          depthWrite={false}
        />
      </lineSegments>
    </group>
  );
}

class ErrorBoundary extends React.Component<{ children: React.ReactNode }, { hasError: boolean }> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() { return { hasError: true }; }
  componentDidCatch(error: any) { console.error("3D Scene Error:", error); }
  render() {
    if (this.state.hasError) return <div className="absolute inset-0 bg-black/50" />;
    return this.props.children;
  }
}

export default function Hero3DScene() {
  return (
    <div className="w-full h-full relative cursor-crosshair">
      <ErrorBoundary>
        <Canvas
          camera={{ position: [0, 0, 7], fov: 45 }}
          dpr={[1, 2]} // High DPI support
          gl={{ alpha: true, antialias: true }}
        >
          <ambientLight intensity={0.5} />
          <ParticleNetwork />
        </Canvas>
      </ErrorBoundary>
    </div>
  );
}
