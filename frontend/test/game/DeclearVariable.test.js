import DeclearVariable from "../../src/GameLogic/blocks/DeclearVariable.js";
import {test, describe, expect, vi, beforeEach} from 'vitest';
import Program from "../../src/GameLogic/Progam.js";
import createMockP from "./mockP.js";

const PROGRAM_BLOCKS = [
    {
    id: 1,
    belong: "global",
    type: "declaration",
    order: 1,
    values: {
      name: "block",
    },
  }
]

const BLOCK = {
    id: 1,
    belong: "global",
    type: "declaration",
    order: 1,
    values: {
      name: "block",
    },
};

let p, program, block;

beforeEach(()=>{
    p = createMockP();
    program = new Program(p,PROGRAM_BLOCKS);
    block = new DeclearVariable(BLOCK);
})

test('declare a block variable', ()=>{
    expect(block.name).toBe("block");
})

test('variable declared twice', ()=>{
    program.addContext('declare_variable', BLOCK.values.name);

    const anotherDeclare = new DeclearVariable({
        id: 2,
        belong: "global",
        type: "declaration",
        order: 2,
        values: {
        name: "block",
        },
    });

    expect(anotherDeclare.validate(program)).toBe(false);
    expect(program.errors.has(anotherDeclare.id)).toBe(true);
})