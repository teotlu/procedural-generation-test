import { FractalNoise } from '../../generators/FractalNoise';
import { Vector2D } from '../../helpers/geometry';
import { WorldChunk } from './WorldChunk';

export class WorldChunksManager {
  private spawnedChunks: WeakMap<Vector2D, WorldChunk> = new WeakMap();

  private elevationNoise = new FractalNoise(`${this.seed}_elevation`, {
    octaves: 5,
    frequency: 0.01,
  });

  private temperatureNoise = new FractalNoise(`${this.seed}_temperature`, {
    octaves: 5,
    frequency: 0.005,
  });

  private moistureNoise = new FractalNoise(`${this.seed}_moisture`, {
    octaves: 5,
    frequency: 0.005,
  });

  constructor(private seed: string, private chunkSize: number) {}

  public spawnChunk(
    position: Vector2D,
    onSpawnChunk?: (chunk: WorldChunk) => void,
  ) {
    const chunk = new WorldChunk(
      position,
      this.chunkSize,
      this.elevationNoise,
      this.moistureNoise,
      this.temperatureNoise,
    );
    this.spawnedChunks.set(position, chunk);
    onSpawnChunk?.(chunk);
  }
}
