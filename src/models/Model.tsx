import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { BufferGeometry, Euler, Quaternion } from "three";
import { Geometry } from "three-stdlib";
import { BodyType, ShapeType, useRigidBody } from "@glavin001/use-ammojs";

function e2q(x: number, y: number, z: number): Quaternion {
  let quat = new Quaternion();
  quat.setFromEuler(new Euler(x, y, z));
  return quat;
}
export default function Model({
  prefix,
  path,
  nSegments,
  offsets,
}: {
  prefix: string;
  path: string;
  nSegments: number;
  offsets: [number, number, number][];
}) {
  const { nodes, materials } = useGLTF(path);
  const geometries: BufferGeometry[] = [];
  for (let i = 1; i <= nSegments; i++) {
    const { geometry } = nodes[`${prefix}${i}`];
    geometries.push(geometry);
  }
  const [body] = useRigidBody(() => ({
    bodyType: BodyType.DYNAMIC,
    shapeType: ShapeType.COMPOUND,
    shapeConfig: {
      shapes: geometries.map((geom, idx) => {
        const geo = new Geometry().fromBufferGeometry(geom);
        return {
          type: ShapeType.HULL,
          points: geo.vertices.map((v) => [v.x, v.y, v.z]),
          rotation: [Math.PI / 2, 0, 0],
          offset: offsets[idx],
        };
      }),
    },
  }));
  return (
    <group ref={body} dispose={null}>
      {geometries.map((geom, i) => (
        <mesh
          geometry={geom}
          key={i}
          position={offsets[i]}
          rotation={[Math.PI / 2, 0, 0]}
        >
          <meshStandardMaterial />
        </mesh>
      ))}
    </group>
  );
}

useGLTF.preload("/humerous.glb");
useGLTF.preload("/ulna.glb");
useGLTF.preload("/radius.glb");
useGLTF.preload("/humerous2.glb");
