import { useGLTF } from "@react-three/drei";
import { useSpring, a } from "@react-spring/three";
import { useSection } from "sections/section";
import { useRef } from "react";
import { Material, Object3D } from "three";
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
  const { nodes, materials } = useGLTF("/arm_full.glb") as any;
  const { opacity } = useSpring({ opacity: visible ? 1 : 0 });
  const cartilage = {
    transparent: true,
    opacity,
    color: "red",
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
    materials.Bone.opacity = opacity.get();
  });
  const renderOrder = 0;
  const currRot = bone.current?.rotation.y ?? Math.PI / 4;
  materials.Bone.transparent = true;

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
        renderOrder={renderOrder}
        visible={atPrev ? visible : opacity.to((v) => v > 0)}
      >
        <mesh
          geometry={nodes.Humerus002.geometry}
          material={materials.Bone}
        ></mesh>
        <mesh geometry={nodes.Humerus002_1.geometry}>
          <a.meshPhysicalMaterial {...cartilage} />
        </mesh>
      </a.group>
      <mesh geometry={nodes.Radius002.geometry} material={materials.Bone} />
      <mesh geometry={nodes.Radius002_1.geometry}>
        {/* @ts-ignore: https://github.com/pmndrs/react-spring/issues/1515 */}
        <a.meshPhysicalMaterial {...cartilage} />
      </mesh>
      <mesh geometry={nodes.Ulna002.geometry} material={materials.Bone} />
      <mesh geometry={nodes.Ulna002_1.geometry}>
        <a.meshPhysicalMaterial {...cartilage} />
      </mesh>
    </a.group>
  );
}
