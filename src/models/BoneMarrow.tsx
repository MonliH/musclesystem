import React, { useEffect, useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { useSpring, a } from "@react-spring/three";
import { useSection } from "sections/section";
import Marker from "./Mark";
import lerp from "utils/lerp";
import { Object3D } from "three";
import { useFrame } from "@react-three/fiber";

export default function BoneMarrow({ order }: { order: number }) {
  const group = useRef<Object3D>();
  const { nodes, materials } = useGLTF("/bone_marrow.glb") as any;
  const {
    visible,
    visibleRef,
    nextTransitionAmt,
    nextTransitionAmtRef,
    atPrevRef,
    nextTransitionUnboundedRef,
  } = useSection(order);
  const { opacity } = useSpring({ opacity: visible ? 1 : 0 });
  const [props, api] = useSpring(() => ({
    x: window.innerWidth / 2 - 0.1,
  }));

  useEffect(() => {
    const mouseMove = (e: MouseEvent) => {
      if (!visibleRef.current || nextTransitionAmtRef.current > 0.5) return;
      api({ x: e.clientX });
    };
    window.addEventListener("mousemove", mouseMove);
    return () => {
      window.removeEventListener("mousemove", mouseMove);
    };
  });
  if (!visible || nextTransitionAmt > 0.5) {
    api({ x: window.innerWidth / 2 });
  }
  const transitionCutoff =
    nextTransitionAmt < 0.5 ? 0 : (nextTransitionAmt - 0.5) * 2;
  const labelProps = {
    transition: "all 0.2s",
    transform: "translateZ(0.1px)",
    opacity: transitionCutoff == 0 ? 1 : 0,
  };
  useFrame(() => {
    if (
      atPrevRef.current &&
      group.current &&
      nextTransitionUnboundedRef.current < -0.5
    ) {
      group.current.rotateZ(0.005);
    }
  });
  return (
    <a.group
      ref={group}
      visible={opacity.to((v) => v > 0)}
      renderOrder={order}
      dispose={null}
      // @ts-ignore
      rotation={props.x.to(
        (v) =>
          lerp(
            [
              -Math.PI * 0.5,
              0,
              (v / window.innerWidth - 0.6) * 0.4 + Math.PI * 0.5,
            ],
            [0, 0, 0],
            nextTransitionAmtRef.current < 0.5
              ? 0
              : (nextTransitionAmtRef.current - 0.5) * 2
          ) as [number, number, number]
      )}
      position={[0, lerp(2, 0, transitionCutoff) as number, 0]}
      scale={lerp([1.5, 1.5, 1.5], [1, 1, 1], transitionCutoff)}
    >
      <Marker
        position={[0.9, 0, 0]}
        rotation={[Math.PI / 2 + 0.5, Math.PI, 0]}
        invisible={!visible}
      >
        <div style={labelProps}>
          <p style={{ fontSize: "50px" }}>Spongey Bone</p>
          <p style={{ fontSize: "20px" }}>Contains Red Bone Marrow</p>
          <div
            style={{
              width: "150px",
              height: "2px",
              backgroundColor: "black",
              position: "absolute",
              top: "80px",
              left: "330px",
              transform: "rotate(20deg)",
            }}
          ></div>
        </div>
      </Marker>
      <Marker
        position={[0.8, 0, -1.4]}
        rotation={[Math.PI / 2 + 0.5, Math.PI, 0]}
        invisible={!visible}
      >
        <div style={labelProps}>
          <p style={{ fontSize: "50px" }}>Yellow Marrow</p>
          <div
            style={{
              width: "150px",
              height: "2px",
              backgroundColor: "black",
              position: "absolute",
              top: "70px",
              left: "350px",
              transform: "rotate(20deg)",
            }}
          ></div>
        </div>
      </Marker>
      <Marker
        position={[-0.9, 0, -0.3]}
        rotation={[Math.PI / 2 + 0.5, Math.PI, 0]}
        invisible={!visible}
      >
        <div style={labelProps}>
          <p style={{ fontSize: "50px" }}>Compact Bone</p>
          <div
            style={{
              width: "150px",
              height: "2px",
              backgroundColor: "black",
              position: "absolute",
              top: "70px",
              left: "-160px",
              transform: "rotate(-20deg)",
            }}
          ></div>
        </div>
      </Marker>
      <group rotation={[Math.PI / 2, 0, 0]} renderOrder={order}>
        <mesh
          geometry={nodes.Humerus_1.geometry}
          material={nodes.Humerus_1.material}
        />
        <mesh geometry={nodes.Humerus_2.geometry}>
          <meshStandardMaterial />
        </mesh>
      </group>
      <mesh
        geometry={nodes.Humerus002.geometry}
        material={materials["Bone.002"]}
        rotation={[Math.PI / 2, 0, 0]}
      />
      {/* <mesh
        geometry={nodes.Cube.geometry}
        material={nodes.Cube.material}
        position={[-0.08, -0.01, -0.43]}
        scale={[0.56, 0.56, 0.01]}
      /> */}
      <mesh
        geometry={nodes.Cube001.geometry}
        material={nodes.Cube001.material}
        position={[-0.03, 0, -1.14]}
        scale={[1, 1, 0.01]}
      />
      <mesh
        geometry={nodes.Inside001.geometry}
        material={materials["Marrow.003"]}
        rotation={[Math.PI / 2, 0, 0]}
      />
    </a.group>
  );
}

useGLTF.preload("/bone_marrow.glb");
