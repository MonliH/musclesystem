import "focus-visible/dist/focus-visible";
import "../styles/globals.css";
import { Box, ChakraProvider } from "@chakra-ui/react";
import type { AppProps } from "next/app";
import WithSubnavigation from "components/header";
import theme from "styles/theme";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <Box position="fixed" width="100%" zIndex={1000}>
        <WithSubnavigation />
      </Box>
      <Component {...pageProps} />
    </ChakraProvider>
  );
}
console.log(
  "%cHello There!",
  "border: solid black 1px; color: #1f1f1f; font-size: 30px; padding-left: 5px; padding-right: 5px; border-radius: 3px;"
);
console.log(
  "%cLet me know if you see this!\n%c- Jonathan Li",
  "color: green; font-size: 16px;",
  "color: black; font-size: 18px;"
);
console.log(
  "If you want to see the code, take a look at the github repo: %chttps://github.com/MonliH/musclesystem/",
  "color: blue"
);

export default MyApp;
