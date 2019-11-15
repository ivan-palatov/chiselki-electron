import { Func } from '../../common/Func';
import { IQuadParams, makeParams } from '../makeParams';
import { Base } from './Base';

export class Simpson extends Base {
  constructor(f: Func, { n, a, b }: IQuadParams) {
    super(f, makeParams(n % 2 === 0 ? n : n + 1, a, b));

    this.label = 'Формула Симпсона';
    this.needRn = true;
  }

  public calc() {
    return (
      ((this.b - this.a) / (3 * this.n)) *
      this.xArr.reduce((acc, val, i) => {
        if ([0, this.xArr.length - 1].includes(i)) {
          return acc + this.f.getValue(val);
        } else if (i % 2 === 0) {
          return acc + 2 * this.f.getValue(val);
        } else {
          return acc + 4 * this.f.getValue(val);
        }
      }, 0)
    );
  }

  private get maxDeriv() {
    return Math.max(...this.xArr.map(x => this.f.getDerivativeValue(x, 4)));
  }

  public calcRn() {
    return (-(this.b - this.a) * Math.pow(this.h, 4) * this.maxDeriv) / 180;
  }
}
