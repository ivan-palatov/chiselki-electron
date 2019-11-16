import { Func } from '../../common/Func';
import { IQuadParams } from '../makeParams';
import { Base } from './Base';

export class RightRect extends Base {
  constructor(f: Func, params: IQuadParams) {
    super(f, params);
    this.label = 'Формула правого прямоугольника';
    this.isGraphable = true;
  }

  public calc() {
    return (
      this.h *
      this.xArr.slice(1).reduce((acc, val) => acc + this.f.getValue(val), 0)
    );
  }

  public getPlotData() {
    return this.xArr.reverse().map(
      (x, i, arr) =>
        ({
          x: [x - 0.00001, x, arr[i + 1], arr[i + 1] + 0.00001],
          y: [0, this.f.getValue(x), this.f.getValue(x), 0],
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
