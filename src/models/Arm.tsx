import React, { forwardRef, useImperativeHandle, useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { useBox, useHingeConstraint, useSpring } from "@react-three/cannon";
import { useFrame } from "@react-three/fiber";
import { Object3D, Vector3 } from "three";

const Arm = ({}: {}, ref) => {
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
    stiffness: 0,
  });
  const offset = [w * 0.5 - 0.1, -0.2, 0] as Triplet;
  // const [, , tricepApi] = useSpring(attachment, lowerArm, {
  //   localAnchorA: [0, -0.1, 0],
  //   localAnchorB: offset,
  //   stiffness: 0,
  // });
  const [tricepCheatAttachment] = useBox(() => ({
    type: "Static",
    position: [0, -1, 0.5],
    mass: 0,
    args: [s, s, s],
  }));
  const [, , tricepApiCheat] = useSpring(tricepCheatAttachment, lowerArm, {
    localAnchorA: [0, 0, 0],
    localAnchorB: offset,
    stiffness: 0,
  });
  useImperativeHandle(ref, () => ({
    flex: (pressed: "bi" | "tri" | null) => {
      console.log(pressed);
      switch (pressed) {
        case null:
          bicepApi.setStiffness(0);
          tricepApiCheat.setStiffness(0);
          // tricepApi.setStiffness(0);
          break;
        case "bi":
          tricepApiCheat.setStiffness(0);
          // tricepApi.setStiffness(0);
          bicepApi.setStiffness(500);
          break;
        case "tri":
          bicepApi.setStiffness(0);
          tricepApiCheat.setStiffness(500);
          // tricepApi.setStiffness(500);
          break;
      }
    },
  }));
  const attachment1 = useRef<Object3D>(null);
  useFrame(() => {
    if (attachment1.current && lowerArm.current) {
      const local = new Vector3(...offset);
      const pos = lowerArm.current.localToWorld(local);
      attachment1.current.position.set(pos.x, pos.y, pos.z);
      attachment1.current.updateMatrixWorld();
      attachment1.current.updateMatrix();
    }
  });
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
      <mesh ref={attachment1}>
        <sphereGeometry args={[0.1]} />
        <meshPhysicalMaterial />
      </mesh>
    </>
  );
};

useGLTF.preload("/arm.glb");

const ArmC = forwardRef(Arm);
export default ArmC;
