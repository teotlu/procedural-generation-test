import { IValueGenerator, Bounds, Vector2D } from '../../typings';
import { IWorldPoint } from '../WorldPoint';

export class WorldChunk {
  private points: IWorldPoint[][] = [];

  private get size(): Vector2D {
    return new Vector2D(
      Math.abs(this.bounds.pointTo.x - this.bounds.pointFrom.x),
      Math.abs(this.bounds.pointTo.y - this.bounds.pointFrom.y),
    );
  }

  constructor(
    private bounds: Bounds,
    private elevationGenerator: IValueGenerator,
    private moistureGenerator: IValueGenerator,
    private temperatureGenerator: IValueGenerator,
  ) {
    for (let x = 0; x < this.size.x; x++) {
      this.points[x] = [];
      for (let y = 0; y < this.size.y; y++) {
        this.points[x][y] = {
          elevation: this.elevationGenerator.getValue(x, y),
          moisture: this.moistureGenerator.getValue(x, y),
          temperature: this.temperatureGenerator.getValue(x, y),
        };
      }
    }
  }
}
