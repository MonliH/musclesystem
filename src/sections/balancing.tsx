import { Box, Heading, Text, Image } from "@chakra-ui/react";
import { useSection, withChildren } from "sections/section";
import { a, useSpring } from "react-spring";

function BalancingSection({ order }: { order: number }) {
  const { visible } = useSection(order);
  const balanceProps = useSpring({
    opacity: visible ? 1 : 0,
  });
  return (
    <Box>
      <Heading mb="5">How the Body Balances</Heading>
      <Text>
        Ever wonder how your precariously upright body manages to stay that way?
        Balance! Balance, or the perception of balance, results from several
        sensory systems working together. Signals about the body{"'"}s position
        to its surroundings are composed by the eyes and inner ear and sent to
        the cerebellum (the part of the brain responsible for balance). These
        signals are then compared with the information from the musculoskeletal
        system. If there are discrepancies between the two signals, the
        cerebellum engages the musculoskeletal system to correct orientation or
        balance.
      </Text>
      <Box position="fixed" right={"10vw"} top={"25vh"} pointerEvents="none">
        <a.div style={balanceProps}>
          <Image
            src="/balance.webp"
            alt="Balance Image"
            borderRadius="lg"
            width={"35vw"}
          />
        </a.div>
      </Box>
    </Box>
  );
}

export default withChildren(BalancingSection, "balancing");
