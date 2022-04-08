import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Heading,
  Link,
  ListItem,
  Text,
  UnorderedList,
  Image,
} from "@chakra-ui/react";
import { useState } from "react";
import { a, config, useSpring, useTransition } from "react-spring";
import Section, { useSection } from "sections/section";

export default function StayingHealthySection({ order }: { order: number }) {
  const [idx, setIdx] = useState<number>(-1);
  const { visible: v, atPrev, nextTransitionUnbounded } = useSection(order);
  const visible = v || (!v && !atPrev && nextTransitionUnbounded < 1.1);
  const transitions = useTransition([idx], {
    key: idx,
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
    config: config.stiff,
  });
  const props = useSpring({ opacity: visible ? 1 : 0 });
  return (
    <Section id="staying-healthy">
      <Box>
        <Heading mb="5">Maintaining a Healthy Musculoskeletal System</Heading>
        <Text>
          The musculoskeletal system can be affected by a wide range of
          syndromes, from the rare Münchmeyer disease to arthritis, an
          affliction that 1 in 5 Canadians live with.
        </Text>
        <Text mt="3" mb="8">
          However, many of these conditions are preventable with simple
          activities and lifestyle choices, such as light exercise and keeping a
          healthy weight. Below, you will find some tips on how to foster a
          healthy musculoskeletal system.
        </Text>
        <Accordion
          allowToggle
          index={idx}
          onChange={(v) => setIdx(v as number)}
        >
          <AccordionItem>
            <AccordionButton>
              <Heading size="md" flex="1" textAlign="left">
                Getting Frequent Exercise
              </Heading>
              <AccordionIcon />
            </AccordionButton>
            <AccordionPanel>
              <Text>
                Getting regular exercise will strengthen your muscles and bones,
                also lowering the risk of injury in daily life. Here are some
                activities to get more physical exercise:
              </Text>
              <br />
              <UnorderedList>
                <ListItem>
                  Doing heavy household chores like pulling weeds, taking out
                  the trash, or shovelling the driveway
                </ListItem>
                <ListItem>
                  Participating in a sport, such as basketball or football
                </ListItem>
                <ListItem>
                  Using weight-training equipment like dumbbells or kettlebells,
                  or performing some elastic resistance band exercises
                </ListItem>
              </UnorderedList>
              <br />
              <Text>
                Exercise strengthens your bones because you put stress on them;
                your bones react to this stress by increasing their calcium
                content and growing more dense. When muscles are heavily used,
                such as in exercise, small tears are created. When the body
                fuses the damaged fibres back together, the mass and strength of
                the muscle is increased.
              </Text>
            </AccordionPanel>
          </AccordionItem>
          <AccordionItem>
            <AccordionButton>
              <Heading size="md" flex="1" textAlign="left">
                Maintaining a Healthy Diet
              </Heading>
              <AccordionIcon />
            </AccordionButton>
            <AccordionPanel>
              <Text>
                Eating a healthy and balanced diet is beneficial to both the
                bones and muscles in your body. First, ensuring that you consume
                enough macronutrients (fats, proteins, and carbohydrates) is
                essential to muscle and bone development and growth; for
                example, if not enough proteins are consumed, the body will have
                trouble repairing and building muscle.
              </Text>
              <Text mt="3">
                Second, consuming adequate micronutrients, such as calcium and
                vitamin D, is equally important for keeping the system healthy.
                Calcium is important for your skeletal system because it’s what
                bones are mostly made of, and vitamin D is important because it
                helps your bones absorb more of that calcium. You can get more
                calcium by eating leafy vegetables like spinach or celery. Our
                primary method for vitamin D production is letting sunlight hit
                our skin, but it can be hard to get vitamin D this way in the
                winter. Therefore, it’s a good idea to drink milk (fortified
                with vitamin D by law) and eat other vitamin D-rich foods like
                fatty fish. Other nutrients, such as vitamin C, are required to
                form muscle fibers and the collagen in your bones.
              </Text>
              <Text mt="3">
                Finally, keeping a balanced diet will cause healthy weight loss,
                putting less pressure on your joints. This helps prevent
                osteoarthritis, a type of arthritis stemming from cartilage in
                the joints being worn away resulting in bones rubbing together.
                Arthritis is incredibly common, affecting over 6 million
                Canadians nationwide, and can seriously hamper your mobility and
                cause chronic pain.
              </Text>
              <Text mt="3">
                For more information about healthy food choices, refer to{" "}
                <Link
                  href="https://food-guide.canada.ca/"
                  target="_blank"
                  color="blue.400"
                >
                  Canada’s food guide
                </Link>
                .
              </Text>
            </AccordionPanel>
          </AccordionItem>
          <AccordionItem>
            <AccordionButton>
              <Heading size="md" flex="1" textAlign="left">
                Stretching Consistently
              </Heading>
              <AccordionIcon />
            </AccordionButton>
            <AccordionPanel>
              <Text>
                Stretching consistently will improve your muscles’ flexibility.
                Flexibility is important for your health because it improves
                mobility and range of motion, allowing us to perform our daily
                routines efficiently. If your flexibility is low, your muscles
                will tighten and become short. Not only will this make moving
                around uncomfortable and require more effort, your muscles may
                now be at risk for tearing or spraining if extended to a normal
                range.
              </Text>
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
        <a.div style={props}>
          {transitions(({ opacity }, ty) => {
            let imgPath;
            let width;
            let top;
            switch (ty) {
              case -1:
                imgPath = "/mss-healthy.webp";
                break;
              case 0:
                imgPath = "/exercise.webp";
                break;
              case 1:
                imgPath = "/food.webp";
                break;
              case 2:
                imgPath = "/stretch.webp";
                width = "17vw";
                top = "18vh";
                break;
            }
            return (
              <Box
                position="fixed"
                zIndex="-100"
                pointerEvents="none"
                top={top ?? "25vh"}
                right="10vw"
                width={width ?? "30vw"}
                maxHeight="70vh"
              >
                <Box position="relative">
                  <a.div
                    style={{
                      position: "absolute",
                      opacity,
                    }}
                  >
                    <Image
                      src={imgPath}
                      alt="Support image"
                      borderRadius="lg"
                    />
                  </a.div>
                </Box>
              </Box>
            );
          })}
        </a.div>
      </Box>
    </Section>
  );
}
