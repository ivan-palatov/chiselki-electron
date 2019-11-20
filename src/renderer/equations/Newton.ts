import { Func } from 'common/Func';

export class Newton {
  constructor(
    public readonly f: Func,
    public readonly a: number,
    public readonly b: number,
    public readonly eps: number
  ) {}

  public calc() {
    const sign = this.f.getValue(this.a) * this.f.getDerivativeValue(this.a, 2);
    let x0: number;
    let xn = sign > 0 ? this.a : this.b;
    do {
      x0 = xn;
      xn = x0 - this.f.getValue(x0) / this.f.getDerivativeValue(x0, 1);
    } while (Math.abs(this.f.getValue(x0) - this.f.getValue(xn)) > this.eps);

    return xn;
  }
}
