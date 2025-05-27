
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

const RobotMesh = ({ 
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
  const antennaRef = useRef<THREE.Group>(null);
  const processingDotsRef = useRef<THREE.Group>(null);
  const [blinkPhase, setBlinkPhase] = useState(0);
  
  // Get mood-based colors for robot
  const getMoodColor = (mood: string) => {
    switch (mood) {
      case "happy": return "#4ade80"; // green
      case "sad": return "#60a5fa"; // blue
      case "angry": return "#f87171"; // red
      default: return "#71717a"; // neutral gray
    }
  };

  useFrame((state) => {
    if (meshRef.current) {
      // Gentle floating animation
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime) * 0.1;
      
      if (!isThinking && !isListening) {
        meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.05;
      }
    }
    
    // Head animations
    if (headRef.current) {
      if (isThinking) {
        // Thinking: slow head tilt side to side
        headRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.8) * 0.15;
      } else if (isListening) {
        // Listening: slight forward lean and occasional nods
        headRef.current.rotation.x = -0.1 + Math.sin(state.clock.elapsedTime * 2) * 0.05;
      } else if (isSpeaking) {
        // Speaking: slight up and down movement
        headRef.current.position.y = Math.sin(state.clock.elapsedTime * 3) * 0.02;
      }
    }
    
    // Antenna animation
    if (antennaRef.current) {
      antennaRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 2) * 0.1;
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
    
    // Robotic blinking animation (more mechanical)
    if (eyesRef.current) {
      const blinkTime = state.clock.elapsedTime * 0.5;
      const shouldBlink = Math.sin(blinkTime) > 0.98;
      eyesRef.current.scale.y = shouldBlink ? 0.1 : 1;
    }

    // Processing dots animation
    if (processingDotsRef.current && isThinking) {
      const dots = processingDotsRef.current.children;
      dots.forEach((dot, i) => {
        if (dot instanceof THREE.Mesh) {
          dot.scale.setScalar(Math.sin(state.clock.elapsedTime * 3 + i) * 0.5 + 1);
        }
      });
    }
  });

  const bodyColor = getMoodColor(userMood);
  const metalColor = "#a1a1aa"; // zinc color for metal parts

  return (
    <group ref={meshRef}>
      {/* Robot Head - more angular */}
      <group ref={headRef} position={[0, 1.5, 0]}>
        <mesh>
          <boxGeometry args={[0.8, 0.8, 0.8]} />
          <meshStandardMaterial color={metalColor} metalness={0.8} roughness={0.2} />
        </mesh>

        {/* Robot Eyes - LED style */}
        <group ref={eyesRef}>
          <mesh position={[-0.2, 0.1, 0.41]}>
            <cylinderGeometry args={[0.08, 0.08, 0.1, 8]} />
            <meshStandardMaterial color={bodyColor} emissive={bodyColor} emissiveIntensity={0.3} />
          </mesh>
          <mesh position={[0.2, 0.1, 0.41]}>
            <cylinderGeometry args={[0.08, 0.08, 0.1, 8]} />
            <meshStandardMaterial color={bodyColor} emissive={bodyColor} emissiveIntensity={0.3} />
          </mesh>
        </group>

        {/* Robot Mouth - Speaker grille */}
        <mesh position={[0, -0.15, 0.41]}>
          <boxGeometry args={[0.3, 0.1, 0.05]} />
          <meshStandardMaterial color="#000000" />
        </mesh>
        
        {/* Speaker lines */}
        {[-0.1, 0, 0.1].map((x, i) => (
          <mesh key={i} position={[x, -0.15, 0.42]}>
            <boxGeometry args={[0.02, 0.06, 0.01]} />
            <meshStandardMaterial color={bodyColor} />
          </mesh>
        ))}

        {/* Robot Antennas */}
        <group ref={antennaRef}>
          <mesh position={[-0.3, 0.4, 0]}>
            <cylinderGeometry args={[0.02, 0.02, 0.3, 8]} />
            <meshStandardMaterial color={metalColor} metalness={0.9} roughness={0.1} />
          </mesh>
          <mesh position={[-0.3, 0.65, 0]}>
            <sphereGeometry args={[0.05, 8, 8]} />
            <meshStandardMaterial color={bodyColor} emissive={bodyColor} emissiveIntensity={0.2} />
          </mesh>
          
          <mesh position={[0.3, 0.4, 0]}>
            <cylinderGeometry args={[0.02, 0.02, 0.3, 8]} />
            <meshStandardMaterial color={metalColor} metalness={0.9} roughness={0.1} />
          </mesh>
          <mesh position={[0.3, 0.65, 0]}>
            <sphereGeometry args={[0.05, 8, 8]} />
            <meshStandardMaterial color={bodyColor} emissive={bodyColor} emissiveIntensity={0.2} />
          </mesh>
        </group>
      </group>

      {/* Robot Body - cylindrical with panels */}
      <mesh position={[0, 0.5, 0]}>
        <cylinderGeometry args={[0.4, 0.5, 1, 8]} />
        <meshStandardMaterial color={metalColor} metalness={0.7} roughness={0.3} />
      </mesh>

      {/* Chest Panel */}
      <mesh position={[0, 0.6, 0.41]}>
        <boxGeometry args={[0.6, 0.6, 0.05]} />
        <meshStandardMaterial color={bodyColor} metalness={0.5} roughness={0.4} />
      </mesh>

      {/* Left Arm (robotic segments) */}
      <group ref={leftArmRef} position={[-0.6, 0.8, 0]}>
        {/* Upper arm */}
        <mesh position={[0, 0.1, 0]}>
          <cylinderGeometry args={[0.1, 0.12, 0.4, 8]} />
          <meshStandardMaterial color={metalColor} metalness={0.8} roughness={0.2} />
        </mesh>
        {/* Elbow joint */}
        <mesh position={[0, -0.1, 0]}>
          <sphereGeometry args={[0.12, 8, 8]} />
          <meshStandardMaterial color={bodyColor} metalness={0.6} roughness={0.3} />
        </mesh>
        {/* Lower arm */}
        <mesh position={[0, -0.3, 0]}>
          <cylinderGeometry args={[0.08, 0.1, 0.4, 8]} />
          <meshStandardMaterial color={metalColor} metalness={0.8} roughness={0.2} />
        </mesh>
        {/* Robot Hand - more mechanical */}
        <mesh position={[0, -0.5, 0]}>
          <boxGeometry args={[0.15, 0.15, 0.08]} />
          <meshStandardMaterial color={bodyColor} metalness={0.6} roughness={0.4} />
        </mesh>
      </group>

      {/* Right Arm (robotic segments) */}
      <group ref={rightArmRef} position={[0.6, 0.8, 0]} rotation={[0, 0, -0.3]}>
        {/* Upper arm */}
        <mesh position={[0, 0.1, 0]}>
          <cylinderGeometry args={[0.1, 0.12, 0.4, 8]} />
          <meshStandardMaterial color={metalColor} metalness={0.8} roughness={0.2} />
        </mesh>
        {/* Elbow joint */}
        <mesh position={[0, -0.1, 0]}>
          <sphereGeometry args={[0.12, 8, 8]} />
          <meshStandardMaterial color={bodyColor} metalness={0.6} roughness={0.3} />
        </mesh>
        {/* Lower arm */}
        <mesh position={[0, -0.3, 0]}>
          <cylinderGeometry args={[0.08, 0.1, 0.4, 8]} />
          <meshStandardMaterial color={metalColor} metalness={0.8} roughness={0.2} />
        </mesh>
        {/* Robot Hand - more mechanical */}
        <mesh position={[0, -0.5, 0]}>
          <boxGeometry args={[0.15, 0.15, 0.08]} />
          <meshStandardMaterial color={bodyColor} metalness={0.6} roughness={0.4} />
        </mesh>
      </group>

      {/* Robot Legs - more mechanical */}
      <group position={[-0.2, -0.3, 0]}>
        <mesh>
          <cylinderGeometry args={[0.1, 0.12, 0.6, 8]} />
          <meshStandardMaterial color={metalColor} metalness={0.8} roughness={0.2} />
        </mesh>
        {/* Knee joint */}
        <mesh position={[0, -0.4, 0]}>
          <sphereGeometry args={[0.1, 8, 8]} />
          <meshStandardMaterial color={bodyColor} metalness={0.6} roughness={0.3} />
        </mesh>
        {/* Robot Foot */}
        <mesh position={[0, -0.7, 0.1]}>
          <boxGeometry args={[0.2, 0.1, 0.3]} />
          <meshStandardMaterial color={bodyColor} metalness={0.6} roughness={0.4} />
        </mesh>
      </group>
      
      <group position={[0.2, -0.3, 0]}>
        <mesh>
          <cylinderGeometry args={[0.1, 0.12, 0.6, 8]} />
          <meshStandardMaterial color={metalColor} metalness={0.8} roughness={0.2} />
        </mesh>
        {/* Knee joint */}
        <mesh position={[0, -0.4, 0]}>
          <sphereGeometry args={[0.1, 8, 8]} />
          <meshStandardMaterial color={bodyColor} metalness={0.6} roughness={0.3} />
        </mesh>
        {/* Robot Foot */}
        <mesh position={[0, -0.7, 0.1]}>
          <boxGeometry args={[0.2, 0.1, 0.3]} />
          <meshStandardMaterial color={bodyColor} metalness={0.6} roughness={0.4} />
        </mesh>
      </group>

      {/* Letter A on chest - now more robotic */}
      <Center position={[0, 0.6, 0.46]}>
        <Text3D
          font="/fonts/helvetiker_regular.typeface.json"
          size={0.2}
          height={0.02}
        >
          A
          <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={0.1} />
        </Text3D>
      </Center>

      {/* Processing bubble when thinking */}
      {isThinking && (
        <group position={[0.8, 2.2, 0]}>
          <mesh>
            <boxGeometry args={[0.3, 0.15, 0.05]} />
            <meshStandardMaterial color="#000000" />
          </mesh>
          <mesh position={[0, 0, 0.03]}>
            <boxGeometry args={[0.25, 0.1, 0.01]} />
            <meshStandardMaterial color={bodyColor} emissive={bodyColor} emissiveIntensity={0.3} />
          </mesh>
          {/* Processing dots */}
          <group ref={processingDotsRef}>
            {[-0.08, 0, 0.08].map((x, i) => (
              <mesh key={i} position={[x, 0, 0.04]}>
                <sphereGeometry args={[0.02, 8, 8]} />
                <meshStandardMaterial color={bodyColor} emissive={bodyColor} emissiveIntensity={0.5} />
              </mesh>
            ))}
          </group>
        </group>
      )}

      {/* Digital sound waves when speaking */}
      {isSpeaking && (
        <group position={[0, 1.8, 0.6]}>
          {[0.3, 0.5, 0.7].map((radius, i) => (
            <mesh key={i} rotation={[0, 0, 0]} scale={[1 + i * 0.3, 1 + i * 0.3, 1]}>
              <ringGeometry args={[radius, radius + 0.02, 8]} />
              <meshStandardMaterial 
                color={bodyColor} 
                emissive={bodyColor} 
                emissiveIntensity={0.4 - i * 0.1} 
                transparent 
                opacity={0.8 - i * 0.2} 
              />
            </mesh>
          ))}
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
        <ambientLight intensity={0.4} />
        <directionalLight position={[5, 5, 5]} intensity={0.8} castShadow />
        <pointLight position={[-5, 5, 5]} intensity={0.6} color="#4ade80" />
        <pointLight position={[5, -5, 5]} intensity={0.4} color="#60a5fa" />
        
        <RobotMesh 
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
