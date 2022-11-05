// eslint-disable-next-line react/no-typos
import 'react';

import type { FC, PropsWithChildren } from 'react';

type CustomProp = { [key in `--${string}`]: string };
declare module 'react' {
  export interface CSSProperties extends CustomProp {}
}

export type FCC<P = {}> = FC<PropsWithChildren<P>>;
