import { Func } from 'common/Func';
import { range } from 'mathjs';
import { PlotData } from 'plotly.js';

export class Gauss {
  private readonly h: number;
  private readonly arr: Array<{ x: number; y: number }>;
  private points = { x: [] as number[], y: [] as number[] };

  private del: [number, number];
  private del2: number;

  constructor(
    public readonly f: Func,
    public readonly a: number,
    public readonly b: number
  ) {
    this.h = (b - a) / 2;
    this.arr = [...Array(3)].map((_, i) => ({
      y: this.f.getValue(this.a + this.h * i),
      x: this.a + this.h * i,
    }));

    this.del = [this.arr[1].y - this.arr[0].y, this.arr[2].y - this.arr[1].y];
    this.del2 = this.del[1] - this.del[0];

    this.points.x = range(a, b, (b - a) / 200, true).toArray() as number[];
    this.points.y = this.points.x.map(x => this.getValueInPoint(x));
  }

  public getPlotData() {
    return [
      {
        x: this.points.x,
        y: this.points.y,
        type: 'scatter',
        name: 'Формула Гаусса',
      },
    ] as Array<Partial<PlotData>>;
  }

  public getRnData() {
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
    const t = (xi - this.arr[0].x) / this.h;

    return this.arr[0].y + this.del[0] * t + (this.del2 * t * (t - 1)) / 2;
  }
}
