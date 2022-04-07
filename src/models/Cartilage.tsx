import { Line, useGLTF } from "@react-three/drei";
import { useSpring, a, config } from "@react-spring/three";
import { useSection } from "sections/section";
import { useEffect, useRef } from "react";
import { DoubleSide, Object3D } from "three";
import useJointPart, { JointPart } from "stores/jointPart";
import Marker from "models/Mark";

const AMarker = a(Marker);

export default function Cartilage({ order }: { order: number }) {
  const { nodes, materials } = useGLTF("/arm_full.glb") as any;
  const jointPart = useJointPart((state) => state.part);

  const { visible, visibleRef, nextTransitionAmtRef, atPrev } = useSection(
    order,
    1
  );
  const { opacity } = useSpring({
    opacity: visible && jointPart !== JointPart.Bursae ? 1 : 0,
  });
  const [props, api] = useSpring(() => ({
    y: window.innerHeight / 2,
  }));
  const { cartColor } = useSpring({
    cartColor: jointPart == JointPart.Cartilage ? "#ff0000" : "#ffffff",
  });

  const cartilage = {
    transparent: true,
    opacity,
    depthWrite: visible,
    color: cartColor,
  };
  const bone = useRef<Object3D>();

  useEffect(() => {
    const mouseMove = (e: MouseEvent) => {
      if (!visibleRef.current || nextTransitionAmtRef.current > 0.8) return;

      if (jointPart == JointPart.Tendons) api({ y: e.clientY });
      else api({ y: e.clientY + window.innerHeight * 0.5 });
    };
    window.addEventListener("mousemove", mouseMove);
    return () => {
      window.removeEventListener("mousemove", mouseMove);
    };
  });

  const boneMat = (
    // @ts-ignore
    <a.meshPhysicalMaterial
      color={materials.Bone.color}
      transparent={true}
      depthWrite={visible}
      opacity={opacity}
    ></a.meshPhysicalMaterial>
  );

  const { opacity: ligamentOpacity } = useSpring({
    opacity: visible && jointPart == JointPart.Ligaments ? 1 : 0,
  });
  const ligamentMat = (
    <a.meshPhysicalMaterial
      transparent={true}
      opacity={ligamentOpacity}
      depthWrite={visible}
      side={DoubleSide}
      color={"#ff0000"}
    />
  );

  const renderOrder = 0;

  const labelProps = {
    transition: "all 0.2s",
    transform: "translateZ(0.1px)",
    opacity: jointPart == JointPart.Tendons && visible ? 1 : 0,
  };
  const { opacity: tendonOpacity } = useSpring({
    opacity: visible && jointPart == JointPart.Tendons ? 1 : 0,
  });

  const muscleMat = (
    <a.meshPhysicalMaterial
      color={materials.Muscle.color}
      transparent
      opacity={tendonOpacity}
      depthWrite={!visible && !atPrev ? false : true}
    />
  );
  const tendonMat = (
    <a.meshPhysicalMaterial
      color="#c7c7c7"
      transparent
      opacity={tendonOpacity}
      depthWrite={!visible && !atPrev ? false : true}
    />
  );

  if (jointPart === JointPart.Tendons) {
    api({ y: window.innerHeight * 0.5 });
  } else {
    api({ y: window.innerHeight * 0.75 });
  }

  return (
    <a.group
      ref={bone}
      renderOrder={renderOrder}
      visible={opacity.to((v) => v > 0)}
      // @ts-ignore
      rotation={props.y.to((v) => [0, 0, (v / window.innerHeight - 0.7) * 2])}
    >
      <a.group
        renderOrder={renderOrder}
        visible={atPrev ? visible : opacity.to((v) => v > 0)}
      >
        <mesh geometry={nodes.Humerus002.geometry}>{boneMat}</mesh>
        <mesh geometry={nodes.Humerus002_1.geometry}>
          <a.meshPhysicalMaterial {...cartilage} />
        </mesh>
      </a.group>
      <mesh geometry={nodes.Radius002.geometry}>{boneMat}</mesh>
      <mesh geometry={nodes.Radius002_1.geometry}>
        {/* @ts-ignore: https://github.com/pmndrs/react-spring/issues/1515 */}
        <a.meshPhysicalMaterial {...cartilage} />
      </mesh>
      <mesh geometry={nodes.Ulna002.geometry}>{boneMat}</mesh>
      <mesh geometry={nodes.Ulna002_1.geometry}>
        <a.meshPhysicalMaterial {...cartilage} />
      </mesh>
      <mesh geometry={nodes.Radial_collateral_ligament.geometry}>
        {ligamentMat}
      </mesh>
      <mesh geometry={nodes.Ulnar_collateral_ligament.geometry}>
        {ligamentMat}
      </mesh>

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
      <Line
        alphaWrite
        visible={jointPart === JointPart.Tendons}
        points={[
          [0, 0.76, 0],
          [0, 0.4, 0],
        ]}
        color="black"
        lineWidth={0.5}
      />
      <Line
        alphaWrite
        visible={jointPart === JointPart.Tendons}
        points={[
          [0, 0.85, -0.4],
          [0, 0.4, -0.6],
        ]}
        color="black"
        lineWidth={0.5}
      />
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
