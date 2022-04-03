import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";

export default function FullArm({ ...props }) {
  const group = useRef();
  const { nodes, materials } = useGLTF("/arm_full.glb") as any;
  return (
    <group ref={group} {...props} dispose={null} visible={false}>
      <mesh geometry={nodes.Humerus002.geometry} material={materials.Bone} />
      <mesh
        geometry={nodes.Humerus002_1.geometry}
        material={materials.NewCartilage}
      />
      <mesh geometry={nodes.Radius002.geometry} material={materials.Bone} />
      <mesh
        geometry={nodes.Radius002_1.geometry}
        material={materials.NewCartilage}
      />
      <mesh geometry={nodes.Ulna002.geometry} material={materials.Bone} />
      <mesh
        geometry={nodes.Ulna002_1.geometry}
        material={materials.NewCartilage}
      />
      <mesh
        geometry={nodes.Long_head_of_biceps_brachii001.geometry}
        material={materials.Muscle}
      />
      <mesh
        geometry={nodes.Long_head_of_biceps_brachii001_1.geometry}
        material={materials.Tendon}
      />
      <mesh
        geometry={nodes.Short_head_of_biceps_brachii001.geometry}
        material={materials.Muscle}
      />
      <mesh
        geometry={nodes.Short_head_of_biceps_brachii001_1.geometry}
        material={materials.Tendon}
      />
      <mesh
        geometry={nodes.Brachialis_muscle_1.geometry}
        material={materials.Muscle}
      />
      <mesh
        geometry={nodes.Brachialis_muscle_2.geometry}
        material={materials.Tendon}
      />
      <mesh
        geometry={nodes.Lateral_head_of_triceps_brachii001.geometry}
        material={materials.Muscle}
      />
      <mesh
        geometry={nodes.Lateral_head_of_triceps_brachii001_1.geometry}
        material={materials.Tendon}
      />
      <mesh
        geometry={nodes.Long_head_of_triceps_brachii001.geometry}
        material={materials.Muscle}
      />
      <mesh
        geometry={nodes.Long_head_of_triceps_brachii001_1.geometry}
        material={materials.Tendon}
      />
      <mesh
        geometry={nodes.Medial_head_of_triceps_brachii001.geometry}
        material={materials.Muscle}
      />
      <mesh
        geometry={nodes.Medial_head_of_triceps_brachii001_1.geometry}
        material={materials.Tendon}
      />
    </group>
  );
}

useGLTF.preload("/arm_full.glb");
