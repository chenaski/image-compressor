export enum Codecs {
  webp = 'webp',
  avif = 'avif',
}

export enum RenameOptions {
  replace = 'replace',
  prefix = 'prefix',
  suffix = 'suffix',
}

export type OptionKey = string;
export type OptionValue = string | number | boolean | undefined;
export type CodecOptionValues = Record<OptionKey, OptionValue>;
export type OptionsByCodec = Record<Codecs, CodecOptionValues>;

export interface NumericControlOption {
  type: 'numeric';
  name: string;
  defaultValue?: number;
  min: number;
  max: number;
}

export interface BooleanControlOption {
  type: 'boolean';
  name: string;
  defaultValue?: boolean;
}

export interface SelectControlOption {
  type: 'select';
  name: string;
  items: { title: string; value: string }[];
  defaultValue: string;
  placeholder?: string;
}

export type Control = NumericControlOption | BooleanControlOption | SelectControlOption;
export type CodecControls = Record<OptionKey, Control>;

export const webpOptions: CodecControls = {
  quality: {
    name: 'Quality',
    type: 'numeric',
    defaultValue: 80,
    min: 0,
    max: 100,
  },
  lossless: {
    name: 'Lossless',
    type: 'boolean',
    defaultValue: false,
  },
  effort: {
    name: 'Effort',
    type: 'numeric',
    defaultValue: 4,
    min: 0,
    max: 6,
  },
  alphaQuality: {
    name: 'Alpha quality',
    type: 'numeric',
    defaultValue: 80,
    min: 0,
    max: 100,
  },
  nearLossless: {
    name: 'Near lossless',
    type: 'boolean',
    defaultValue: false,
  },
};

export const avifOptions: CodecControls = {
  quality: {
    name: 'Quality',
    type: 'numeric',
    defaultValue: 50,
    min: 0,
    max: 100,
  },
  lossless: {
    name: 'Lossless',
    type: 'boolean',
    defaultValue: false,
  },
  effort: {
    name: 'Effort',
    type: 'numeric',
    defaultValue: 4,
    min: 0,
    max: 9,
  },
  chromaSubsampling: {
    name: 'Subsample chroma',
    type: 'select',
    items: [
      { title: 'Half', value: '4:4:4' },
      { title: 'Off', value: '4:2:0' },
    ],
    defaultValue: '4:4:4',
  },
};

export const options = { [Codecs.webp]: webpOptions, [Codecs.avif]: avifOptions } as const;
