import Matter from "matter-js";
import Block from "./Block.js";

export default class CreateSprite extends Block {
  constructor(block) {
    super(block);
    this.name = this.values.name;
    this.x = Number(this.values.x);
    this.y = Number(this.values.y);
    this.width = Number(this.values.width);
    this.height = Number(this.values.height);
  }

  validate(program) {
    if (!program.checkContext("declare_variable", this.name)) {
      program.addError(
        this.id,
        `Variable "${this.name}" has not been declared.`,
      );
      return false;
    }

    if (program.checkContext("create_sprite", this.name)) {
      program.addError(
        this.id,
        "You’ve already created this sprite. Are you sure you want to overlap it?",
      );
      return false;
    }

    if (![this.x, this.y, this.width, this.height].every(Number.isFinite)) {
      program.addError(
        this.id,
        "Sprite position and size must be valid numbers.",
      );
      return false;
    }

    if (this.width <= 0 || this.height <= 0) {
      program.addError(
        this.id,
        "Sprite width and height must be greater than zero.",
      );
      return false;
    }

    program.addContext("create_sprite", this.name);
    return true;
  }

  execute(program) {
    if (!program.engine) {
      throw new Error("Program needs a Matter.js engine to create bodies.");
    }

    const body = Matter.Bodies.rectangle(
      this.x,
      this.y,
      this.width,
      this.height,
      {
        isStatic: false,
        restitution: 0,
      },
    );

    body.name = this.name;
    Matter.Composite.add(program.engine.world, body);
    program.createdSprites.set(this.name, body);

    return body;
  }
}