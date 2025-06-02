
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
  const torsoRef = useRef<THREE.Group>(null);
  const [blinkTimer, setBlinkTimer] = useState(0);
  const [nextBlinkTime, setNextBlinkTime] = useState(3);
  
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
  const hairColor = "#8b4513";
  const eyeColor = "#4a5568";
  const clothingColor = "#3182ce";

  useFrame((state) => {
    const time = state.clock.elapsedTime;
    
    if (meshRef.current) {
      // Realistic breathing animation - chest rises and falls
      const breathingIntensity = 0.015;
      const breathingSpeed = 0.6;
      meshRef.current.position.y = Math.sin(time * breathingSpeed) * breathingIntensity;
      
      // Subtle weight shifting - realistic idle movement
      const shiftSpeed = 0.2;
      const shiftIntensity = 0.008;
      meshRef.current.position.x = Math.sin(time * shiftSpeed) * shiftIntensity;
      meshRef.current.rotation.z = Math.sin(time * shiftSpeed * 0.7) * 0.01;
    }
    
    // Torso breathing expansion
    if (torsoRef.current) {
      const breathScale = 1 + Math.sin(time * 0.6) * 0.02;
      torsoRef.current.scale.x = breathScale;
      torsoRef.current.scale.z = breathScale;
    }
    
    // Natural head movements
    if (headRef.current) {
      if (isThinking) {
        // Thinking: contemplative head tilt and slow nods
        headRef.current.rotation.z = Math.sin(time * 0.4) * 0.12;
        headRef.current.rotation.x = Math.sin(time * 0.25) * 0.08;
        headRef.current.position.y = 1.4 + Math.sin(time * 0.3) * 0.01;
      } else if (isListening) {
        // Listening: attentive forward lean with micro-movements
        headRef.current.rotation.x = -0.08 + Math.sin(time * 1.8) * 0.02;
        headRef.current.rotation.y = Math.sin(time * 0.7) * 0.02;
      } else if (isSpeaking) {
        // Speaking: natural head gestures
        headRef.current.rotation.y = Math.sin(time * 1.5) * 0.04;
        headRef.current.rotation.x = Math.sin(time * 2.2) * 0.02;
        headRef.current.position.y = 1.4 + Math.sin(time * 3) * 0.008;
      } else {
        // Idle: subtle natural movement
        headRef.current.rotation.y = Math.sin(time * 0.3) * 0.03;
        headRef.current.rotation.x = Math.sin(time * 0.4) * 0.015;
        headRef.current.rotation.z = Math.sin(time * 0.25) * 0.01;
        headRef.current.position.y = 1.4 + Math.sin(time * 0.6) * 0.005;
      }
    }
    
    // Arm movements
    if (leftArmRef.current) {
      if (isWaving) {
        // Energetic waving
        leftArmRef.current.rotation.z = Math.sin(time * 4) * 0.5 + 0.8;
        leftArmRef.current.rotation.x = Math.sin(time * 4) * 0.15;
      } else {
        // Natural arm sway
        leftArmRef.current.rotation.z = 0.2 + Math.sin(time * 0.4) * 0.05;
        leftArmRef.current.rotation.x = Math.sin(time * 0.3) * 0.03;
      }
    }
    
    if (rightArmRef.current) {
      if (isThinking) {
        // Hand to chin thinking pose
        rightArmRef.current.rotation.z = -0.7 + Math.sin(time * 0.5) * 0.1;
        rightArmRef.current.rotation.x = 0.3 + Math.sin(time * 0.4) * 0.05;
      } else {
        // Natural arm sway (opposite to left arm)
        rightArmRef.current.rotation.z = -0.2 + Math.sin(time * 0.4 + Math.PI) * 0.05;
        rightArmRef.current.rotation.x = Math.sin(time * 0.3 + Math.PI) * 0.03;
      }
    }
    
    // Realistic blinking
    if (eyesRef.current) {
      // Update blink timer
      const deltaTime = 1/60; // Approximate frame time
      setBlinkTimer(prev => prev + deltaTime);
      
      if (blinkTimer >= nextBlinkTime) {
        // Trigger blink
        const blinkPhase = (blinkTimer - nextBlinkTime) * 15; // Blink speed
        if (blinkPhase < 1) {
          // Closing phase
          eyesRef.current.scale.y = Math.max(0.1, 1 - blinkPhase);
        } else if (blinkPhase < 2) {
          // Opening phase
          eyesRef.current.scale.y = Math.min(expression.eyeScale, blinkPhase - 1);
        } else {
          // Blink complete, reset timer
          eyesRef.current.scale.y = expression.eyeScale;
          setBlinkTimer(0);
          setNextBlinkTime(2 + Math.random() * 4); // Random interval between blinks
        }
      } else {
        eyesRef.current.scale.y = expression.eyeScale;
      }
    }

    // Mouth animation for speaking
    if (mouthRef.current && isSpeaking) {
      const talkAnim = Math.sin(time * 8) * 0.08 + Math.sin(time * 12) * 0.04;
      mouthRef.current.scale.y = 1 + Math.abs(talkAnim);
      mouthRef.current.position.y = -0.08 + talkAnim * 0.01;
    } else if (mouthRef.current) {
      // Subtle mouth movements for breathing
      mouthRef.current.scale.y = 1 + Math.sin(time * 0.6) * 0.005;
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
      <group ref={torsoRef}>
        <mesh position={[0, 0.5, 0]}>
          <cylinderGeometry args={[0.25, 0.3, 0.8, 12]} />
          <meshStandardMaterial color={clothingColor} roughness={0.7} metalness={0.1} />
        </mesh>
      </group>

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
        <mesh>
          <planeGeometry args={[0.12, 0.12]} />
          <meshStandardMaterial color="#ffffff" />
        </mesh>
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
