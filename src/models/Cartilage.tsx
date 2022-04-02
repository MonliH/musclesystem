import { useGLTF } from "@react-three/drei";
import { useSpring, a } from "@react-spring/three";
import { useSection } from "sections/section";
import { useRef } from "react";
import { Object3D } from "three";
import { useFrame } from "@react-three/fiber";
import lerp from "utils/lerp";

export default function Cartilage({ order }: { order: number }) {
  const {
    visible,
    visibleRef,
    nextTransitionAmt,
    nextTransitionAmtRef,
    atPrev,
  } = useSection(order);
  const { nodes } = useGLTF("/arm.glb") as any;
  const { opacity } = useSpring({ opacity: visible ? 1 : 0 });
  const props = {
    transparent: true,
    opacity,
  };
  const cartilage = {
    transparent: true,
    opacity,
    color: "#3895ff",
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
  const renderOrder = 0;
  const currRot = bone.current?.rotation.y ?? Math.PI / 4;
  return (
    <a.group
      ref={bone}
      renderOrder={renderOrder}
      visible={opacity.to((v) => v > 0)}
      rotation={lerp(
        [0, currRot, 0],
        [0, Math.round(currRot / (Math.PI * 2)) * (Math.PI * 2), 0],
        nextTransitionAmt
      )}
    >
      <a.group
        rotation={[Math.PI / 2, 0, 0]}
        renderOrder={renderOrder}
        visible={atPrev ? visible : opacity.to((v) => v > 0)}
      >
        <mesh geometry={nodes.Humerus_1.geometry}>
          {/* @ts-ignore: https://github.com/pmndrs/react-spring/issues/1515 */}
          <a.meshPhysicalMaterial {...props} />
        </mesh>
        <mesh geometry={nodes.Humerus_2.geometry}>
          <a.meshPhysicalMaterial {...cartilage} />
        </mesh>
      </a.group>
      <group renderOrder={renderOrder}>
        <group rotation={[Math.PI / 2, 0, 0]} renderOrder={renderOrder}>
          <mesh geometry={nodes.Radius_1.geometry}>
            <a.meshPhysicalMaterial {...props} />
          </mesh>
          <mesh geometry={nodes.Radius_2.geometry}>
            <a.meshPhysicalMaterial {...cartilage} />
          </mesh>
        </group>
        <group rotation={[Math.PI / 2, 0, 0]} renderOrder={renderOrder}>
          <mesh geometry={nodes.Ulna_1.geometry}>
            <a.meshPhysicalMaterial {...props} />
          </mesh>
          <mesh geometry={nodes.Ulna_2.geometry}>
            <a.meshPhysicalMaterial {...cartilage} />
          </mesh>
        </group>
      </group>
    </a.group>
  );
}
