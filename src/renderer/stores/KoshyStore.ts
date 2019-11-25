import { Func } from 'common/Func';
import { action, computed, observable } from 'mobx';
import { PlotData } from 'plotly.js';
import { Koshy } from '../koshy/Koshy';

interface IData {
  f: string;
  a: number;
  b: number;
  h: number;
  y0: number;
  eps: number;
  solution: string;
}

interface IResult {
  x: number;
  euler: number;
  runge: number;
  adams: number;
}

export class KoshyStore {
  @observable
  public status: 'idle' | 'done' = 'idle';

  @observable
  public data?: IData;

  @observable
  public result: IResult[] = [];

  @observable
  public LaTeX?: string;

  @computed
  public get plotData() {
    return [
      {
        x: this.result.map(({ x }) => x),
        y: this.result.map(({ euler }) => euler),
        type: 'scatter',
        name: 'Эйлер',
      },
      {
        x: this.result.map(({ x }) => x),
        y: this.result.map(({ runge }) => runge),
        type: 'scatter',
        name: 'Рунге-Кутт',
      },
      {
        x: this.result.map(({ x }) => x),
        y: this.result.map(({ adams }) => adams),
        type: 'scatter',
        name: 'Адамс',
      },
    ] as Array<Partial<PlotData>>;
  }

  @action.bound
  public handleSubmit(data: IData) {
    this.data = data;
    const koshy = new Koshy(data.f, data.a, data.b, data.h, data.y0, data.eps);
    this.result = koshy.makeTableData();

    const f = new Func(data.f);
    this.LaTeX = f.LaTeX();

    this.status = 'done';
  }
}
