import Matter from "matter-js";
import CreateSprite from "./blocks/CreateSprite.js";
import DeclearVariable from "./blocks/DeclearVariable.js";
import SetVelocity from "./blocks/SetVelocity.js";
import IfStatement from "./blocks/IfStatement.js";

export default class Program {
  constructor(p, blocks = [], engine) {
    this.p = p;
    this.blocks = blocks;
    this.engine = engine;

    this.createdSprites = new Map();
    this.gameObjects = new Map();
    this.variables = new Map();
    this.errors = new Map();

    this.validationContext = {
      declaredVariables: new Set(),
      scheduledSprites: new Set(),
    };

    this.isRunning = false;
    this.executableBlock = {
      global: [],
      setup: [],
      update: [],
      draw: [],
    };
  }

  //Allow validator to access gameObjects. 
  registerGameObject(name, body) {
    this.gameObjects.set(name, body);
  }

  //Add context for validator to track which variables are declared, which sprites are created. 
  addContext(contextType, context) {
    switch (contextType) {
      case "create_sprite":
        this.validationContext.scheduledSprites.add(context);
        break;
      case "declare_variable":
        this.validationContext.declaredVariables.add(context);
        break;
      default:
        throw new Error(`Unknown context type: ${contextType}`);
    }
  }

  //Add error message
  addError(blockId, errorMessage) {
    this.errors.set(blockId, errorMessage);
  }

  //Check conext for validator to track which variables are declared, which sprites are created.
  checkContext(contextType, contextKey) {
    switch (contextType) {
      case "create_sprite":
        return this.validationContext.scheduledSprites.has(contextKey);
      case "declare_variable":
        return this.validationContext.declaredVariables.has(contextKey);
      default:
        throw new Error(`Unknown context type: ${contextType}`);
    }
  }

  //Execution
  //Create Runable Code Blocks. 
  createBlock(rawBlock) {
    switch (rawBlock.type) {
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

  //Get Created Sprite to update attributes
  getSprite(spriteName, spriteSource) {
    if (spriteSource === "userBlock") return this.createdSprites.get(spriteName);
    if (spriteSource === "gameBlock") return this.gameObjects.get(spriteName);
    return undefined;
  }

  //Compile Blocks and validate dependencies
  compileBlocks() {
    for (const rawBlock of this.blocks) {
      if (!Object.hasOwn(this.executableBlock, rawBlock.belong)) {
        this.addError(rawBlock.id, `Unknown phase: ${rawBlock.belong}`);
        continue;
      }

      const block = this.createBlock(rawBlock);
      if (!block) continue;
      if (block.validate(this) === false) continue;
      this.executableBlock[rawBlock.belong].push(block);
    }

    return this.errors.size === 0;
  }

  //Run setup code
  setup() {
    if (this.errors.size > 0) return false;

    this.isRunning = true;
    for (const code of this.executableBlock.setup) {
      code.execute(this);
    }
    return true;
  }

  //Run update code
  update() {
    for (const code of this.executableBlock.update) {
      code.execute(this);
    }
  }

  draw() {
    for (const code of this.executableBlock.draw) {
      code.execute(this);
    }
  }

  //Reset everthing before running the program again
  reset() {
    this.errors.clear();
    this.variables.clear();
    this.isRunning = false;
    this.validationContext = {
      declaredVariables: new Set(),
      scheduledSprites: new Set(),
    };
    this.executableBlock = {
      global: [],
      setup: [],
      update: [],
      draw: [],
    };

    if (this.engine) {
      for (const body of this.createdSprites.values()) {
        Matter.Composite.remove(this.engine.world, body);
      }
    }

    this.createdSprites.clear();
    this.gameObjects.clear();
  }
}