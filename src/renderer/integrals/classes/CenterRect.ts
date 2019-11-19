import { Func } from 'common/Func';
import { IQuadParams } from '../makeParams';
import { Base } from './Base';

export class CenterRect extends Base {
  constructor(f: Func, params: IQuadParams) {
    super(f, params);
    this.label = 'Формула центрального прямоугольника';
    this.isGraphable = true;
  }

  public calc() {
    return (
      this.h *
      this.xArr
        .slice(0, -1)
        .reduce(
          (acc, val, i) => acc + this.f.getValue((val + this.xArr[i + 1]) / 2),
          0
        )
    );
  }

  public getPlotData() {
    return this.xArr.map(
      (x, i, arr) =>
        ({
          x: [x - 0.00001, x, arr[i + 1], arr[i + 1] + 0.00001],
          y: [
            0,
            this.f.getValue((x + arr[i + 1]) / 2),
            this.f.getValue((x + arr[i + 1]) / 2),
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
