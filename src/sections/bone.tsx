import { Heading, Text } from "@chakra-ui/react";
import Section from "sections/section";
export default function Bone() {
  return (
    <Section id="overview">
      <Heading mb="4">Bone</Heading>
      <Text>
        A bone is a rigid organ that makes up your skeleton. Bones are primarily
        made of calcium phosphate and calcium carbonate. Bones protect the vital
        organs, support your entire body, and enable mobility. There are 206
        bones in the adult human, the largest of which being the femur (thigh
        bone).
      </Text>
      <Text mt="3">
        Bones are the body{"'"}s main calcium and phosphorus storage system
        inside the body. Storage of these is crucial because it helps regulate
        the number of minerals in the bloodstream. When there are too few in the
        bloodstream, the body withdraws some minerals from the bone storage;
        when there are too many, the body stores them in the bones.
      </Text>
      <Text mt="3">
        Bones also protect your body. The skull protects the brain, the spinal
        column protects the spinal cord, and the ribcage protects the organs in
        the chest. Bones can even protect joints; for example, the patella,
        which is a bone, protects the knee joint from damage and injury.
      </Text>
    </Section>
  );
}
