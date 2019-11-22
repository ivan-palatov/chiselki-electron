import { Func } from 'common/Func';
import { action, observable } from 'mobx';
import { Koshy } from '../koshy/Koshy';

interface IData {
  f: string;
  a: number;
  b: number;
  h: number;
  y0: number;
  eps: number;
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
  public result?: IResult[];

  @observable
  public LaTeX?: string;

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
