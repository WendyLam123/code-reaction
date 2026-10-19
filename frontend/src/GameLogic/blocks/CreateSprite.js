import Block from './Block.js'

const BLOCK = {
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
}

export default class CreateSprite extends Block{
    constructor(block){
        super(block);

        this.name = this.values.name;
        this.x = this.values.x;
        this.y = this.values.y;
        this.width = this.values.width;
        this.height = this.values.height;
    }

    validate(program){
        if (!program.checkContext('declare_variable', this.name)){
            program.addError(this.id, `Variable "${this.name}" has not been declared.`);
            //skip this block
            return false;
        }

        if (program.checkContext('create_sprite', this.name)){
            program.addError(this.id, `You’ve already created this sprite. Are you sure you want to overlap it?`);
            return false;
        }

        program.addContext('create_sprite', this.name);
        return true;
    }

    execute(program){
        const sprite = new program.p.Sprite(this.x, this.y, this.width, this.height);
        program.createdSprites.set(this.name, sprite);
        return sprite;
    }

}