import Matter from "matter-js";
import Block from "./Block";

export default class SetVelocity extends Block {
  constructor(block) {
    super(block);
    this.name = this.values.name;
    this.val_x = Number(this.values.val_x);
    this.val_y = Number(this.values.val_y);
  }

  validate(program) {
    //Check inputed velocity values, need to be finite number
    if (!Number.isFinite(this.val_x) || !Number.isFinite(this.val_y)) {
      const invalidValue = !Number.isFinite(this.val_x)
        ? "x velocity"
        : "y velocity";

      program.addError(
        this.id,
        `${invalidValue} is invalid! Input needs to be a finite number!`,
      );
      return false;
    }

    //Check if sprite existed in the context
    if (!program.checkContext("create_sprite", this.name)) {
      program.addError(
        this.id,
        `Sprite "${this.name}" has not been created.`,
      );
      return false;
    }

    return true;
  }

  //Execute the program and update velocity
  execute(program) {
    const body = program.createdSprites.get(this.name);

    if (!body) return;

    Matter.Body.setVelocity(body, {
      x: this.val_x,
      y: this.val_y,
    });
  }
}