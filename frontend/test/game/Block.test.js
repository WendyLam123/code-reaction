import {test, describe, expect} from 'vitest';
import Block from '../../src/GameLogic/blocks/Block.js';
import CreateSprite from '../../src/GameLogic/blocks/CreateSprite.js';

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

test('Create a Sprite instance', () =>{
    const sprite = new CreateSprite(BLOCK);
    expect(sprite.x).toBe(BLOCK.values.x);
    expect(sprite.y).toBe(BLOCK.values.y);
    expect(sprite.width).toBe(BLOCK.values.width);
    expect(sprite.height).toBe(BLOCK.values.height);
})