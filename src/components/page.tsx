import { ReactNode } from "react";
import { Box, BoxProps, Text } from "@chakra-ui/react";
import { Canvas } from "@react-three/fiber";
import { Suspense, UIEvent, useEffect, useRef } from "react";
import usePage from "stores/page";
import Script from "next/script";

export default function Page({
  children,
  models,
  ...parentProps
}: {
  models: ReactNode;
  children: ReactNode;
} & BoxProps) {
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
        {...parentProps}
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
            <Suspense fallback={<Text>Loading...</Text>}>{models}</Suspense>
          </Canvas>
        </Box>
        <Box position="relative" zIndex="10" width="fit-content">
          {children}
        </Box>
      </Box>
    </>
  );
}
