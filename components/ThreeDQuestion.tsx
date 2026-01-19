'use client';

import { useState, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stage } from '@react-three/drei';
import { TurkeyModel } from './TurkeyModel';
import { Question } from '@/lib/types';
import * as THREE from 'three';

interface ThreeDQuestionProps {
  question: Question;
  onAnswer: (answer: boolean) => void; // Returns true if correct, false if incorrect
}


export function ThreeDQuestion({ question, onAnswer }: ThreeDQuestionProps) {
  const [selectedPoint, setSelectedPoint] = useState<{ x: number; y: number; z: number } | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const handlePointSelect = (point: { x: number; y: number; z: number }) => {
    if (submitted) return;
    setSelectedPoint(point);
  };

  const handleSubmit = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent form submission if inside a form
    if (!selectedPoint || !question.targetZone) return;

    const selected = new THREE.Vector3(selectedPoint.x, selectedPoint.y, selectedPoint.z);
    
    let isCorrect = false;

    // Check multiple zones if they exist
    if (question.targetZone.zones && question.targetZone.zones.length > 0) {
      isCorrect = question.targetZone.zones.some(zone => {
        const target = new THREE.Vector3(zone.x, zone.y, zone.z);
        return target.distanceTo(selected) <= zone.radius;
      });
    } else {
      // Fallback to single zone
      const target = new THREE.Vector3(question.targetZone.x, question.targetZone.y, question.targetZone.z);
      const distance = target.distanceTo(selected);
      isCorrect = distance <= question.targetZone.radius;
    }
    
    setSubmitted(true);
    onAnswer(isCorrect);
  };

  return (
    <div className="w-full relative bg-slate-100 rounded-lg overflow-hidden border border-border" style={{ height: '500px' }}>
       {/* 
          Using key to force re-render if needed. 
          Moved the red ball inside TurkeyModel to ensure it uses the same coordinate space.
       */}
       <Canvas shadows camera={{
        position: [2, 25, 150],
         fov: 45
       }}>
        <ambientLight intensity={1.5} />
        <directionalLight position={[10, 10, 5]} intensity={2} />
        <Suspense fallback={null}>
          <Stage environment="city" intensity={1} adjustCamera={false}>
            <TurkeyModel
              onPointSelect={handlePointSelect}
              selectedPoint={selectedPoint}
              zones={question.targetZone?.zones}
            />
          </Stage>
          <OrbitControls makeDefault target={[0, 40, 0]} />
        </Suspense>
      </Canvas>
      
      <div className="absolute bottom-6 left-0 right-0 flex justify-center p-4 pointer-events-none">
        <button
          onClick={handleSubmit}
          disabled={!selectedPoint || submitted}
          className="bg-secondary text-white py-3 px-8 rounded-md hover:bg-secondary-600 disabled:opacity-50 disabled:cursor-not-allowed font-medium shadow-lg pointer-events-auto transition-all transform hover:scale-105 active:scale-95"
        >
          Confirm Location
        </button>
      </div>
      
      {!selectedPoint && (
        <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-black/60 text-white px-4 py-2 rounded-full text-sm pointer-events-none backdrop-blur-sm">
          Click on the model to select a point
        </div>
      )}
    </div>
  );
}
