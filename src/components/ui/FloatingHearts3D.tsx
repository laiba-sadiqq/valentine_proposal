import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Environment } from '@react-three/drei';
import { useRef, useMemo } from 'react';
import * as THREE from 'three';

function Heart({ position, scale, speed }: { position: [number, number, number]; scale: number; speed: number }) {
  const meshRef = useRef<THREE.Mesh>(null);

  // Create heart shape
  const heartShape = useMemo(() => {
    const shape = new THREE.Shape();
    const x = 0, y = 0;
    
    shape.moveTo(x, y + 0.5);
    shape.bezierCurveTo(x, y + 0.5, x - 0.4, y, x - 0.5, y);
    shape.bezierCurveTo(x - 1, y, x - 1, y + 0.7, x - 1, y + 0.7);
    shape.bezierCurveTo(x - 1, y + 1.1, x - 0.6, y + 1.54, x, y + 1.9);
    shape.bezierCurveTo(x + 0.6, y + 1.54, x + 1, y + 1.1, x + 1, y + 0.7);
    shape.bezierCurveTo(x + 1, y + 0.7, x + 1, y, x + 0.5, y);
    shape.bezierCurveTo(x + 0.4, y, x, y + 0.5, x, y + 0.5);
    
    return shape;
  }, []);

  const geometry = useMemo(() => {
    const extrudeSettings = {
      depth: 0.4,
      bevelEnabled: true,
      bevelSegments: 2,
      steps: 2,
      bevelSize: 0.1,
      bevelThickness: 0.1,
    };
    return new THREE.ExtrudeGeometry(heartShape, extrudeSettings);
  }, [heartShape]);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * speed * 0.5) * 0.3;
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * speed * 0.3) * 0.1;
    }
  });

  return (
    <Float speed={speed} rotationIntensity={0.5} floatIntensity={1}>
      <mesh
        ref={meshRef}
        position={position}
        scale={scale}
        rotation={[Math.PI, 0, 0]}
        geometry={geometry}
      >
        <meshStandardMaterial
          color="#FF6B9D"
          roughness={0.3}
          metalness={0.2}
          emissive="#FF6B9D"
          emissiveIntensity={0.2}
        />
      </mesh>
    </Float>
  );
}

function ParticleField() {
  const particlesRef = useRef<THREE.Points>(null);
  
  const particlesCount = 100;
  const positions = useMemo(() => {
    const pos = new Float32Array(particlesCount * 3);
    for (let i = 0; i < particlesCount; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 10;
    }
    return pos;
  }, []);

  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y = state.clock.elapsedTime * 0.02;
    }
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particlesCount}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        color="#FFB6C1"
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  );
}

export default function FloatingHearts3D() {
  const hearts = useMemo(() => [
    { position: [-3, 2, 0] as [number, number, number], scale: 0.3, speed: 1.5 },
    { position: [3, -1, -1] as [number, number, number], scale: 0.25, speed: 2 },
    { position: [-2, -2, 1] as [number, number, number], scale: 0.2, speed: 1.8 },
    { position: [2, 1.5, -2] as [number, number, number], scale: 0.35, speed: 1.2 },
    { position: [0, 3, -1] as [number, number, number], scale: 0.22, speed: 1.6 },
    { position: [-4, 0, -1] as [number, number, number], scale: 0.18, speed: 2.2 },
    { position: [4, -2, 0] as [number, number, number], scale: 0.28, speed: 1.4 },
    { position: [-1, -3, 1] as [number, number, number], scale: 0.15, speed: 2.5 },
  ], []);

  return (
    <div className="fixed inset-0 -z-10">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 50 }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.6} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <pointLight position={[-10, -10, -5]} intensity={0.5} color="#FF6B9D" />
        
        {hearts.map((heart, i) => (
          <Heart key={i} {...heart} />
        ))}
        
        <ParticleField />
        <Environment preset="sunset" />
      </Canvas>
    </div>
  );
}
