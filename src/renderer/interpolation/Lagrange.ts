import { range } from 'mathjs';
import { PlotData } from 'plotly.js';
import { calcFactorial } from '../common/calcFactorial';
import { Func } from '../common/Func';

export class Lagrange {
  private readonly h: number;
  private readonly arr: Array<{ x: number; y: number }>;

  private points = { x: [] as number[], y: [] as number[] };

  constructor(
    public readonly f: Func,
    public readonly a: number,
    public readonly b: number,
    public readonly n: number
  ) {
    this.h = (b - a) / n;
    this.arr = [...Array(this.n + 1)].map((_, i) => ({
      y: this.f.getValue(this.a + this.h * i),
      x: this.a + this.h * i,
    }));

    console.log(this.arr);

    this.points.x = range(a, b, (b - a) / 200, true).toArray() as number[];
    this.points.y = this.points.x.map(x => this.getValueInPoint(x));
  }

  public getPlotData() {
    return {
      x: this.points.x,
      y: this.points.y,
      type: 'scatter',
      name: 'Многочлен Лагранжа',
    } as Partial<PlotData>;
  }

  public getPracticalRnData() {
    return {
      x: this.points.x,
      y: this.points.y.map((y, i) =>
        Math.abs(this.f.getValue(this.points.x[i]) - y)
      ),
      type: 'scatter',
      name: 'Практ. погр.',
    } as Partial<PlotData>;
  }

  public getTheoreticalRnData() {
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

  private getValueInPoint(fi: number) {
    return this.arr.reduce(
      (acc, { x, y }, i) => acc + y * this.multiply(fi, i, x),
      0
    );
  }
}
