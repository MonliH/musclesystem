import { Box } from "@chakra-ui/react";
import type { NextPage } from "next";
import FopSection from "sections/fop";
import Page from "components/page";
import StayingHealthySection from "sections/staying-healthy";
import GoNext from "components/goNext";

const StayingHealthy: NextPage = () => {
  return (
    <Page models={null}>
      <FopSection order={0} />
      <StayingHealthySection>
        <GoNext prevUrl="in-action" />
      </StayingHealthySection>
    </Page>
  );
};

export default StayingHealthy;
