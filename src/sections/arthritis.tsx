import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Heading,
  Image,
  Text,
} from "@chakra-ui/react";
import { useState } from "react";
import { a, useSpring } from "react-spring";
import Section, { useSection } from "sections/section";

export default function ArthritisSection({ order }: { order: number }) {
  const { visible } = useSection(order);
  const { opacity } = useSpring({ opacity: visible ? 1 : 0 });
  const [expanded, setExpanded] = useState(-1);

  return (
    <Section id="condition">
      <Heading mb="1">Arthritis</Heading>
      <Text mb="4">
        Arthritis is a range of conditions that affect the body{"'"}s joints.
        There are two main types, osteoarthritis and rheumatoid arthritis.
      </Text>
      <Accordion
        allowToggle
        index={expanded}
        onChange={(e) => setExpanded(e as number)}
      >
        <AccordionItem>
          <AccordionButton>
            <Heading flex="1" textAlign="left" size="md">
              Osteoarthritis
            </Heading>
            <AccordionIcon />
          </AccordionButton>
          <AccordionPanel>
            <Text>
              Osteoarthritis usually comes with age, and commonly affects the
              fingers, knees, and hips. It is caused by damage over time to the
              cartilage in between the joints which creates grinding of the
              bones. This is known to cause pain for patients suffering with the
              condition. Diagnosis is often given via blood tests, or joint
              fluid analysis. There is no cure for osteoarthritis, however over
              the counter pain relievers such as ibuprofen and maintaining a
              healthy weight are known to help.
            </Text>
          </AccordionPanel>
        </AccordionItem>
        <AccordionItem>
          <AccordionButton>
            <Heading flex="1" textAlign="left" size="md">
              Rheumatoid
            </Heading>
            <AccordionIcon />
          </AccordionButton>
          <AccordionPanel>
            <Text>
              Rheumatoid arthritis is an autoimmune and inflammatory disease.
              The body’s immune system attacks healthy joint cells, such as
              cartilage, ligaments, and tendons by mistake. This causes
              inflammation, deformity, loss of balance, and chronic pain in the
              affected joints. Diagnosis is often given via X-ray or MRI. While
              there is no cure for rheumatoid arthritis, over the counter pain
              relievers or corticosteroid medications can aid in reducing the
              pain. Common side effects for corticosteroid medications include
              thinning of bones, weight gain, and diabetes. If medications fail
              to prevent further joint damage, surgery may be considered.
              Rheumatoid arthritis surgery may include tendon repair, removal of
              the inflamed lining of the joint, joint fusion, or total joint
              replacement.
            </Text>
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
      <Box position="fixed" right={"20vw"} top={"25vh"} pointerEvents="none">
        {/* @ts-ignore */}
        <a.div style={{ opacity }}>
          <Image
            src="/fop.jpg"
            alt="Image of person with FOP"
            borderRadius="lg"
          />
        </a.div>
      </Box>
    </Section>
  );
}
