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
    <Section>
      <Heading mb="5">How Flexing Works</Heading>
      <Text>
        Each bone is connected to one and other by a joint. Each joint is
        composed of cartilage, bones, the muscle surrounding it and other
        connective tissue. The muscles attach to these bones through tendons,
        pulling on them to allow movement of the body.
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
    </Section>
  );
}
