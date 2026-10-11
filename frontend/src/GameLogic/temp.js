  const code_blocks = [
    //user submit code: 
    //code: codeContent
    //order: user's order of the code block
    //values: values of the code block
    //if global setting: width/height, gravity, etc.
    //if sprite: name, x, y, width, height, etc.
    //if declaration: name
    //if function: name, parameters, etc.

    //requirement: only declaration need requires: because need to declear all variables first to allow all setup/update can share same variable scope.

    {
      code: "new Canvas(865,750);",
      type: "canvas",
      order: 1,
      values: {
        width: 865,
        height: 750
      }
    },
    {
      code: "let block;",
      type: "declaration",
      order: 2,
      values: {
        name: "block"
      }
    },
    {
      id: "block-2",
      type: "create_sprite",
      order: 3,
      values: {
        name: "block",
        x: 100,
        y: 270,
        width: 50,
        height: 50
      }
    }
  ]

  const BLOCK_LIBRARY = {
    canvas: {
      code: ({ width, height }) =>
        `new p.Canvas(${width}, ${height});`
    },

    create_sprite: {
      code: ({ name, x, y, width, height }) =>
        `${name} = new p.Sprite(${x}, ${y}, ${width}, ${height});`
    },

    declaration: {
      code: ({name})=>
        `let ${name}`
    },

    set_sprite_velocity: {
      code: ({ sprite, x, y }) =>
        `${sprite}.velocity.x = ${x};
        ${sprite}.velocity.y = ${y};`
    }
  };

  function generateP5Code(blocks){
    //blocks is a list of block, each is a object storing key metadata about what the code is
    const p5Code = blocks
                  //sort code by user's arranged order: small-large
                  .sort((a, b)=> a.order - b.order)
                  .map((block)=>{
                    //pass the blocks values to the library and get the complete p5code
                    const blockType = BLOCK_LIBRARY[block.type];
                    const resultCode = blockType.code(block.values);
                    console.log(resultCode);
                  })
    
  }

generateP5Code(code_blocks)

  /*
const codeStr = `
let a = 9;
let b = 10;
return a + b;
`;
const addFunction = new Function(codeStr);

console.log(addFunction()); // Output: 15
*/