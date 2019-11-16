import { Func } from '../common/Func';

export class Iteration {
  public i: number = 0;

  constructor(
    public readonly f: Func,
    public readonly x0: number,
    public readonly eps: number
  ) {}

  public calc() {
    this.i = 0;
    let xn = this.x0;
    let x0;

    if (
      Math.abs(this.f.getDerivativeValue(xn)) > 1 ||
      Math.abs(this.f.getDerivativeValue(this.f.getValue(xn))) > 1
    ) {
      console.log('Всё расходится! Ахнунгъ!');
      return;
    }

    do {
      x0 = xn;
      xn = this.f.getValue(x0);
      this.i++;
    } while (
      Math.abs(this.f.getValue(x0)) > this.eps &&
      Math.abs(this.f.getValue(x0) - this.f.getValue(xn)) > this.eps
    );

    return xn;
  }
}
