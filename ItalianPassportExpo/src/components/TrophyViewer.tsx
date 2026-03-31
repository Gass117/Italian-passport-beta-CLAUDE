import React, { Suspense, useRef } from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';
import * as THREE from 'three';

// Fallback trophy that renders a shiny 3D golden crystal/diamond shape
function FallbackTrophy() {
    const meshRef = useRef<THREE.Mesh>(null);
    const ringRef = useRef<THREE.Mesh>(null);

    useFrame((state, delta) => {
        if (meshRef.current) {
            meshRef.current.rotation.y += delta * 0.5;
        }
        if (ringRef.current) {
            ringRef.current.rotation.x += delta * 0.8;
            ringRef.current.rotation.y += delta * 1.2;
        }
    });

    return (
        <group position={[0, 0, 0]} scale={1.5}>
            {/* Base crystal */}
            <mesh ref={meshRef}>
                <octahedronGeometry args={[1, 0]} />
                <meshStandardMaterial 
                    color="#fbbf24"  // Gold
                    metalness={0.9} 
                    roughness={0.1} 
                />
            </mesh>
            
            {/* Orbiting Ring */}
            <mesh ref={ringRef}>
                <torusGeometry args={[1.6, 0.05, 16, 100]} />
                <meshStandardMaterial 
                    color="#fbbf24" 
                    metalness={1} 
                    roughness={0.2} 
                />
            </mesh>
            
            {/* A small pedestal */}
            <mesh position={[0, -1.2, 0]}>
                <cylinderGeometry args={[0.8, 1, 0.2, 32]} />
                <meshStandardMaterial color="#334155" metalness={0.5} />
            </mesh>
        </group>
    );
}

function Model({ trophyAsset }: { trophyAsset: any }) {
    if (trophyAsset) {
        // Loads the .glb or .gltf file provided in PLACES_DATA
        const result = useGLTF(trophyAsset) as any;
        return <primitive object={result.scene} scale={2} position={[0, -1, 0]} />;
    }
    
    // If no asset is provided yet, show the generic golden trophy!
    return <FallbackTrophy />;
}

interface TrophyViewerProps {
    trophyAsset?: any;
}

export default function TrophyViewer({ trophyAsset }: TrophyViewerProps) {
    return (
        <View style={{ flex: 1, backgroundColor: 'transparent' }}>
            <Canvas camera={{ position: [0, 0, 6], fov: 50 }}>
                {/* 3D Lighting Setup (Bright Room) */}
                <ambientLight intensity={1.5} />
                <hemisphereLight args={['#ffffff', '#444444', 1.5]} />
                <directionalLight position={[10, 20, 10]} intensity={5} color="#ffffff" />
                <directionalLight position={[-10, 10, -10]} intensity={3} color="#fbbf24" />
                <pointLight position={[0, 0, 8]} intensity={3} color="#ffffff" />
                <pointLight position={[0, -5, -5]} intensity={2} color="#ffffff" />
                
                <Suspense fallback={null}>
                    <Model trophyAsset={trophyAsset} />
                </Suspense>
                
                <OrbitControls 
                    enablePan={false}
                    enableZoom={true}
                    minDistance={3}
                    maxDistance={10}
                    autoRotate={true}
                    autoRotateSpeed={2}
                />
            </Canvas>
        </View>
    );
}
