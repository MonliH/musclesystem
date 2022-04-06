import { Box, Heading, Text } from "@chakra-ui/react";
import { withChildren } from "sections/section";

function MuscleMicroSection() {
  return (
    <Box>
      <Heading mb="5">Muscle Fibers</Heading>
      <Text>
        Muscles are soft tissues made up of bundles of fibers. There are many
        different types of muscle cells, some that you can control and some that
        contract involuntarily. There are three types of muscle cells in the
        human body: cardiac, skeletal, and smooth.
      </Text>
      <Text mt="3">
        Skeletal muscle cells are cylindrical in shape, contain multiple nuclei,
        and make up the muscle tissue connected to the skeleton and are
        important in locomotion. Skeletal muscle cells have very high energy
        demands, and contain many mitochondria. Skeletal muscle cells work with
        your tendons, ligaments, and bones to support the weight of your body
        and help you move.
      </Text>
      <Text mt="3">
        Some skeletal muscle cells contract quickly and use short bursts of
        energy (fast twitch muscles). Others move slowly and move over longer
        periods of time, such as the back muscles. When sprinting, you primarily
        use fast twitch muscle fibers, whereas when walking, you mostly use slow
        twitch fibers.
      </Text>
    </Box>
  );
}

export default withChildren(MuscleMicroSection, "muscle");
