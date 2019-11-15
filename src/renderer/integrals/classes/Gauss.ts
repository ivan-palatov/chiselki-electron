import { Func } from '../../common/Func';
import { IQuadParams } from '../makeParams';
import { Base } from './Base';

const coefs = [
  {
    n: 4,
    t: [-0.86113631, -0.33998104, 0.33998104, 0.86113631],
    a: [0.34785484, 0.65214516, 0.65214516, 0.34785484],
  },
  {
    n: 5,
    t: [-0.90617985, -0.53846931, 0, 0.53846931, 0.90617985],
    a: [0.23692688, 0.47862868, 0.56888889, 0.47862868, 0.23692688],
  },
  {
    n: 7,
    t: [
      -0.94910791,
      -0.74153119,
      -0.40584515,
      0,
      0.40584515,
      0.74153119,
      0.94910791,
    ],
    a: [
      0.12948496,
      0.2797054,
      0.38183006,
      0.41795918,
      0.38183006,
      0.2797054,
      0.12948496,
    ],
  },
];

export class Gauss extends Base {
  protected readonly xArr: number[];
  private readonly coefs: { t: number[]; a: number[] };

  constructor(f: Func, params: IQuadParams) {
    super(f, params);
    this.label = 'Формула Гаусса';

    this.n = params.n <= 4 ? 4 : params.n >= 7 ? 7 : 5;

    this.coefs = coefs.find(c => c.n === this.n)!;

    this.xArr = [...Array(this.n)].map(
      (_, i) => (this.b + this.a + (this.b - this.a) * this.coefs.t[i]) / 2
    );
  }

  public calc() {
    return (
      ((this.b - this.a) / 2) *
      this.xArr.reduce(
        (acc, val, i) => acc + this.coefs.a[i] * this.f.getValue(val),
        0
      )
    );
  }
}
