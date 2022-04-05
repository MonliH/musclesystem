import { a, useSpring } from "@react-spring/three";
import {
  ConeTwistConstraintOpts,
  Debug,
  PlaneProps,
  Triplet,
  useHingeConstraint,
} from "@react-three/cannon";
import {
  Physics,
  useBox,
  useCompoundBody,
  useConeTwistConstraint,
  useCylinder,
  usePlane,
  usePointToPointConstraint,
  useSphere,
} from "@react-three/cannon";
import { Box, Html, OrbitControls } from "@react-three/drei";
import type {
  BoxBufferGeometryProps,
  MeshProps,
  MeshStandardMaterialProps,
  ThreeEvent,
} from "@react-three/fiber";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { setgroups } from "process";
import { FC, ReactNode, RefObject, useState } from "react";
import {
  createContext,
  createRef,
  forwardRef,
  Suspense,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
} from "react";
import { useSection } from "sections/section";
import {
  Material,
  Mesh,
  MeshBasicMaterial,
  Object3D,
  Plane,
  Vector3,
} from "three";

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
}) {
  const spacing = 0.2;
  const radius = 0.25;
  const [ref1] = useBox(() => ({
    args: [radius, 1, radius],
    position,
  }));
  const [ref2] = useBox(() => ({
    args: [0.25, 1, 0.25],
    position: [position[0], -1 - spacing + position[1], 1 + position[2]],
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

  return (
    <>
      <Html position={[position[0], position[1] + 0.9, position[2] - 0.7]}>
        {children}
      </Html>
      <mesh ref={ref1}>
        <boxGeometry args={[radius, 1, radius]} />
        {render}
      </mesh>
      <mesh ref={ref2} onPointerDown={onDown} onPointerUp={onUp}>
        <boxGeometry args={[radius, 1, radius]} />
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
function DummyObj() {
  const [ref] = useBox(() => ({ position: [2, 2, 2], args: [1, 1, 1] }));
  useDragConstraint(ref);
  return (
    <mesh ref={ref}>
      <boxGeometry />
      <meshBasicMaterial />
    </mesh>
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
    [0, -1, -2],
    [0, -2, -0.5],
    [0, -1, 1],
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
          position={[0, 0, -2]}
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
        >
          <p style={textStyle}>Ball and Socket Joint</p>
        </Joint>
        <Joint
          render={<a.meshStandardMaterial {...props} />}
          position={[0, 0, -0.5]}
          onPointerDown={sc(1)}
          setPos={setPos}
          onPointerUp={pointerUp}
          active={current === 1}
          planePos={positions[1]}
          planeRot={rotations[1]}
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
        >
          <p style={textStyle}>Pivot Joint</p>
        </Joint>
        <Joint
          render={<a.meshStandardMaterial {...props} />}
          onPointerDown={sc(2)}
          setPos={setPos}
          position={[0, 0, 1]}
          onPointerUp={pointerUp}
          active={current === 2}
          planePos={positions[2]}
          planeRot={rotations[2]}
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
        >
          <p style={textStyle}>Hinge Joint</p>
        </Joint>
      </a.group>
    </>
  );
}
