import { Box, Text } from "@chakra-ui/react";
import { Physics } from "@react-three/cannon";
import { Canvas } from "@react-three/fiber";
import type { NextPage } from "next";
import Arm, { ArmHandle } from "models/Arm";
import { Suspense, useRef } from "react";
import MuscleSection from "sections/muscle";

const Home: NextPage = () => {
  const armRef = useRef<ArmHandle>(null);
  return (
    <>
      <Box
        w="65%"
        h="100%"
        top="0"
        left="35%"
        position="fixed"
        onContextMenu={(e) => e.preventDefault()}
        onMouseDown={(e) => {
          switch (e.button) {
            case 0:
              armRef.current!.flex("bi");
              break;
            case 2:
              armRef.current!.flex("tri");
              break;
            default:
              break;
          }
        }}
        onMouseUp={() => armRef.current!.flex(null)}
      >
        <Canvas
          shadows
          camera={{ position: [-7, 5, 0.1], fov: 45 }}
          onCreated={({ camera }) => {
            camera.lookAt(0, 0, 0.1);
          }}
        >
          <ambientLight />
          <pointLight position={[1, 1, 1]} castShadow />
          <pointLight position={[-1, -1, -1]} castShadow />
          {/* <axesHelper /> */}
          <Suspense fallback={<Text>Loading...</Text>}>
            <Physics allowSleep>
              {/* <Debug scale={1.0}> */}
              <Arm ref={armRef} />
              {/* </Debug> */}
            </Physics>
          </Suspense>
        </Canvas>
      </Box>
      <Box width="100%" height="100%">
        <MuscleSection />
      </Box>
    </>
  );
};

export default Home;
