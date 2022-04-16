import SimplexNoise from 'simplex-noise';

export type FractalNoise2DConfig = {
  minValue?: number;
  maxValue?: number;
  amplitude?: number;
  frequency?: number;
  octaves?: number;
  lacunarity?: number;
  percistence?: number;
};

export class FractalNoise2D {
  private config = {
    minValue: 0,
    maxValue: 100,
    amplitude: 50,
    frequency: 0.01,
    octaves: 3,
    lacunarity: 2,
    percistence: 0.5
  };

  private seed: string;
  private noise: SimplexNoise;

  constructor(seed: string, config?: FractalNoise2DConfig) {
    this.config = {
      ...this.config,
      ...config
    };
    this.seed = seed;
    this.noise = new SimplexNoise(seed);
  }

  public getValue(x: number, y: number): number {
    const {
      amplitude,
      frequency,
      octaves,
      lacunarity,
      percistence,
      minValue,
      maxValue
    } = this.config;

    let value = amplitude;
    let tFrequency = frequency;
    let tAmplitude = amplitude;
    for (let k = 0; k < octaves; k++) {
      const sampleX = x * tFrequency;
      const sampleY = y * tFrequency;

      value += this.noise.noise2D(sampleX, sampleY) * tAmplitude;

      tFrequency *= lacunarity;
      tAmplitude *= percistence;
      value = Math.min(Math.max(Math.floor(value), minValue), maxValue);
    }

    return value;
  }
}
