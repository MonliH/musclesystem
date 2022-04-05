import type { NextPage } from "next";
import Page from "components/page";
import { ArmHandle } from "models/Arm";
import MuscleMicroSection from "sections/muscleMicro";
import { useRef } from "react";

const Muscle: NextPage = () => {
  return (
    <Page models={null}>
      <MuscleMicroSection />
    </Page>
  );
};
export default Muscle;
