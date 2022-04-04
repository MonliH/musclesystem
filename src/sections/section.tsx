import { ReactNode, useRef } from "react";
import { Box } from "@chakra-ui/react";
import usePage from "stores/page";

export default function Section({ children }: { children: ReactNode }) {
  return (
    <Box
      p={["50px", "50px", "120px", "180px", "250px"]}
      pr={["5px", "5px", "5px", "5px", "5px"]}
      h="100vh"
      width="fit-content"
    >
      <Box w="500px">{children}</Box>
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
  const pageProgress =
    usePage((state) => state.pageProgress) + window.innerHeight * 0.4;
  const sectionHeight = window.innerHeight * sectionLen;
  const sectionPixelOffset = pageProgress - order * window.innerHeight;
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
