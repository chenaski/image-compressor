import create from 'zustand';
import { devtools } from 'zustand/middleware';
import type { Codecs } from '~/constants';

export interface OptionsState {
  target: Codecs | null;
  setTarget: (codec: Codecs) => void;

  quality: number;
  setQuality: (quality: number) => void;
}

export const useOptions = create<OptionsState>()(
  devtools((set) => ({
    target: null,
    setTarget: (codec) =>
      set({
        target: codec,
      }),

    quality: 0,
    setQuality: (quality) =>
      set({
        quality,
      }),
  }))
);
