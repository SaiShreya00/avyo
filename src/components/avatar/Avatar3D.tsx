
import React, { useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Text3D, Center } from '@react-three/drei';
import * as THREE from 'three';

interface Avatar3DProps {
  isWaving?: boolean;
  userMood?: string;
}

const AvatarMesh = ({ isWaving = false, userMood = "neutral" }: Avatar3DProps) => {
  const meshRef = useRef<THREE.Group>(null);
  const leftArmRef = useRef<THREE.Group>(null);
  
  // Get mood-based colors
  const getMoodColor = (mood: string) => {
    switch (mood) {
      case "happy": return "#4ade80"; // green
      case "sad": return "#60a5fa"; // blue
      case "angry": return "#f87171"; // red
      default: return "#893F45"; // avyo primary
    }
  };

  useFrame((state) => {
    if (meshRef.current) {
      // Gentle floating animation
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime) * 0.1;
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
    }
    
    // Waving animation
    if (leftArmRef.current && isWaving) {
      leftArmRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 4) * 0.5 + 0.5;
    }
  });

  const bodyColor = getMoodColor(userMood);

  return (
    <group ref={meshRef}>
      {/* Head */}
      <mesh position={[0, 1.5, 0]}>
        <sphereGeometry args={[0.5, 32, 32]} />
        <meshStandardMaterial color="#F0E6E7" />
      </mesh>

      {/* Eyes */}
      <mesh position={[-0.2, 1.6, 0.4]}>
        <sphereGeometry args={[0.05, 16, 16]} />
        <meshStandardMaterial color="black" />
      </mesh>
      <mesh position={[0.2, 1.6, 0.4]}>
        <sphereGeometry args={[0.05, 16, 16]} />
        <meshStandardMaterial color="black" />
      </mesh>

      {/* Smile */}
      <mesh position={[0, 1.35, 0.4]} rotation={[0, 0, Math.PI]}>
        <torusGeometry args={[0.15, 0.02, 8, 16, Math.PI]} />
        <meshStandardMaterial color="black" />
      </mesh>

      {/* Body */}
      <mesh position={[0, 0.5, 0]}>
        <cylinderGeometry args={[0.3, 0.4, 1, 8]} />
        <meshStandardMaterial color={bodyColor} />
      </mesh>

      {/* Left Arm (waving arm) */}
      <group ref={leftArmRef} position={[-0.6, 0.8, 0]}>
        <mesh>
          <cylinderGeometry args={[0.08, 0.1, 0.8, 8]} />
          <meshStandardMaterial color={bodyColor} />
        </mesh>
        {/* Hand */}
        <mesh position={[0, -0.5, 0]}>
          <sphereGeometry args={[0.1, 16, 16]} />
          <meshStandardMaterial color="#F0E6E7" />
        </mesh>
      </group>

      {/* Right Arm */}
      <group position={[0.6, 0.8, 0]} rotation={[0, 0, -0.3]}>
        <mesh>
          <cylinderGeometry args={[0.08, 0.1, 0.8, 8]} />
          <meshStandardMaterial color={bodyColor} />
        </mesh>
        {/* Hand */}
        <mesh position={[0, -0.5, 0]}>
          <sphereGeometry args={[0.1, 16, 16]} />
          <meshStandardMaterial color="#F0E6E7" />
        </mesh>
      </group>

      {/* Legs */}
      <group position={[-0.2, -0.3, 0]}>
        <mesh>
          <cylinderGeometry args={[0.1, 0.12, 0.8, 8]} />
          <meshStandardMaterial color={bodyColor} />
        </mesh>
      </group>
      <group position={[0.2, -0.3, 0]}>
        <mesh>
          <cylinderGeometry args={[0.1, 0.12, 0.8, 8]} />
          <meshStandardMaterial color={bodyColor} />
        </mesh>
      </group>

      {/* Letter A on chest */}
      <Center position={[0, 0.6, 0.41]}>
        <Text3D
          font="/fonts/helvetiker_regular.typeface.json"
          size={0.2}
          height={0.02}
        >
          A
          <meshStandardMaterial color="#F0E6E7" />
        </Text3D>
      </Center>
    </group>
  );
};

const Avatar3D = ({ isWaving = false, userMood = "neutral" }: Avatar3DProps) => {
  return (
    <div className="w-48 h-48 mx-auto">
      <Canvas camera={{ position: [0, 0, 4], fov: 50 }}>
        <ambientLight intensity={0.6} />
        <directionalLight position={[5, 5, 5]} intensity={0.8} castShadow />
        <pointLight position={[-5, 5, 5]} intensity={0.4} />
        
        <AvatarMesh isWaving={isWaving} userMood={userMood} />
        
        <OrbitControls 
          enableZoom={false} 
          enablePan={false}
          maxPolarAngle={Math.PI / 1.5}
          minPolarAngle={Math.PI / 3}
        />
      </Canvas>
    </div>
  );
};

export default Avatar3D;
