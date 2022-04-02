import { ReactNode, useRef } from "react";
import { Box } from "@chakra-ui/react";
import usePage from "stores/page";

export default function Section({ children }: { children: ReactNode }) {
  return (
    <Box p={["50px", "50px", "120px", "180px", "250px"]} pr="5px" h="100vh">
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
} {
  const pageProgress = usePage((state) => state.pageProgress);
  const sectionHeight = window.innerHeight * sectionLen;
  const sectionPixelOffset = pageProgress - order * sectionHeight;
  const visible = !(
    sectionPixelOffset < 0 || sectionPixelOffset >= sectionHeight
  );
  const visibleRef = useRef(visible);
  visibleRef.current = visible;

  const atPrev = sectionPixelOffset <= 0;
  const atPrevRef = useRef(atPrev);
  atPrevRef.current = atPrev;

  const nextTransitionAmt = Math.min(
    Math.max(sectionPixelOffset / sectionHeight, 0),
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
