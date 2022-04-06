import { Box, Button, Heading, Text } from "@chakra-ui/react";
import type { NextPage } from "next";
import Link from "next/link";
import { ArrowLeft } from "react-feather";
import Section from "sections/section";

const Credits: NextPage = () => {
  return (
    <Section>
      <Heading>Credits</Heading>
      <Text my="2" fontSize="lg">
        Website by <b>Jonathan Li</b>
        <br />
        Research by <b>Max Comber</b>
        <br />
        Writing by <b>Henry Barber</b>
        <br />
      </Text>
      <Heading mt="5">References</Heading>
      <Text>abc</Text>
      <Box mt="10">
        <Link passHref href="/">
          <Button leftIcon={<ArrowLeft />}>Back</Button>
        </Link>
      </Box>
    </Section>
  );
};
export default Credits;
