import Program from "./Progam";
import { useEffect, useRef } from "react";
import p5 from "p5";
import planck from "planck";

export default function p5playTest() {
  const containerRef = useRef(null);

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
      belong: "setup",
      type: "create_sprite",
      order: 2,
      values: {
        name: "block",
        x: 100,
        y: 200,
        width: 50,
        height: 160,
      },
    },
  ];

  const program = new Program(CODE_BLOCKS);

  useEffect(() => {
    let game = null;
    let cancelled = false;

    const startGame = async () => {
      // Make dependencies available globally
      window.p5 = p5;
      window.planck = planck;

      // Load p5play after p5 and planck
      await import("p5play");

      if (cancelled) return;

      const sketch = (p) => {
        program.reset();
        program.compileBlocks();

        p.setup = () => {
          program.setup();
        };

        p.draw = () => {
          // Intentionally left blank; add rendering logic here if needed.
        };
      };

      game = new p5(sketch, containerRef.current);
    };

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