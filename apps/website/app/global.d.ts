// eslint-disable-next-line react/no-typos
import 'react';

type CustomProp = { [key in `--${string}`]: string };
declare module 'react' {
  export interface CSSProperties extends CustomProp {}
}
