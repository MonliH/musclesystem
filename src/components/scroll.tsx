import { Text, VStack } from "@chakra-ui/react";
import { a, useSpring } from "react-spring";
import useScroll from "stores/scroll";

const AVStack = a(VStack);

export default function ScrollIndicator() {
  const scroll = useScroll((s) => s.showScroll);
  const props = useSpring({ opacity: scroll ? 1 : 0 });
  return (
    <AVStack
      position="fixed"
      top="85vh"
      left="90vw"
      color="grey"
      width="100px"
      style={props}
    >
      <div className="mouse"></div>
      <Text>Scroll down</Text>
    </AVStack>
  );
}
