import { useEffect, useRef } from "react";
import p5 from "p5";
import planck from "planck";
import Program from "./Progam";

export default function P5playTest() {
  const containerRef = useRef(null);

  useEffect(() => {
    let game = null;
    let cancelled = false;

    const CODE_BLOCKS = [
      {
        id: 1,
        type: "declaration",
        belong: "global",
        order: 1,
        values: {
          name: "block",
        },
      },
      {
        id: 2,
        type: "create_sprite",
        belong: "setup",
        order: 2,
        values: {
          name: "block",
          x: 100,
          y: 200,
          width: 100,
          height: 100,
        },
      },
    ];

    async function startGame() {
      try {
        // Make dependencies available to p5play.
        window.p5 = p5;
        window.planck = planck;

        // Load p5play before creating the sketch.
        await import("p5play");

        // The component may have unmounted while importing.
        if (cancelled || !containerRef.current) return;

        const sketch = (p) => {
          const program = new Program(p, CODE_BLOCKS);

          p.setup = () => {
            p.createCanvas(600, 400);
            p.background(240);

            program.reset();

            const isValid = program.compileBlocks();

            if (isValid) {
              program.setup();
            } else {
              console.error(
                "Program validation failed:",
                program.errors
              );
            }
          };

          p.draw = () => {
            p.background(240);
          };
        };

        game = new p5(sketch, containerRef.current);
      } catch (error) {
        console.error("Failed to initialize p5play:", error);
      }
    }

    startGame();

    return () => {
      cancelled = true;

      if (game) {
        game.remove();
        game = null;
      }
    };
  }, []);

  return <div ref={containerRef} />;
}