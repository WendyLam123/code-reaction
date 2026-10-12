import {test, describe, expect, vi, beforeEach} from 'vitest';
import CreateSprite from '../../src/GameLogic/blocks/CreateSprite.js';
import createMockP from "./mockP.js";
import Program from '../../src/GameLogic/Progam.js';

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

const PROGRAM_BLOCK = [{
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
}]

let p, program, sprite;

beforeEach(()=>{
    p = createMockP();
    program = new Program(p,PROGRAM_BLOCK);
    sprite = new CreateSprite(BLOCK);
})


test('Create a Sprite instance successfully', () =>{
    program.validationContext.declaredVariables.add(BLOCK.values.name);

    sprite.validate(program);
    sprite.execute(program);
    expect(program.p.Sprite).toHaveBeenCalledTimes(1);
    expect(program.createdSprites.has(BLOCK.values.name)).toBe(true);
    expect(program.errors).toHaveLength(0);

})

test('Sprite not declared before create', () =>{
    sprite.validate(program);
    sprite.execute(program);
    expect(program.errors.has(BLOCK.id)).toBe(true);
})

test('Sprite created before', () =>{
    program.createdSprites.set(BLOCK.values.name, true);
    sprite.validate(program);
    sprite.execute(program);
    expect(program.errors.has(BLOCK.id)).toBe(true);
})