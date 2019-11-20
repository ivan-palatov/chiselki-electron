import { Func } from 'common/Func';
import { Base } from './Base';

export class Linear extends Base {
  constructor(
    public readonly f: Func,
    public readonly a: number,
    public readonly b: number,
    public readonly n: number
  ) {
    super(f, a, b, n);
    this.name = 'Линейный сплайн';
    this.calcValues();
  }

  protected getValueInPoint(xi: number) {
    const highIndex = this.arr.findIndex(({ x }) => x + this.h > xi) + 1;

    return (
      this.arr[highIndex].y +
      ((this.arr[highIndex].x - xi) *
        (this.arr[highIndex - 1].y - this.arr[highIndex].y)) /
        this.h
    );
  }
}
