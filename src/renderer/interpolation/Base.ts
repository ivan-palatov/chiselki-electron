import { Func } from 'common/Func';
import { range } from 'mathjs';
import { PlotData } from 'plotly.js';

export class Base {
  public name = 'Base';

  protected readonly h: number;
  protected readonly arr: Array<{ x: number; y: number }>;
  protected points = { x: [] as number[], y: [] as number[] };

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
  }

  public getPlotData() {
    return {
      x: this.points.x,
      y: this.points.y,
      type: 'scatter',
      name: this.name,
    } as Partial<PlotData>;
  }

  public getRnData() {
    return [
      {
        x: this.points.x,
        y: this.points.y.map((y, i) =>
          Math.abs(this.f.getValue(this.points.x[i]) - y)
        ),
        type: 'scatter',
        name: 'Практ. погр.',
      },
    ] as Array<Partial<PlotData>>;
  }

  protected calcValues() {
    this.points.x = range(
      this.a,
      this.b,
      (this.b - this.a) / 200,
      true
    ).toArray() as number[];
    this.points.y = this.points.x.map(x => this.getValueInPoint(x));
  }

  protected getValueInPoint(x: number) {
    return 0;
  }
}
