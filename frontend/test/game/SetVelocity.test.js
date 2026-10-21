import {test, describe, expect, vi, beforeEach} from 'vitest';
import SetVelocity from '../../src/GameLogic/blocks/SetVelocity.js';
import CreateSprite from '../../src/GameLogic/blocks/CreateSprite.js';
import createMockP from "./mockP.js";
import Program from '../../src/GameLogic/Progam.js';

const BLOCK = {
    id: 1,
    belong: "setup",
    type: "set_velocity",
    order: 1,
    values: {
      name: "block",
      val_x: 5,
      val_y: 10
    },
}

const PROGRAM_BLOCK = [{
    id: 1,
    belong: "setup",
    type: "set_velocity",
    order: 1,
    values: {
      name: "block",
      val_x: 5,
      val_y: 10
    },
}
]

let p, program, setVelocity;

beforeEach(()=>{
    p = createMockP();
    program = new Program(p,PROGRAM_BLOCK);
    setVelocity = new SetVelocity(BLOCK);
})

test("validate string number input", ()=>{
    let testInValidInput = {
        id: 1,
        belong: "setup",
        type: "set_velocity",
        order: 1,
        values: {
        name: "block",
        val_x: "10",
        val_y: 5
        },
    }

    setVelocity = new SetVelocity(testInValidInput);
    
    program.addContext('create_sprite', 'block');

    expect(setVelocity.val_x).toBe(10);
    expect(setVelocity.val_y).toBe(5);

    expect(setVelocity.validate(program)).toBe(true);
})

test("validate invalid input", ()=>{
    let testInValidInput = {
        id: 1,
        belong: "setup",
        type: "set_velocity",
        order: 1,
        values: {
        name: "block",
        val_x: "abc",
        val_y: ""
        },
    }

    setVelocity = new SetVelocity(testInValidInput);
    
    program.addContext('create_sprite', 'block');

    expect(setVelocity.validate(program)).toBe(false);
    expect(program.errors.has(setVelocity.id)).toBe(true);
})

test("set velocity before sprite is created", ()=>{
    expect(setVelocity.validate(program)).toBe(false);
    expect(program.errors.has(setVelocity.id)).toBe(true);
})

test("set created sprite the inputed x and y values", ()=>{
    const sprite = new program.p.Sprite(100, 100, 100, 100);
    program.createdSprites.set('block', sprite);
    setVelocity.execute(program);

    const actual_x = program.createdSprites.get('block').vel.x;
    const actual_y = program.createdSprites.get('block').vel.y;

    expect(actual_x).toBe(5);
    expect(actual_y).toBe(10)

})