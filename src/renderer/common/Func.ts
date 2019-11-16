import { derivative, evaluate, range, simplify } from 'mathjs';
import { PlotData } from 'plotly.js';

export class Func {
  private derivatives: string[] = [];
  private xRange: number[] = [];
  private yRange: number[] = [];

  constructor(private readonly f: string) {}

  public LaTeX(f = this.f) {
    return simplify(f).toTex();
  }

  public getPlotData(from: number, to: number) {
    return {
      x: this.getRange(from, to, 200),
      y: this.getValues(this.xRange),
      type: 'scatter',
      name: 'f(x)',
      line: {
        shape: 'spline',
      },
    } as Partial<PlotData>;
  }

  public getValue(x: number, f = this.f) {
    return evaluate(f, { x });
  }

  public getDerivativeValue(x: number, n = 1) {
    return evaluate(this.getDerivative(n), { x });
  }

  public getDerivative(n: number) {
    if (this.derivatives.length >= n) {
      return this.derivatives[n - 1];
    }

    if (this.derivatives.length === 0) {
      this.derivatives.push(simplify(derivative(this.f, 'x')).toString());
    }

    while (this.derivatives.length < n) {
      this.derivatives.push(
        simplify(
          derivative(this.derivatives[this.derivatives.length - 1], 'x')
        ).toString()
      );
    }

    return this.derivatives[n - 1];
  }

  private getRange(from: number, to: number, n: number) {
    if (this.xRange.length === n + 1 && this.xRange[0] === from) {
      return this.xRange;
    }
    this.xRange = range(from, to, (to - from) / n, true).toArray() as number[];
    return this.xRange;
  }

  private getValues(arr: number[]): number[] {
    if (this.yRange.length === arr.length) {
      return this.yRange;
    }
    this.yRange = arr.map(x => evaluate(this.f, { x }));
    return this.yRange;
  }
}
