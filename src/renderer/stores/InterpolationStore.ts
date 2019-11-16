import { action, observable } from 'mobx';
import { Func } from '../common/Func';
import { Lagrange } from '../interpolation/Lagrange';

interface IData {
  f: string;
  a: number;
  b: number;
  n: number;
  type: string;
}

export class InterpolationStore {
  @observable
  public data: IData | null = null;

  @observable
  public method: any;

  @observable
  public f: Func | null = null;

  @action.bound
  public handleSubmit(data: IData) {
    this.f = new Func(data.f);
    this.data = data;
    if (data.type === 'lagr') {
      this.method = new Lagrange(this.f, data.a, data.b, data.n);
    }
  }
}
