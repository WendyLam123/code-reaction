import {vi} from 'vitest';

export default function createMockP() {
  return {
    Sprite: vi.fn(class MockSprite {
      constructor(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;

        this.vel = {
          x: 0,
          y: 0,
        };
      }
    })
  };
}