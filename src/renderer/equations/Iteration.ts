import { Func } from 'common/Func';

export class Iteration {
  public i: number = 0;

  constructor(
    public readonly f: Func,
    public readonly a: number,
    public readonly b: number,
    public readonly eps: number
  ) {}

  public calc() {
    this.i = 0;
    let x0 = this.a;
    let xn = this.b;

    while (true) {
      xn = this.f.getValue(x0);
      this.i++;
      if (
        Math.abs(xn - x0) <= this.eps ||
        Math.abs(this.f.getValue(x0) - this.f.getValue(xn)) <= this.eps
      ) {
        break;
      }
      x0 = xn;
    }

    return xn;
  }
}
