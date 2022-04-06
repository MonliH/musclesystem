import { Box, Heading, Text } from "@chakra-ui/react";
import { withChildren } from "sections/section";

function Marrow() {
  return (
    <Box>
      <Heading mb="4">Bone Marrow</Heading>
      <Text>
        Bone marrow is the spongey tissue inside your bones. One type of bone
        marrow is red marrow. Red marrow is made up of mostly hematopoietic
        tissue. In the hematopoietic tissue, a process called hematopoiesis
        occurs, in which hematopoietic stem cells form (most) of the blood cells
        in the body: red blood cells, platelets, and most white blood cells.
        This type of bone marrow can be extracted and donated to patients with
        leukemia. Leukemian is a form of cancer that affects the body{"'"}s
        blood forming tissue.
      </Text>
    </Box>
  );
}
export default withChildren(Marrow, "marrow");
