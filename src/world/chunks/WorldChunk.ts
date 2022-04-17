import { IValueGenerator, Vector2D } from '../../typings';
import { IWorldPoint } from '../WorldPoint';

export class WorldChunk {
  public points: IWorldPoint[][] = [];

  constructor(
    private position: Vector2D,
    private size: number,
    private elevationGenerator: IValueGenerator,
    private moistureGenerator: IValueGenerator,
    private temperatureGenerator: IValueGenerator,
  ) {
    const shiftX = position.x * this.size;
    const shiftY = position.y * this.size;
    for (let x = 0; x < this.size; x++) {
      this.points[x] = [];
      for (let y = 0; y < this.size; y++) {
        this.points[x][y] = {
          elevation: this.elevationGenerator.getValue(x + shiftX, y + shiftY),
          moisture: this.moistureGenerator.getValue(x + shiftX, y + shiftY),
          temperature: this.temperatureGenerator.getValue(
            x + shiftX,
            y + shiftY,
          ),
        };
      }
    }
  }
}
