'use client';

import { useFBX } from '@react-three/drei';
import { ThreeEvent } from '@react-three/fiber';
import * as THREE from 'three';
import { useEffect, useRef } from 'react';

interface TurkeyModelProps {
  onPointSelect?: (point: { x: number; y: number; z: number }) => void;
  selectedPoint?: { x: number; y: number; z: number } | null;
  zones?: Array<{ x: number; y: number; z: number; radius: number }>;
}

export function TurkeyModel({ onPointSelect, selectedPoint, zones }: TurkeyModelProps) {
  const fbx = useFBX('/models/turkey.fbx');
  const groupRef = useRef<THREE.Group>(null);

  // Traverse the model to ensure all meshes have raycast enabled
  useEffect(() => {
    if (fbx) {
      // console.log('Model loaded:', fbx);
      fbx.traverse((child) => {
        if ((child as THREE.Mesh).isMesh) {
          // console.log('Found mesh:', child.name);
          // Ensure it can be raycasted
          (child as THREE.Mesh).raycast = THREE.Mesh.prototype.raycast; 
        }
      });
    }
  }, [fbx]);

  const handleClick = (event: ThreeEvent<MouseEvent>) => {
    // IMPORTANT: Stop propagation so we don't click through to other things
    event.stopPropagation();
    
    // Convert world intersection to this group's local space
    // This keeps the point aligned with the scaled/positioned model
    const localPoint = groupRef.current
      ? groupRef.current.worldToLocal(event.point.clone())
      : event.point.clone();

    if (onPointSelect) {
      console.log('=== CLICK DETECTED (LOCAL SPACE) ===');
      console.log('COORDINATES FOR CONFIG:', `x: ${localPoint.x}, y: ${localPoint.y}, z: ${localPoint.z}`);
      
      onPointSelect(localPoint);
    }
  };

  return (
    <group ref={groupRef}>
      {/* Visual Debug: Show the target zones */}
      {/* Set raycast={null} (or a dummy function that returns null/false, effectively) to prevent intercepting clicks */}
      {/* In R3F/Three, standard meshes block raycasts. We can disable it by setting raycast={() => null} */}

      {/* Render target zones from question data */}
      {zones && zones.map((zone, index) => (
        <mesh
          key={index}
          position={[zone.x, zone.y, zone.z]}
          rotation={[0, 0, 0]}
          raycast={() => null}
        >
          <sphereGeometry args={[zone.radius, 32, 32]} />
          <meshStandardMaterial
            color="#12c712"
            transparent
            opacity={0.4}
            wireframe
          />
        </mesh>
      ))}

      <primitive
        object={fbx}
        scale={0.1}
        onClick={handleClick}
      />
      {selectedPoint && (
        <mesh position={[selectedPoint.x, selectedPoint.y, selectedPoint.z]}>
          <sphereGeometry args={[1, 16, 16]} /> 
          <meshStandardMaterial color="#ef4444" emissive="#7f1d1d" emissiveIntensity={1} />
        </mesh>
      )}
    </group>
  );
}
