import React, {
  ForwardedRef,
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
} from "react";
import { useGLTF } from "@react-three/drei";
import { useBox, useHingeConstraint } from "@react-three/cannon";
import { useFrame } from "@react-three/fiber";
import { Matrix4, Object3D, Vector3 } from "three";
import useMuscle from "stores/muscle";
import { useSpring, a } from "@react-spring/three";
import { useSection } from "sections/section";

export type ArmHandle = {
  flex: (pressed: "bi" | "tri" | null) => void;
};

const Arm = ({ order }: { order: number }, ref: ForwardedRef<ArmHandle>) => {
  const { visible } = useSection(order);
  const flexing = useRef({ bicep: false, tricep: false });
  const { nodes } = useGLTF("/arm.glb") as any;
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
    onCollideEnd: (e) => {
      const isBicep = e.body.userData.id === 1;
      if (isBicep) {
        flexing.current.bicep = false;
      } else {
        flexing.current.tricep = false;
      }
      armApi.velocity.set(0, 0, 0);
    },
  }));
  const [, box1Api] = useBox(() => ({
    position: [0, -0.35 - 0.5 * 0.5 - 0.1, -0.5],
    args: [2.5, 0.6, 10],
    userData: { id: 0 },
  }));
  const [, box2Api] = useBox(() => ({
    position: [0, 0.5, -2.5],
    args: [2.5, 2.5, 2.5],
    userData: { id: 1 },
  }));
  const s = 0.25;
  const [joint] = useBox(() => ({
    args: [s, s, s],
    rotation: [0, Math.PI / 2, 0],
    position: [0, 0, 0],
    mass: 0,
    type: "Static",
  }));
  armApi.material.set({
    friction: 10.0,
    restitution: 0.0,
    contactEquationRelaxation: 1000.0,
    frictionEquationStiffness: 1,
  });
  box1Api.material.set({
    friction: 10.0,
    restitution: 0.0,
    contactEquationRelaxation: 1000.0,
    frictionEquationStiffness: 1,
  });
  box2Api.material.set({
    friction: 10.0,
    restitution: 0.0,
    contactEquationRelaxation: 1000.0,
    frictionEquationStiffness: 1,
  });
  const [attachment] = useBox(() => ({
    args: [s, s, s],
    position: [0, 0.2, -3.5],
    mass: mass,
    type: "Static",
  }));
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
          flexing.current = { bicep: false, tricep: false };
          break;
        case "bi":
          flexing.current = { bicep: true, tricep: false };
          break;
        case "tri":
          flexing.current = { bicep: false, tricep: true };
          break;
      }
    },
  }));
  const tricep = useRef<Object3D>(null);
  const weight = useRef<Object3D>(null);
  useEffect(() => {
    armApi.mass.set(mass / 4);
  }, [mass]);
  const bicepOffset = new Vector3(w * 0.5 - 0.5, 0.3, 0);
  const fakeTricepOffset = new Vector3(w * 0.5 - 0.5, -0.1, 0);
  const weightRadius = Math.cbrt((mass - 0.99) * 0.1);
  const weightOffset = new Vector3(-w * 0.5 - weightRadius - 0.1, 0, 0);
  useFrame(() => {
    if (!lowerArm.current) return;
    if (!attachment.current) return;
    if (attachment.current && tricep.current && weight.current) {
      const weightPos = lowerArm.current.localToWorld(weightOffset.clone());
      weight.current.position.set(weightPos.x, weightPos.y, weightPos.z);
      weight.current.updateMatrix();
      weight.current.updateMatrixWorld();

      const bicepPos = lowerArm.current.localToWorld(
        new Vector3(w * 0.5 - 0.5, 0.15, 0)
      );
      const attachmentPos = attachment.current.position.clone();
      attachmentPos.y = 0.3;
      let orientation = new Matrix4();
      let offsetRotation = new Matrix4();
      offsetRotation = offsetRotation.makeRotationX(Math.PI / 2);
      orientation.lookAt(attachmentPos, bicepPos, new Vector3(0, 1, 0));
      orientation = orientation.multiply(offsetRotation);

      const distance = attachmentPos.distanceTo(bicepPos);
      const position = bicepPos.clone().add(attachmentPos).divideScalar(2);
      tricep.current.position.set(position.x, position.y, position.z);
      tricep.current.quaternion.setFromRotationMatrix(orientation);
      const radius = 6 / Math.max((distance - 3.2) * 5, 1);
      tricep.current.scale.set(radius, distance, radius);
    }

    if (flexing.current.bicep) {
      const bicepPos = lowerArm.current.localToWorld(bicepOffset.clone());
      const attachmentPos = attachment.current.position;
      const forceDir = attachmentPos
        .clone()
        .sub(bicepPos)
        .normalize()
        .multiplyScalar(bicepStrength);
      armApi.applyImpulse(
        [forceDir.x, forceDir.y, forceDir.z],
        [bicepPos.x, bicepPos.y, bicepPos.z]
      );
    } else if (flexing.current.tricep) {
      const tricepPos = lowerArm.current.localToWorld(fakeTricepOffset.clone());
      const attachmentPos = attachment.current.position;

      const forceDir = attachmentPos
        .clone()
        .sub(tricepPos)
        .normalize()
        .multiplyScalar(tricepStrength)
        .negate();
      armApi.applyImpulse(
        [forceDir.x, forceDir.y, forceDir.z],
        [tricepPos.x, tricepPos.y, tricepPos.z]
      );
    }
  });

  const { opacity } = useSpring({ opacity: visible ? 1 : 0 });
  const props = {
    transparent: true,
    opacity,
  };
  return (
    <a.group visible={opacity.to((v) => v > 0)} renderOrder={order}>
      <group rotation={[Math.PI / 2, 0, 0]}>
        <mesh geometry={nodes.Humerus_1.geometry}>
          {/* @ts-ignore: https://github.com/pmndrs/react-spring/issues/1515 */}
          <a.meshPhysicalMaterial {...props} />
        </mesh>
        <mesh geometry={nodes.Humerus_2.geometry}>
          <a.meshPhysicalMaterial {...props} />
        </mesh>
      </group>
      <group ref={lowerArm} renderOrder={order}>
        <group
          rotation={[Math.PI / 2, 0.25, Math.PI / 2]}
          position={[1.5, 0, 0]}
        >
          <mesh geometry={nodes.Radius_1.geometry}>
            <a.meshPhysicalMaterial {...props} />
          </mesh>
          <mesh geometry={nodes.Radius_2.geometry}>
            <a.meshPhysicalMaterial {...props} />
          </mesh>
        </group>
        <group
          rotation={[Math.PI / 2, 0.25, Math.PI / 2]}
          position={[1.5, 0, 0]}
        >
          <mesh geometry={nodes.Ulna_1.geometry}>
            <a.meshPhysicalMaterial {...props} />
          </mesh>
          <mesh geometry={nodes.Ulna_2.geometry}>
            <a.meshPhysicalMaterial {...props} />
          </mesh>
        </group>
      </group>
      <mesh ref={weight}>
        <sphereGeometry args={[weightRadius]} />
        {/* @ts-ignore: https://github.com/pmndrs/react-spring/issues/1515 */}
        <a.meshPhysicalMaterial {...props} color="cyan" />
      </mesh>
      <mesh ref={tricep}>
        <cylinderGeometry args={[0.01, 0.01, 1, 10]} />
        <a.meshPhysicalMaterial {...props} color="red" />
      </mesh>
    </a.group>
  );
};

useGLTF.preload("/arm.glb");

const ArmC = forwardRef(Arm);
export default ArmC;
