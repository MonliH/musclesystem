import React, { ForwardedRef, forwardRef, useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { useSpring, a } from "@react-spring/three";
import { useSection } from "sections/section";
import { useFrame } from "@react-three/fiber";
import lerp from "utils/lerp";
import { Object3D } from "three";

export type ArmHandle = {
  flex: (pressed: "bi" | "tri" | null) => void;
};

const Arm = ({ order }: { order: number }, ref: ForwardedRef<ArmHandle>) => {
  const { visible, visibleRef, nextTransitionAmt, nextTransitionAmtRef } =
    useSection(order);
  const { nodes } = useGLTF("/arm.glb") as any;
  const { opacity } = useSpring({ opacity: visible ? 1 : 0 });
  const bone = useRef<Object3D>();
  useFrame(() => {
    if (!bone.current) return;
    if (visibleRef.current && nextTransitionAmtRef.current < 0.5) {
      bone.current.rotation.y += 0.005;
      bone.current.updateMatrixWorld();
    }
  });
  const props = { transparent: true, opacity };
  const currRot = bone.current?.rotation.y ?? Math.PI / 2;
  return (
    <a.group
      ref={bone}
      visible={opacity.to((v) => v > 0)}
      renderOrder={order}
      rotation={
        lerp(
          [0, currRot, 0],
          [
            0,
            Math.round(currRot / (Math.PI * 2)) * (Math.PI * 2) + Math.PI * 0.5,
            0,
          ],
          nextTransitionAmt
        ) as [number, number, number]
      }
      position={[0, 2, 0]}
      scale={[1.5, 1.5, 1.5]}
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
