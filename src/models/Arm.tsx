import React, { useRef } from "react";
import { Box, useGLTF } from "@react-three/drei";
import Model from "models/Model";
import { humerousOffset } from "models/Humerous";
import { BodyType, ShapeType, useRigidBody } from "@glavin001/use-ammojs";

export default function Arm({ ...props }) {
  const { nodes, materials } = useGLTF("/arm.glb");
  const [boxRef] = useRigidBody(() => ({
    bodyType: BodyType.STATIC,
    shapeType: ShapeType.BOX,
    // position: [0, -5, 0],
    // halfExtents: [10, 0.5, 10],
  }));
  return (
    <>
      <Model
        path={"/humerous2.glb"}
        prefix={"Humerus_Humerus001_hull_"}
        nSegments={81}
        offsets={humerousOffset}
      />

      {/* <Model
        path={"/radius.glb"}
        prefix={"Radius_Radius001_hull_"}
        nSegments={42}
      />
<Model
        path={"/ulna.glb"}
        prefix={"Ulna_Ulna001_hull_"}
        nSegments={71}
      />
      */}
      <group position={[0, 1, 0]}>
        <mesh
          geometry={nodes.Humerus_Humerus001.geometry}
          rotation={[Math.PI / 2, 0, 0]}
        >
          <meshPhysicalMaterial />
        </mesh>
        <mesh
          geometry={nodes.Radius_Radius001.geometry}
          rotation={[Math.PI / 2, 0, 0]}
        >
          <meshPhysicalMaterial />
        </mesh>
        <mesh
          geometry={nodes.Ulna_Ulna001.geometry}
          rotation={[Math.PI / 2, 0, 0]}
        >
          <meshPhysicalMaterial />
        </mesh>
      </group>
      <Box args={[20, 5, 20]} receiveShadow position={[0, -5, 0]} ref={boxRef}>
        <meshPhysicalMaterial attach="material" color="grey" />
      </Box>
    </>
  );
}

useGLTF.preload("/arm.glb");
