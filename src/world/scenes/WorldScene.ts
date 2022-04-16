import SimplexNoise from 'simplex-noise';
import Phaser from 'phaser';
import { WorldPointType } from '../typings';
import { getPointColor } from '../biomes';
import { FractalNoise2D } from '../../noise/FractalNoise2D';

const WIDTH = 500;
const HEIGHT = 500;

const SEED = 'seed';

export class WorldScene extends Phaser.Scene {
  private graphics?: Phaser.GameObjects.Graphics;
  private cellSize = 1;

  private elevationNoise = new FractalNoise2D(`${SEED}_elevation`, {
    octaves: 5,
    frequency: 0.01,
  });
  private temperatureNoise = new FractalNoise2D(`${SEED}_temperature`, {
    octaves: 5,
    frequency: 0.005,
  });
  private moistureNoise = new FractalNoise2D(`${SEED}_moisture`, {
    octaves: 5,
    frequency: 0.005,
  });

  private worldGrid: WorldPointType[][] = [];

  constructor() {
    super({ key: 'world' });
  }

  preload() {
    this.graphics = this.add.graphics();
  }

  create() {
    if (!this.graphics) return;

    console.time('create');
    for (let x = 0; x < WIDTH; x += this.cellSize) {
      this.worldGrid[x] = [];
      for (let y = 0; y < HEIGHT; y += this.cellSize) {
        this.worldGrid[x][y] = {
          elevation: this.elevationNoise.getValue(x, y),
          moisture: this.moistureNoise.getValue(x, y),
          temperature: this.temperatureNoise.getValue(x, y),
        };
      }
    }
    console.timeEnd('create');

    console.time('draw');
    for (let x = 0; x < WIDTH; x += this.cellSize) {
      for (let y = 0; y < HEIGHT; y += this.cellSize) {
        this.graphics.fillStyle(getPointColor(this.worldGrid[x][y]), 1);
        this.graphics.fillPoint(x, y, this.cellSize);
      }
    }
    console.timeEnd('draw');
  }

  update() {
    if (!this.graphics) return;
  }
}
