import type { NextPage } from "next";
import FopSection from "sections/fop";
import Page from "components/page";
import StayingHealthySection from "sections/stayingHealthy";
import GoNext from "components/goNext";
import PromotionalPoster from "sections/promotionalPoster";
import ArthritisSection from "sections/arthritis";
import ScrollIndicator from "components/scroll";

const StayingHealthy: NextPage = () => {
  return (
    <Page models={null}>
      <ScrollIndicator />
      <ArthritisSection order={0} />
      <FopSection order={1} />
      <StayingHealthySection order={2} />
      <PromotionalPoster>
        <GoNext prevUrl="in-action" />
      </PromotionalPoster>
    </Page>
  );
};

export default StayingHealthy;
