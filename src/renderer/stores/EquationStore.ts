import { FormikHelpers } from 'formik';
import { action, computed, observable } from 'mobx';
import { Func } from '../common/Func';
import { Chords } from '../equations/Chords';
import { Dichotomy } from '../equations/Dichotomy';
import { Iteration } from '../equations/Iteration';
import { Newton } from '../equations/Newton';

interface IData {
  f: string;
  a: number;
  b: number;
  eps: number;
  type: string;
}

export const equationMethods = [
  { value: 'dichotomy', label: 'Метод дихотомии' },
  { value: 'chords', label: 'Метод хорд' },
  { value: 'newton', label: 'Метод Ньютона' },
  { value: 'iteration', label: 'Метод простых итераций' },
];

export class EquationStore {
  @observable
  public isSubmitted = false;

  @observable
  public f: Func | null = null;

  @observable
  public data: IData | null = null;

  @observable
  public method: any;

  @computed
  public get label() {
    return equationMethods.find(({ value }) => value === this.data?.type)!
      .label;
  }

  @action.bound
  public handleSubmit(data: IData, helpers: FormikHelpers<IData>) {
    this.isSubmitted = true;
    this.data = data;
    this.f = new Func(data.f);

    if (this.f.getValue(data.a) * this.f.getValue(data.b) > 0) {
      const errMessage = `На отрезке [${data.a}, ${data.b}] нет корней либо их больше одного`;
      helpers.setErrors({ a: errMessage, b: errMessage });
      this.method = undefined;
      return;
    }

    if (data.type === 'dichotomy') {
      this.method = new Dichotomy(this.f, data.a, data.b, data.eps);
    } else if (data.type === 'chords') {
      this.method = new Chords(this.f, data.a, data.b, data.eps);
    } else if (data.type === 'newton') {
      this.method = new Newton(this.f, data.a, data.b, data.eps);
    } else {
      this.method = new Iteration(this.f, data.a, data.eps);
    }
  }
}
