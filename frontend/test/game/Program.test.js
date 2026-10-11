import {test, describe, expect, beforeEach} from 'vitest'

import Program from '../../src/GameLogic/Progam.js';
import createMockP from "./mockP.js";
import CreateSprite from '../../src/GameLogic/blocks/CreateSprite.js';


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

let program;

beforeEach(()=>{
  const p = createMockP();
  program = new Program(p,CODE_BLOCKS);
})

describe('add context', ()=>{
  test('add declared variable', ()=>{
    program.addContext('declare_variable', "ball");
    expect(program.declaredVariables.has("ball"));
  })

  test('add sprite', ()=>{
    const block = new CreateSprite(BLOCK);
    program.addContext('create_sprite', "block", block);
    expect(program.declaredVariables.has("ball", block));
  })
})

test('add error message to error map', ()=>{
  program.addError("1", "Test Message");
  expect(program.errors.has("1"));
})

describe('check context', ()=>{
  test('check undeclared variable', ()=>{
    const actual = program.checkContext('declare_variable', 'block');
    expect(actual).toBe(false);
  })

  test('check declared variable', ()=>{
    program.addContext('declare_variable', "block");

    const actual = program.checkContext('declare_variable', 'block');
    expect(actual).toBe(true);
  })

  test('check created sprite', ()=>{
    const block = new CreateSprite(BLOCK);
    program.addContext('create_sprite', "block", block);

    const actual = program.checkContext('create_sprite', 'block');
    expect(actual).toBe(true);
  })

  test('unknown context', ()=>{
    expect(()=>program.checkContext('unknown').toThrow())
  })
})

test('create createSprite instance', ()=>{
  const actual = program.createBlock(BLOCK);
  expect(actual).toBeInstanceOf(CreateSprite)
})


test('compiles a CreateSprite instance into setup', () => {
  program.blocks = [BLOCK];
  program.addContext('declare_variable', 'block');

  program.compileBlocks();

  expect(program.executableBlock.setup).toHaveLength(1);
  expect(program.executableBlock.setup[0]).toBeInstanceOf(CreateSprite);
})

test('runs setup and creates a sprite', () => {
  program.blocks = [BLOCK];
  program.addContext('declare_variable', 'block');

  program.compileBlocks();
  program.setup();

  expect(program.createdSprites.has('block')).toBe(true);
});