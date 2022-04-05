import { Box } from "@chakra-ui/react";
import type { NextPage } from "next";
import FopSection from "sections/fop";
import Page from "components/page";

const StayingHealthy: NextPage = () => {
  return (
    <Page models={null}>
      <FopSection order={0} />
      <Box height="20vh"></Box>
    </Page>
  );
};

export default StayingHealthy;
