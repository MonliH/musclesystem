import { VStack, Link, Box, Button, Heading, Text } from "@chakra-ui/react";
import type { NextPage } from "next";
import { ArrowLeft } from "react-feather";
import NextLink from "next/link";
import Section from "sections/section";

const pt = "150px";
const Credits: NextPage = () => {
  return (
    <Section innerWidth="50vw" paddingTop={[pt, pt, pt, pt, pt, pt, pt, pt]}>
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
        <Link href="https://github.com/MonliH/musclesystem/" target="_blank">
          github.com/MonliH/musclesystem
        </Link>
      </Text>
      <Heading mt="10" mb="2">
        References
      </Heading>
      <VStack>
        <Text>
          Mayo Foundation for Medical Education and Research. (n.d.).{" "}
          <em>Knee Bursae</em>. Mayo Clinic. Retrieved April 4, 2022, from{" "}
          <Link href="https://www.mayoclinic.org/diseases-conditions/knee-bursitis/multimedia/knee-bursae/img-20005661">
            https://www.mayoclinic.org/diseases-conditions/knee-bursitis/multimedia/knee-bursae/img-20005661
          </Link>
        </Text>
        <Text>
          Rachel Baxter BSc, M. S. (2022, February 16).{" "}
          <em>Types of muscle cells</em>. Kenhub. Retrieved March 31, 2022, from{" "}
          <Link href="https://www.kenhub.com/en/library/anatomy/types-of-muscle-cells">
            https://www.kenhub.com/en/library/anatomy/types-of-muscle-cells
          </Link>
        </Text>
        <Text>
          <em>NCI Dictionary of Cancer terms</em>. National Cancer Institute.
          (n.d.). Retrieved April 4, 2022,{" "}
          <Link href="https://www.cancer.gov/publications/dictionaries/cancer-terms/def/bone-marrow">
            from
            https://www.cancer.gov/publications/dictionaries/cancer-terms/def/bone-marrow
          </Link>
        </Text>
        <Text>
          <em>
            Bone Marrow reconversion in adults who are smokers: MR imaging
            findings. : American Journal of roentgenology : Vol. 161, no. 6
            (AJR)
          </em>
          . AJR. American journal of roentgenology. (n.d.). Retrieved April 4,
          2022, from{" "}
          <Link href="https://www.ajronline.org/doi/abs/10.2214/ajr.161.6.8249729">
            https://www.ajronline.org/doi/abs/10.2214/ajr.161.6.8249729
          </Link>
        </Text>
        <Text>
          Libretexts. (2020, August 14).{" "}
          <em>6.1A: Overview of the musculoskeletal system</em>. Medicine
          LibreTexts. Retrieved March 29, 2022, from{" "}
          <Link
            href="https://med.libretexts.org/Bookshelves/Anatomy_and_Physiology/Book%3A_Anatomy_and_Physiology_(Boundless)/6%3A_Skeletal_System/6.1%3A_Overview_of_the_Skeletal_System/6.1A%3A_Overview_of_the_Musculoskeletal_System"
            overflowWrap="anywhere"
          >
            https://med.libretexts.org/Bookshelves/Anatomy_and_Physiology/Book%3A_Anatomy_and_Physiology_(Boundless)/6%3A_Skeletal_System/6.1%3A_Overview_of_the_Skeletal_System/6.1A%3A_Overview_of_the_Musculoskeletal_System
          </Link>
        </Text>
        <Text>
          <em>Articulations</em>. Articulations | SEER Training. (n.d.).
          Retrieved March 29, 2022, from{" "}
          <Link href="https://training.seer.cancer.gov/anatomy/skeletal/articulations.html">
            https://training.seer.cancer.gov/anatomy/skeletal/articulations.html
          </Link>
        </Text>
        <Text>
          Marco Funiciello, D. O. (n.d.). <em>What is a Bursa?</em> Arthritis.
          Retrieved March 29, 2022, from{" "}
          <Link href="https://www.arthritis-health.com/types/bursitis/what-bursa">
            https://www.arthritis-health.com/types/bursitis/what-bursa
          </Link>
        </Text>
        <Text>
          Encyclopædia Britannica, inc. (n.d.). <em>Smooth muscle</em>.
          Encyclopædia Britannica. Retrieved March 29, 2022, from{" "}
          <Link href="https://www.britannica.com/science/smooth-muscle">
            https://www.britannica.com/science/smooth-muscle
          </Link>
        </Text>
        <Text>
          U.S. National Library of Medicine. (2022, March 30).{" "}
          <em>Bone marrow disease | bone marrow</em>. MedlinePlus. Retrieved
          March 29, 2022, from{" "}
          <Link href="https://medlineplus.gov/bonemarrowdiseases.html">
            https://medlineplus.gov/bonemarrowdiseases.html
          </Link>
        </Text>
        <Text>
          <em>Muscle: Types of muscles, functions & common conditions</em>.
          Cleveland Clinic. (n.d.). Retrieved April 1, 2022,{" "}
          <Link href="https://my.clevelandclinic.org/health/body/21887-muscle">
            from https://my.clevelandclinic.org/health/body/21887-muscle
          </Link>
        </Text>
        <Text>
          <em>Tendon: Function, anatomy & common injuries</em>. Cleveland
          Clinic. (n.d.). Retrieved April 1, 2022, from{" "}
          <Link href="https://my.clevelandclinic.org/health/body/21738-tendon">
            https://my.clevelandclinic.org/health/body/21738-tendon
          </Link>
        </Text>
        <Text>
          Encyclopædia Britannica, inc. (n.d.). <em>Cardiac muscle</em>.
          Encyclopædia Britannica. Retrieved April 1, 2022, from{" "}
          <Link href="https://www.britannica.com/science/cardiac-muscle">
            https://www.britannica.com/science/cardiac-muscle
          </Link>
        </Text>
        <Text>
          <em>Fast and slow twitch muscle fibers</em>. Topend Sports, science,
          training and nutrition. (n.d.). Retrieved April 5, 2022, from{" "}
          <Link href="https://www.topendsports.com/medicine/physiology-muscles.htm">
            https://www.topendsports.com/medicine/physiology-muscles.htm
          </Link>
        </Text>
        <Text>
          <em>Fibrodysplasia Ossificans Progressiva</em>. NORD (National
          Organization for Rare Disorders). (2021, May 11). Retrieved March 31,
          2022, from{" "}
          <Link href="https://rarediseases.org/rare-diseases/fibrodysplasia-ossificans-progressiva/">
            https://rarediseases.org/rare-diseases/fibrodysplasia-ossificans-progressiva/
          </Link>
        </Text>
        <Text>
          U.S. National Library of Medicine. (2021, November 24).{" "}
          <em>Fibrodysplasia Ossificans Progressiva: Medlineplus Genetics</em>.
          MedlinePlus. Retrieved March 31, 2022, from{" "}
          <Link href="https://medlineplus.gov/genetics/condition/fibrodysplasia-ossificans-progressiva/">
            https://medlineplus.gov/genetics/condition/fibrodysplasia-ossificans-progressiva/
          </Link>
        </Text>
        <Text>
          WebMD. (n.d.). <em>What is fibrodysplasia ossificans progressiva?</em>{" "}
          WebMD. Retrieved March 31, 2022, from{" "}
          <Link href="https://www.webmd.com/children/what-is-fop">
            https://www.webmd.com/children/what-is-fop
          </Link>
        </Text>
        <Text>
          <em>Learning about your musculoskeletal system</em>.
          MyHealth.Alberta.ca Government of Alberta Personal Health Portal.
          (n.d.). Retrieved April 4, 2022, from{" "}
          <Link href="https://myhealth.alberta.ca/Health/aftercareinformation/pages/conditions.aspx?hwid=abk9950">
            https://myhealth.alberta.ca/Health/aftercareinformation/pages/conditions.aspx?hwid=abk9950
          </Link>
        </Text>
        <Text>
          Mayo Foundation for Medical Education and Research. (2021, September
          15). <em>Arthritis</em>. Mayo Clinic. Retrieved April 1, 2022, from{" "}
          <Link href="https://www.mayoclinic.org/diseases-conditions/arthritis/symptoms-causes/syc-20350772#dialogId32064914">
            https://www.mayoclinic.org/diseases-conditions/arthritis/symptoms-causes/syc-20350772#dialogId32064914
          </Link>
        </Text>
        <Text>
          Mayo Foundation for Medical Education and Research. (2021, September
          15). <em>Arthritis</em>. Mayo Clinic. Retrieved April 1, 2022, from{" "}
          <Link href="https://www.mayoclinic.org/diseases-conditions/arthritis/symptoms-causes/syc-20350772#dialogId32064914">
            https://www.mayoclinic.org/diseases-conditions/arthritis/symptoms-causes/syc-20350772#dialogId32064914
          </Link>
        </Text>
        <Text>
          <em>
            Musculoskeletal system: Arthritis, lower back pain, bones, Muscles
          </em>
          . Cleveland Clinic. (n.d.). Retrieved April 1, 2022, from{" "}
          <Link href="https://my.clevelandclinic.org/health/articles/12254-musculoskeletal-system-normal-structure--function">
            https://my.clevelandclinic.org/health/articles/12254-musculoskeletal-system-normal-structure--function
          </Link>
        </Text>
        <Text>
          TED-Ed. (n.d.). <em>What makes muscles grow? - Jeffrey Siegel</em>.
          TED. Retrieved April 5, 2022, from{" "}
          <Link href="https://ed.ted.com/lessons/what-makes-muscles-grow-jeffrey-siegel">
            https://ed.ted.com/lessons/what-makes-muscles-grow-jeffrey-siegel
          </Link>
        </Text>
        <Text></Text>
      </VStack>
      <Box mt="10">
        <NextLink passHref href="/">
          <Button leftIcon={<ArrowLeft />}>Back</Button>
        </NextLink>
      </Box>
    </Section>
  );
};
export default Credits;
