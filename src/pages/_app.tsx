import "focus-visible/dist/focus-visible";
import "../styles/globals.css";
import { Box, ChakraProvider } from "@chakra-ui/react";
import type { AppProps } from "next/app";
import WithSubnavigation from "components/header";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <Box position="fixed" width="100%" zIndex={1000}>
        <WithSubnavigation />
      </Box>
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default MyApp;
