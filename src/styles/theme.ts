import type { ComponentStyleConfig } from "@chakra-ui/react";
import { extendTheme } from "@chakra-ui/react";
const Link: ComponentStyleConfig = {
  baseStyle: { color: "blue.500" },
};

const theme = extendTheme({ components: { Link } });
export default theme;
