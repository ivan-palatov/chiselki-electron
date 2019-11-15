import { Func } from '../../common/Func';
import { IQuadParams } from '../makeParams';
import { Base } from './Base';

export class ThreeEights extends Base {
  constructor(f: Func, params: IQuadParams) {
    super(f, params);
  }

  public calc() {
    return (
      ((3 * this.h) / 8) *
      this.xArr.reduce((acc, val, i) => {
        if ([0, this.xArr.length - 1].includes(i)) {
          return acc + this.f.getValue(val);
        } else if (i % 3 === 0) {
          return acc + 2 * this.f.getValue(val);
        } else {
          return acc + 3 * this.f.getValue(val);
        }
      }, 0)
    );
  }

  private get maxDeriv() {
    return Math.max(...this.xArr.map(x => this.f.getDerivativeValue(x, 4)));
  }

  public calcRn() {
    return (-(this.b - this.a) * Math.pow(this.h, 4) * this.maxDeriv) / 80;
  }
}
