import { Box, Heading, HStack, Text } from "@chakra-ui/react";
import { withChildren } from "sections/section";

function SlowFastTwitch() {
  return (
    <Box>
      <Heading>Slow and Fast Twitch Fibers</Heading>
      <Text mt="3">
        Skeletal muscle cells can be further divided into two categories: slow
        and fast twitch. Fast twitch muscle fibers can produce large amounts of
        force but only in short bursts. On the other hand, slow twitch muscle
        fibers contract with less force but can work over longer periods of
        time. While sprinting, you primarily use fast twitch muscle fibers,
        whereas while walking, you mostly use slow twitch fibers.
      </Text>
      <Text mt="3">
        Typically, fast twitch muscle fibers have a greater diameter than slow
        twitch fibers. Fast twitch muscles primarily rely on energy from
        existing ATP and smaller glycogen (an energy dense molecule) stores to
        contract, whereas slow twitch muscle fibers primarily rely on cellular
        respiration (oxygen and glucose to produce ATP). This difference in
        energy sources is a factor in the slow twitch muscle’s resistance to
        fatigue.
      </Text>
    </Box>
  );
}

export default withChildren(SlowFastTwitch, "slow-fast-twitch", {
  p: "0",
});
