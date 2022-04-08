import { Box, Heading, Image, Spacer, Text } from "@chakra-ui/react";
import { withChildren } from "sections/section";

function SlowFastTwitch() {
  return (
    <Box display="flex" flexDir={"row"} alignItems="center">
      <Box width="500px" flexShrink={0}>
        <Heading>Slow and Fast Twitch Fibers</Heading>
        <Text mt="3">
          Skeletal muscle cells can be further divided into two categories: slow
          and fast twitch. Fast twitch muscle fibers can produce large amounts
          of force but only in short bursts. On the other hand, slow twitch
          muscle fibers contract with less force but can work over longer
          periods of time. While sprinting, you primarily use fast twitch muscle
          fibers, whereas while walking, you mostly use slow twitch fibers.
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
      <Box ml="70px">
        <Image
          src="/twitch-fibers.jpeg"
          alt="proportion of slow to fast twitch muscle fibers"
          maxWidth="45vw"
        />
        <Text>
          <i>
            Proportion of slow and fast twitch muscle fibers in different
            athletes
          </i>
        </Text>
      </Box>
    </Box>
  );
}

export default withChildren(SlowFastTwitch, "slow-fast-twitch", {
  p: "0",
  pl: ["50px", "50px", "120px", "120px", "150px", "250px"],
  innerWidth: "100%",
  pt: "100px",
  mt: "-100px",
});
