import { Box, Text } from "@chakra-ui/react";
import { Physics } from "@glavin001/use-ammojs";
import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import type { NextPage } from "next";
import Arm from "models/Arm";
import { Suspense } from "react";

function ArmSim() {
  return <Arm />;
}

const Home: NextPage = () => {
  return (
    <Box w="100%" h="100%">
      <Canvas
        shadows
        gl={{ alpha: true }}
        camera={{ position: [-1, 5, 5], fov: 45 }}
      >
        <ambientLight />
        <pointLight position={[1, 1, 1]} castShadow />
        <pointLight position={[-1, -1, -1]} castShadow />
        <OrbitControls />
        <Suspense fallback={<Text>Loading...</Text>}>
          <Physics drawDebug>
            <ArmSim />
          </Physics>
        </Suspense>
      </Canvas>
    </Box>
  );
};

export default Home;
