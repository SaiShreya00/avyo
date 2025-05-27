
import React, { useRef, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Text3D, Center } from '@react-three/drei';
import * as THREE from 'three';

interface Avatar3DProps {
  isWaving?: boolean;
  userMood?: string;
  isThinking?: boolean;
  isListening?: boolean;
  isSpeaking?: boolean;
}

const AvatarMesh = ({ 
  isWaving = false, 
  userMood = "neutral",
  isThinking = false,
  isListening = false,
  isSpeaking = false
}: Avatar3DProps) => {
  const meshRef = useRef<THREE.Group>(null);
  const leftArmRef = useRef<THREE.Group>(null);
  const rightArmRef = useRef<THREE.Group>(null);
  const headRef = useRef<THREE.Group>(null);
  const eyesRef = useRef<THREE.Group>(null);
  const [blinkPhase, setBlinkPhase] = useState(0);
  
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
      
      if (!isThinking && !isListening) {
        meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
      }
    }
    
    // Head animations
    if (headRef.current) {
      if (isThinking) {
        // Thinking: slow head tilt side to side
        headRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.8) * 0.2;
      } else if (isListening) {
        // Listening: slight forward lean and occasional nods
        headRef.current.rotation.x = -0.1 + Math.sin(state.clock.elapsedTime * 2) * 0.05;
      } else if (isSpeaking) {
        // Speaking: slight up and down movement
        headRef.current.position.y = Math.sin(state.clock.elapsedTime * 3) * 0.02;
      }
    }
    
    // Waving animation
    if (leftArmRef.current && isWaving) {
      leftArmRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 4) * 0.5 + 0.5;
    }
    
    // Thinking gesture - hand to chin
    if (rightArmRef.current && isThinking) {
      rightArmRef.current.rotation.z = -0.8;
      rightArmRef.current.rotation.x = 0.3;
    }
    
    // Blinking animation
    if (eyesRef.current) {
      const blinkTime = state.clock.elapsedTime * 0.5;
      const shouldBlink = Math.sin(blinkTime) > 0.98;
      eyesRef.current.scale.y = shouldBlink ? 0.1 : 1;
    }
  });

  const bodyColor = getMoodColor(userMood);

  return (
    <group ref={meshRef}>
      {/* Head */}
      <group ref={headRef} position={[0, 1.5, 0]}>
        <mesh>
          <sphereGeometry args={[0.5, 32, 32]} />
          <meshStandardMaterial color="#F0E6E7" />
        </mesh>

        {/* Eyes */}
        <group ref={eyesRef}>
          <mesh position={[-0.2, 0.1, 0.4]}>
            <sphereGeometry args={[0.05, 16, 16]} />
            <meshStandardMaterial color="black" />
          </mesh>
          <mesh position={[0.2, 0.1, 0.4]}>
            <sphereGeometry args={[0.05, 16, 16]} />
            <meshStandardMaterial color="black" />
          </mesh>
        </group>

        {/* Smile */}
        <mesh position={[0, -0.15, 0.4]} rotation={[0, 0, Math.PI]}>
          <torusGeometry args={[0.15, 0.02, 8, 16, Math.PI]} />
          <meshStandardMaterial color="black" />
        </mesh>
      </group>

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
      <group ref={rightArmRef} position={[0.6, 0.8, 0]} rotation={[0, 0, -0.3]}>
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

      {/* Thought bubble when thinking */}
      {isThinking && (
        <group position={[0.8, 2.2, 0]}>
          <mesh>
            <sphereGeometry args={[0.15, 16, 16]} />
            <meshStandardMaterial color="white" opacity={0.8} transparent />
          </mesh>
          <mesh position={[-0.3, -0.2, 0]}>
            <sphereGeometry args={[0.08, 16, 16]} />
            <meshStandardMaterial color="white" opacity={0.6} transparent />
          </mesh>
          <mesh position={[-0.5, -0.35, 0]}>
            <sphereGeometry args={[0.05, 16, 16]} />
            <meshStandardMaterial color="white" opacity={0.4} transparent />
          </mesh>
        </group>
      )}

      {/* Sound waves when speaking */}
      {isSpeaking && (
        <group position={[0, 1.8, 0.6]}>
          <mesh rotation={[0, 0, Math.PI / 4]}>
            <torusGeometry args={[0.3, 0.02, 8, 16, Math.PI]} />
            <meshStandardMaterial color="#4ade80" opacity={0.6} transparent />
          </mesh>
          <mesh rotation={[0, 0, Math.PI / 4]} scale={[1.5, 1.5, 1.5]}>
            <torusGeometry args={[0.3, 0.01, 8, 16, Math.PI]} />
            <meshStandardMaterial color="#4ade80" opacity={0.3} transparent />
          </mesh>
        </group>
      )}
    </group>
  );
};

const Avatar3D = ({ 
  isWaving = false, 
  userMood = "neutral",
  isThinking = false,
  isListening = false,
  isSpeaking = false
}: Avatar3DProps) => {
  return (
    <div className="w-48 h-48 mx-auto">
      <Canvas camera={{ position: [0, 0, 4], fov: 50 }}>
        <ambientLight intensity={0.6} />
        <directionalLight position={[5, 5, 5]} intensity={0.8} castShadow />
        <pointLight position={[-5, 5, 5]} intensity={0.4} />
        
        <AvatarMesh 
          isWaving={isWaving} 
          userMood={userMood}
          isThinking={isThinking}
          isListening={isListening}
          isSpeaking={isSpeaking}
        />
        
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
