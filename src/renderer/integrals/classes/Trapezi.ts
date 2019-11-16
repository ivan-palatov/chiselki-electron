import { Func } from '../../common/Func';
import { IQuadParams } from '../makeParams';
import { Base } from './Base';

export class Trapezi extends Base {
  constructor(f: Func, params: IQuadParams) {
    super(f, params);
    this.label = 'Формула трапеции';
    this.needRn = true;

    this.isGraphable = true;
  }

  public calc() {
    return (
      ((this.b - this.a) / this.n) *
      this.xArr.reduce(
        (acc, val, i) =>
          ![0, this.xArr.length - 1].includes(i)
            ? acc + this.f.getValue(val)
            : acc + 0.5 * this.f.getValue(val),
        0
      )
    );
  }

  private get maxDeriv() {
    return Math.max(...this.xArr.map(x => this.f.getDerivativeValue(x, 2)));
  }

  public calcRn() {
    return (
      (-Math.pow(this.b - this.a, 3) * this.maxDeriv) /
      (12 * Math.pow(this.n, 2))
    );
  }

  public getPlotData() {
    return this.xArr.map(
      (x, i, arr) =>
        ({
          x: [x - 0.00001, x, arr[i + 1], arr[i + 1] + 0.00001],
          y: [
            0,
            this.f.getValue(x),
            this.f.getValue(arr[i + 1] ? arr[i + 1] : 0),
            0,
          ],
          type: 'scatter',
          showlegend: false,
          name: 'Прямоугольник',
          mode: 'lines',
          width: 1,
          opacity: 0.7,
          marker: {
            color: '#ff8c1a',
            width: 1,
          },
        } as any)
    );
  }
}
