import {
  Box,
  Heading,
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
  Text,
} from "@chakra-ui/react";
import useMuscle from "stores/muscle";
import Section from "sections/section";

export default function MuscleSection() {
  const state = useMuscle((state) => state);
  return (
    <Section id="flexing">
      <Box backdropFilter="blur(8px)" p="4" m="-4" borderRadius="xl">
        <Heading mb="5">How Flexing Works</Heading>
        <Text>
          Each bone is connected to one another by a joint. Each joint is
          composed of cartilage, bones, the muscle surrounding it and other
          connective tissue. The muscles attach to these bones through tendons.
          These muscles contract to allow movement of the body.
        </Text>
        <Text mt="3">
          Because skeletal muscles can only pull, they usually work in pairs to
          move a bone back and forth. An example of this pairing (the bicep
          brachialis and tricep brachii) is shown in the model.
        </Text>
        <Box mt="8">
          <Text fontWeight={"bold"}>Bicep Strength</Text>
          <Slider
            onChange={(v) => state.setBicep(v)}
            value={state.bicepStrength}
            defaultValue={0.4}
            min={0.1}
            max={3.0}
            step={0.1}
          >
            <SliderTrack>
              <SliderFilledTrack />
            </SliderTrack>
            <SliderThumb />
          </Slider>

          <Text fontWeight={"bold"}>Tricep Strength</Text>
          <Slider
            onChange={(v) => state.setTricep(v)}
            value={state.tricepStrength}
            min={0.1}
            defaultValue={0.3}
            max={2}
            step={0.1}
          >
            <SliderTrack>
              <SliderFilledTrack />
            </SliderTrack>
            <SliderThumb />
          </Slider>
          <Text fontWeight={"bold"}>Mass of Load</Text>
          <Slider
            onChange={(v) => state.setMass(v)}
            value={state.mass}
            min={1}
            max={5.5}
            defaultValue={1}
            step={0.1}
          >
            <SliderTrack>
              <SliderFilledTrack />
            </SliderTrack>
            <SliderThumb />
          </Slider>
        </Box>
      </Box>
    </Section>
  );
}
