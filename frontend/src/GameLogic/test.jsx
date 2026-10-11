import { useEffect, useRef } from "react";
import p5 from "p5";
import planck from "planck";

function P5Game({ submittedCode }) {
  const containerRef = useRef(null);

  const code_blocks = [

    {
      id: 1,
      type: "declaration",
      order: 1,
      values: {
        name: "block",
      },
    },

    {
      id: 2,
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
    {
      id: 3,
      type: "setVelocity",
      values: {
        target: "ball",
        vx: 3,
        vy: 0,
      },
    }
  ];

  const BLOCK_LIBRARY = {
    canvas: {
      phase: "setup",

      code: ({ width, height }) =>
        `new p.Canvas(${width}, ${height});`,
    },

    declaration: {
      phase: "declaration",

      code: ({ name }) =>
        `let ${name};`,
    },

    create_sprite: {
      phase: "setup",

      code: ({ name, x, y, width, height }) =>
        `${name} = new p.Sprite(${x}, ${y}, ${width}, ${height});
         ${name}.collider = 'dynamic';
         ${name}.img = assets.${name}img;
         ${name}.img.scale = 0.4;
         ${name}.friction = 0.2;
         ${name}.rotationSpeed = 0;
         ${name}.offset.y = 29;
         ${name}.layer = 3;
         ${name}.rotationLock = true;
      `,
    },

    set_sprite_velocity: {
      phase: "update",

      code: ({ sprite, x, y }) =>
        `${sprite}.velocity.x = ${x};
        ${sprite}.velocity.y = ${y};`,
    },

    background: {
      phase: "draw",

      code: ({ color }) =>
        `p.background('${color}');`,
    },

    function_update: {
      phase: "control",
      code: () => "",
    },

    function_draw: {
      phase: "control",
      code: () => "",
    },

    closeBracket: {
      phase: "control",
      code: () => "",
    },
  };

  function generateP5Code(blocks) {

    const declaration = [];
    const setup = [];
    const update = [];
    const draw = [];

    let currentFunction = null;

    //blocks is a list of block, each is a object storing key metadata about what the code is
    const p5Code = blocks
      //sort code by user's arranged order: small-large
      .sort((a, b) => a.order - b.order)
      .map((block) => {
        //pass the blocks values to the library and get the complete p5code
        const blockType = BLOCK_LIBRARY[block.type];

        if (!blockType) {
          throw new Error(`Unknown block type: ${block.type}`);
        }

        // let the system know what kind of code it's going to process
        if (block.type === "function_update") {
          currentFunction = "update";
          return;
        }

        if (block.type === "function_draw") {
          currentFunction = "draw";
          return;
        }

        if (block.type === "closeBracket") {
          currentFunction = null;
          return;
        }

        const processedCode = blockType.code(block.values);

        // Declaration always goes to declaration section
        if (blockType.phase === "declaration") {
          declaration.push(processedCode);
          return;
        }

        // If inside update()
        if (currentFunction === "update") {
          update.push(processedCode);
          return;
        }

        // If inside draw()
        if (currentFunction === "draw") {
          draw.push(processedCode);
          return;
        }

        // Otherwise, setup
        if (blockType.phase === "setup") {
          setup.push(processedCode);
          return;
        }

        throw new Error(
          `Block "${block.type}" cannot be placed here.`
        );
      })

    const groupedCode = `
    ${declaration.join("\n")}

    function setup(){
      ${setup.join("\n")}
    }
    
    function update(){
      ${update.join("\n")}
    }

    function draw(){
      ${draw.join("\n")}
    }

    return {
      setup, update, draw
    }
    `
    return groupedCode;
  }

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
        const container = containerRef.current;

        let blockimg,
          stairsimg,
          arrowimg,
          crateimg,
          doorwayimg,
          doorClosedimg,
          alienimg;

        let userRunTime = null;

        p.preload = () => {
          blockimg = p.loadImage("/assets/objects/block_E.png");
          stairsimg = p.loadImage("/assets/objects/stairs_E.png");
          arrowimg = p.loadImage("/assets/objects/arrow_W.png");
          crateimg = p.loadImage("/assets/objects/crate_E.png");

          doorwayimg = p.loadImage("/assets/objects/doorwayMiddle_W.png");
          doorClosedimg = p.loadImage("/assets/objects/doorClosed_S.png");
          alienimg = p.loadImage("/assets/characters/shipYellow_manned.png");
        };

        let stairs, arrow, crate, doorway, doorClosed, alien;

        p.setup = () => {
          p.world.gravity.y = 5;
          p.allSprites.debug = true;


          const fullCode = generateP5Code(code_blocks);
          //pass the p5 instance to the function
          const runCode = new Function("p", "assets", fullCode);
          userRunTime = runCode(p, {
            blockimg,
            stairsimg,
            arrowimg,
            crateimg,
            doorwayimg,
            doorClosedimg,
            alienimg
          });
          //p.createCanvas(container.offsetWidth, container.offsetHeight);
          userRunTime.setup();
          //console.log(userRunTime.setup.toString());


          stairs = new p.Sprite(100, 300);
          stairs.img = stairsimg;
          stairs.image.scale = 1;
          stairs.collider = 'none';
          stairs.layer = 1;

          let stairCollider = new p.Sprite(100, 450, 20, 160);
          stairCollider.rotation = -45;
          stairCollider.collider = 'static';
          stairCollider.visible = false;


          arrow = new p.Sprite(220, 120);
          arrow.collider = 'none';
          arrow.img = arrowimg;
          arrow.image.scale = 1.2;
          arrow.offset.y = 210;
          arrow.layer = 1;

          let arrowCollider = new p.Sprite(220, 550, 100, 20);
          arrowCollider.rotation = 30;
          arrowCollider.collider = 'static';
          arrowCollider.visible = false;


          crate = new p.Sprite(320, 300);
          crate.offset.y = 170;
          crate.img = crateimg;
          crate.collider = 'none';
          crate.image.scale = 1;
          crate.layer = 2;

          let crateCollider = new p.Sprite(320, 630, 90, 90);
          crateCollider.collider = 'static';
          crateCollider.visible = false;


          doorway = new p.Sprite(400, 400);
          doorway.offset.y = 80;
          doorway.img = doorwayimg;
          doorway.collider = 'none';
          doorway.image.scale = 1;
          doorway.layer = 1;


          doorClosed = new p.Sprite(445, 310);
          doorClosed.img = doorClosedimg;
          doorClosed.collider = 'none';
          doorClosed.image.scale = 1.2;
          doorClosed.layer = 1;

          let doorClosedCollider = new p.Sprite(550, 410, 100, 180);
          doorClosedCollider.collider = 'static';
          doorClosedCollider.visible = false;

          alien = new p.Sprite(620, 420);
          alien.img = alienimg;
          alien.collider = 'none';
          alien.image.scale = 1;
          alien.layer = 0;

        };

        p.update = () => {
          p.debug = true;

          if (userRunTime){
            userRunTime.update();
          }

        };

        p.draw = () => {
          p.background('#dbb691ff');
          if (userRunTime){
            userRunTime.draw();
          }
        };
      };

      game = new p5(sketch, containerRef.current);
    };

    startGame();

    //cleanup
    return () => {
      cancelled = true;

      //reset game
      if (game) {
        game.remove();
        game = null;
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        width: "100%",
        height: "100%",
      }}
    ></div>
  );
}

export default P5Game;
