import { useGLTF } from "@react-three/drei";
import { useSpring, a } from "@react-spring/three";
import { useSection } from "sections/section";
import { useEffect, useRef } from "react";
import { DoubleSide, Object3D } from "three";
import lerp from "utils/lerp";

export default function Cartilage({ order }: { order: number }) {
  const { nodes, materials } = useGLTF("/arm_full.glb") as any;

  const {
    visible,
    visibleRef,
    nextTransitionAmt,
    nextTransitionAmtRef,
    atPrev,
  } = useSection(order, 2);
  const { opacity } = useSpring({ opacity: visible ? 1 : 0 });
  const [props, api] = useSpring(() => ({
    y: window.innerHeight / 2,
  }));
  const { cartColor } = useSpring({
    cartColor: nextTransitionAmt < 0.5 ? "#ff0000" : "#ffffff",
  });

  const cartilage = {
    transparent: true,
    opacity,
    depthWrite: visible,
    color: cartColor,
  };
  const bone = useRef<Object3D>();

  useEffect(() => {
    const mouseMove = (e: MouseEvent) => {
      if (!visibleRef.current || nextTransitionAmtRef.current > 0.8) return;

      if (nextTransitionAmtRef.current < 0.5) api({ y: e.clientY });
      else api({ y: e.clientY + window.innerHeight * 0.5 });
    };
    window.addEventListener("mousemove", mouseMove);
    return () => {
      window.removeEventListener("mousemove", mouseMove);
    };
  });

  if (!visible || nextTransitionAmt > 0.8) {
    api({ y: window.innerHeight * 0.7 });
  }
  if (nextTransitionAmt > 0.5) {
    api({ y: window.innerHeight * 1 });
  }

  const boneMat = (
    // @ts-ignore
    <a.meshPhysicalMaterial
      color={materials.Bone.color}
      transparent={true}
      depthWrite={visible}
      opacity={opacity}
    ></a.meshPhysicalMaterial>
  );

  const { opacity: ligamentOpacity } = useSpring({
    opacity: visible && nextTransitionAmt > 0.5 ? 1 : 0,
  });
  const ligamentMat = (
    <a.meshPhysicalMaterial
      transparent={true}
      opacity={ligamentOpacity}
      depthWrite={visible}
      side={DoubleSide}
      color={"#ff0000"}
    />
  );

  const renderOrder = 0;
  const [{ opacity: cartImageOpacity }, cartApi] = useSpring(() => {
    opacity: 0;
  });

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
      onPointerEnter={() => {
        if (nextTransitionAmtRef.current < 0.5 && visibleRef.current) {
          cartApi({ opacity: 1 });
        }
      }}
      onPointerLeave={() => {
        cartApi({ opacity: 0 });
      }}
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
      <mesh geometry={nodes.Radial_collateral_ligament.geometry}>
        {ligamentMat}
      </mesh>
      <mesh geometry={nodes.Ulnar_collateral_ligament.geometry}>
        {ligamentMat}
      </mesh>
    </a.group>
  );
}
