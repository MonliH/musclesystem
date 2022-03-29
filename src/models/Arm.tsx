import React, { useEffect, useRef } from "react";
import { Box, useGLTF } from "@react-three/drei";
import {
  useBox,
  useHingeConstraint,
  usePlane,
  useSphere,
  useSpring,
} from "@react-three/cannon";

export default function Arm({ ...props }) {
  const { nodes, materials } = useGLTF("/arm.glb");
  const w = 3.35;
  const [humerous] = useBox(() => ({
    mass: 1,
    args: [w, 0.5, 0.5],
    rotation: [0, Math.PI / 2, -0.25],
    position: [0, 0.35, 1.45],
    // type: "Static",
  }));
  useBox(() => ({ position: [0, -0.6, -0.7], args: [2.5, 0.5, 2.5] }));
  useBox(() => ({ position: [0, -1, -3], args: [2.5, 2.5, 2.5] }));
  const s = 0.25;
  const [joint] = useBox(() => ({
    args: [s, s, s],
    rotation: [0, Math.PI / 2, 0],
    position: [0, 0, 0],
    mass: 0,
    type: "Static",
  }));
  useHingeConstraint(joint, humerous, {
    axisA: [0, 0, 1],
    axisB: [0, 0, 1],
    collideConnected: false,
    pivotA: [0, 0, 0],
    pivotB: [w * 0.5 - 0.17, 0.02, 0],
  });
  const [attachment] = useBox(() => ({
    args: [s, s, s],
    position: [0, 0.25, -3.5],
    mass: 0,
    type: "Static",
  }));
  useSpring(attachment, humerous, {
    localAnchorB: [w * 0.5 - 0.3, 0.05, 0],
    stiffness: 1000,
  });
  return (
    <>
      <mesh
        geometry={nodes.Humerus_Humerus001.geometry}
        rotation={[Math.PI / 2, 0, 0]}
      >
        <meshPhysicalMaterial />
      </mesh>
      <group ref={humerous}>
        <mesh
          geometry={nodes.Radius_Radius001.geometry}
          rotation={[Math.PI / 2, 0.25, Math.PI / 2]}
          position={[1.5, 0, 0]}
        >
          <meshPhysicalMaterial />
        </mesh>
        <mesh
          geometry={nodes.Ulna_Ulna001.geometry}
          rotation={[Math.PI / 2, 0.25, Math.PI / 2]}
          position={[1.5, 0, 0]}
        >
          <meshPhysicalMaterial />
        </mesh>
      </group>
    </>
  );
}

useGLTF.preload("/arm.glb");
