import create from 'zustand';
import { devtools } from 'zustand/middleware';

import { Codecs } from '~/constants';

export interface OptionsState {
  target: Codecs;
  setTarget: (codec: Codecs) => void;

  quality: number;
  setQuality: (quality: number) => void;
}

export const useOptions = create<OptionsState>()(
  devtools((set) => ({
    target: Codecs.webp,
    setTarget: (codec) =>
      set({
        target: codec,
      }),

    quality: 60,
    setQuality: (quality) =>
      set({
        quality,
      }),
  }))
);
