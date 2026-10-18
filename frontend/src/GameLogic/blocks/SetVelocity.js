import Block from "./Block";

const BLOCK = {
    id: 1,
    belong: "setup",
    type: "set_velocity",
    order: 1,
    values: {
      name: "block",
      val_x: 5,
      val_y: 5
    },
}

export default class SetVelocity extends Block{
    constructor(block){
        super(block);
        this.name = this.values.name;
        this.val_x = Number(this.values.val_x);
        this.val_y = Number(this.values.val_y);
    }
    
    validate(program){

        if (!Number.isFinite(this.val_x) || !Number.isFinite(this.val_y)){
            const inValidValue = !Number.isFinite(this.val_x) ? "x velocity": "y velocity";
            program.addError(this.id, `${inValidValue} is invalid! Input needs to be a finite number!`);
            return false;
        }

        if (!program.checkContext('create_sprite', this.name)){
            program.addError(this.id, `Sprite "${this.name}" has not been created.`);
            return false;
        }

        return true;
    }

    execute(program){
        const target = program.createdSprites.get(this.name);
        target.vel.x = this.val_x;
        target.vel.y = this.val_y;
    }

}