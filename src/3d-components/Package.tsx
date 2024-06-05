import { CELL_SIZE } from '@/data/sizes';
import React, { useRef } from 'react';
import { Mesh } from 'three';

type PackageProps = {
  readonly position: [number, number, number];
}

export const Package: React.FC<PackageProps> = ({ position }) => {
  const mesh = useRef<Mesh>(null);
  const side = CELL_SIZE - CELL_SIZE / 4;

  return (
    <mesh 
      ref={mesh}
      receiveShadow
      castShadow
      position={[position[0], position[1] - CELL_SIZE / 8, position[2]]}
    >
      <boxGeometry 
        args={[side, side, side]} 
      />
      <meshStandardMaterial 
        color={'orange'}
        roughness={1}
      />
    </mesh>
  );
}