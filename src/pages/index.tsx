import { Box, Text } from "@chakra-ui/react";
import { Debug, Physics, usePlane } from "@react-three/cannon";
import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import type { NextPage } from "next";
import Arm from "models/Arm";
import { Suspense, useRef, useState } from "react";

const Home: NextPage = () => {
  const armRef = useRef();
  return (
    <Box
      w="100%"
      h="100%"
      onMouseDown={(e) => {
        switch (e.button) {
          case 0:
            armRef.current.flex("bi");
            break;
          case 2:
            armRef.current.flex("tri");
            break;
          default:
            break;
        }
      }}
      onMouseUp={() => armRef.current.flex(null)}
    >
      <Canvas shadows camera={{ position: [-1, 5, 5], fov: 45 }}>
        <ambientLight />
        <pointLight position={[1, 1, 1]} castShadow />
        <pointLight position={[-1, -1, -1]} castShadow />
        <OrbitControls />
        <axesHelper />
        <Suspense fallback={<Text>Loading...</Text>}>
          <Physics allowSleep>
            <Debug scale={1.0}>
              <Arm ref={armRef} />
            </Debug>
          </Physics>
        </Suspense>
      </Canvas>
    </Box>
  );
};

export default Home;
