import type { NextPage } from "next";
import React, { useEffect, useRef } from "react";
import {
  Engine,
  Render,
  World,
  Bodies,
  Constraint,
  Composites,
  Composite,
  Mouse,
  MouseConstraint,
  Events,
  Body,
  Vector,
  Common,
  Vertices,
} from "matter-js";
const small = 0.000001;
const big = 0.0015;

const Home: NextPage = () => {
  const scene = useRef<HTMLDivElement | null>(null);
  const engine = useRef<null | Engine>(null);
  const bicepRef = useRef<Constraint>();
  const compositesRef = useRef<Composite>();

  useEffect(() => {
    Common.setDecomp(require("poly-decomp"));
    engine.current = Engine.create(undefined);
    if (scene.current && engine.current) {
      const render = Render.create({
        element: scene.current,
        engine: engine.current,
        options: {
          width: 1000,
          height: 1000,
          // showStats: true,
          // showPerformance: true,
          // showAngleIndicator: true,
        },
      });

      const scale = 2;
      const borderRadius = scale * 5;
      const humorous = Bodies.rectangle(160, 160, 100 * scale, 10 * scale, {
        isStatic: true,
        chamfer: {
          radius: [borderRadius, borderRadius, borderRadius, borderRadius],
        },
      });
      // const radius = Bodies.rectangle(160, 160, 100 * scale, 10 * scale, {
      //   isStatic: false,
      //   chamfer: {
      //     radius: [borderRadius, borderRadius, borderRadius, borderRadius],
      //   },
      // });
      const temp = Body.create({});
      const verts = Vertices.chamfer(
        Vertices.fromPath(
          "10 0 200 0 200 20 20 20 20 40 -50 40 -50 30 0 30",
          temp
        ),
        5,
        3,
        3,
        3
      );

      // const radius = Bodies.fromVertices(
      //   160,
      //   160,
      //   [
      //     [
      //       Vector.create(0, 0),
      //       Vector.create(200, 0),
      //       Vector.create(200, 20),
      //       Vector.create(20, 20),
      //       Vector.create(20, 40),
      //       Vector.create(-50, 40),
      //       Vector.create(-50, 30),
      //       Vector.create(0, 30),
      //     ],
      //   ],
      //   { density: 0.002 }
      // );
      const radius = Bodies.fromVertices(160, 160, [verts], {});
      const joint = Constraint.create({
        pointA: { x: 265, y: 160 },
        pointB: { x: -85, y: 0 },
        bodyB: radius,
        length: 0,
      });
      const bicep = Constraint.create({
        pointA: { x: -100, y: -10 },
        bodyA: humorous,
        pointB: { x: -65, y: -15 },
        bodyB: radius,
        stiffness: small,
        render: {
          strokeStyle: "#ff0000",
          type: "line",
        },
      });
      bicepRef.current = bicep;
      const tricep = Constraint.create({
        pointA: { x: -100, y: 10 },
        bodyA: humorous,
        pointB: { x: -80, y: 15 },
        bodyB: radius,
        stiffness: small,
        render: {
          strokeStyle: "#0000ff",
          type: "line",
        },
      });
      const weight = Bodies.circle(450, 350, 25, {
        density: 0.1,
        isStatic: false,
      });
      const fakeHand = Constraint.create({
        bodyA: radius,
        pointA: { x: 90, y: 0 },
        bodyB: weight,
        length: 150,
      });
      World.add(engine.current.world, [
        humorous,
        radius,
        bicep,
        tricep,
        weight,
        fakeHand,
        joint,
      ]);

      const group = Body.nextGroup(true);
      const bridge = Composites.stack(
        350,
        700,
        8,
        1,
        0,
        0,
        (x: number, y: number) =>
          Bodies.rectangle(x - 20, y, 53, 20, {
            collisionFilter: { group },
            chamfer: 5,
            density: 0.005,
            frictionAir: 0.05,
          })
      );
      compositesRef.current = Composites.chain(bridge, 0.3, 0, -0.3, 0, {
        stiffness: 0.05,
        length: 0,
        render: { visible: true },
      });
      const circle = Bodies.circle(100, 800, 25, { density: 5 });
      Composite.add(engine.current.world, [
        bridge,
        Constraint.create({
          pointA: { x: 100, y: 500 },
          bodyB: bridge.bodies[0],
          pointB: { x: -25, y: 0 },
          length: 25,
          stiffness: 0.9,
        }),
        circle,
        Constraint.create({
          bodyA: bridge.bodies[bridge.bodies.length - 1],
          pointA: { x: 30, y: 0 },
          bodyB: circle,
          length: 30,
          stiffness: 0.9,
        }),
      ]);

      // run the engine
      Render.run(render);
      const delta = 1000 / 60;
      const subSteps = 10;
      const subDelta = delta / subSteps;
      (function run() {
        window.requestAnimationFrame(run);
        for (let i = 0; i < subSteps; i += 1) {
          Engine.update(engine.current, subDelta);
        }
        let normedLen =
          1 -
          Math.min(
            (Vector.magnitude(
              Vector.sub(
                Constraint.pointAWorld(bicep),
                Constraint.pointBWorld(bicep)
              )
            ) -
              191) /
              21,
            1
          );
        bicep.render.lineWidth = Math.floor(normedLen * 10 + 2);
      })();

      const mouse = Mouse.create(render.canvas);
      const mouseConstraint = MouseConstraint.create(engine.current, {
        mouse,
        constraint: { render: { visible: false } },
      });
      World.add(engine.current.world, mouseConstraint);

      // unmount
      return () => {
        // destroy Matter
        Render.stop(render);
        if (engine.current) {
          Events.off(engine.current);
          World.clear(engine.current.world, false);
          Engine.clear(engine.current);
        }
        render.canvas.remove();
        render.textures = {};
      };
    }
  }, []);

  const handleMouseDown = () => {
    if (bicepRef.current) {
      bicepRef.current.stiffness = big;
      if (compositesRef.current) {
        compositesRef.current.constraints.forEach((value) => {
          value.stiffness = 0.1;
        });
      }
    }
  };
  const handleMouseUp = () => {
    if (bicepRef.current) {
      bicepRef.current.stiffness = small;
      if (compositesRef.current) {
        compositesRef.current.constraints.forEach((value) => {
          value.stiffness = 0.05;
        });
      }
    }
  };

  return (
    <div
      ref={scene}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      style={{ width: "500px", height: "500px" }}
    ></div>
  );
};

export default Home;
