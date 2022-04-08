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
import { a, useSpring } from "react-spring";
import Section, { useSection } from "sections/section";

export default function ArthritisSection({ order }: { order: number }) {
  const { visible } = useSection(order);
  const { opacity } = useSpring({ opacity: visible ? 1 : 0 });

  return (
    <Section id="arthritis">
      <Heading mb="1">Arthritis</Heading>
      <Text mb="4">
        Arthritis is a range of conditions that affect the body{"'"}s joints.
        There are two main types, osteoarthritis and rheumatoid arthritis.
      </Text>
      <Accordion allowMultiple defaultIndex={[0]}>
        <AccordionItem>
          <AccordionButton>
            <Heading flex="1" textAlign="left" size="md">
              Osteoarthritis
            </Heading>
            <AccordionIcon />
          </AccordionButton>
          <AccordionPanel>
            <Text>
              Osteoarthritis usually comes with age and commonly affects the
              fingers, knees, and hips. It is caused by damage over time to the
              cartilage between the joints, creating grinding of the bones. This
              grinding is known to cause pain for patients suffering from the
              condition. Diagnosis is often given via blood tests or joint fluid
              analysis. There is no cure for osteoarthritis; however,
              over-the-counter pain relievers and maintaining a healthy weight
              are known to help.
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
              Rheumatoid arthritis is an autoimmune and inflammatory disease. By
              mistake, the body{"'"}s immune system attacks healthy joint cells,
              such as cartilage, ligaments, and tendons. This false immune
              response causes inflammation, deformity, loss of balance, and
              chronic pain in the affected joints. Diagnosis is often given via
              X-ray or MRI. While there is no cure for rheumatoid arthritis,
              over-the-counter pain relievers or corticosteroid medications can
              aid in reducing the pain. Common side effects of corticosteroid
              medications include thinning of bones, weight gain, and diabetes.
              If drugs fail to prevent further joint damage, surgery may be
              considered. Rheumatoid arthritis surgery may consist of tendon
              repair, removal of the inflamed lining of the joint, joint fusion,
              or total joint replacement.
            </Text>
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
      <Box position="fixed" right={"10vw"} top={"25vh"} pointerEvents="none">
        {/* @ts-ignore */}
        <a.div style={{ opacity }}>
          <Image
            src="/arthritis.webp"
            alt="Comparison of different types of arthritis"
            borderRadius="lg"
          />
        </a.div>
      </Box>
    </Section>
  );
}
