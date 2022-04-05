import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { useSpring, a } from "@react-spring/three";
import { useSection } from "sections/section";
import { useFrame } from "@react-three/fiber";
import lerp from "utils/lerp";
import { Object3D } from "three";

export default function Arm({ order }: { order: number }) {
  const { visible, visibleRef, nextTransitionAmt, nextTransitionAmtRef } =
    useSection(order);
  const { nodes } = useGLTF("/arm_full.glb") as any;
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
      <group rotation={[-Math.PI / 2, 0, 0]}>
        <mesh geometry={nodes.Humerus002.geometry}>
          {/* @ts-ignore */}
          <a.meshPhysicalMaterial {...props} flatShading />
        </mesh>
        <mesh geometry={nodes.Humerus002_1.geometry}>
          <a.meshPhysicalMaterial {...props} flatShading />
        </mesh>
      </group>
    </a.group>
  );
}
