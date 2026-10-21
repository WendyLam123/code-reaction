import { useEffect, useRef } from "react";
import p5 from "p5";
import planck from "planck";
import Program from "./Progam";

export default function AlienRescue({ CODE_BLOCKS, setErrors ,setWin, reset}) {
  const containerRef = useRef(null);

  useEffect(() => {
    let game = null;
    let cancelled = false;

    async function startGame() {
      try {
        window.p5 = p5;
        window.planck = planck;

        await import("p5play");

        if (cancelled || !containerRef.current) return;

        const sketch = (p) => {
          const program = new Program(p, CODE_BLOCKS);

          let blockimg;
          let stairsimg;
          let arrowimg;
          let crateimg;
          let doorwayimg;
          let doorClosedimg;
          let doorOpenimg;
          let alienimg;

          let stairs;
          let arrow;
          let crate;
          let doorway;
          let doorClosed;
          let alien;

          let crateCollider;
          let doorCollider;
          let arrowCollider;
          let stairCollider;

          let doorOpened = false;

          p.preload = () => {
            blockimg = p.loadImage("/assets/objects/block_E.png");
            stairsimg = p.loadImage("/assets/objects/stairs_E.png");
            arrowimg = p.loadImage("/assets/objects/arrow_W.png");
            crateimg = p.loadImage("/assets/objects/crate_E.png");

            doorwayimg = p.loadImage("/assets/objects/doorwayMiddle_W.png");
            doorClosedimg = p.loadImage("/assets/objects/doorClosed_S.png");
            doorOpenimg = p.loadImage("/assets/objects/doorOpen_S.png");
            alienimg = p.loadImage("/assets/characters/shipYellow_manned.png");
          };

          p.setup = () => {
            const container = containerRef.current;
            if (!container) return;

            p.createCanvas(container.clientWidth, container.clientHeight);

            program.reset();

            p.world.gravity.y = 5;
            p.allSprites.debug = false;

            // Stair
            stairs = new p.Sprite(100, 300);
            stairs.img = stairsimg;
            stairs.image.scale = 1;
            stairs.collider = "none";
            stairs.layer = 1;

            stairCollider = new p.Sprite(100, 450, 20, 160);
            stairCollider.rotation = -45;
            stairCollider.collider = "static";
            stairCollider.visible = false;

            // Arrow
            arrow = new p.Sprite(220, 120);
            arrow.collider = "none";
            arrow.img = arrowimg;
            arrow.image.scale = 1.2;
            arrow.offset.y = 210;
            arrow.layer = 1;

            arrowCollider = new p.Sprite(220, 550, 100, 20);
            arrowCollider.rotation = 30;
            arrowCollider.collider = "static";
            arrowCollider.visible = false;

            // Crate
            crate = new p.Sprite(320, 300);
            crate.offset.y = 170;
            crate.img = crateimg;
            crate.collider = "none";
            crate.image.scale = 1;
            crate.layer = 2;

            crateCollider = new p.Sprite(320, 630, 90, 90);
            crateCollider.collider = "static";
            crateCollider.visible = false;

            // Doorway
            doorway = new p.Sprite(400, 400);
            doorway.offset.y = 80;
            doorway.img = doorwayimg;
            doorway.collider = "none";
            doorway.image.scale = 1;
            doorway.layer = 1;

            // Closed door
            doorClosed = new p.Sprite(445, 310);
            doorClosed.img = doorClosedimg;
            doorClosed.collider = "none";
            doorClosed.image.scale = 1.2;
            doorClosed.layer = 1;

            doorCollider = new p.Sprite(550, 410, 100, 180);
            doorCollider.collider = "static";
            doorCollider.visible = false;

            // Alien
            alien = new p.Sprite(620, 420);
            alien.img = alienimg;
            alien.collider = "none";
            alien.image.scale = 1;
            alien.layer = 0;

            // Compile only after the canvas and scene are ready
            program.registerGameObject('crateCollider', crateCollider);

            console.log(program.gameObjects)
            const isValid = program.compileBlocks();

            if (isValid) {
              program.setup();
            } else {
              setErrors?.(new Map(program.errors));
            }
          };

          p.draw = () => {
            p.background('#dbb691ff');

            if (!program.isRunning) return;

            // Run user-created update and draw blocks
            program.update();
            program.draw();

            // Get the Sprite created by the user's code.
            // This assumes CreateSprite stores it by variable name.
            const block = program.createdSprites.get("block");

            if (block) {
              block.img = blockimg;
              block.image.scale = 0.4;
              block.rotationSpeed = 0;
              block.friction = 0.5;
              block.collider = "dynamic";
            }

            if (!block) return;

            block.rotationSpeed = 0;

            /*
            if (block.colliding(crateCollider)) {
              block.vel.x = 3;
              block.vel.y = -3;
              block.rotation = 0;
            }
            */

            if (block.colliding(arrowCollider)) {
              block.vel.x = 3;
              block.vel.y = 1;
            }

            if (!doorOpened && block.colliding(doorCollider)) {
              doorOpened = true;

              // Use the same image property as the closed door.
              doorClosed.img = doorOpenimg;
              doorClosed.image.scale = 1.2;

              block.vel.x = -10;
              block.vel.y = -10;

              alien.x = p.width / 2;
              alien.y = p.height - p.height / 3;
              alien.layer = 2;

              setWin(true);

            }
          };

        };

        if (!cancelled && containerRef.current) {
          game = new p5(sketch, containerRef.current);
        }
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
  }, [CODE_BLOCKS, setErrors, reset]);

  return <div ref={containerRef} className="gameContainer" />;
}
