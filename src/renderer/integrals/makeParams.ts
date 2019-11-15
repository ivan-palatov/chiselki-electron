export interface IQuadParams {
  n: number;
  a: number;
  b: number;
  h: number;
  xArr: number[];
}

export function makeParams(n: number, a: number, b: number): IQuadParams {
  return {
    n,
    a,
    b,
    h: (b - a) / n,
    xArr: [...Array(n + 1)].map((_, k) => a + k * ((b - a) / n)),
  };
}
