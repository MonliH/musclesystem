import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Image,
  Heading,
  Text,
  Box,
} from "@chakra-ui/react";
import { a, useSpring } from "react-spring";
import Section from "sections/section";
import useJointPart, { JointPart } from "stores/jointPart";

export default function JoinOverview() {
  const [expanded, setExpanded] = useJointPart((state) => [
    state.part,
    state.setPart,
  ]);
  const bursaeProps = useSpring({
    opacity: expanded == JointPart.Bursae ? 1 : 0,
  });
  return (
    <Section id="overview">
      <Heading mb="10">Parts of a Joint</Heading>
      <Accordion allowToggle index={expanded} onChange={setExpanded}>
        <AccordionItem>
          <AccordionButton>
            <Heading flex="1" textAlign="left" size="md">
              Cartilage
            </Heading>
            <AccordionIcon />
          </AccordionButton>
          <AccordionPanel>
            <Text>
              Cartilage is a flexible connective tissue that keeps joints moving
              by coating the surfaces and cushioning against impact. Cartilage
              is the main type of connective tissue and can be found throughout
              the body, including the lungs, ears, nose, spine, bones, and of
              course, joints. The attached muscles contract to move the bones.
            </Text>
          </AccordionPanel>
        </AccordionItem>
        <AccordionItem>
          <AccordionButton>
            <Heading flex="1" textAlign="left" size="md">
              Ligaments
            </Heading>
            <AccordionIcon />
          </AccordionButton>
          <AccordionPanel>
            <Text>
              Ligaments are made of dense fibrous elastic tissue that connect
              bones to one and other, forming part of the joint. Ligaments can
              also help to limit hyperextension and hyperflexion of the
              joints—that is, when joints extend further than they are meant to.
            </Text>
          </AccordionPanel>
        </AccordionItem>
        <AccordionItem>
          <AccordionButton>
            <Heading flex="1" textAlign="left" size="md">
              Bursae
            </Heading>
            <AccordionIcon />
          </AccordionButton>
          <AccordionPanel>
            <Text>
              A bursa is an enclosed, fluid filled sac that works as a cushion
              and a gliding/slippery? surface to reduce surface friction. A busa
              is also made of fibrous tissue, but doesn{"'"}t make up part of
              the joint.
            </Text>
          </AccordionPanel>
        </AccordionItem>
        <AccordionItem>
          <AccordionButton>
            <Heading flex="1" textAlign="left" size="md">
              Tendons
            </Heading>
            <AccordionIcon />
          </AccordionButton>
          <AccordionPanel>
            <Text>
              Tendons are a tough flexible band of fibrous connective tissue
              that connects muscles to bones. Tendons are responsible for moving
              our limbs. Tendons are highly resistant to tear, but aren{"'"}t
              stretchy. This means they can be easily injured when strained, and
              will take a long time to heal. Tendons can be found throughout
              your body! The largest of which being the Achilles tendon, which
              connects your calf muscle to your heel bone.
            </Text>
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
      <Box position="fixed" right={"15vw"} top={"25vh"} pointerEvents="none">
        <a.div style={bursaeProps}>
          <Image src="/bursae.webp" alt="Figure of bursa" />
        </a.div>
      </Box>
    </Section>
  );
}
