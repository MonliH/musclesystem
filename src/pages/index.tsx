import { Box, Text } from "@chakra-ui/react";
import { Debug, Physics, usePlane } from "@react-three/cannon";
import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import type { NextPage } from "next";
import Arm from "models/Arm";
import { Suspense } from "react";

const Home: NextPage = () => {
  return (
    <Box w="100%" h="100%">
      <Canvas shadows camera={{ position: [-1, 5, 5], fov: 45 }}>
        <ambientLight />
        <pointLight position={[1, 1, 1]} castShadow />
        <pointLight position={[-1, -1, -1]} castShadow />
        <OrbitControls />
        <axesHelper />
        <Suspense fallback={<Text>Loading...</Text>}>
          <Physics allowSleep>
            {/* <Debug scale={1.01}> */}
            <Arm />
            {/* </Debug> */}
          </Physics>
        </Suspense>
      </Canvas>
    </Box>
  );
};

export default Home;
