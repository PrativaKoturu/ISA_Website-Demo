import React, { useRef, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';

// Futuristic VR Headset Model - Oculus Quest 2 style
const VRHeadset = ({ onLoaded }) => {
  const groupRef = useRef();
  const { scene } = useGLTF('/vr_headset.glb', true, undefined, onLoaded);
  return (
    <group ref={groupRef} dispose={null} scale={1.5} position={[0.25, 0, 0.7]} rotation={[0.1, 0.5, 0]}>
      <primitive object={scene} />
    </group>
  );
};

// Fallback component for Suspense
const Loader = () => {
  return (
    <mesh>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="white" />
    </mesh>
  );
};

const ThreeScene = ({ onLoaded }) => {
  return (
    <div style={{ width: '100%', height: '100%' }}>
      <Canvas
        camera={{ position: [0, 0.2, 1.8], fov: 60 }}
        style={{ background: 'transparent' }}
      >
        {/* Advanced Lighting */}
        <ambientLight intensity={0.6} />
        <directionalLight 
          position={[5, 5, 5]} 
          intensity={1.2}
          castShadow 
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
        />
        <pointLight position={[-5, -5, -5]} intensity={0.3} color="#3b82f6" />
        <pointLight position={[5, 10, 5]} intensity={0.5} color="white" />
        
        {/* 3D Model with Suspense */}
        <Suspense fallback={<Loader />}>
          <VRHeadset onLoaded={onLoaded} />
        </Suspense>
        
        {/* Controls */}
        <OrbitControls 
          enableZoom={true}
          enablePan={false}
          enableRotate={true}
          autoRotate={false}
          autoRotateSpeed={0.5}
          maxPolarAngle={Math.PI / 1.8}
          minPolarAngle={Math.PI / 2.5}
        />
      </Canvas>
    </div>
  );
};

export default ThreeScene;