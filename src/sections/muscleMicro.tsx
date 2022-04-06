import { Box, Heading, Text } from "@chakra-ui/react";
import Image from "next/image";
import Section from "sections/section";

const RoundImage = ({ url, alt }: { url: string; alt: string }) => (
  <Box
    my="5"
    width="350px"
    height="350px"
    position="relative"
    borderRadius="lg"
    overflow="hidden"
  >
    <Image layout="fill" src={url} alt={alt} />
  </Box>
);

export default function MuscleMicroSection() {
  return (
    <>
      <Section id="overview" innerWidth="100%" minHeight="0">
        <Heading mb="5">Muscle Fibers</Heading>
        <Text w="500px" flexShrink={0}>
          Muscles are soft tissues made up of many different fibers or strands.
          They normally contract to become tighter in response to nerve impulses
          from the nervous system, allowing for muscles to pull on bones,
          creating <b>movement</b>. Most muscle comes in bundles of fibers, but
          some can be tubular, spindle, striated, or branched. There are three
          types of muscle cells in the human body:{" "}
          <b>cardiac, skeletal, and smooth</b>. Some of these you may
          consciously contract and some may involuntarily contract. You have 600
          different muscles in your body!
        </Text>
      </Section>
      <Section id="types" innerWidth="100%" p="0">
        <Box display="flex" flexDirection="row" id="types" width="100%">
          <Box mr="50px" w="350px">
            <Heading size="lg">Smooth Muscle</Heading>
            <Heading size="md" color="grey">
              For involuntary movement
            </Heading>
            <RoundImage url="/smooth-cell.webp" alt="Smooth Cell" />
            <Text>
              Smooth muscle cells are responsible for involuntary movement.
              Smooth muscle cells make up several organs including the stomach,
              intestines, and esophagus. Smooth muscle fibers do essential jobs
              like move waste through your intestines, and help your lungs
              expand when you breathe. They come in spindle shaped cells and
              contain only one nucleus.
            </Text>
          </Box>
          <Box mr="50px" w="350px">
            <Heading size="lg">Skeletal Muscle</Heading>
            <Heading size="md" color="grey">
              For voluntary movement
            </Heading>
            <RoundImage url="/skeletal-cell.webp" alt="Skeletal Cell" />
            <Text>
              Skeletal muscle cells are cylindrical in shape, contain multiple
              nuclei, and make up the muscle tissue connected to the skeleton
              and are important in locomotion. Skeletal muscle cells have very
              high energy demands, are arranged in bundles, and contain many
              mitochondria. Skeletal muscle cells work with your tendons,
              ligaments, and bones to support the weight of your body and help
              you move. Skeletal muscle is the most common type of muscle in the
              body and is the only type that you can voluntarily contract.
            </Text>
          </Box>
          <Box w="350px">
            <Heading size="lg">Cardiac Muscle</Heading>
            <Heading size="md" color="grey">
              In the heart
            </Heading>
            <RoundImage url="/cardiac-cell.webp" alt="Cardiac Cell" />
            <Text>
              Cardiac muscle cells are rectangular in shape, have only one
              nucleus, are tubular, and contain many mitochondria. They are
              exclusively present in cardiac muscle and perform strong
              involuntary rhythmic contractions.
            </Text>
          </Box>
        </Box>
      </Section>
    </>
  );
}
