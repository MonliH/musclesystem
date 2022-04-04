import React, { useEffect, useRef } from "react";
import { Line, Text, useGLTF } from "@react-three/drei";
import { useSection } from "sections/section";
import { a, config, useSpring } from "@react-spring/three";
import { useFrame } from "@react-three/fiber";
import { Object3D } from "three";
import lerp from "utils/lerp";
import Marker from "./Mark";
const AMarker = a(Marker);
const ALine = a(Line);

export default function Tendon({ order }: { order: number }) {
  const group = useRef<Object3D>(null);
  const { nodes, materials } = useGLTF("/arm_full.glb") as any;

  const {
    visible,
    visibleRef,
    nextTransitionAmt,
    nextTransitionAmtRef,
    atPrev,
  } = useSection(order);
  const { opacity } = useSpring({
    opacity: visible && nextTransitionAmt < 0.75 ? 1 : 0,
  });
  const [props, api] = useSpring(() => ({
    y: window.innerHeight / 2,
  }));

  const boneMat = (
    // @ts-ignore
    <a.meshPhysicalMaterial
      color={materials.Bone.color}
      transparent
      opacity={opacity}
      depthWrite={!visible && !atPrev ? false : true}
    />
  );
  const cartilageMat = (
    // @ts-ignore
    <a.meshPhysicalMaterial
      color="#dbdbdb"
      transparent
      opacity={opacity}
      depthWrite={!visible && !atPrev ? false : true}
    />
  );
  const muscleMat = (
    <a.meshPhysicalMaterial
      color={materials.Muscle.color}
      transparent
      opacity={opacity}
    />
  );
  const tendonMat = (
    <a.meshPhysicalMaterial color="#c7c7c7" transparent opacity={opacity} />
  );

  useEffect(() => {
    const mouseMove = (e: MouseEvent) => {
      if (!visibleRef.current || nextTransitionAmtRef.current > 0.5) return;
      api({ y: e.clientY });
    };
    window.addEventListener("mousemove", mouseMove);
    return () => {
      window.removeEventListener("mousemove", mouseMove);
    };
  });
  if (!visible || nextTransitionAmt > 0.5) {
    api({ y: window.innerHeight * 0.7 });
  }

  const transitionCutoff =
    nextTransitionAmt < 0.5 ? 0 : (nextTransitionAmt - 0.5) * 2;
  const labelProps = {
    transition: "all 0.2s",
    transform: "translateZ(0.1px)",
    opacity: transitionCutoff == 0 && visible ? 1 : 0,
  };

  const { opacity: fastOpacity } = useSpring({
    opacity: nextTransitionAmt < 0.5 && visible ? 1 : 0,
    config: config.stiff,
  });

  return (
    <a.group
      ref={group}
      visible={opacity.to((v) => v > 0)}
      renderOrder={order}
      // @ts-ignore
      rotation={props.y.to(
        (v) =>
          lerp(
            [0, 0, (v / window.innerHeight - 0.7) * 1.5],
            [0, 0, 0],
            nextTransitionAmtRef.current < 0.5
              ? 0
              : (nextTransitionAmtRef.current - 0.5) * 2
          ) as [number, number, number]
      )}
    >
      <AMarker
        position={[0, 0.9, 0]}
        // @ts-ignore
        rotation={props.y.to(
          (v) =>
            [
              -Math.PI / 2,
              (v / window.innerHeight) * 1.5 - Math.PI / 2 - 0.3,
              -Math.PI / 2,
            ] as [number, number, number]
        )}
        invisible={!visible}
      >
        <div style={labelProps}>
          <p style={{ fontSize: "90px" }}>Tendon</p>
        </div>
      </AMarker>
      <ALine
        alphaWrite
        points={[
          [0, 0.76, 0],
          [0, 0.4, 0],
        ]}
        transparent
        opacity={fastOpacity}
        color="black"
        lineWidth={0.5}
      />
      <ALine
        alphaWrite
        transparent
        opacity={fastOpacity}
        points={[
          [0, 0.85, -0.4],
          [0, 0.4, -0.6],
        ]}
        lineWidth={0.5}
      />
      <mesh geometry={nodes.Humerus002.geometry}>
        <a.meshPhysicalMaterial
          color={materials.Bone.color}
          transparent
          opacity={opacity}
          visible={!atPrev && !visible ? false : opacity.to((v) => v > 0)}
        />
      </mesh>
      <mesh geometry={nodes.Humerus002_1.geometry}>{cartilageMat}</mesh>
      <mesh geometry={nodes.Radius002.geometry}>{boneMat}</mesh>
      <mesh geometry={nodes.Radius002_1.geometry}>{cartilageMat}</mesh>
      <mesh geometry={nodes.Ulna002.geometry}>{boneMat}</mesh>
      <mesh geometry={nodes.Ulna002_1.geometry}>{cartilageMat}</mesh>
      <mesh geometry={nodes.Long_head_of_biceps_brachii001.geometry}>
        {muscleMat}
      </mesh>
      <mesh geometry={nodes.Long_head_of_biceps_brachii001_1.geometry}>
        {tendonMat}
      </mesh>
      <mesh geometry={nodes.Short_head_of_biceps_brachii001.geometry}>
        {muscleMat}
      </mesh>
      <mesh geometry={nodes.Short_head_of_biceps_brachii001_1.geometry}>
        {tendonMat}
      </mesh>
      <mesh geometry={nodes.Lateral_head_of_triceps_brachii001.geometry}>
        {muscleMat}
      </mesh>
      <mesh geometry={nodes.Lateral_head_of_triceps_brachii001_1.geometry}>
        {tendonMat}
      </mesh>
      <mesh geometry={nodes.Long_head_of_triceps_brachii001.geometry}>
        {muscleMat}
      </mesh>
      <mesh geometry={nodes.Long_head_of_triceps_brachii001_1.geometry}>
        {tendonMat}
      </mesh>
      <mesh geometry={nodes.Medial_head_of_triceps_brachii001.geometry}>
        {muscleMat}
      </mesh>
      <mesh geometry={nodes.Medial_head_of_triceps_brachii001_1.geometry}>
        {tendonMat}
      </mesh>
    </a.group>
  );
}
