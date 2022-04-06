import { Box, Heading, Image, Text } from "@chakra-ui/react";
import { a, useSpring } from "react-spring";
import Section, { useSection } from "sections/section";

export default function BursaeSection({ order }: { order: number }) {
  const { visible } = useSection(order);
  const { opacity } = useSpring({ opacity: visible ? 1 : 0 });

  return (
    <Section id="bursae">
      <Heading mb="4">Bursae</Heading>
      <Text>
        A bursa is an enclosed, fluid filled sac that works as a cushion and a
        gliding/slippery? surface to reduce surface friction. A busa is also
        made of fibrous tissue, but doesn{"'"}t make up part of the joint.
      </Text>
      <Box position="fixed" right={"15vw"} top={"25vh"} pointerEvents="none">
        <a.div style={{ opacity }}>
          <Image src="/bursae.webp" alt="Figure of bursa" />
        </a.div>
      </Box>
    </Section>
  );
}
