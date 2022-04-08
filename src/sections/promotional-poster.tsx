import { Box, Heading } from "@chakra-ui/react";
import { withChildren } from "sections/section";

function PromotionalPoster() {
  return (
    <Box w="100%">
      <Heading mb="5">Promotional Poster</Heading>
      <iframe
        src="https://drive.google.com/file/d/1bPONlqI6BsIBGWg8mETinN-C352kTARY/preview"
        style={{
          width: "50vw",
          height: "calc(50vw / 0.75)",
          maxWidth: "750px",
          maxHeight: "1000px",
        }}
        allow="autoplay"
      ></iframe>
    </Box>
  );
}

export default withChildren(PromotionalPoster, "promotional-poster", {
  innerWidth: "100%",
});
