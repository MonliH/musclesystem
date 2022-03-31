import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
} from "react";
import { useGLTF } from "@react-three/drei";
import {
  useBox,
  useDistanceConstraint,
  useHingeConstraint,
  usePointToPointConstraint,
  useSphere,
  useSpring,
} from "@react-three/cannon";
import { useFrame } from "@react-three/fiber";
import { Matrix4, Object3D, Vector3 } from "three";
import { BreadcrumbSeparator, Slider } from "@chakra-ui/react";
import useMuscle from "stores/muscle";

const Arm = ({}: {}, ref) => {
  const { nodes, materials } = useGLTF("/arm.glb");
  const [bicepStrength, tricepStrength, mass] = useMuscle((state) => [
    state.bicepStrength,
    state.tricepStrength,
    state.mass,
  ]);
  const w = 3.35;
  const [lowerArm, armApi] = useBox(() => ({
    args: [w, 0.5, 0.5],
    rotation: [0, Math.PI / 2, -0.25],
    position: [0, 0.35, 1.45],
    mass: mass / 4,
    // type: "Static",
  }));
  const [, box1Api] = useBox(() => ({
    position: [0, -0.35 - 0.5 * 0.5 - 0.1, -0.5],
    args: [2.5, 0.6, 10],
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
  const [attachment] = useBox(() => ({
    args: [s, s, s],
    position: [0, 0, -3.5],
    mass: mass,
    type: "Static",
  }));
  const [, , bicepApi] = useSpring(attachment, lowerArm, {
    localAnchorB: [w * 0.5 - 0.3, 0.05, 0],
    stiffness: 0,
    restLength: 3.4135414492518756,
  });
  const offset = [w * 0.5 + 0.3, -0.2, 0] as Triplet;
  const [, , tricepApi] = useSpring(attachment, lowerArm, {
    localAnchorA: [0, -3, 0],
    localAnchorB: offset,
    stiffness: 0,
    restLength: 2.997404923144768,
  });
  armApi.allowSleep.set(false);

  useHingeConstraint(joint, lowerArm, {
    axisA: [0, 0, 1],
    axisB: [0, 0, 1],
    collideConnected: false,
    pivotA: [0, 0, 0],
    pivotB: [w * 0.5 - 0.2, 0.02, 0],
    maxForce: 10000000,
  });
  useImperativeHandle(ref, () => ({
    flex: (pressed: "bi" | "tri" | null) => {
      armApi.wakeUp();
      switch (pressed) {
        case null:
          tricepApi.setStiffness(0);
          bicepApi.setStiffness(0);
          break;
        case "bi":
          tricepApi.setStiffness(0);
          bicepApi.setStiffness(bicepStrength);
          break;
        case "tri":
          bicepApi.setStiffness(0);
          tricepApi.setStiffness(tricepStrength);
          break;
      }
    },
  }));
  const attachment1 = useRef<Object3D>(null);
  const weight = useRef<Object3D>(null);
  const tricep = useRef<Object3D>(null);
  useEffect(() => {
    armApi.mass.set(mass / 4);
  }, [mass]);
  useFrame(() => {
    if (!lowerArm.current) return;
    if (attachment1.current && attachment.current && tricep.current) {
      const local = new Vector3(offset[0], offset[1], offset[2]);
      // const local = new Vector3(w * 0.5 - 0.3, 0.05, 0);
      const tricepPos = lowerArm.current.localToWorld(local);
      const attachmentPos = attachment.current.position;
      attachment1.current.position.set(tricepPos.x, tricepPos.y, tricepPos.z);
      attachment1.current.updateMatrix();
      attachment1.current.updateMatrixWorld();

      let orientation = new Matrix4();
      let offsetRotation = new Matrix4();
      offsetRotation = offsetRotation.makeRotationX(Math.PI / 2);
      orientation.lookAt(attachmentPos, tricepPos, new Vector3(0, 1, 0));
      orientation = orientation.multiply(offsetRotation);

      const distance = attachmentPos.distanceTo(tricepPos);
      console.log(distance);
      const position = tricepPos.clone().add(attachmentPos).divideScalar(2);
      // tricep.current.position.set(position.x, position.y, position.z);
      // tricep.current.quaternion.setFromRotationMatrix(orientation);
      // tricep.current.scale.set(1, distance, 1);
    }
    if (weight.current) {
      const local = new Vector3(-w * 0.5 - 0.3, 0, 0);
      const pos = lowerArm.current.localToWorld(local);
      weight.current.position.set(pos.x, pos.y, pos.z);
      weight.current.updateMatrixWorld();
      weight.current.updateMatrix();
    }
  });
  useEffect(() => {
    setTimeout(() => {
      tricepApi.setStiffness(0);
      bicepApi.setStiffness(800);
      setTimeout(() => {
        tricepApi.setStiffness(0);
        bicepApi.setStiffness(0);
      }, 500);
    }, 0);
  }, []);
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
      <mesh ref={tricep}>
        <cylinderGeometry args={[0.1, 0.1, 1, 10]} />
        <meshPhysicalMaterial />
      </mesh>
    </>
  );
};

useGLTF.preload("/arm.glb");

const ArmC = forwardRef(Arm);
export default ArmC;
