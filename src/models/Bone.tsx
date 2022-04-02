import React, { ForwardedRef, forwardRef, useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { useSpring, a } from "@react-spring/three";
import { useSection } from "sections/section";
import { MathUtils, Object3D } from "three";
import { useFrame } from "@react-three/fiber";

export type ArmHandle = {
  flex: (pressed: "bi" | "tri" | null) => void;
};

const Arm = ({ order }: { order: number }, ref: ForwardedRef<ArmHandle>) => {
  const { visible, visibleRef, nextTransitionAmt, nextTransitionAmtRef } =
    useSection(order);
  const { nodes } = useGLTF("/arm.glb") as any;
  const { opacity } = useSpring({ opacity: visible ? 1 : 0 });
  const bone = useRef<Object3D>();
  const scale = [1.5, 1.5, 1.5] as [number, number, number];
  const position = [0, 2, 0] as [number, number, number];
  const rotation = [0, bone.current?.rotation.y ?? Math.PI / 4, 0];
  useFrame(() => {
    if (!bone.current) return;
    if (visibleRef.current && nextTransitionAmtRef.current < 0.5) {
      bone.current.rotateY(0.005);
    }
  });
  const props = { transparent: true, opacity };
  return (
    <a.group
      ref={bone}
      visible={opacity.to((v) => v > 0)}
      renderOrder={order}
      rotation={[
        MathUtils.lerp(rotation[0], 0, nextTransitionAmt),
        MathUtils.lerp(rotation[1], Math.PI / 2, nextTransitionAmt),
        MathUtils.lerp(rotation[2], 0, nextTransitionAmt),
      ]}
      position={position}
      scale={scale}
    >
      <mesh geometry={nodes.Humerus_2.geometry}>
        {/* @ts-ignore */}
        <a.meshPhysicalMaterial {...props} />
      </mesh>
      <mesh geometry={nodes.Humerus_1.geometry}>
        <a.meshPhysicalMaterial {...props} />
      </mesh>
    </a.group>
  );
};

const ArmC = forwardRef(Arm);
export default ArmC;
