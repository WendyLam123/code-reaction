import IfStatement from "../../src/GameLogic/blocks/IfStatement";
import {test, describe, expect, vi, beforeEach} from 'vitest';
import CreateSprite from '../../src/GameLogic/blocks/CreateSprite.js';
import createMockP from "./mockP.js";
import Program from '../../src/GameLogic/Progam.js';

const CODE_BLOCKS = [{
    id: 3,
    belong: "update",
    type: "if",
    order: 3,
    values: {
        condition: [
            {
                target: "crate",
                property: "x",
                operator: ">",
                value: 300
            }
        ],
        actions: [
            {
                type: "set_velocity",
                values: {
                    name: "block",
                    val_x: 0,
                    val_y: 0
                }
            },
            {
                type: "set_velocity",
                values: {
                    name: "alien",
                    val_x: 0,
                    val_y: 10
                }
            }
        ]
    }
}];


const IF_BLOCK = {
    id: 3,
    belong: "update",
    type: "if",
    order: 3,
    values: {
        condition: [
            {
                target: "crate",
                property: "x",
                operator: ">",
                value: 300
            }
        ],
        actions: [
            {
                type: "set_velocity",
                values: {
                    name: "block",
                    val_x: 0,
                    val_y: 0
                }
            },
            {
                type: "set_velocity",
                values: {
                    name: "alien",
                    val_x: 0,
                    val_y: 10
                }
            }
        ]
    }
};

let p, program, ifBlock;

beforeEach(()=>{
    p = createMockP();
    program = new Program(p,CODE_BLOCKS);
    ifBlock = new IfStatement(IF_BLOCK);
})

describe('setup', ()=>{
    test('super setup', ()=>{
        expect(ifBlock.id).toBe(IF_BLOCK.id);
        expect(ifBlock.condition).toEqual(IF_BLOCK.values.condition);
    })
})

describe('validation', ()=>{
    test('valid', ()=>{
        program.addContext('create_sprite', 'crate');
        program.addContext('create_sprite', 'block');
        program.addContext('create_sprite', 'alien');
        expect(ifBlock.validate(program)).toBe(true);
    })

    //test if required sprite exist
    test('no condition target', ()=>{
        program.addContext('create_sprite', 'block');
        program.addContext('create_sprite', 'alien');
        expect(ifBlock.validate(program)).toBe(false);
    })

    test('no one action target', ()=>{
        program.addContext('create_sprite', 'crate');
        program.addContext('create_sprite', 'alien');
        expect(ifBlock.validate(program)).toBe(false);
    })

    test('no all action targets', ()=>{
        program.addContext('create_sprite', 'crate');
        expect(ifBlock.validate(program)).toBe(false);
    })

    test('no condition target and one action target', ()=>{
        program.addContext('create_sprite', 'block');
        expect(ifBlock.validate(program)).toBe(false);
    })

    //test if condition is valid
    test('unknown property', ()=>{
        program.addContext('create_sprite', 'crate');
        program.addContext('create_sprite', 'block');
        program.addContext('create_sprite', 'alien');

        let testBlock = {
            ...IF_BLOCK,
            values: {
                ...IF_BLOCK.values,
                condition: [
                    {
                        ...IF_BLOCK.values.condition[0],
                        property: " "
                    }
                ]
            }
        };
        expect(new IfStatement(testBlock).validate(program)).toBe(false);
    })

    test('unknown operator', ()=>{
        program.addContext('create_sprite', 'crate');
        program.addContext('create_sprite', 'block');
        program.addContext('create_sprite', 'alien');

        let testBlock = {
            ...IF_BLOCK,
            values: {
                ...IF_BLOCK.values,
                condition: [
                    {
                        ...IF_BLOCK.values.condition[0],
                        operator: "!="
                    }
                ]
            }
        };
        expect(new IfStatement(testBlock).validate(program)).toBe(false);
        expect(program.errors.has(testBlock.id)).toBe(true);
    })

    describe("condition value validation", () => {
        test.for([
            ["null", null, false],
            ["empty string", "", false],
            ["zero", 0, true]
        ])("condition value: $label", ([label, value, expected]) => {
            program.addContext("create_sprite", "crate");
            program.addContext("create_sprite", "block");
            program.addContext("create_sprite", "alien");

            const testBlock = {
                ...IF_BLOCK,
                values: {
                    ...IF_BLOCK.values,
                    condition: [
                        {
                            ...IF_BLOCK.values.condition[0],
                            value
                        }
                    ]
                }
            };

            expect(new IfStatement(testBlock).validate(program)).toBe(expected);
        });
    });

    test('unknown action type', ()=>{
        program.addContext('create_sprite', 'crate');
        program.addContext('create_sprite', 'block');
        program.addContext('create_sprite', 'alien');

        const testBlock = {
            ...IF_BLOCK,
            values: {
                ...IF_BLOCK.values,
                actions: [
                    {
                        ...IF_BLOCK.values.actions[0],
                        type: " "
                    }
                ]
            }
        };
        
        expect(new IfStatement(testBlock).validate(program)).toBe(false);
        expect(program.errors.has(testBlock.id)).toBe(true);

    })

})
