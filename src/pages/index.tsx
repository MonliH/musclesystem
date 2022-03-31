import { Box, Text } from "@chakra-ui/react";
import { Physics } from "@react-three/cannon";
import { Canvas } from "@react-three/fiber";
import type { NextPage } from "next";
import Arm, { ArmHandle } from "models/Arm";
import { Suspense, UIEvent, useRef } from "react";
import MuscleSection from "sections/muscle";
import BoneSection from "sections/bone";
import usePage from "stores/page";

const Home: NextPage = () => {
  const armRef = useRef<ArmHandle>(null);
  const setScroll = usePage((state) => state.setPageProgress);
  return (
    <Box w="100%" h="100%">
      <Box w="65%" h="100%" top="0" left="35%" position="fixed">
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
              <Arm order={1} ref={armRef} />
              {/* </Debug> */}
            </Physics>
          </Suspense>
        </Canvas>
      </Box>
      <Box
        position="relative"
        width="100%"
        zIndex="10"
        height="100%"
        onScroll={(e: UIEvent<HTMLDivElement>) => {
          setScroll(e.currentTarget.scrollTop);
        }}
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
        overflowY="scroll"
        onContextMenu={(e) => e.preventDefault()}
      >
        <BoneSection />
        <MuscleSection />
        <BoneSection />
        <BoneSection />
      </Box>
    </Box>
  );
};

export default Home;
