import React, { ReactNode, useEffect, useRef } from "react";
import { Box, BoxProps, Spacer, VStack } from "@chakra-ui/react";
import usePage from "stores/page";
import { URL_TO_FIRST_CHILD_HREF } from "components/header";

export default function Section({
  children,
  innerWidth = "500px",
  ...props
}: { children?: ReactNode; innerWidth?: BoxProps["w"] } & BoxProps) {
  return (
    <Box
      p={["50px", "50px", "120px", "180px", "250px"]}
      pl={["50px", "50px", "120px", "120px", "150px", "250px"]}
      pr={["5px", "5px", "5px", "5px", "5px"]}
      minHeight="100vh"
      width="fit-content"
      {...props}
    >
      <Box w={innerWidth} height="100%">
        {children}
      </Box>
    </Box>
  );
}

export function useSection(
  order: number,
  sectionLen: number = 1
): {
  visible: boolean;
  visibleRef: React.MutableRefObject<boolean>;
  nextTransitionAmt: number;
  nextTransitionAmtRef: React.MutableRefObject<number>;
  atPrev: boolean;
  atPrevRef: React.MutableRefObject<boolean>;
  nextTransitionUnbounded: number;
  nextTransitionUnboundedRef: React.MutableRefObject<number>;
} {
  const height = typeof window == "undefined" ? 1000 : window.innerHeight;
  const [pagePixelProgress, setPageProgress] = usePage((state) => [
    state.pageProgress,
    state.setPageProgress,
  ]);
  const pageProgress = pagePixelProgress + height * 0.4;
  useEffect(() => {
    const hash = window.location.hash;
    if (typeof hash !== "string") return;
    const element = document.getElementById(
      hash.length
        ? hash
        : URL_TO_FIRST_CHILD_HREF[window.location.pathname.slice(1)].slice(1)
    );
    if (!element) return;
    setPageProgress(element.getBoundingClientRect().top);
  }, []);
  const sectionHeight = height * sectionLen;
  const sectionPixelOffset = pageProgress - order * height;
  const visible = !(
    sectionPixelOffset < 0 || sectionPixelOffset >= sectionHeight
  );
  const visibleRef = useRef(visible);
  visibleRef.current = visible;

  const atPrev = sectionPixelOffset <= 0;
  const atPrevRef = useRef(atPrev);
  atPrevRef.current = atPrev;

  const nextTransitionUnbounded = sectionPixelOffset / sectionHeight;
  const nextTransitionUnboundedRef = useRef(nextTransitionUnbounded);
  nextTransitionUnboundedRef.current = nextTransitionUnbounded;

  const nextTransitionAmt = Math.min(Math.max(nextTransitionUnbounded, 0), 1);
  const nextTransitionAmtRef = useRef(nextTransitionAmt);
  nextTransitionAmtRef.current = nextTransitionAmt;

  return {
    visible,
    visibleRef,
    nextTransitionAmt,
    nextTransitionAmtRef,
    atPrev,
    atPrevRef,
    nextTransitionUnbounded,
    nextTransitionUnboundedRef,
  };
}

export function withChildren<Props extends object>(
  Component: React.FC<Props>,
  id: string,
  sectionProps?: React.ComponentProps<typeof Section>
) {
  const TempComponent = ({
    children,
    ...props
  }: { children?: ReactNode } & Props) => {
    return (
      <Section id={id} {...sectionProps} position="relative">
        <VStack height="100%" alignItems={"left"}>
          <Component {...(props as any)} />
          <Spacer />
          {children}
        </VStack>
      </Section>
    );
  };
  return TempComponent;
}
