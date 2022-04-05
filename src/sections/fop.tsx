import { Box, Heading, Image, Text } from "@chakra-ui/react";
import { a, useSpring } from "@react-spring/three";
import Section, { useSection } from "sections/section";

const AImage = a(Image);

export default function FopSection({ order }: { order: number }) {
  const { visible } = useSection(order);
  const { opacity } = useSpring({ opacity: visible ? 1 : 0 });

  return (
    <Section>
      <Heading mb="4">A Condition</Heading>
      <Heading size="md">Münchmeyer disease</Heading>
      <Text>
        Fibrodysplasia ossificans progressiva, also known as Münchmeyer disease
        is an extremely rare connective tissue disease resulting from a mutation
        of the ACVR1 gene. The ACVR1 is a protein critical for the development
        and repair of the skeletal system. The mutation of the ACVR1 gene
        affects the body's natural repair mechanism, causing fibrous tissue,
        such as muscle, tendons, and ligaments to become ossified, meaning new
        bone formation around them. This can eventually cause a second skeleton
        to form around the original, which progressively restricts the patient's
        ability to move and function.
      </Text>
      <Text mt="3">
        Though some treatments, such as using high doses of corticosteroids, can
        reduce some symptoms, no effective treatment is known. FOP is a genetic
        disorder that has a 50% chance of being passed down between an affected
        and unaffected parent (known as an autosomal dominant disorder).
        Diagnosis is often given by measuring elevated levels of alkaline
        phosphatase and bone-specific alkaline phosphatase. Another significant
        indicator for FOP is a shortened big toe and a malformed distal first
        metatarsal. Attempts to surgically remove excess bone in patients
        suffering with FOP will likely result in explosive new bone growth. As
        of 2017 there were approximately 800 cases of FOP confirmed worldwide,
        with an estimated incidence of 0.5 per million people.
      </Text>
      <Box position="fixed" right={"20vw"} top={"25vh"} pointerEvents="none">
        {/* @ts-ignore */}
        <AImage
          opacity={opacity}
          src="/fop.jpg"
          alt="Image of person with FOP"
        />
      </Box>
    </Section>
  );
}
