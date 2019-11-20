import { calcFactorial } from 'common/calcFactorial';
import { Func } from 'common/Func';
import { PlotData } from 'plotly.js';
import { Base } from './Base';

export class Lagrange extends Base {
  constructor(
    public readonly f: Func,
    public readonly a: number,
    public readonly b: number,
    public readonly n: number
  ) {
    super(f, a, b, n);
    this.name = 'Лагранж';
    this.calcValues();
  }

  public getRnData() {
    return [this.getPracticalRnData(), this.getTheoreticalRnData()];
  }

  protected getValueInPoint(fi: number) {
    return this.arr.reduce(
      (acc, { x, y }, i) => acc + y * this.multiply(fi, i, x),
      0
    );
  }

  private getPracticalRnData() {
    return {
      x: this.points.x,
      y: this.points.y.map((y, i) =>
        Math.abs(this.f.getValue(this.points.x[i]) - y)
      ),
      type: 'scatter',
      name: 'Практ. погр.',
    } as Partial<PlotData>;
  }

  private getTheoreticalRnData() {
    const max = Math.max(
      ...this.points.x.map(x =>
        Math.abs(this.f.getDerivativeValue(x, this.n + 1))
      )
    );
    const fact = calcFactorial(this.n + 1);

    return {
      x: this.points.x,
      y: this.points.x.map(
        x =>
          (max / fact) *
          Math.abs(this.arr.reduce((acc, { x: xi }) => acc * (x - xi), 1))
      ),
      type: 'scatter',
      name: 'Теор. погр.',
    } as Partial<PlotData>;
  }

  private multiply(fi: number, i: number, xi: number) {
    const tmpArr = this.arr.slice();
    tmpArr.splice(i, 1);
    return tmpArr.reduce((acc, { x }) => (acc * (fi - x)) / (xi - x), 1);
  }
}
