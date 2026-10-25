import { useEffect, useRef } from "react";
import p5 from "p5";
import Matter from "matter-js";
import Program from "./Progam";

const GAME_WIDTH = 700;
const GAME_HEIGHT = 700;
const SPRITE_Y_OFFSET = -100;
const sceneY = (y) => y + SPRITE_Y_OFFSET;
const DEBUG_COLLIDERS = true;

function createBody(engine, x, y, width, height, options = {}) {
  const body = Matter.Bodies.rectangle(x, y, width, height, options);
  Matter.Composite.add(engine.world, body);
  return body;
}

function bodiesAreColliding(bodyA, bodyB) {
  return Matter.Query.collides(bodyA, [bodyB]).length > 0;
}

function setBodyVelocity(body, x, y) {
  Matter.Body.setVelocity(body, { x, y });
}

function drawColliders(p, engine) {
  if (!DEBUG_COLLIDERS || !engine) return;

  const bodies = Matter.Composite.allBodies(engine.world);
  p.push();
  p.noFill();
  p.strokeWeight(2);

  for (const body of bodies) {
    // Static colliders are green; dynamic bodies are magenta.
    if (body.isStatic) p.stroke(0, 180, 80);
    else p.stroke(220, 0, 180);

    p.beginShape();
    for (const vertex of body.vertices) {
      p.vertex(vertex.x, vertex.y);
    }
    p.endShape(p.CLOSE);
  }

  p.pop();
}

function getOpaqueImageBounds(image) {
  image.loadPixels();
  const { width, height, pixels } = image;
  let left = width;
  let top = height;
  let right = -1;
  let bottom = -1;

  for (let y = 0; y < height; y += 1) {
    for (let x = 0; x < width; x += 1) {
      const alpha = pixels[(y * width + x) * 4 + 3];
      if (alpha > 0) {
        left = Math.min(left, x);
        top = Math.min(top, y);
        right = Math.max(right, x);
        bottom = Math.max(bottom, y);
      }
    }
  }

  if (right < left || bottom < top) {
    return { x: 0, y: 0, width, height };
  }

  return { x: left, y: top, width: right - left + 1, height: bottom - top + 1 };
}

function drawSprite(p, body) {
  const render = body?.renderInfo;
  if (!render?.img) return;

  p.push();
  p.translate(body.position.x, body.position.y);
  p.rotate(body.angle);
  p.imageMode(p.CENTER);
  p.image(
    render.img,
    0,
    0,
    render.width * render.scale,
    render.height * render.scale,
    render.crop.x,
    render.crop.y,
    render.crop.width,
    render.crop.height,
  );
  p.pop();
}

export default function AlienRescue({ CODE_BLOCKS, setErrors, setWin, reset }) {
  const containerRef = useRef(null);

  useEffect(() => {
    let game = null;
    let cancelled = false;

    const sketch = (p) => {
      let engine;
      let program;
      let blockimg;
      let blockImageBounds;
      let stairsimg;
      let arrowimg;
      let crateimg;
      let doorwayimg;
      let doorClosedimg;
      let doorOpenimg;
      let alienimg;
      let doorImage;
      let alien;
      let crateCollider;
      let doorCollider;
      let doorwayCollider;
      let arrowCollider;
      let stairCollider;
      let doorOpened = false;
      let wasTouchingCrate = false;

      // Matter sprites are created through the factory passed to Program below.
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

        // Keep the Matter world in a stable 700x700 logical coordinate space.
        // CSS scales the canvas to fit the responsive container.
        const canvas = p.createCanvas(GAME_WIDTH, GAME_HEIGHT);
        canvas.elt.style.display = "block";
        canvas.elt.style.width = "100%";
        canvas.elt.style.height = "auto";
        canvas.elt.style.maxWidth = "100%";
        canvas.elt.style.aspectRatio = `${GAME_WIDTH} / ${GAME_HEIGHT}`;
        blockImageBounds = getOpaqueImageBounds(blockimg);
        engine = Matter.Engine.create();
        engine.gravity.y = 0.65;
        engine.gravity.scale = 0.001;
        const blocksWithSquarePlayer = CODE_BLOCKS.map((block) => {
          if (
            block.type === "create_sprite" &&
            block.values?.name === "block"
          ) {
            return {
              ...block,
              values: { ...block.values, width: 100, height: 100 },
            };
          }
          return block;
        });

        program = new Program(p, blocksWithSquarePlayer, engine);
        program.reset();

        // Static collision geometry corresponding to the old invisible sprites.
        stairCollider = createBody(engine, 100, sceneY(450), 20, 160, {
          isStatic: true,
          angle: (-45 * Math.PI) / 180,
        });
        arrowCollider = createBody(engine, 220, sceneY(550), 100, 20, {
          isStatic: true,
          angle: (30 * Math.PI) / 180,
        });
        crateCollider = createBody(engine, 320, sceneY(630), 90, 90, {
          isStatic: true,
        });
        doorCollider = createBody(engine, 550, sceneY(410), 100, 180, {
          isStatic: true,
        });
        doorwayCollider = createBody(engine, 450, sceneY(550), 120, 20, {
          isStatic: true,
          angle: (-25 * Math.PI) / 180,
        });
        doorImage = {
          x: 445,
          y: sceneY(310),
          width: 64,
          height: 80,
          img: doorClosedimg,
          scale: 1.2,
        };
        alien = {
          x: 620,
          y: sceneY(420),
          width: 64,
          height: 64,
          img: alienimg,
          scale: 1,
        };

        program.registerGameObject("crateCollider", crateCollider);
        program.registerGameObject("doorwayCollider", doorwayCollider);
        const isValid = program.compileBlocks();
        if (isValid) {
          program.setup();
        } else {
          setErrors?.(new Map(program.errors));
        }
      };

      p.draw = () => {
        p.background("#dbb691");
        if (!engine || !program) return;

        // Step physics first; update blocks can then inspect this frame's contacts.
        Matter.Engine.update(engine, Math.min(p.deltaTime || 16.67, 33.3));
        if (program.isRunning) {
          program.update();
          program.draw();
        }

        // Draw scene artwork with p5; Matter bodies remain invisible.
        p.imageMode(p.CENTER);
        p.image(stairsimg, 100, sceneY(300));
        p.image(
          arrowimg,
          220,
          sceneY(330),
          arrowimg.width * 1.2,
          arrowimg.height * 1.2,
        );
        // Layer order: doorway, crate in front of it, then the door panel.
        p.image(doorwayimg, 400, sceneY(480));
        p.image(crateimg, 320, sceneY(470));
        p.image(
          doorImage.img,
          doorImage.x,
          doorImage.y,
          doorImage.img.width * doorImage.scale,
          doorImage.img.height * doorImage.scale,
        );
        p.image(
          alien.img,
          alien.x,
          alien.y,
          alien.width * alien.scale,
          alien.height * alien.scale,
        );

        // Render every sprite created by the user's create_sprite blocks.
        for (const sprite of program.createdSprites.values()) {
          if (!sprite.renderInfo) {
            const width = sprite.bounds.max.x - sprite.bounds.min.x;
            const height = sprite.bounds.max.y - sprite.bounds.min.y;
            sprite.renderInfo = {
              img: blockimg,
              crop: blockImageBounds,
              width,
              height,
              scale: 1,
            };
            const isPlayerBlock = sprite.name === "block";
            const visualScale = 1;
            const colliderScale = isPlayerBlock ? 0.75 : 1;
            sprite.renderInfo.scale = visualScale;
            if (colliderScale !== 1) {
              Matter.Body.scale(sprite, colliderScale, colliderScale);
            }

            // Keep the player block upright while it slides down the ramp.
            if (sprite.name === "block") {
              Matter.Body.setAngle(sprite, 0);
              Matter.Body.setAngularVelocity(sprite, 0);
              Matter.Body.setInertia(sprite, Infinity);
            }
            sprite._matterConfigured = true;
          }
          drawSprite(p, sprite);
        }

        const block = program.createdSprites.get("block");
        if (block) {
          const touchingCrate = bodiesAreColliding(block, crateCollider);
          const bouncedFromCrate = touchingCrate && !wasTouchingCrate;
          if (bouncedFromCrate) {
            // Give the player a right-and-up impulse to reach the doorway.
            setBodyVelocity(block, 4, -5);
          }
          wasTouchingCrate = touchingCrate;

          // Stair and arrow contacts apply the same slide velocity.
          if (
            !bouncedFromCrate &&
            (bodiesAreColliding(block, stairCollider) ||
              bodiesAreColliding(block, arrowCollider) ||
              bodiesAreColliding(block, doorwayCollider))
          ) {
            setBodyVelocity(block, 3, 1);
          }

          if (!doorOpened && bodiesAreColliding(block, doorCollider)) {
            doorOpened = true;
            doorImage.img = doorOpenimg;
            setBodyVelocity(block, -10, -10);
            alien.x = GAME_WIDTH / 2;
            alien.y = sceneY(GAME_HEIGHT - GAME_HEIGHT / 3);
            setWin?.(true);
          }
        }

        // Draw collision outlines last so they remain visible over the artwork,
        // even if validation failed or no player block has been created yet.
        drawColliders(p, engine);
      };
    };

    if (!cancelled && containerRef.current) {
      game = new p5(sketch, containerRef.current);
    }

    return () => {
      cancelled = true;
      if (game) {
        game.remove();
        game = null;
      }
    };
  }, [CODE_BLOCKS, setErrors, setWin, reset]);

  return <div ref={containerRef} className="gameContainer" />;
}
