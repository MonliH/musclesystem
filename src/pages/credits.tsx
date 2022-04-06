import { Link as CLink, Box, Button, Heading, Text } from "@chakra-ui/react";
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
      <Text fontSize="lg" my="2" width="500px">
        Website implemented in <b>Typescript</b>, <b>React</b>, and{" "}
        <b>Next.js</b>. Code is fully open source at{" "}
        <CLink
          color="blue.400"
          href="https://github.com/MonliH/musclesystem/"
          target="_blank"
        >
          github.com/MonliH/musclesystem
        </CLink>
      </Text>
      <Heading mt="10">References</Heading>
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
