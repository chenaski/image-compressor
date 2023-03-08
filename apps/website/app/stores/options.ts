import produce from 'immer';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

import type { CodecOptionValues, OptionKey, OptionsByCodec, OptionValue } from '~/constants';
import { Codecs, options } from '~/constants';

export interface OptionsState {
  target: Codecs;
  setTarget: (codec: Codecs) => void;

  options: OptionsByCodec;
  setOption: (optionKey: OptionKey, value: OptionValue) => void;
}

export const useOptions = create<OptionsState>()(
  devtools((set) => ({
    target: Codecs.webp,
    setTarget: (codec) =>
      set({
        target: codec,
      }),

    options: Object.entries(options).reduce(
      (result, [codec, codecOptions]) => ({
        ...result,
        [codec]: Object.entries(codecOptions).reduce(
          (acc, [optionKey, optionData]) => ({
            ...acc,
            [optionKey]: optionData.defaultValue,
          }),
          {} as CodecOptionValues
        ),
      }),
      {} as OptionsByCodec
    ),
    setOption: (optionKey, value) =>
      set(
        produce((state: OptionsState) => {
          const currentCodecOptions = state.options[state.target];
          if (optionKey in currentCodecOptions) {
            currentCodecOptions[optionKey] = value;
          }
        })
      ),
  }))
);
