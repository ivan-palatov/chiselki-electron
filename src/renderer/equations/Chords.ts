import { Func } from '../common/Func';

export class Chords {
  constructor(
    public readonly f: Func,
    public readonly a: number,
    public readonly b: number,
    public readonly eps: number
  ) {}

  public calc() {
    let a = this.a;
    let b = this.b;
    while (
      Math.abs(a - b) > this.eps &&
      Math.abs(this.f.getValue(a) - this.f.getValue(b)) > this.eps
    ) {
      a =
        b -
        ((b - a) * this.f.getValue(b)) /
          (this.f.getValue(b) - this.f.getValue(a));

      b =
        a +
        ((a - b) * this.f.getValue(a)) /
          (this.f.getValue(a) - this.f.getValue(b));
    }

    return b;
  }
}
