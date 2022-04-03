import { Box, Text } from "@chakra-ui/react";
import { Debug, Physics } from "@react-three/cannon";
import { Canvas } from "@react-three/fiber";
import type { NextPage } from "next";
import Arm, { ArmHandle } from "models/Arm";
import Bone from "models/Bone";
import { Suspense, UIEvent, useRef } from "react";
import MuscleSection from "sections/muscle";
import CartilageSection from "sections/cartilage";
import BoneSection from "sections/bone";
import MarrowSection from "sections/marrow";
import MuscleMicroSection from "sections/muscleMicro";
import BoneMarrow from "models/BoneMarrow";
import Cartilage from "models/Cartilage";
import usePage from "stores/page";
import FullArm from "models/FullArm";

const Home: NextPage = () => {
  const armRef = useRef<ArmHandle>(null);
  const setScroll = usePage((state) => state.setPageProgress);
  return (
    <Box w="100%" h="100%">
      <Box w="100%" h="100%" top="0" left="0" position="fixed">
        <Canvas
          shadows
          camera={{ position: [-7, 5, -2.6], fov: 45 }}
          onCreated={({ camera }) => {
            camera.lookAt(0, 0, -2.6);
          }}
        >
          <ambientLight />
          <pointLight position={[1, 1, 1]} castShadow />
          <pointLight position={[-1, -1, -1]} castShadow />
          <Suspense fallback={<Text>Loading...</Text>}>
            <Physics allowSleep>
              <FullArm />
              <Bone order={0} />
              <BoneMarrow order={1} />
              <Cartilage order={2} />
              <Arm order={3} ref={armRef} />
              {/* <Bone order={2} /> */}
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
              armRef.current?.flex("bi");
              break;
            case 2:
              armRef.current?.flex("tri");
              break;
            default:
              break;
          }
        }}
        onMouseUp={() => armRef.current?.flex(null)}
        overflowY="scroll"
        onContextMenu={(e) => e.preventDefault()}
      >
        <BoneSection />
        <MarrowSection />
        <CartilageSection />
        <MuscleSection />
        <MuscleMicroSection />
      </Box>
    </Box>
  );
};

export default Home;
