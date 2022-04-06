import { Box, Heading, Text } from "@chakra-ui/react";
import { withChildren } from "sections/section";

function JointTypes() {
  return (
    <Box>
      <Heading mb="5">Types of Joints</Heading>
      <Text>
        There are many different types of joints in the body. These include
        pivot joints, hinge joints, ball and socket joints, condyloid joints,
        plane joints, and saddle joints.
      </Text>
    </Box>
  );
}

export default withChildren(JointTypes, "joint-types");
