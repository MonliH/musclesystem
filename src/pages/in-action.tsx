import type { NextPage } from "next";
import Page from "components/page";
import { Physics } from "@react-three/cannon";
import ArmC, { ArmHandle } from "models/Arm";
import MuscleSection from "sections/muscle";
import { useRef } from "react";

const InAction: NextPage = () => {
  const armRef = useRef<ArmHandle>(null);
  return (
    <Page
      models={
        <Physics>
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
    </Page>
  );
};
export default InAction;