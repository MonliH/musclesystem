import type { ComponentStyleConfig } from "@chakra-ui/react";
import { extendTheme } from "@chakra-ui/react";
const Link: ComponentStyleConfig = {
  baseStyle: { color: "blue.500" },
};

const theme = extendTheme({
  components: { Link },
  breakpoints: {
    sm: "250px",
    md: "500px",
    lg: "1000px",
    xl: "1600px",
    "2xl": "1880px",
  },
});
export default theme;
