import { Func } from '../common/Func';

export class Dichotomy {
  constructor(
    public readonly f: Func,
    public readonly a: number,
    public readonly b: number,
    public readonly eps: number
  ) {}

  public calc() {
    let x0: number;
    let xn = this.a;
    let h = (this.b - this.a) / 2;

    do {
      x0 = xn;
      xn =
        x0 +
        Math.sign(this.f.getValue(this.a)) * Math.sign(this.f.getValue(x0)) * h;
      h = h / 2;
    } while (Math.abs(this.f.getValue(x0) - this.f.getValue(xn)) > this.eps);

    return xn;
  }
}
