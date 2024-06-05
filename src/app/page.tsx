"use client"

import { Shelf } from '@/3d-components/Shelf';
import { EditWareHouse } from '@/app/components/EditWareHouse';
import { CELL_SIZE, WAREHOUSE_HEIGHT, WAREHOUSE_SIZE } from '@/data/sizes';
import { Shelf as TShelf, useWarehouse } from '@/states/useWarehouse';
import { Autocomplete, Stack, TextField, alpha } from '@mui/material';
import { OrbitControls } from '@react-three/drei';
import { Canvas } from "@react-three/fiber";
import { Fragment, useMemo } from 'react';
import { GridHelper } from 'three';

const Grid: React.FC = () => {
  return (
    <primitive
      object={new GridHelper(WAREHOUSE_SIZE, WAREHOUSE_SIZE / CELL_SIZE)} // Grid di 10 unità con 5 divisioni
      position={[0, -CELL_SIZE/2, 0]}
    />
  );
}

const Plane: React.FC = () => {
  return (
    <mesh 
      rotation={[-Math.PI / 2, 0, 0]} 
      position={[0, -CELL_SIZE / 2, 0]} 
      receiveShadow
    >
      <planeGeometry args={[WAREHOUSE_SIZE * 10, WAREHOUSE_SIZE * 10]} />
      <meshStandardMaterial color="white" />
    </mesh>
  );
}

export default function Home() {
  const { shelfs, fillShelf, unfillShelf } = useWarehouse();

  const toggleFill = (x: number, y: number, floor: number) => {
    const action = isFilled(x, y, floor) 
      ? unfillShelf 
      : fillShelf;

    action(x, y, floor);
  }

  const isFilled = (x: number, y: number, floor: number) => {
    return shelfs.some((shelf) => 
      shelf.x === x 
      && shelf.y === y 
      && shelf.floors[floor].filled
    );
  }

  const shelfCells = useMemo(() => {
    return shelfs
      .map((shelf) => {
        return shelf
          .floors
          .map((floor, index) => ({
            x: shelf.x,
            y: shelf.y,
            floor: index,
          }));
      })
      .flat();
  }, [shelfs])

  return (
    <main>
      <div style={{ height: '100vh' }}>
        <Stack
          direction="row"
          sx={{
            left: '50%',
            zIndex: 1000,
            background: theme => alpha(theme.palette.primary.main, 0.1),
            top: theme => theme.spacing(1),
            transform: 'translateX(-50%)',
            backdropFilter: 'blur(10px)',
            position: 'fixed',
            margin: 'auto',
            width: '100%',
            maxWidth: 500,
            padding: 1,
            borderRadius: 1,
          }}
        >
          <Autocomplete
            disablePortal
            options={shelfCells}
            getOptionLabel={(option) => `Scatola ${option.x}-${option.y} Piano ${option.floor} ${isFilled(option.x, option.y, option.floor) ? 'Piena' : 'Vuota'}`}
            fullWidth
            renderInput={(params) => 
              <TextField 
                {...params} 
                placeholder='Cerca scatola...'
                size='small'
              />
            }
          />
        </Stack>
        <Canvas shadows>
          <ambientLight intensity={3} />
          <pointLight 
            position={[0, WAREHOUSE_SIZE, 0]} 
            intensity={50000} 
            castShadow 
            shadow-mapSize-width={2048} // Aumenta la risoluzione della mappa delle ombre
            shadow-mapSize-height={2048}
            shadow-camera-near={0.5}
            shadow-camera-far={500}
            shadow-radius={10} // Aggiungi questo per rendere le ombre più sfocate
          />
          <Plane />
          {
            shelfs.map((shelf, index) => (
              <Fragment
                key={index}
              >
                {
                  [...Array(WAREHOUSE_HEIGHT)]
                    .map((_, floor) => (
                      <Shelf
                        key={`${index}-${floor}`}
                        filled={shelf.floors[floor].filled}
                        onClick={() => toggleFill(shelf.x, shelf.y, floor)}
                        position={[
                          shelf.x * CELL_SIZE - WAREHOUSE_SIZE / 2 + CELL_SIZE / 2, 
                          -CELL_SIZE / 2  + CELL_SIZE * floor, 
                          shelf.y * CELL_SIZE - WAREHOUSE_SIZE / 2 + CELL_SIZE / 2
                        ]}
                      />    
                    ))
                }
              </Fragment>
            ))
          }
          <OrbitControls
            enableZoom={true} // Abilita il controllo dello zoom
            zoomSpeed={1.0} // Imposta la velocità dello zoom
            minDistance={1} // Distanza minima dello zoom
            maxDistance={500} // Distanza massima dello zoom
          />
        </Canvas>
        <EditWareHouse />
      </div>
    </main>
  );
}
