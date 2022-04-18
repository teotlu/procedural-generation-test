import Phaser from 'phaser';
import { Vector2D } from '../../helpers/geometry';
import { getPointColor } from '../biomes';
import { WorldChunksManager } from '../chunks/WorldChunksManager';

export class WorldScene extends Phaser.Scene {
  private graphics?: Phaser.GameObjects.Graphics;
  private cellSize = 1;
  private chunkSize = 64;

  private chunksManager = new WorldChunksManager('seed', this.chunkSize);

  constructor() {
    super({ key: 'world' });
  }

  preload() {
    this.graphics = this.add.graphics();
  }

  create() {
    this.drawChunk(new Vector2D(0, 0));
    this.drawChunk(new Vector2D(1, 0));
    this.drawChunk(new Vector2D(1, 1));
    this.drawChunk(new Vector2D(2, 2));
  }

  update() {}

  private drawChunk(position: Vector2D) {
    this.chunksManager.spawnChunk(position, (chunk) => {
      if (!this.graphics) return;
      for (let x = 0; x < this.chunkSize; x += this.cellSize) {
        for (let y = 0; y < this.chunkSize; y += this.cellSize) {
          this.graphics.fillStyle(getPointColor(chunk.points[x][y]), 1);
          this.graphics.fillPoint(
            x + position.x * this.chunkSize,
            y + position.y * this.chunkSize,
            this.cellSize,
          );
        }
      }
    });
  }
}
