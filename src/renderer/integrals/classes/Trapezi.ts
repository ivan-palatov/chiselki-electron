import { Func } from '../../common/Func';
import { IQuadParams } from '../makeParams';
import { Base } from './Base';

export class Trapezi extends Base {
  constructor(f: Func, params: IQuadParams) {
    super(f, params);
  }

  public calc() {
    return (
      ((this.b - this.a) / this.n) *
      this.xArr.reduce(
        (acc, val, i) =>
          ![0, this.xArr.length - 1].includes(i)
            ? acc + this.f.getValue(val)
            : acc + 0.5 * this.f.getValue(val),
        0
      )
    );
  }

  private get maxDeriv() {
    return Math.max(...this.xArr.map(x => this.f.getDerivativeValue(x, 2)));
  }

  public calcRn() {
    return (
      (-Math.pow(this.b - this.a, 3) * this.maxDeriv) /
      (12 * Math.pow(this.n, 2))
    );
  }
}
