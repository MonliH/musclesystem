import { Box, Heading, Text } from "@chakra-ui/react";
import { withChildren } from "sections/section";

function StayingHealthySection() {
  return (
    <Box>
      <Heading mb="5">Staying Healthy</Heading>
      <Text>
        Tendons are a tough flexible band of fibrous connective tissue that
        connects muscles to bones. Tendons are responsible for moving our limbs.
        Tendons are highly resistant to tear, but aren{"'"}t stretchy. This
        means they can be easily injured when strained, and will take a long
        time to heal. Tendons can be found throughout your body! The largest of
        which being the Achilles tendon, which connects your calf muscle to your
        heel bone.
      </Text>
    </Box>
  );
}

export default withChildren(StayingHealthySection, "staying-healthy");
