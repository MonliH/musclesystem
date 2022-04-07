import type { NextPage } from "next";
import CartilageSection from "sections/cartilage";
import Cartilage from "models/Cartilage";
import Tendon from "models/Tendon";
import TendonsSection from "sections/tendon";
import LigamentsSection from "sections/ligaments";
import JointTypes from "sections/typesOfJoints";
import BursaeSection from "sections/bursae";
import Joints from "models/Joints";
import Page from "components/page";
import { Debug, Physics } from "@react-three/cannon";
import GoNext from "components/goNext";

const BonePage: NextPage = () => {
  return (
    <Page
      models={
        <Physics>
          <Cartilage order={0} />
          <Tendon order={3} />
          <Joints order={4} />
        </Physics>
      }
    >
      <CartilageSection />
      <LigamentsSection />
      <BursaeSection order={2} />
      <TendonsSection />
      <JointTypes order={4}>
        <GoNext prevUrl="bone" nextUrl="muscle" />
      </JointTypes>
    </Page>
  );
};
export default BonePage;
