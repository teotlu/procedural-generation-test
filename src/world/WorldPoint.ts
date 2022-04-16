import { WorldPointType } from './typings';
import { Percent } from '../typings';

export class WorldPoint {
  moisture: Percent;
  temperature: Percent;
  elevation: Percent;

  constructor(point: WorldPointType) {
    this.moisture = point.moisture;
    this.temperature = point.temperature;
    this.elevation = point.elevation;
  }
}
