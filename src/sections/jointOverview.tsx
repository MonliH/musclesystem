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
import Section, { useSection } from "sections/section";
import useJointPart, { JointPart } from "stores/jointPart";

export default function JointOverview({ order }: { order: number }) {
  const [expanded, setExpanded] = useJointPart((state) => [
    state.part,
    state.setPart,
  ]);
  const { visible } = useSection(order);
  const bursaeProps = useSpring({
    opacity: expanded == JointPart.Bursae && visible ? 1 : 0,
  });
  return (
    <Section id="overview">
      <Heading mb="5">Joints: An Overview</Heading>
      <Text mb="8">
        Joints are the points where bones connect. They are made up of bone and
        other soft tissue such as ligaments, cartilage, bursae, and tendons.
        Every joint in your body helps hold your bones together and allows
        movement in different directions.
      </Text>
      <Accordion
        allowToggle
        index={expanded}
        onChange={setExpanded}
        backdropFilter="blur(8px)"
        p="4"
        m="-4"
        borderRadius="xl"
      >
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
              is the primary type of connective tissue and can be found
              throughout the body, including in the lungs, ears, nose, spine,
              bones, and of course, joints.
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
              Ligaments, made of dense fibrous elastic tissue, connect bones
              together, forming part of the joint. Ligaments can also help to
              limit hyperextension and hyperflexion of the joints—that is, when
              joints extend further than they are meant.
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
              A bursa is an enclosed, fluid-filled sac that works as a cushion
              and a slippery surface to reduce friction. A bursa is also made of
              fibrous tissue, but doesn{"'"}t make up part of the joint.
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
              Tendons are a tough, flexible band of fibrous connective tissue
              that binds muscle to bone. They are primarily made up of collagen,
              a protein commonly found in the body. Tendons are similar to a
              rope: they don{"'"}t tear easily and don{"'"}t stretch. They can
              be easily injured when strained and take a long time to heal.
              There are over 300 tendons in your body, the largest being the
              Achilles tendon, which connects your calf muscle to your heel.
            </Text>
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
      <Box
        position="fixed"
        right={["0", "0", "20px", "20px", "30px", "15vw"]}
        top={"25vh"}
        pointerEvents="none"
      >
        <a.div style={bursaeProps}>
          <Image
            src="/bursae.webp"
            alt="Figure of bursa"
            borderRadius="lg"
            border="1px solid"
            width={["0", "0", "200px", "390px", "500px", "600px"]}
          />
          <Text
            width={["0", "0", "200px", "390px", "500px", "600px"]}
            mt="2"
            px="2"
          >
            Bursae in the knee joint. As seen on the right, the bursae act as a
            cushion during knee flexion.
          </Text>
        </a.div>
      </Box>
    </Section>
  );
}
