import Block from "./blocks/Block.js";
import CreateSprite from "./blocks/CreateSprite.js";
import DeclearVariable from "./blocks/DeclearVariable.js";
import SetVelocity from "./blocks/SetVelocity.js";
import IfStatement from "./blocks/IfStatement.js";

export default class Program {
    constructor(p, blocks=[]){
        //import p5play instance
        this.p = p;
        this.blocks = blocks;

        //context
        //store sprite so later can update it when have sprite-related block
        this.createdSprites = new Map();
        this.gameObjects = new Map();
        this.variables = new Map();

        //"sprite id ": error message
        this.errors = new Map();

        this.validationContext = {
            declaredVariables: new Set(),
            scheduledSprites: new Set(),
        }

        //game status
        this.isRunning = false;

        this.executableBlock = {
            global: [],
            setup: [],
            update: [],
            draw: []
        }
    }

    registerGameObject(name, sprite) {
        this.gameObjects.set(name, sprite);
    }
    
    addContext(contextType, context){
        switch(contextType){
            case "create_sprite":
                this.validationContext.scheduledSprites.add(context);
                break;
            case "declare_variable":
                this.validationContext.declaredVariables.add(context);
                break;
            default:
                throw new Error(`Unknown context type: ${contextType}`);
        };
    }

    addError(blockId, errorMessage){
        this.errors.set(blockId, errorMessage);
    }

    checkContext(contextType, contextKey){
        switch(contextType){
            case "create_sprite":
                return this.validationContext.scheduledSprites.has(contextKey);
            case "declare_variable":
                return this.validationContext.declaredVariables.has(contextKey);
            default:
                throw new Error(`Unknown context type: ${contextType}`);
        };
    }

    createBlock(rawBlock){
        switch(rawBlock.type){
            case "declaration":
                return new DeclearVariable(rawBlock);

            case "create_sprite":
                return new CreateSprite(rawBlock);

            case "set_velocity":
                return new SetVelocity(rawBlock);

            case "if":
                return new IfStatement(rawBlock);
            
            default:
                this.addError(rawBlock.id, `Unknown block type: ${rawBlock.type}`);
                return null;
        }
    }

    getSprite(spriteName, spriteSource) {
        if (spriteSource === "userBlock") {
            return this.createdSprites.get(spriteName);
        } else if (spriteSource === "gameBlock") {
            return this.gameObjects.get(spriteName);
        }

        return undefined;
    }

    compileBlocks(){

        for (const rawBlock of this.blocks){
            if (!Object.hasOwn(this.executableBlock, rawBlock.belong)){
                this.addError(rawBlock.id, `Unknown phase: ${rawBlock.belong}`);
                //skip this block
                continue;
            }
            const block = this.createBlock(rawBlock);

            //if block is null, don't compile this: error message should be added to errors
            if (!block){
                continue;
            }

            const isValid = block.validate(this);
            if (isValid === false){
                continue;
            }

            this.executableBlock[rawBlock.belong].push(block);
        }

        return this.errors.size === 0;
    }

    setup(){
        if (this.errors.size > 0){
            return false;
        }

        this.isRunning = true;

        const setupCode = this.executableBlock.setup;

        for (const code of setupCode){
            code.execute(this);
        }
        
        return true;
    }

    update(){
        const updateCode = this.executableBlock.update;
        for (const code of updateCode){
            code.execute(this);
        }
    }

    draw(){

    }

    reset() {
        this.errors.clear();

        this.variables.clear();
        this.isRunning = false;

        this.validationContext = {
            declaredVariables: new Set(),
            scheduledSprites: new Set()
        };

        this.executableBlock = {
            global: [],
            setup: [],
            update: [],
            draw: []
        };

        for (const sprite of this.createdSprites.values()) {
            sprite.remove();
        }

        this.createdSprites.clear();
    }

}