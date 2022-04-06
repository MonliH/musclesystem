import type { NextPage } from "next";
import Bone from "models/Bone";
import BoneSection from "sections/bone";
import MarrowSection from "sections/marrow";
import BoneMarrow from "models/BoneMarrow";
import Page from "components/page";
import { Physics } from "@react-three/cannon";
import GoNext from "components/goNext";

const BonePage: NextPage = () => {
  return (
    <Page
      models={
        <Physics>
          <Bone order={0} />
          <BoneMarrow order={1} />
        </Physics>
      }
    >
      <BoneSection />
      <MarrowSection>
        <GoNext nextUrl="joints" />
      </MarrowSection>
    </Page>
  );
};
export default BonePage;
