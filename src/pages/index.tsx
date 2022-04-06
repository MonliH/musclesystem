import {
  Box,
  Button,
  ButtonGroup,
  Heading,
  Spacer,
  Text,
} from "@chakra-ui/react";
import type { NextPage } from "next";
import Image from "next/image";
import NextLink from "next/link";
import CoverImage from "../../public/cover-image.webp";
import { ArrowRight } from "react-feather";
import ToolTipButton from "components/tooltipButton";

const Home: NextPage = () => {
  return (
    <Box
      p="50px"
      height="100%"
      width="100%"
      display="flex"
      flexDirection="row"
      alignItems="center"
    >
      <Spacer />
      <Box mr="100px" width="750px" pb="100px">
        <Box mb="10">
          <Heading fontSize="7xl">The Musculoskeletal System</Heading>
          <Text fontSize="18px" mt="2" w="80%">
            The musculoskeletal system includes bones, muscles, tendons,
            ligaments, and other soft tissue that support our body, maintain
            posture, protect our organs, and allow us to move. There are over
            200 bones, 600 muscles, 360 joints, 300 tendons, and 900 ligaments
            that work together in an incredibly complex, intricate, and
            organized system that allows you to perform everyday tasks like
            walking, running, and jumping.
          </Text>
        </Box>
        <ButtonGroup>
          <NextLink passHref href="/bone">
            <ToolTipButton
              as="a"
              rightIcon={<ArrowRight size={22} />}
              size="lg"
              label="Start by learning about bones"
              colorScheme="green"
            >
              Begin
            </ToolTipButton>
          </NextLink>
          <NextLink passHref href="/credits">
            <Button size="lg" as="a">
              Credits {"&"} References
            </Button>
          </NextLink>
        </ButtonGroup>
      </Box>
      <Box p={["0px", "0px", "0px", "0px", "50px"]}>
        <Image src={CoverImage} alt="Cover Image" objectFit="cover" />
      </Box>
      <Spacer />
    </Box>
  );
};

export default Home;
