import { ReactNode, useRef } from "react";
import { Box } from "@chakra-ui/react";
import usePage from "stores/page";

export default function Section({ children }: { children: ReactNode }) {
  return (
    <Box p={200} pr="5px" h="100vh">
      <Box w="500px">{children}</Box>
    </Box>
  );
}

export function useSection(order: number): {
  visible: boolean;
  visibleRef: React.MutableRefObject<boolean>;
  nextTransitionAmt: number;
  nextTransitionAmtRef: React.MutableRefObject<number>;
  atPrev: boolean;
  atPrevRef: React.MutableRefObject<boolean>;
} {
  const pageProgress = usePage((state) => state.pageProgress);
  const sectionPixelOffset = pageProgress - order * window.innerHeight;
  const visible =
    sectionPixelOffset < 0 || sectionPixelOffset >= window.innerHeight
      ? false
      : true;
  const visibleRef = useRef(visible);
  visibleRef.current = visible;

  const atPrev = sectionPixelOffset <= 0;
  const atPrevRef = useRef(atPrev);
  atPrevRef.current = atPrev;

  const nextTransitionAmt = Math.min(
    Math.max(sectionPixelOffset / window.innerHeight, 0),
    1
  );
  const nextTransitionAmtRef = useRef(nextTransitionAmt);
  nextTransitionAmtRef.current = nextTransitionAmt;

  return {
    visible,
    visibleRef,
    nextTransitionAmt,
    nextTransitionAmtRef,
    atPrev,
    atPrevRef,
  };
}
