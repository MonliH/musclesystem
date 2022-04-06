import type { NextPage } from "next";
import Page from "components/page";
import MuscleMicroSection from "sections/muscleMicro";
import GoNext from "components/goNext";
import SlowFastTwitch from "sections/slowFastTwitch";

const Muscle: NextPage = () => {
  return (
    <Page models={null}>
      <MuscleMicroSection />
      <SlowFastTwitch>
        <GoNext nextUrl="in-action" prevUrl="joints" />
      </SlowFastTwitch>
    </Page>
  );
};
export default Muscle;
