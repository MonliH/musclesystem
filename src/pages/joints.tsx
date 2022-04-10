import type { NextPage } from "next";
import CartilageSection from "sections/jointOverview";
import Overview from "models/Overview";
import JointTypes from "sections/typesOfJoints";
import Joints from "models/Joints";
import Page from "components/page";
import { Physics } from "@react-three/cannon";
import GoNext from "components/goNext";
import ScrollIndicator from "components/scroll";

const BonePage: NextPage = () => {
  return (
    <Page
      models={
        <Physics>
          <Overview order={0} />
          <Joints order={1} />
        </Physics>
      }
    >
      <ScrollIndicator />
      <CartilageSection order={0} />
      <JointTypes order={1}>
        <GoNext prevUrl="bone" nextUrl="muscle" />
      </JointTypes>
    </Page>
  );
};
export default BonePage;
