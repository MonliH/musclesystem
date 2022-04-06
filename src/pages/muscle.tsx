import type { NextPage } from "next";
import Page from "components/page";
import MuscleMicroSection from "sections/muscleMicro";
import GoNext from "components/goNext";

const Muscle: NextPage = () => {
  return (
    <Page models={null}>
      <MuscleMicroSection>
        <GoNext nextUrl="in-action" prevUrl="joints" />
      </MuscleMicroSection>
    </Page>
  );
};
export default Muscle;
