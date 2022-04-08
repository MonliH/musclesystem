import { Box, Heading, Image, Text } from "@chakra-ui/react";
import { a, useSpring } from "react-spring";
import Section, { useSection } from "sections/section";

export default function FopSection({ order }: { order: number }) {
  const { visible } = useSection(order);
  const { opacity } = useSpring({ opacity: visible ? 1 : 0 });

  return (
    <Section id="condition">
      <Heading mb="1">A Rare condition</Heading>
      <Heading size="md" mb="3">
        Münchmeyer disease
      </Heading>
      <Text>
        Fibrodysplasia ossificans progressiva (FOP), also known as Münchmeyer
        disease, is an extremely rare connective tissue disease resulting from a
        mutation of the ACVR1 gene. The ACVR1 is a protein critical for
        developing and repairing the skeletal system. The mutation of the ACVR1
        gene affects the body{"'"}s natural repair mechanism, causing fibrous
        tissue, such as muscle, tendons, and ligaments, to become encased with
        new bone (known as ossification). This ossification can eventually cause
        a second skeleton to form around the original, which progressively
        restricts the patient{"'"}s ability to move and function.
      </Text>
      <Text mt="3">
        Though some treatments, such as the usage of high doses of
        corticosteroids, can reduce symptoms, no effective treatment is known.
        FOP is a genetic disorder with a 50% chance of being passed down between
        an affected and unaffected parent (known as an autosomal dominant
        disorder). Diagnosis is often based on a patient{"'"}s characteristic
        malformed and shortened big toe and rapidly changing swelling on the
        head, neck, and back. Attempts to surgically remove excess bone in
        patients suffering from FOP will likely result in explosive new bone
        growth. As of 2017, there were approximately 800 cases of FOP confirmed
        worldwide, with an estimated incidence of 0.5 per million people.
      </Text>
      <Box
        position="fixed"
        right={"7vw"}
        top={"18vh"}
        maxWidth="40vw"
        pointerEvents="none"
      >
        {/* @ts-ignore */}
        <a.div style={{ opacity }}>
          <Image
            src="/fop.webp"
            alt="Difference between healthy bone and bone from person with FOP"
            borderRadius="lg"
          />
          <Text mt="1">
            <i>
              Difference between a healthy bone (left) and bone from an FOP
              patient (right)
            </i>
          </Text>
        </a.div>
      </Box>
    </Section>
  );
}
