import { Box, Text } from "@chakra-ui/react";
import { Physics } from "@react-three/cannon";
import { Canvas } from "@react-three/fiber";
import type { NextPage } from "next";
import Arm, { ArmHandle } from "models/Arm";
import Bone from "models/Bone";
import { Suspense, UIEvent, useEffect, useRef } from "react";
import MuscleSection from "sections/muscle";
import CartilageSection from "sections/cartilage";
import BoneSection from "sections/bone";
import MarrowSection from "sections/marrow";
import MuscleMicroSection from "sections/muscleMicro";
import BoneMarrow from "models/BoneMarrow";
import Cartilage from "models/Cartilage";
import usePage from "stores/page";
import Tendon from "models/Tendon";
import TendonsSection from "sections/tendon";
import LigamentsSection from "sections/ligaments";
import JointTypes from "sections/typesOfJoints";
import Script from "next/script";
import BursaeSection from "sections/bursae";
import FopSection from "sections/fop";

const Home: NextPage = () => {
  const armRef = useRef<ArmHandle>(null);
  const setScroll = usePage((state) => state.setPageProgress);
  const canvasRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const initedRef = useRef(false);
  const initFn = () => {
    if (
      !initedRef.current &&
      window.uss &&
      canvasRef.current &&
      contentRef.current
    ) {
      initedRef.current = true;
      const easeFunction = (remaningScrollDistance: number) => {
        return remaningScrollDistance / 10 + 1;
      };

      const onScroll = (_e: Event) => {
        const e = _e as WheelEvent;
        window.uss.scrollYBy(e.deltaY, contentRef.current, null, false);
      };
      window.uss.setYStepLengthCalculator(easeFunction, contentRef.current);
      canvasRef.current.addEventListener("wheel", onScroll);
      const div = canvasRef.current;
      return () => {
        div.removeEventListener("wheel", onScroll);
      };
    }
  };
  useEffect(initFn, []);
  return (
    <>
      <Script src="/universalsmoothscroll-min.js" onLoad={initFn}></Script>
      <Box
        w="100%"
        h="100%"
        ref={contentRef}
        onContextMenu={(e) => e.preventDefault()}
        overflowY="scroll"
        onScroll={(e: UIEvent<HTMLDivElement>) => {
          setScroll(e.currentTarget.scrollTop);
        }}
      >
        <Box
          w="100%"
          h="100%"
          top="0"
          left="0"
          position="fixed"
          ref={canvasRef}
        >
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
                <Bone order={0} />
                <BoneMarrow order={1} />
                <Cartilage order={2} />
                <Tendon order={5} />
                <Arm order={7} ref={armRef} />
              </Physics>
            </Suspense>
          </Canvas>
        </Box>
        <Box
          position="relative"
          zIndex="10"
          width="fit-content"
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
        >
          <BoneSection />
          <MarrowSection />
          <CartilageSection />
          <LigamentsSection />
          <BursaeSection order={4} />
          <TendonsSection />
          <JointTypes />
          <MuscleSection />
          <MuscleMicroSection />
          <FopSection order={9} />
          <Box height="20vh"></Box>
        </Box>
      </Box>
    </>
  );
};

export default Home;
