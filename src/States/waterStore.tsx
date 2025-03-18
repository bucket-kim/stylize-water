import { create } from "zustand";
import { WaterStateTypes } from "./waterStoreTypes";

export const waterStore = create<WaterStateTypes>((set) => ({
  ready: false,
  setReady: (ready) => set(() => ({ ready: ready })),
  waterLevel: 0.9,
  waveSpeed: 1.2,
  waveAmplitude: 0.1,
  foamDepth: 0.05,
}));
