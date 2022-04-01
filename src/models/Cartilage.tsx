import { useGLTF } from "@react-three/drei";
import { useSpring, a } from "@react-spring/three";
import { useSection } from "sections/section";
import { useRef } from "react";
import { MathUtils, Object3D } from "three";
import { useFrame } from "@react-three/fiber";

export default function Cartilage({ order }: { order: number }) {
  const { visible, visibleRef, nextTransitionAmt, nextTransitionAmtRef } =
    useSection(order);
  const { nodes } = useGLTF("/arm.glb") as any;
  const { opacity } = useSpring({ opacity: visible ? 1 : 0 });
  const props = {
    transparent: false,
    opacity: 1,
  };
  const cartilage = {
    transparent: false,
    opacity: 1,
    color: "#ff0000",
  };
  const bone = useRef<Object3D>();
  const rotation = [0, bone.current?.rotation.y ?? Math.PI / 4, 0];
  if (!visible && bone.current) {
    bone.current.rotation.y = 0;
  }
  useFrame(() => {
    if (!bone.current) return;
    if (visibleRef.current && nextTransitionAmtRef.current < 0.5) {
      bone.current.rotateY(0.002);
    }
  });
  const renderOrder = 0;
  return (
    <a.group
      ref={bone}
      renderOrder={renderOrder}
      rotation={[
        MathUtils.lerp(rotation[0], 0, nextTransitionAmt),
        MathUtils.lerp(rotation[1], 0, nextTransitionAmt),
        MathUtils.lerp(rotation[2], 0, nextTransitionAmt),
      ]}
    >
      <a.group
        rotation={[Math.PI / 2, 0, 0]}
        renderOrder={renderOrder}
        visible={opacity.to((v) => v > 0)}
      >
        <mesh geometry={nodes.Humerus_1.geometry}>
          {/* @ts-ignore: https://github.com/pmndrs/react-spring/issues/1515 */}
          <a.meshPhysicalMaterial {...props} />
        </mesh>
        <mesh geometry={nodes.Humerus_2.geometry}>
          <a.meshPhysicalMaterial {...cartilage} />
        </mesh>
      </a.group>
      <group renderOrder={renderOrder} visible={visible}>
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
