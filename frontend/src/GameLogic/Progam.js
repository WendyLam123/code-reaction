import Block from "./blocks/Block.js";
import CreateSprite from "./blocks/CreateSprite.js";

export default class Program {
    constructor(p, blocks=[]){
        //import p5play instance
        this.p = p;
        this.blocks = blocks;

        //context
        //"sprite name": SpriteInstance
        this.createdSprites = new Map();
        //'sprite name' : true
        this.declaredVariables = new Map();
        //"sprite id ": error message
        this.errors = new Map();

        //game status
        this.isRunning = false;

        this.executableBlock = {
            global: [],
            setup: [],
            update: [],
            draw: []
        }
    }
    
    addContext(contextType, contextKey, contextValue){
        switch(contextType){
            case "create_sprite":
                this.createdSprites.set(contextKey, contextValue);
                break;
            case "declare_variable":
                this.declaredVariables.set(contextKey, true);
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
                return this.createdSprites.has(contextKey);
            case "declare_variable":
                return this.declaredVariables.has(contextKey);
            default:
                throw new Error(`Unknown context type: ${contextType}`);
        };
    }

    createBlock(rawBlock){
        switch(rawBlock.type){
            case "create_sprite":
                return new CreateSprite(rawBlock);
            
            default:
                this.addError(rawBlock.id, `Unknown block type: ${rawBlock.type}`);
                return null;
        }
    }

    compileBlocks(){
        this.errors.clear();
        
        this.executableBlock = {
            global: [],
            setup: [],
            update: [],
            draw: []
        }

        const sortedBlock = [...this.blocks].sort((a,b)=>a.order - b.order)


        for (const rawBlock of this.blocks){
            if (!Object.hasOwn(this.executableBlock, rawBlock.belong)){
                this.addError(rawBlock.id, `Unknown phase: ${rawBlock.belong}`);
                //skip this block
                continue;
            }
            const block = this.createBlock(rawBlock);
            //if block is null, don't compil this
            if (!block){
                continue;
            }

            const isValid = block.validate(this);
            if (!isValid){
                continue;
            }

            this.executableBlock[rawBlock.belong].push(block);
        }
    }


    setup(){
        this.isRunning = true;
        for (const block of this.executableBlock.setup){
            block.execute(this);
        }
    }

    update(){

    }
    reset(){

    }

}