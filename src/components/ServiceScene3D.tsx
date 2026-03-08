import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial, Sphere } from "@react-three/drei";
import * as THREE from "three";

const FloatingSphere = ({ position, color, size = 0.5, speed = 1 }: {
  position: [number, number, number];
  color: string;
  size?: number;
  speed?: number;
}) => {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (ref.current) {
      ref.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * speed) * 0.2;
      ref.current.rotation.x = state.clock.elapsedTime * 0.2 * speed;
    }
  });

  return (
    <Float speed={speed} rotationIntensity={0.3} floatIntensity={0.4}>
      <Sphere ref={ref} args={[size, 32, 32]} position={position}>
        <MeshDistortMaterial color={color} transparent opacity={0.25} distort={0.3} speed={2} roughness={0.4} />
      </Sphere>
    </Float>
  );
};

const ServiceScene3D = () => (
  <div className="absolute inset-0 pointer-events-none opacity-60">
    <Canvas camera={{ position: [0, 0, 5], fov: 50 }} dpr={[1, 1.5]}>
      <ambientLight intensity={0.4} />
      <directionalLight position={[3, 3, 3]} intensity={0.6} />
      <FloatingSphere position={[-3, 1, 0]} color="#4a8c6f" size={0.6} speed={0.8} />
      <FloatingSphere position={[3.5, -1, -1]} color="#c9a96e" size={0.5} speed={1.2} />
      <FloatingSphere position={[0, 2.5, -2]} color="#4a8c6f" size={0.4} speed={0.6} />
    </Canvas>
  </div>
);

export default ServiceScene3D;
