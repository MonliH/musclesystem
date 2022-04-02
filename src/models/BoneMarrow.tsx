import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { useSpring, a } from "@react-spring/three";
import { useSection } from "sections/section";
import { MathUtils, Object3D } from "three";
import { useFrame } from "@react-three/fiber";

export default function BoneMarrow({ order }: { order: number }) {
  const group = useRef();
  const { nodes, materials } = useGLTF("/bone_marrow.glb") as any;
  const { visible, visibleRef, nextTransitionAmt, nextTransitionAmtRef } =
    useSection(order);
  const { opacity } = useSpring({ opacity: visible ? 1 : 0 });
  const props = {
    transparent: true,
    opacity,
  };
  const bone = useRef<Object3D>();
  if (!visible && bone.current) {
    bone.current.rotation.y = 0;
  }
  useFrame(() => {
    if (!bone.current) return;
    if (
      visibleRef.current &&
      nextTransitionAmtRef.current < 0.5 &&
      opacity.get() == 1
    ) {
      bone.current.rotateY(0.002);
    }
  });
  const rotation = [-Math.PI * 0.5, 0, bone.current?.rotation.y ?? Math.PI / 2];
  const scale = [1.5, 1.5, 1.5];
  return (
    <a.group
      ref={group}
      visible={opacity.to((v) => v > 0)}
      renderOrder={order}
      dispose={null}
      rotation={[
        MathUtils.lerp(rotation[0], 0, nextTransitionAmt),
        MathUtils.lerp(rotation[1], 0, nextTransitionAmt),
        MathUtils.lerp(rotation[2], 0, nextTransitionAmt),
      ]}
      position={[0, MathUtils.lerp(2, 0, nextTransitionAmt), 0]}
      scale={[
        MathUtils.lerp(scale[0], 1, nextTransitionAmt),
        MathUtils.lerp(scale[1], 1, nextTransitionAmt),
        MathUtils.lerp(scale[2], 1, nextTransitionAmt),
      ]}
    >
      <group rotation={[Math.PI / 2, 0, 0]} renderOrder={order}>
        <mesh
          geometry={nodes.Humerus_1.geometry}
          material={nodes.Humerus_1.material}
        />
        <mesh geometry={nodes.Humerus_2.geometry}>
          <meshStandardMaterial />
        </mesh>
      </group>
      <mesh
        geometry={nodes.Humerus002.geometry}
        material={materials["Bone.002"]}
        rotation={[Math.PI / 2, 0, 0]}
      />
      <mesh
        geometry={nodes.Cube.geometry}
        material={nodes.Cube.material}
        position={[-0.08, -0.01, -0.43]}
        scale={[0.56, 0.56, 0.01]}
      />
      <mesh
        geometry={nodes.Cube001.geometry}
        material={nodes.Cube001.material}
        position={[-0.03, 0, -1.14]}
        scale={[1, 1, 0.01]}
      />
      <mesh
        geometry={nodes.Inside001.geometry}
        material={materials["Marrow.003"]}
        rotation={[Math.PI / 2, 0, 0]}
      />
    </a.group>
  );
}

useGLTF.preload("/bone_marrow.glb");
