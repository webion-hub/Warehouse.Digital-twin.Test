import { CELL_SIZE } from '@/data/sizes';
import { useCursor } from '@react-three/drei';
import { useLoader } from '@react-three/fiber';
import React, { useRef, useState } from 'react';
import { Group, Mesh, MeshStandardMaterial } from 'three';
import { OBJLoader } from 'three-stdlib';
import { Package } from './Package';

type ShelfProps = {
  readonly position: [number, number, number];
  readonly filled?: boolean;
  readonly onClick?: () => void;
}

export const Shelf: React.FC<ShelfProps> = ({ position, onClick, filled }) => {
  const [hovered, setHovered] = useState(false);
  const obj = useLoader(OBJLoader, './3d-models/shelf.obj');
  const groupRef = useRef<Group>(null);
  const boundingBoxRef = useRef<Mesh>(null);

  useCursor(hovered);

  obj.traverse((child) => {
    if (child instanceof Mesh) {
      child.castShadow = true;
      child.receiveShadow = true;
      child.material = new MeshStandardMaterial({ 
        color: hovered ? '#ff4444' : '#aaa',
        roughness: 1,
      });
    }
  });

  const clonedObj = obj.clone();

  return (
    <group
      ref={groupRef}
      position={position}
    >
      <primitive
        object={clonedObj} 
        scale={[0.5, 0.5, 0.5]} // Imposta la scala iniziale
        rotation={[-Math.PI / 2, 0, 0]} // Imposta la rotazione iniziale
      />
      <mesh
        ref={boundingBoxRef}
        visible={false} // Make it invisible
        onClick={(e) => {
          e.stopPropagation()
          onClick?.()
        }}
        onPointerOver={(e) => {
          e.stopPropagation()
          setHovered(true)
        }}
        onPointerOut={(e) => {
          e.stopPropagation()
          setHovered(false)
        }}
        position={[0, CELL_SIZE / 2, 0]} // Posiziona il box sopra lo scaffale
      >
        <boxGeometry args={[CELL_SIZE, CELL_SIZE, CELL_SIZE]} />
        <meshStandardMaterial opacity={1} color="#ff0000" />
      </mesh>
      {
        filled && (
          <Package
            position={[0, CELL_SIZE / 2, 0]}
          />
        )
      }
    </group>
  );
};