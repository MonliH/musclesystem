import React, { useEffect } from "react";
import { useGLTF } from "@react-three/drei";
import { useBox, useHingeConstraint, useSpring } from "@react-three/cannon";

export default function Arm({ pressed }: { pressed: "bi" | "tri" | null }) {
  const { nodes, materials } = useGLTF("/arm.glb");
  const w = 3.35;
  const [lowerArm, armApi] = useBox(() => ({
    mass: 1,
    args: [w, 0.5, 0.5],
    rotation: [0, Math.PI / 2, -0.25],
    position: [0, 0.35, 1.45],
    // type: "Static",
  }));
  const [, box1Api] = useBox(() => ({
    position: [0, -0.35 - 0.5 * 0.5, -0.7],
    args: [2.5, 0.5, 10],
  }));
  const [, box2Api] = useBox(() => ({
    position: [0, -0.35, -3],
    args: [2.5, 2.5, 2.5],
  }));
  const s = 0.25;
  const [joint, api] = useBox(() => ({
    args: [s, s, s],
    rotation: [0, Math.PI / 2, 0],
    position: [0, 0, 0],
    mass: 0,
    type: "Static",
  }));
  armApi.material.set({ restitution: 0 });
  box1Api.material.set({ restitution: 0 });
  box2Api.material.set({ restitution: 0 });
  useHingeConstraint(joint, lowerArm, {
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
  const [, , bicepApi] = useSpring(attachment, lowerArm, {
    localAnchorB: [w * 0.5 - 0.3, 0.05, 0],
    stiffness: 1,
  });
  const [, , tricepApi] = useSpring(attachment, lowerArm, {
    localAnchorA: [0, 0, 0],
    localAnchorB: [w * 0.5 + 0.1, -0.015, 0],
    stiffness: 1,
  });
  useEffect(() => {
    switch (pressed) {
      case null:
        bicepApi.setStiffness(0);
        tricepApi.setStiffness(0);
        break;
      case "bi":
        bicepApi.setStiffness(500);
        tricepApi.setStiffness(0);
        break;
      case "tri":
        bicepApi.setStiffness(0);
        tricepApi.setStiffness(500);
        break;
    }
  }, [pressed]);
  return (
    <>
      <mesh
        geometry={nodes.Humerus_Humerus001.geometry}
        rotation={[Math.PI / 2, 0, 0]}
      >
        <meshPhysicalMaterial />
      </mesh>
      <group ref={lowerArm}>
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
