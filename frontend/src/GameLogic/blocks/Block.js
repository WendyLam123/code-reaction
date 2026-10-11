const CODE_BLOCKS = [

  {
    id: 1,
    belong: "global",
    type: "declaration",
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
  {
    id: 3,
    belong: "setup", 
    type: "setVelocity",
    values: {
      name: "block",
      vx: 3,
      vy: 0,
    },
  }
];

export default class Block{
  
    constructor(block) {
      this.id = block.id;
      this.type = block.type;
      this.belong = block.belong;
      this.order = block.order;
      this.values = block.values;
    }

    validate(program){
        throw new Error(
            `${this.constructor.name} must implement execute()`
        )
    }

    execute(program){
        throw new Error(
            `${this.constructor.name} must implement execute()`
        )
    }
}