import Block from "./Block.js";

const ALLOWED_PROPERTIES = [
    "x",
    "y",
    "vel.x",
    "vel.y"
];

const ALLOWED_OPERATORS = [
    ">",
    "<",
    ">=",
    "<=",
    "===",
    "!=="
];

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

function isValidNumber(value) {
    return (
        value !== "" &&
        value !== null &&
        value !== undefined &&
        Number.isFinite(Number(value))
    );
}

function checkCondition(program, condition){
    const sprite = program.getCreatedSprite(condition.target);
    if (!sprite){
        return false;
    }
    
    let actual;

    switch(condition.property){
        case "x":
            actual = sprite.x;
            break;
        case "y":
            actual = sprite.y;
            break;
        case "vel.x":
            actual = sprite.vel.x;
            break;
        case "vel.y":
            actual = sprite.vel.y;
            break;
        default:
            return false;
    }

    let expected = Number(condition.value);
    switch (condition.operator) {
        case ">":
            return actual > expected;
        case "<":
            return actual < expected;
        case ">=":
            return actual >= expected;
        case "<=":
            return actual <= expected;
        case "===":
            return actual === expected;
        case "!==":
            return actual !== expected;
        default:
            return false;
    }

}

function checkAction(program, action){
    const sprite = program.getCreatedSprite(action.values.name);
    if (!sprite){
        return false;
    }

    switch(action.type){
        case "set_velocity":
            sprite.val.x = Number(action.values.val_x);
            sprite.val.y = Number(action.values.val_y);
            return true;
            
        default:
            return false
    }

}


export default class IfStatement extends Block{
    constructor(block){
        super(block);

        this.condition = this.values.condition;
        this.actions = this.values.actions;
    }

    validate(program){
        //validate: check if sprite exist
       
        for(const condition of this.condition){
            //check if target exist
            if (!program.checkContext('create_sprite', condition.target)){
                program.addError(this.id, `Wrong condition! Sprite "${condition.target}" has not been created`);
                return false;
            }

            //check if condition property is valid
            if (!ALLOWED_PROPERTIES.includes(condition.property)){
                program.addError(this.id,`Invalid property "${condition.property}".`);
                return false;
            }

            //check if operator is valid
            if (!ALLOWED_OPERATORS.includes(condition.operator)){
                program.addError(this.id,`Invalid oeprator "${condition.operator}".`);
                return false;
            }

            if (!isValidNumber(condition.value)){
                program.addError(this.id,"Condition value must be a number.");
                return false;
            }
        }

        for (const action of this.actions){
            if (!program.checkContext('create_sprite', action.values.name)){
                program.addError(this.id, `Action could not be acheived! Target Sprite "${action.values.name}" has not been created`);
                return false;
            }

            switch(action.type){
                case "set_velocity":
                    if (!isValidNumber(action.values.val_x) || !isValidNumber(action.values.val_y)){
                        program.addError(this.id,"Velocity value must be a number.");
                        return false;
                    }
                    break;
                default:
                    program.addError(
                        this.id,`Unsupported action type "${action.type}".`);
                    return false;
            }
        }

        return true;
    
    };

    execute(program){
        //execute: get the sprite and update attributes. 
        const allConditionMet = this.condition.every(condition => checkCondition(program, condition));

        //if not all condition met, don't execute
        if (!allConditionMet){
            return true;
        }

        

        return true;

    }
}