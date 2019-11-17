import { range } from 'mathjs';
import { PlotData } from 'plotly.js';
import { Func } from '../common/Func';

export class Linear {
  public name = 'linear';

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

    this.points.x = range(a, b, (b - a) / 200, true).toArray() as number[];
    this.points.y = this.points.x.map(x => this.getValueInPoint(x));
  }

  public getPlotData() {
    return {
      x: this.points.x,
      y: this.points.y,
      type: 'scatter',
      name: 'Линейный сплайн',
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

  private getValueInPoint(xi: number) {
    const highIndex = this.arr.findIndex(({ x }) => x + this.h > xi) + 1;

    return (
      this.arr[highIndex].y +
      ((this.arr[highIndex].x - xi) *
        (this.arr[highIndex - 1].y - this.arr[highIndex].y)) /
        this.h
    );
  }
}
