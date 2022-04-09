import {
  Box,
  Button,
  ButtonGroup,
  Heading,
  Image,
  Text,
} from "@chakra-ui/react";
import { useSection, withChildren } from "sections/section";
import useJointType, { JointType } from "stores/jointType";
import { config, a, useTransition, useSpring } from "react-spring";

const JOINT_TO_TITLE: [JointType, string][] = [
  [JointType.Hinge, "Hinge"],
  [JointType.BallAndSocket, "Ball & Socket"],
  [JointType.Pivot, "Pivot"],
  [JointType.Condyloid, "Condyloid"],
  [JointType.Plane, "Plane"],
  [JointType.Saddle, "Saddle"],
  [JointType.Immovable, "Immovable"],
];

const OBJ_JOINT_TO_IMG: Record<JointType, string> = Object.fromEntries(
  JOINT_TO_TITLE
) as any;

const OBJS_WITH_3D = [
  JointType.BallAndSocket,
  JointType.Hinge,
  JointType.Pivot,
];

const JOINT_TO_IMAGE_URL: Record<JointType, string> = {
  [JointType.BallAndSocket]: "/ball-and-socket.webp",
  [JointType.Hinge]: "/hinge.webp",
  [JointType.Pivot]: "/pivot.webp",
  [JointType.Condyloid]: "/condyloid.webp",
  [JointType.Plane]: "/plane.webp",
  [JointType.Saddle]: "/saddle.webp",
  [JointType.Immovable]: "/immovable.webp",
};

function JointDesc({ jointType }: { jointType: JointType }) {
  switch (jointType) {
    case JointType.Immovable:
      return (
        <Text>
          In an immovable joint,{" "}
          <b>the bones don{"'"}t move relative to each other</b>. An example of
          this is in the skull.
        </Text>
      );
    case JointType.Pivot:
      return (
        <Text>
          A pivot joint <b>twists side to side</b>. An example of a pivot joint
          is in the neck (specifically, between the C1 and C2 vertebrae)
        </Text>
      );
    case JointType.Hinge:
      return (
        <Text>
          A hinge joint is capable of <b>rotating in one direction</b>. Examples
          of a hinge joint include the elbow and knee joint.
        </Text>
      );
    case JointType.BallAndSocket:
      return (
        <Text>
          A ball and socket joint is capable of{" "}
          <b>rotating in all directions</b>; it occurs when a rounded bone fits
          into a cup like depression. An example of a ball and socket joint is
          the hip.
        </Text>
      );
    case JointType.Condyloid:
      return (
        <Text>
          A condyloid joint allows <b>movement in two planes</b>. An example of
          this would be between radius and carpal bones at the wrist; try moving
          your wrist up, down, left, right, and in a circle. Wow!
        </Text>
      );
    case JointType.Plane:
      return (
        <Text>
          Plane joint, also called a sliding joint,{" "}
          <b>enables two flat bones to slide over each other</b>. An example of
          this would be between tarsal bones in the foot.
        </Text>
      );
    case JointType.Saddle:
      return (
        <Text>
          A saddle joint is similar to a hinge joint, except it has a much
          larger range of motion. They combine the <b>flexion and extension</b>{" "}
          (think “up and down”) of the hinge joint with{" "}
          <b>abduction and adduction</b> (think “side to side”). The saddle
          joint also makes the thumb opposable; the thumb joint is an example of
          a saddle joint, and abduction and adduction can be visualized as
          movement of the thumb away and towards the midline of the hand.
        </Text>
      );
    default:
      throw new Error("Unknown joint type");
  }
}

function JointTypes({ order }: { order: number }) {
  const { visible } = useSection(order);
  const [jointType, setJointType] = useJointType((state) => [
    state.type,
    state.setType,
  ]);
  const transitions = useTransition([jointType], {
    key: jointType,
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
    config: config.stiff,
  });
  const props = useSpring({ opacity: visible ? 1 : 0 });
  return (
    <Box position="relative" mb="50px">
      <Box>
        <Heading>Types of Joints</Heading>
        <ButtonGroup isAttached mt="7">
          {JOINT_TO_TITLE.slice(0, 3).map(([ty, title]) => (
            <Button
              key={ty}
              onClick={() => {
                setJointType(ty);
              }}
              variant={ty === jointType ? "solid" : "outline"}
              colorScheme={ty === jointType ? "blue" : "gray"}
            >
              {title}
            </Button>
          ))}
        </ButtonGroup>
        <ButtonGroup isAttached mb="2">
          {JOINT_TO_TITLE.slice(3, 7).map(([ty, title]) => (
            <Button
              key={ty}
              onClick={() => {
                setJointType(ty);
              }}
              variant={ty === jointType ? "solid" : "outline"}
              colorScheme={ty === jointType ? "blue" : "gray"}
            >
              {title}
            </Button>
          ))}
        </ButtonGroup>
        <Box>
          <JointDesc jointType={jointType} />
        </Box>
      </Box>
      <a.div style={{ ...props, zIndex: -100 }}>
        {transitions(({ opacity }, ty) => (
          <Box
            position="fixed"
            zIndex="-100"
            pointerEvents="none"
            top={`calc(50vh - (30vw/2) + ${
              OBJS_WITH_3D.includes(ty) ? "70" : "0"
            }px)`}
            width="30vw"
            right={OBJS_WITH_3D.includes(ty) ? 0 : "15vw"}
          >
            <Box position="relative" zIndex={-100}>
              <a.div
                style={{
                  position: "absolute",
                  opacity,
                  zIndex: -100,
                }}
              >
                <Image
                  zIndex={-100}
                  alt={OBJ_JOINT_TO_IMG[ty]}
                  src={JOINT_TO_IMAGE_URL[ty]}
                />
              </a.div>
            </Box>
          </Box>
        ))}
      </a.div>
    </Box>
  );
}

export default withChildren(JointTypes, "joint-types", {
  w: "100%",
});
