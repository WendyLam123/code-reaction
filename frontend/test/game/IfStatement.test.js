import IfStatement from "../../src/GameLogic/blocks/IfStatement";
import {test, describe, expect, vi, beforeEach} from 'vitest';
import CreateSprite from '../../src/GameLogic/blocks/CreateSprite.js';
import createMockP from "./mockP.js";
import Program from '../../src/GameLogic/Progam.js';

const CODE_BLOCKS = [{
  id: 4,
  belong: "update",
  type: "if",
  order: 4,
  values: {
    condition: [
      {
        type: "detectCollision",
        from: {
          name: "block",
          source: "userBlock",
        },
        to: {
          name: "crateCollider",
          source: "gameBlock",
        },
      },
    ],
    actions: [
      {
        type: "set_velocity",
        values: {
          target: {
            name: "block",
            source: "userBlock",
          },
          vel: { x: 10, y: 15 },
        },
      },
      {
        type: "set_rotation",
        values: {
          target: {
            name: "alien",
            source: "gameBlock",
          },
          rotation: 0,
        },
      },
    ],
  },
}];

//check distance
const IF_BLOCK1 = {
  id: 3,
  belong: "update",
  type: "if",
  order: 3,
  values: {
    condition: [
      {
        type: "detectDistance",
        target: {
          name: "crate",
          source: "gameBlock",
        },
        property: "x",
        operator: ">",
        value: 300,
      },
    ],
    actions: [
      {
        type: "set_velocity",
        values: {
          target: {
            name: "block",
            source: "userBlock",
          },
          vel: { x: 0, y: 1.5 },
        },
      },
      {
        type: "set_velocity",
        values: {
          target: {
            name: "alien",
            source: "gameBlock",
          },
          vel: { x: 0.5, y: 10 },
        },
      },
    ],
  },
};

//check collision
const IF_BLOCK2 = {
  id: 4,
  belong: "update",
  type: "if",
  order: 4,
  values: {
    condition: [
      {
        type: "detectCollision",
        from: {
          name: "block",
          source: "userBlock",
        },
        to: {
          name: "crate",
          source: "gameBlock",
        },
      },
    ],
    actions: [
      {
        type: "set_velocity",
        values: {
          target: {
            name: "block",
            source: "userBlock",
          },
          vel: { x: 10, y: 15 },
        },
      },
      {
        type: "set_rotation",
        values: {
          target: {
            name: "alien",
            source: "gameBlock",
          },
          rotation: 0,
        },
      },
    ],
  },
};

const CONDITION_SPRITE = {
    id: 1,
    belong: "setup",
    type: "create_sprite",
    order: 2,
    values: {
      name: "crate",
      x: 500,
      y: 200,
      width: 50,
      height: 160,
    },
};

const ACTION_SPRITE1 = {
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
};

const ACTION_SPRITE2 = {
    id: 2,
    belong: "setup",
    type: "create_sprite",
    order: 2,
    values: {
      name: "alien",
      x: 100,
      y: 200,
      width: 50,
      height: 160,
    },
};

let p, program, ifBlock1, ifBlock2;
let crate, block, alien;

beforeEach(()=>{
    p = createMockP();
    program = new Program(p,CODE_BLOCKS);
    ifBlock1 = new IfStatement(IF_BLOCK1);
    ifBlock2 = new IfStatement(IF_BLOCK2);

    crate = new CreateSprite(CONDITION_SPRITE);
    block = new CreateSprite(ACTION_SPRITE1);
    alien = new CreateSprite(ACTION_SPRITE2);
    crate = crate.execute(program);
    alien = alien.execute(program);

    program.registerGameObject('crate', crate);
    program.registerGameObject('alien', alien);   
    console.log(program.gameObjects) 

})

describe('setup', ()=>{
    test('super setup', ()=>{
        expect(ifBlock1.id).toBe(IF_BLOCK1.id);
        expect(ifBlock1.condition).toEqual(IF_BLOCK1.values.condition);
    })
})

describe('validation', ()=>{
    test('valid', ()=>{
        program.addContext('create_sprite', 'block');
        expect(ifBlock1.validate(program)).toBe(true);
    })

    //test if required sprite exist
    test('no condition target', ()=>{
        program.gameObjects.delete('crate');
        program.addContext('create_sprite', 'block');
        expect(ifBlock1.validate(program)).toBe(false);
    })

    test('no one action target', ()=>{
        program.addContext('create_sprite', 'block');
        program.gameObjects.delete('alien');
        expect(ifBlock1.validate(program)).toBe(false);
    })

    test('no all action targets', ()=>{
        program.gameObjects.delete('alien');
        expect(ifBlock1.validate(program)).toBe(false);
    })

    test('no condition target and one action target', ()=>{
        program.gameObjects.delete('crate');
        program.gameObjects.delete('alien');
        program.addContext('create_sprite', 'block');
        expect(ifBlock1.validate(program)).toBe(false);
    })

    //check if type is collision, sprites exist
    test('both to and for exist', ()=>{
        program.gameObjects.delete('crate');
        program.gameObjects.delete('alien');
        program.addContext('create_sprite', 'block');
        expect(ifBlock1.validate(program)).toBe(false);
    })

    //test if condition is valid
    test('unknown property', ()=>{
        program.addContext('create_sprite', 'block');

        let testBlock = {
            ...IF_BLOCK1,
            values: {
                ...IF_BLOCK1.values,
                condition: [
                    {
                        ...IF_BLOCK1.values.condition[0],
                        property: " "
                    }
                ]
            }
        };
        expect(new IfStatement(testBlock).validate(program)).toBe(false);
    })

    test('unknown operator', ()=>{
        program.addContext('create_sprite', 'block');

        let testBlock = {
            ...IF_BLOCK1,
            values: {
                ...IF_BLOCK1.values,
                condition: [
                    {
                        ...IF_BLOCK1.values.condition[0],
                        operator: "!="
                    }
                ]
            }
        };
        expect(new IfStatement(testBlock).validate(program)).toBe(false);
        expect(program.errors.has(testBlock.id)).toBe(true);
    })

    describe("distance: condition value validation", () => {
        test.for([
            ["null", null, false],
            ["empty string", "", false],
            ["zero", 0, true],
        ])("condition value: $label", ([label, value, expected]) => {
            program.addContext("create_sprite", "block");

            const testBlock = {
            ...IF_BLOCK1,
            values: {
                ...IF_BLOCK1.values,
                condition: [
                {
                    ...IF_BLOCK1.values.condition[0],
                    value,
                },
                ],
            },
            };

            expect(new IfStatement(testBlock).validate(program)).toBe(expected);
        });
    });

    test('unknown action type', ()=>{
        program.addContext('create_sprite', 'block');

        const testBlock = {
            ...IF_BLOCK2,
            values: {
                ...IF_BLOCK2.values,
                actions: [
                    {
                        ...IF_BLOCK2.values.actions[0],
                        type: " "
                    }
                ]
            }
        };
        
        expect(new IfStatement(testBlock).validate(program)).toBe(false);
        expect(program.errors.has(testBlock.id)).toBe(true);

    })

})

describe("execution", () => {
    //assume validation passed, execute the blocks. 

    test("does not execute actions when condition is false", () => {
        block.execute(program);
        const blockSprite = program.getSprite("block", 'userBlock');
        blockSprite.vel.x = 10;
        blockSprite.vel.y = 5;

        const result = ifBlock2.execute(program);
        const blockAfterIf = program.getSprite("block", 'userBlock');

        expect(result).toBe(true);
        expect(blockAfterIf.vel.x).toBe(10);
        expect(blockAfterIf.vel.y).toBe(5);
    });

    test("execute actions when condition is true", () => {
        block.execute(program);

        const ifBlock1 = new IfStatement(IF_BLOCK1);

        const result = ifBlock1.execute(program);

        expect(result).toBe(true);

        const blockSprite = program.getSprite("block", 'userBlock');
        const alienSprite = program.getSprite("alien", 'gameBlock');

        expect(blockSprite.vel.x).toBe(0);
        expect(blockSprite.vel.y).toBe(1.5);

        expect(alienSprite.vel.x).toBe(0.5);
        expect(alienSprite.vel.y).toBe(10);
    });
});