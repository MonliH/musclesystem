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
      <Heading mb="5">Muscle</Heading>
      <Text>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
        velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
        occaecat cupidatat non proident, sunt in culpa qui officia deserunt
        mollit anim id est laborum.
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
