import type { NextPage } from "next";
import CartilageSection from "sections/cartilage";
import Cartilage from "models/Cartilage";
import JointTypes from "sections/typesOfJoints";
import Joints from "models/Joints";
import Page from "components/page";
import { Physics } from "@react-three/cannon";
import GoNext from "components/goNext";

const BonePage: NextPage = () => {
  return (
    <Page
      models={
        <Physics>
          <Cartilage order={0} />
          <Joints order={1} />
        </Physics>
      }
    >
      <CartilageSection />
      <JointTypes order={1}>
        <GoNext prevUrl="bone" nextUrl="muscle" />
      </JointTypes>
    </Page>
  );
};
export default BonePage;
