import { Func } from 'common/Func';
import { Base } from './Base';

export class Gauss extends Base {
  private del: [number, number];
  private del2: number;

  constructor(
    public readonly f: Func,
    public readonly a: number,
    public readonly b: number,
    public readonly n: number
  ) {
    super(f, a, b, 2);

    this.del = [this.arr[1].y - this.arr[0].y, this.arr[2].y - this.arr[1].y];
    this.del2 = this.del[1] - this.del[0];

    this.name = 'Гаусс';
    this.calcValues();
  }

  protected getValueInPoint(xi: number) {
    const t = (xi - this.arr[0].x) / this.h;

    return this.arr[0].y + this.del[0] * t + (this.del2 * t * (t - 1)) / 2;
  }
}
