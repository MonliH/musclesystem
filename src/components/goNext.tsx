import { Box, ButtonGroup, HStack } from "@chakra-ui/react";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "react-feather";
import { URL_TO_TITLE } from "./header";
import ToolTipButton from "./tooltipButton";

export default function GoNext({
  nextUrl,
  prevUrl,
}: {
  nextUrl?: string;
  prevUrl?: string;
}) {
  const nextData = nextUrl && URL_TO_TITLE[nextUrl];
  const prevData = prevUrl && URL_TO_TITLE[prevUrl];

  return (
    <HStack mt="30px">
      {prevData && prevUrl && (
        <ButtonGroup>
          <Link href={`/${prevUrl}`} passHref>
            <ToolTipButton
              as="a"
              label={`Go back to the ${prevData} section`}
              leftIcon={<ArrowLeft />}
            >
              Back
            </ToolTipButton>
          </Link>
        </ButtonGroup>
      )}
      {nextData && nextUrl && (
        <ButtonGroup>
          <Link href={`/${nextUrl}`} passHref>
            <ToolTipButton
              as="a"
              colorScheme="green"
              label={`Continue onward with the ${nextData} section`}
              rightIcon={<ArrowRight />}
            >
              Next
            </ToolTipButton>
          </Link>
        </ButtonGroup>
      )}
    </HStack>
  );
}
