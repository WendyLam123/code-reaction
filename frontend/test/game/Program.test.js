import {test, describe, expect, beforeEach} from 'vitest'

import Program from '../../src/GameLogic/Progam.js';
import createMockP from "./mockP.js";
import CreateSprite from '../../src/GameLogic/blocks/CreateSprite.js';


const CODE_BLOCKS = [
  {
      id: 1,
      type: "declaration",
      belong: "global",
      order: 1,
      values: { 
        name: "block" 
      }
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

let p, program;

beforeEach(()=>{
  p = createMockP();
  program = new Program(p,CODE_BLOCKS);
})

describe('add context', ()=>{
  test('add declared variable', ()=>{
    program.addContext('declare_variable', "ball");
    expect(program.validationContext.declaredVariables).toContain("ball");
  })

  test('validate if sprite is added to schedule', ()=>{
    program.addContext('create_sprite', "block");
    expect(program.validationContext.scheduledSprites).toContain("block");
  })
})

test('add error message to error map', ()=>{
  program.addError("1", "Test Message");
  expect(program.errors.has("1")).toBe(true);
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
    expect(()=>program.checkContext('unknown')).toThrow();
  })
})

test('create createSprite instance', ()=>{
  const actual = program.createBlock(BLOCK);
  expect(actual).toBeInstanceOf(CreateSprite)
})


test('compiles a CreateSprite instance', () => {
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

test('reset program', ()=>{
  program.reset();
  expect(program.errors.size).toBe(0);

  expect(program.executableBlock.global).toHaveLength(0);
  expect(program.executableBlock.setup).toHaveLength(0);
  expect(program.executableBlock.update).toHaveLength(0);
  expect(program.executableBlock.draw).toHaveLength(0);

  expect(program.validationContext.declaredVariables.size).toBe(0);
  expect(program.validationContext.scheduledSprites.size).toBe(0);


})

describe('Program integration', ()=>{

  test('compiles declaration and sprite blocks', ()=>{
    const success = program.compileBlocks();
    expect(success).toBe(true);
    expect(program.errors.size).toBe(0);
    expect(program.executableBlock.global).toHaveLength(1);
    expect(program.executableBlock.setup).toHaveLength(1);
  })

  test('setup created a sprite', ()=>{
    expect(program.compileBlocks()).toBe(true);
    expect(program.setup()).toBe(true);
    expect(p.Sprite).toHaveBeenCalledTimes(1);
    expect(program.createdSprites.has('block')).toBe(true);
  })

  test('does not create a sprite if validation fail', ()=>{
    const invalidBlocks = [
    {
        id: 1,
        type: "declaration",
        belong: "global",
        order: 2,
        values: { 
          name: "block" 
        }
    },
    {
      id: 2,
      belong: "setup",
      type: "create_sprite",
      order: 1,
      values: {
        name: "block",
        x: 100,
        y: 200,
        width: 50,
        height: 160,
      },
    }
  ];

    program.blocks = invalidBlocks;
    expect(program.compileBlocks()).toBe(false);
    program.setup();

    expect(p.Sprite).not.toHaveBeenCalled();
    expect(program.errors.has(2)).toBe(true);
    console.log(program.errors);
    
  })
})