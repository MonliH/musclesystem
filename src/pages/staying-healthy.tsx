import { Box } from "@chakra-ui/react";
import type { NextPage } from "next";
import FopSection from "sections/fop";
import Page from "components/page";
import StayingHealthySection from "sections/stayingHealthy";
import GoNext from "components/goNext";
import PromotionalPoster from "sections/promotionalPoster";

const StayingHealthy: NextPage = () => {
  return (
    <Page models={null}>
      <FopSection order={0} />
      <StayingHealthySection order={1} />
      <PromotionalPoster>
        <GoNext prevUrl="in-action" />
      </PromotionalPoster>
    </Page>
  );
};

export default StayingHealthy;
