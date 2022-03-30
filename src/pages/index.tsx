import { Box, Text } from "@chakra-ui/react";
import { Debug, Physics, usePlane } from "@react-three/cannon";
import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import type { NextPage } from "next";
import Arm from "models/Arm";
import { Suspense, useState } from "react";

const Home: NextPage = () => {
  const [pressed, setPressed] = useState<null | "bi" | "tri">(null);
  return (
    <Box
      w="100%"
      h="100%"
      onMouseDown={(e) => {
        switch (e.button) {
          case 0:
            setPressed("bi");
            break;
          case 2:
            setPressed("tri");
            break;
          default:
            break;
        }
      }}
      onMouseUp={() => setPressed(null)}
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
              <Arm pressed={pressed} />
            </Debug>
          </Physics>
        </Suspense>
      </Canvas>
    </Box>
  );
};

export default Home;
