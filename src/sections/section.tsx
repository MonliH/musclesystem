import { ReactNode } from "react";
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
  nextTransitionAmt: number;
} {
  const pageProgress = usePage((state) => state.pageProgress);
  const sectionPixelOffset = pageProgress - order * window.innerHeight;
  const visible =
    sectionPixelOffset < 0 || sectionPixelOffset >= window.innerHeight
      ? false
      : true;
  const nextTransitionAmt = Math.min(
    Math.max(sectionPixelOffset / window.innerHeight, 0),
    1
  );
  return { visible, nextTransitionAmt };
}
