import { Heading, Text } from "@chakra-ui/react";
import Section from "sections/section";
export default function Bone() {
  return (
    <Section>
      <Heading mb="4">Bone</Heading>
      <Text>
        A bone is a rigid organ that makes up your skeleton. Bones are primarily
        made of calcium phosphate and calcium carbonate. Bones protect the vital
        organs of the body, support your entire body, and enable mobility. There
        are 206 bones in the adult human, the largest of which being the femur
        (thigh bone).
      </Text>
      <Text mt="3">
        Bones are also the body{"'"}s main storage system of calcium and
        phosphorus inside the organism. Storage of these is important because it
        helps regulate the amount of minerals in the body{"'"}s bloodstream.
        When there are too few in the bloodstream, the body withdraws some
        minerals from the bone storage; when there are many, the body stores
        them in the bones.
      </Text>
    </Section>
  );
}
