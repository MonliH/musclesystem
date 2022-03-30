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
    position: [0, -0.35 - 0.5 * 0.5 - 0.2, -0.5],
    args: [2.5, 0.5, 10],
  }));
  const [, box2Api] = useBox(() => ({
    position: [0, 0.5, -3],
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
  const [, , hingeApi] = useHingeConstraint(joint, lowerArm, {
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
  armApi.allowSleep.set(false);
  const offset = [w * 0.5, -0.01, 0] as Triplet;
  useImperativeHandle(ref, () => ({
    flex: (pressed: "bi" | "tri" | null) => {
      armApi.wakeUp();
      switch (pressed) {
        case null:
          hingeApi.disableMotor();
          break;
        case "bi":
          hingeApi.setMotorSpeed(1);
          hingeApi.enableMotor();
          break;
        case "tri":
          hingeApi.setMotorSpeed(-1);
          hingeApi.enableMotor();
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
        <meshPhysicalMaterial color="red" />
      </mesh>
    </>
  );
};

useGLTF.preload("/arm.glb");

const ArmC = forwardRef(Arm);
export default ArmC;
