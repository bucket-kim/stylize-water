export interface WaterStateTypes {
  ready: boolean;
  setReady: (ready: boolean) => void;
  waterLevel: number;
  waveSpeed: number;
  waveAmplitude: number;
  foamDepth: number;
}
