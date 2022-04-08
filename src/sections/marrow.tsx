import { Box, Heading, Text } from "@chakra-ui/react";
import { withChildren } from "sections/section";

function Marrow() {
  return (
    <Box>
      <Heading mb="4">Bone Marrow</Heading>
      <Text>
        Bone marrow is the spongy tissue inside your bones. There are two types
        of bone marrow, red and yellow.
      </Text>
      <Text mt="3">
        Red marrow is made up of mostly hematopoietic tissue. Hematopoietic
        tissues undergo a process, known as hematopoiesis, that forms (most) of
        the blood cells in the body: red blood cells, platelets, and most white
        blood cells. This type of bone marrow can be extracted and donated to
        patients with leukemia, a form of cancer that affects the body’s
        blood-forming tissue.
      </Text>
      <Text mt="3">
        Yellow bone marrow is primarily fat and contains stem cells that can
        become cartilage, fat, or bone cells (known as mesenchymal stem cells).
        The specific type of fat is stored in cells called adipocytes. These
        cells help maintain the right environment and provide the sustenance
        that the bones require to function properly. As humans mature, most red
        bone marrow turns to yellow bone marrow.
      </Text>
    </Box>
  );
}
export default withChildren(Marrow, "marrow");
