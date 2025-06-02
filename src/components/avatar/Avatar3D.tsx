
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

const HumanMesh = ({ 
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
  const mouthRef = useRef<THREE.Group>(null);
  const [blinkPhase, setBlinkPhase] = useState(0);
  
  // Get mood-based colors and expressions
  const getMoodExpression = (mood: string) => {
    switch (mood) {
      case "happy": return { eyeScale: 0.8, mouthCurve: 0.1, skinTone: "#fdbcb4" };
      case "sad": return { eyeScale: 0.6, mouthCurve: -0.1, skinTone: "#f4a6a6" };
      case "angry": return { eyeScale: 0.4, mouthCurve: -0.15, skinTone: "#f87171" };
      default: return { eyeScale: 1, mouthCurve: 0, skinTone: "#fdbcb4" };
    }
  };

  const expression = getMoodExpression(userMood);
  const skinColor = expression.skinTone;
  const hairColor = "#8b4513"; // Brown hair
  const eyeColor = "#4a5568"; // Dark gray eyes
  const clothingColor = "#3182ce"; // Blue shirt

  useFrame((state) => {
    if (meshRef.current) {
      // Gentle breathing animation
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.8) * 0.02;
      
      if (!isThinking && !isListening) {
        // Subtle idle movement
        meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.02;
      }
    }
    
    // Head animations
    if (headRef.current) {
      if (isThinking) {
        // Thinking: slight head tilt and occasional nods
        headRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.5) * 0.08;
        headRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.05;
      } else if (isListening) {
        // Listening: attentive forward lean
        headRef.current.rotation.x = -0.05 + Math.sin(state.clock.elapsedTime * 1.5) * 0.03;
      } else if (isSpeaking) {
        // Speaking: natural head movement
        headRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 2) * 0.03;
        headRef.current.position.y = Math.sin(state.clock.elapsedTime * 4) * 0.01;
      }
    }
    
    // Waving animation
    if (leftArmRef.current && isWaving) {
      leftArmRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 3) * 0.4 + 0.6;
      leftArmRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 3) * 0.1;
    }
    
    // Thinking gesture - hand to chin
    if (rightArmRef.current && isThinking) {
      rightArmRef.current.rotation.z = -0.6;
      rightArmRef.current.rotation.x = 0.2;
    }
    
    // Natural blinking animation
    if (eyesRef.current) {
      const blinkTime = state.clock.elapsedTime * 0.8;
      const shouldBlink = Math.sin(blinkTime) > 0.95;
      eyesRef.current.scale.y = shouldBlink ? 0.1 : expression.eyeScale;
    }

    // Mouth animation for speaking
    if (mouthRef.current && isSpeaking) {
      const talkAnim = Math.sin(state.clock.elapsedTime * 8) * 0.05;
      mouthRef.current.scale.y = 1 + talkAnim;
    }
  });

  return (
    <group ref={meshRef}>
      {/* Human Head */}
      <group ref={headRef} position={[0, 1.4, 0]}>
        {/* Face */}
        <mesh>
          <sphereGeometry args={[0.35, 16, 16]} />
          <meshStandardMaterial color={skinColor} roughness={0.8} metalness={0.1} />
        </mesh>

        {/* Hair */}
        <mesh position={[0, 0.1, -0.1]}>
          <sphereGeometry args={[0.38, 16, 16]} />
          <meshStandardMaterial color={hairColor} roughness={0.9} metalness={0.0} />
        </mesh>

        {/* Eyes */}
        <group ref={eyesRef}>
          {/* Eye whites */}
          <mesh position={[-0.12, 0.05, 0.32]}>
            <sphereGeometry args={[0.04, 8, 8]} />
            <meshStandardMaterial color="#ffffff" />
          </mesh>
          <mesh position={[0.12, 0.05, 0.32]}>
            <sphereGeometry args={[0.04, 8, 8]} />
            <meshStandardMaterial color="#ffffff" />
          </mesh>
          
          {/* Pupils */}
          <mesh position={[-0.12, 0.05, 0.35]}>
            <sphereGeometry args={[0.02, 8, 8]} />
            <meshStandardMaterial color={eyeColor} />
          </mesh>
          <mesh position={[0.12, 0.05, 0.35]}>
            <sphereGeometry args={[0.02, 8, 8]} />
            <meshStandardMaterial color={eyeColor} />
          </mesh>
        </group>

        {/* Nose */}
        <mesh position={[0, 0, 0.34]}>
          <coneGeometry args={[0.03, 0.08, 6]} />
          <meshStandardMaterial color={skinColor} roughness={0.8} />
        </mesh>

        {/* Mouth */}
        <group ref={mouthRef}>
          <mesh position={[0, -0.08, 0.33]} rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[0.06, 0.01, 4, 16]} />
            <meshStandardMaterial color="#8b4513" roughness={0.6} />
          </mesh>
        </group>

        {/* Ears */}
        <mesh position={[-0.32, 0, 0.1]}>
          <sphereGeometry args={[0.06, 8, 8]} />
          <meshStandardMaterial color={skinColor} roughness={0.8} />
        </mesh>
        <mesh position={[0.32, 0, 0.1]}>
          <sphereGeometry args={[0.06, 8, 8]} />
          <meshStandardMaterial color={skinColor} roughness={0.8} />
        </mesh>
      </group>

      {/* Neck */}
      <mesh position={[0, 1.05, 0]}>
        <cylinderGeometry args={[0.08, 0.1, 0.15, 12]} />
        <meshStandardMaterial color={skinColor} roughness={0.8} />
      </mesh>

      {/* Torso - wearing a shirt */}
      <mesh position={[0, 0.5, 0]}>
        <cylinderGeometry args={[0.25, 0.3, 0.8, 12]} />
        <meshStandardMaterial color={clothingColor} roughness={0.7} metalness={0.1} />
      </mesh>

      {/* Left Arm */}
      <group ref={leftArmRef} position={[-0.4, 0.7, 0]} rotation={[0, 0, 0.2]}>
        {/* Upper arm */}
        <mesh position={[0, 0, 0]}>
          <cylinderGeometry args={[0.06, 0.08, 0.3, 8]} />
          <meshStandardMaterial color={clothingColor} roughness={0.7} />
        </mesh>
        {/* Forearm */}
        <mesh position={[0, -0.25, 0]}>
          <cylinderGeometry args={[0.05, 0.06, 0.25, 8]} />
          <meshStandardMaterial color={skinColor} roughness={0.8} />
        </mesh>
        {/* Hand */}
        <mesh position={[0, -0.4, 0]}>
          <sphereGeometry args={[0.06, 8, 8]} />
          <meshStandardMaterial color={skinColor} roughness={0.8} />
        </mesh>
      </group>

      {/* Right Arm */}
      <group ref={rightArmRef} position={[0.4, 0.7, 0]} rotation={[0, 0, -0.2]}>
        {/* Upper arm */}
        <mesh position={[0, 0, 0]}>
          <cylinderGeometry args={[0.06, 0.08, 0.3, 8]} />
          <meshStandardMaterial color={clothingColor} roughness={0.7} />
        </mesh>
        {/* Forearm */}
        <mesh position={[0, -0.25, 0]}>
          <cylinderGeometry args={[0.05, 0.06, 0.25, 8]} />
          <meshStandardMaterial color={skinColor} roughness={0.8} />
        </mesh>
        {/* Hand */}
        <mesh position={[0, -0.4, 0]}>
          <sphereGeometry args={[0.06, 8, 8]} />
          <meshStandardMaterial color={skinColor} roughness={0.8} />
        </mesh>
      </group>

      {/* Legs with pants */}
      <group position={[-0.15, -0.2, 0]}>
        <mesh>
          <cylinderGeometry args={[0.08, 0.1, 0.6, 8]} />
          <meshStandardMaterial color="#2d3748" roughness={0.8} />
        </mesh>
        {/* Foot */}
        <mesh position={[0, -0.4, 0.08]}>
          <boxGeometry args={[0.12, 0.06, 0.2]} />
          <meshStandardMaterial color="#1a202c" roughness={0.6} />
        </mesh>
      </group>
      
      <group position={[0.15, -0.2, 0]}>
        <mesh>
          <cylinderGeometry args={[0.08, 0.1, 0.6, 8]} />
          <meshStandardMaterial color="#2d3748" roughness={0.8} />
        </mesh>
        {/* Foot */}
        <mesh position={[0, -0.4, 0.08]}>
          <boxGeometry args={[0.12, 0.06, 0.2]} />
          <meshStandardMaterial color="#1a202c" roughness={0.6} />
        </mesh>
      </group>

      {/* Letter A badge on shirt */}
      <Center position={[0, 0.6, 0.26]}>
        <Text3D
          font="/fonts/helvetiker_regular.typeface.json"
          size={0.08}
          height={0.01}
        >
          A
          <meshStandardMaterial color="#ffffff" />
        </Text3D>
      </Center>

      {/* Thought bubble when thinking */}
      {isThinking && (
        <group position={[0.6, 1.8, 0]}>
          <mesh>
            <sphereGeometry args={[0.15, 16, 16]} />
            <meshStandardMaterial color="#f7fafc" opacity={0.9} transparent />
          </mesh>
          <mesh position={[-0.1, -0.1, 0]}>
            <sphereGeometry args={[0.05, 8, 8]} />
            <meshStandardMaterial color="#f7fafc" opacity={0.7} transparent />
          </mesh>
          <mesh position={[-0.15, -0.2, 0]}>
            <sphereGeometry args={[0.03, 8, 8]} />
            <meshStandardMaterial color="#f7fafc" opacity={0.5} transparent />
          </mesh>
          {/* Thinking dots */}
          {[-0.03, 0, 0.03].map((x, i) => (
            <mesh key={i} position={[x, 0, 0]}>
              <sphereGeometry args={[0.01, 8, 8]} />
              <meshStandardMaterial color="#4a5568" />
            </mesh>
          ))}
        </group>
      )}

      {/* Sound waves when speaking */}
      {isSpeaking && (
        <group position={[0, 1.6, 0.4]}>
          {[0.2, 0.3, 0.4].map((radius, i) => (
            <mesh key={i} rotation={[0, 0, 0]} scale={[1 + i * 0.2, 1 + i * 0.2, 1]}>
              <ringGeometry args={[radius, radius + 0.015, 12]} />
              <meshStandardMaterial 
                color="#3182ce" 
                transparent 
                opacity={0.6 - i * 0.15} 
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
      <Canvas camera={{ position: [0, 0, 3], fov: 50 }}>
        <ambientLight intensity={0.6} />
        <directionalLight position={[5, 5, 5]} intensity={0.8} castShadow />
        <pointLight position={[-3, 3, 3]} intensity={0.4} color="#ffeaa7" />
        <pointLight position={[3, -3, 3]} intensity={0.3} color="#74b9ff" />
        
        <HumanMesh 
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
