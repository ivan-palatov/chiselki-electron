import { action, observable } from 'mobx';
import { Func } from '../common/Func';
import { Gauss } from '../interpolation/Gauss';
import { Lagrange } from '../interpolation/Lagrange';
import { Linear } from '../interpolation/Linear';

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

  @observable
  public isSubmitted = false;

  @action.bound
  public handleSubmit(data: IData) {
    this.isSubmitted = true;
    this.data = data;

    this.f = new Func(data.f);
    if (data.type === 'lagr') {
      this.method = new Lagrange(this.f, data.a, data.b, data.n);
    } else if (data.type === 'gauss') {
      this.method = new Gauss(this.f, data.a, data.b);
    } else if (data.type === 'linear') {
      this.method = new Linear(this.f, data.a, data.b, data.n);
    }
  }
}
