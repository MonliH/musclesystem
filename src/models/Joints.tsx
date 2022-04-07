import { a, useSpring } from "@react-spring/three";
import {
  useHingeConstraint,
  usePointToPointConstraint,
  useSphere,
  useCylinder,
} from "@react-three/cannon";
import { Html, Line } from "@react-three/drei";
import { ThreeEvent, useFrame } from "@react-three/fiber";
import { ReactNode, RefObject, useRef, useState } from "react";
import { createRef, useCallback, useEffect } from "react";
import { useSection } from "sections/section";
import useJointType, { JointType } from "stores/jointType";
import { Object3D, Vector3 } from "three";
import { Line2 } from "three-stdlib";

const cursor = createRef<Object3D>();

function useDragConstraint(child: RefObject<Object3D>) {
  const [, , api] = usePointToPointConstraint(cursor, child, {
    pivotA: [0, 0, 0],
    pivotB: [0, 0, 0],
  });
  useEffect(() => void api.disable(), []);
  const onPointerDown = useCallback((e) => {
    e.stopPropagation();
    api.enable();
  }, []);
  const onPointerUp = useCallback(() => api.disable(), []);
  return { onPointerDown, onPointerUp };
}

const arrowOffset = new Vector3(0, -0.45, 0);
function Joint({
  render,
  useConstraint,
  position = [0, 0, 0],
  setPos,
  planePos,
  planeRot,
  active,
  onPointerDown,
  onPointerUp,
  children,
  onDisplay,
  additionalGeometry,
  showLine = false,
}: {
  useConstraint: (
    ref1: RefObject<Object3D>,
    ref2: RefObject<Object3D>,
    spacing: number
  ) => void;
  render?: ReactNode;
  position?: [number, number, number];
  planePos: [number, number, number];
  planeRot: [number, number, number];
  setPos: (x: number, y: number, z: number) => void;
  active: boolean;
  onPointerDown: (e: ThreeEvent<PointerEvent>) => void;
  onPointerUp: (e: ThreeEvent<PointerEvent>) => void;
  children: ReactNode;
  onDisplay: boolean;
  additionalGeometry?: ReactNode;
  showLine?: boolean;
}) {
  const spacing = 0.2;
  const radius = 0.25 / 2;
  const initialPosition: [number, number, number] = [
    position[0],
    -1 - spacing + position[1],
    1 + position[2],
  ];
  const [ref1, api1] = useCylinder(() => ({
    args: [radius, radius, 1],
    position,
  }));
  const [ref2, api2] = useCylinder(() => ({
    args: [radius, radius, 1],
    position: initialPosition,
    mass: 1,
  }));
  useConstraint(ref1, ref2, spacing);
  const bind = useDragConstraint(ref2);
  const onDown = (e: ThreeEvent<PointerEvent>) => {
    if (onPointerDown) onPointerDown(e);
    bind.onPointerDown(e);
  };
  const onUp = (e: ThreeEvent<PointerEvent>) => {
    bind.onPointerUp();
    if (onPointerUp) onPointerUp(e);
  };

  useEffect(() => {
    if (onDisplay) {
      api1.position.set(...position);
      api2.position.set(...initialPosition);
    } else {
      api1.position.set(10, 10, 10);
      api2.position.set(10, 10, 10);
    }
  }, [onDisplay]);

  const arrow = useRef<Line2>(undefined as any);
  useEffect(() => {
    if (!showLine) return;
    api2.rotation.subscribe((rot) => {
      if (!arrow.current || !showLine) return;
      arrow.current.rotation.set(...rot);
      arrow.current.updateMatrixWorld();
    });
  }, []);
  useFrame(() => {
    if (!ref2.current || !arrow.current || !showLine) return;
    const pos = ref2.current.localToWorld(arrowOffset.clone());
    arrow.current.position.set(pos.x, pos.y, pos.z);
    arrow.current.updateMatrixWorld();
  });

  return (
    <>
      {onDisplay && (
        <>
          <Html position={[position[0], position[1] + 0.9, position[2] - 0.7]}>
            {children}
          </Html>

          {additionalGeometry}
          {showLine && (
            <Line
              alphaWrite={true}
              ref={arrow}
              points={[
                [0, 0, 0],
                [0.5, 0, 0],
              ]}
              color={"black"}
            ></Line>
          )}
        </>
      )}
      <mesh ref={ref1}>
        <cylinderGeometry args={[radius, radius, 1]} />
        {render}
      </mesh>
      <mesh ref={ref2} onPointerDown={onDown} onPointerUp={onUp}>
        <cylinderGeometry args={[radius, radius, 1]} />
        {render}
      </mesh>
      <mesh
        rotation={planeRot}
        position={planePos}
        onPointerMove={(e: ThreeEvent<PointerEvent>) => {
          if (active) {
            setPos(e.point.x, e.point.y, e.point.z);
          }
        }}
      >
        <planeBufferGeometry args={[5, 5]} />
        <meshBasicMaterial
          visible={false}
          color={active ? "#ff0000" : "#fefefe"}
        />
      </mesh>
    </>
  );
}

export default function Joints({ order }: { order: number }) {
  const { visible, atPrev } = useSection(order);
  const { opacity } = useSpring({
    opacity: visible ? 1 : 0,
  });
  const [current, setCurrent] = useState(-1);
  const [ref, api] = useSphere(
    () => ({ args: [0.01], position: [0, 0, 0], type: "Static" }),
    cursor
  );
  const sc = (i: number) => (e: ThreeEvent<PointerEvent>) => {
    if (current === -1) {
      setCurrent(i);
      return false;
    } else return true;
  };
  const pointerUp = (e: ThreeEvent<PointerEvent>) => {
    setCurrent(-1);
  };
  const rotations: [number, number, number][] = [
    [0, Math.PI + 0.4, 0],
    [-Math.PI / 2, 0, 0],
    [0, Math.PI, 0],
  ];
  const positions: [number, number, number][] = [
    [0, -1, -1.25],
    [0, -2, -1.25],
    [0, -1, -1.25],
  ];

  const setPos = (x: number, y: number, z: number) => {
    api.position.set(x, y, z);
  };
  const props = { opacity, transparent: true, depthWrite: visible };
  const textStyle: any = {
    width: "200px",
    textAlign: "center",
    fontWeight: "bold",
    opacity: visible ? 1 : 0,
    transition: "all 0.5s",
    pointerEvents: "none",
    userSelect: "none",
  };

  const jointType = useJointType((state) => state.type);

  return (
    <>
      <a.group visible={opacity.to((v) => v > 0)} renderOrder={order}>
        <mesh ref={ref}>
          <sphereBufferGeometry args={[0.1, 32, 32]} />
          <meshBasicMaterial visible={false} />
        </mesh>
        <Joint
          // @ts-ignore
          render={<a.meshStandardMaterial {...props} />}
          position={[0, 0, -1.25]}
          planePos={positions[0]}
          planeRot={rotations[0]}
          onPointerDown={sc(0)}
          setPos={setPos}
          onPointerUp={pointerUp}
          active={current === 0}
          useConstraint={(ref1, ref2, spacing) => {
            // eslint-disable-next-line
            usePointToPointConstraint(ref1, ref2, {
              pivotA: [0, -0.5 - spacing * 0.5, 0],
              pivotB: [0, 0.5 + spacing * 0.5, 0],
              collideConnected: true,
            });
          }}
          onDisplay={jointType === JointType.BallAndSocket}
          additionalGeometry={
            <>
              <mesh
                position={[
                  positions[0][0],
                  positions[0][1] + 0.4,
                  positions[0][2],
                ]}
              >
                <sphereGeometry
                  args={[
                    0.28,
                    undefined,
                    undefined,
                    undefined,
                    undefined,
                    undefined,
                    Math.PI / 2,
                  ]}
                />
                <a.meshPhysicalMaterial {...props} />
              </mesh>
            </>
          }
        >
          <p style={textStyle}>Ball and Socket Joint</p>
        </Joint>
        <Joint
          render={<a.meshStandardMaterial {...props} />}
          position={[0, 0, -1.25]}
          onPointerDown={sc(1)}
          setPos={setPos}
          onPointerUp={pointerUp}
          active={current === 1}
          planePos={positions[1]}
          planeRot={rotations[1]}
          onDisplay={jointType === JointType.Pivot}
          useConstraint={(ref1, ref2, spacing) => {
            // eslint-disable-next-line
            useHingeConstraint(ref1, ref2, {
              axisA: [0, 1, 0],
              axisB: [0, 1, 0],
              pivotA: [0, -0.5 - spacing * 0.5, 0],
              pivotB: [0, 0.5 + spacing * 0.5, 0],
              collideConnected: true,
            });
          }}
          showLine
          additionalGeometry={
            <>
              <mesh
                position={[
                  positions[0][0],
                  positions[0][1] + 0.4,
                  positions[0][2],
                ]}
              >
                <cylinderGeometry args={[0.19, 0.19, 0.5]} />
                <a.meshPhysicalMaterial {...props} />
              </mesh>
            </>
          }
        >
          <p style={textStyle}>Pivot Joint</p>
        </Joint>
        <Joint
          render={<a.meshStandardMaterial {...props} />}
          onPointerDown={sc(2)}
          setPos={setPos}
          position={[0, 0, -1.25]}
          onPointerUp={pointerUp}
          active={current === 2}
          planePos={positions[2]}
          planeRot={rotations[2]}
          onDisplay={jointType === JointType.Hinge}
          useConstraint={(ref1, ref2, spacing) => {
            // eslint-disable-next-line
            useHingeConstraint(ref1, ref2, {
              axisA: [0, 0, 1],
              axisB: [0, 0, 1],
              pivotA: [0, -0.5 - spacing * 0.5, 0],
              pivotB: [0, 0.5 + spacing * 0.5, 0],
              collideConnected: true,
            });
          }}
          additionalGeometry={
            <>
              <mesh
                position={[
                  positions[0][0],
                  positions[0][1] + 0.4,
                  positions[0][2],
                ]}
                rotation={[Math.PI / 2, 0, 0]}
              >
                <cylinderGeometry args={[0.19, 0.19, 0.5]} />
                <a.meshPhysicalMaterial {...props} />
              </mesh>
            </>
          }
        >
          <p style={textStyle}>Hinge Joint</p>
        </Joint>
      </a.group>
    </>
  );
}
