import { ReactNode } from "react";
import { Box } from "@chakra-ui/react";

export default function Section({ children }: { children: ReactNode }) {
  return (
    <Box p={200} pr="5px" h="100vh">
      <Box w="500px">{children}</Box>
    </Box>
  );
}
