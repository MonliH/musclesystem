import {
  Box,
  Heading,
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
  Text,
} from "@chakra-ui/react";
import { Debug, Physics, usePlane } from "@react-three/cannon";
import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import type { NextPage } from "next";
import Arm from "models/Arm";
import { Suspense, useRef, useState } from "react";
import create from "zustand";
import useMuscle from "stores/muscle";

const Home: NextPage = () => {
  const armRef = useRef();
  const state = useMuscle((state) => state);
  return (
    <Box display="flex" flexDirection="row" h="100%" w="100%">
      <Box p={200} pr={0}>
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
          {/* <Box mt="8">
            <Text fontWeight={"bold"}>Bicep Strength</Text>
            <Slider
              onChange={(v) => state.setBicep(v)}
              value={state.bicepStrength}
              defaultValue={500}
              min={30}
              max={2500}
            >
              <SliderTrack>
                <SliderFilledTrack />
              </SliderTrack>
              <SliderThumb />
            </Slider>

            <Text fontWeight={"bold"}>Tricep Strength</Text>
            <Slider
              onChange={(v) => state.setTricep(v)}
              value={state.tricepStrength}
              min={100}
              defaultValue={112}
              max={175}
            >
              <SliderTrack>
                <SliderFilledTrack />
              </SliderTrack>
              <SliderThumb />
            </Slider>
            <Text fontWeight={"bold"}>Mass of Load</Text>
            <Slider
              onChange={(v) => state.setMass(v)}
              value={state.mass}
              min={4}
              max={5.5}
              step={0.1}
            >
              <SliderTrack>
                <SliderFilledTrack />
              </SliderTrack>
              <SliderThumb />
            </Slider>
          </Box> */}
        </Box>
      </Box>
      <Box
        w="100%"
        h="100%"
        position="relative"
        onContextMenu={(e) => e.preventDefault()}
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
          camera={{ position: [-7, 5, 0.4], fov: 45 }}
          onCreated={({ camera }) => {
            camera.lookAt(0, 0, 0.4);
          }}
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
    </Box>
  );
};

export default Home;
