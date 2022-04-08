import type { NextPage } from "next";
import Page from "components/page";
import { Physics } from "@react-three/cannon";
import ArmC, { ArmHandle } from "models/Arm";
import MuscleSection from "sections/muscle";
import { useRef } from "react";
import BalancingSection from "sections/balancing";
import GoNext from "components/goNext";
import useMuscle from "stores/muscle";

const InAction: NextPage = () => {
  const armRef = useRef<ArmHandle>(null);
  const checked = useMuscle((state) => state.reversedGravity);
  return (
    <Page
      models={
        <Physics gravity={[0, checked ? 10 : -10, 0]}>
          <ArmC order={0} ref={armRef} />
        </Physics>
      }
      onMouseDown={(e) => {
        switch (e.button) {
          case 0:
            armRef.current?.flex("bi");
            break;
          case 2:
            armRef.current?.flex("tri");
            break;
          default:
            break;
        }
      }}
      onMouseUp={() => armRef.current?.flex(null)}
    >
      <MuscleSection />
      <BalancingSection>
        <GoNext prevUrl="muscle" nextUrl="staying-healthy" />
      </BalancingSection>
    </Page>
  );
};
export default InAction;
