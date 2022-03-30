import { Box, Heading, Text } from "@chakra-ui/react";
import { Debug, Physics, usePlane } from "@react-three/cannon";
import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import type { NextPage } from "next";
import Arm from "models/Arm";
import { Suspense, useRef, useState } from "react";

const Home: NextPage = () => {
  const armRef = useRef();
  return (
    <>
      <Box m={50} w="100%" h="100%" position="absolute">
        <Box w="500px">
          <Heading>Muscle</Heading>
          <Text>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </Text>
        </Box>
      </Box>
      <Box
        position="absolute"
        w="100%"
        h="100%"
        top="0"
        left="0"
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
        <Canvas
          shadows
          camera={{ position: [-1, 5, 5], fov: 45 }}
          style={{ position: "static" }}
        >
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
    </>
  );
};

export default Home;
