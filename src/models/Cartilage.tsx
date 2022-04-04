import { useGLTF } from "@react-three/drei";
import { useSpring, a } from "@react-spring/three";
import { useSection } from "sections/section";
import { useEffect, useRef } from "react";
import { Material, Object3D } from "three";
import { useFrame } from "@react-three/fiber";
import lerp from "utils/lerp";

export default function Cartilage({ order }: { order: number }) {
  const { nodes, materials } = useGLTF("/arm_full.glb") as any;

  const {
    visible,
    visibleRef,
    nextTransitionAmt,
    nextTransitionAmtRef,
    atPrev,
  } = useSection(order);
  const { opacity } = useSpring({ opacity: visible ? 1 : 0 });
  const [props, api] = useSpring(() => ({
    y: window.innerHeight / 2,
  }));

  const cartilage = {
    transparent: true,
    opacity,
    color: "red",
  };
  const bone = useRef<Object3D>();

  useEffect(() => {
    const mouseMove = (e: MouseEvent) => {
      if (!visibleRef.current || nextTransitionAmtRef.current > 0.5) return;
      api({ y: e.clientY });
    };
    window.addEventListener("mousemove", mouseMove);
    return () => {
      window.removeEventListener("mousemove", mouseMove);
    };
  });
  if (!visible || nextTransitionAmt > 0.5) {
    api({ y: window.innerHeight * 0.7 });
  }

  const boneMat = (
    // @ts-ignore
    <a.meshPhysicalMaterial
      color={materials.Bone.color}
      transparent={true}
      opacity={opacity}
    ></a.meshPhysicalMaterial>
  );

  const renderOrder = 0;
  return (
    <a.group
      ref={bone}
      renderOrder={renderOrder}
      visible={opacity.to((v) => v > 0)}
      // @ts-ignore
      rotation={props.y.to(
        (v) =>
          lerp(
            [0, 0, (v / window.innerHeight - 0.7) * 2],
            [0, 0, 0],
            nextTransitionAmtRef.current < 0.5
              ? 0
              : (nextTransitionAmtRef.current - 0.5) * 2
          ) as [number, number, number]
      )}
    >
      <a.group
        renderOrder={renderOrder}
        visible={atPrev ? visible : opacity.to((v) => v > 0)}
      >
        <mesh geometry={nodes.Humerus002.geometry}>{boneMat}</mesh>
        <mesh geometry={nodes.Humerus002_1.geometry}>
          <a.meshPhysicalMaterial {...cartilage} />
        </mesh>
      </a.group>
      <mesh geometry={nodes.Radius002.geometry}>{boneMat}</mesh>
      <mesh geometry={nodes.Radius002_1.geometry}>
        {/* @ts-ignore: https://github.com/pmndrs/react-spring/issues/1515 */}
        <a.meshPhysicalMaterial {...cartilage} />
      </mesh>
      <mesh geometry={nodes.Ulna002.geometry}>{boneMat}</mesh>
      <mesh geometry={nodes.Ulna002_1.geometry}>
        <a.meshPhysicalMaterial {...cartilage} />
      </mesh>
    </a.group>
  );
}
