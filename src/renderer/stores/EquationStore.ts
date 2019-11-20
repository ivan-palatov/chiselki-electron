import { Func } from 'common/Func';
import { FormikHelpers } from 'formik';
import { action, computed, observable } from 'mobx';
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

const map = new Map<string, typeof Chords>([
  ['chords', Chords],
  ['dichotomy', Dichotomy],
  ['newton', Newton],
  ['iteration', Iteration],
]);

export class EquationStore {
  @observable
  public status: 'idle' | 'error' | 'done' = 'idle';

  @observable
  public f: Func | null = null;

  @observable
  public data: IData | null = null;

  @observable
  public result?: number;

  @observable
  public iterNum?: number;

  @computed
  public get label() {
    return equationMethods.find(({ value }) => value === this.data?.type)!
      .label;
  }

  @action.bound
  public handleSubmit(data: IData, helpers: FormikHelpers<IData>) {
    this.data = data;
    this.f = new Func(data.f);

    if (this.f.getValue(data.a) * this.f.getValue(data.b) > 0) {
      const errMessage = `На отрезке [${data.a}, ${data.b}] нет корней либо их больше одного`;
      helpers.setErrors({ a: errMessage, b: errMessage });
      this.status = 'error';
      return;
    }

    if (
      (this.data.type === 'iteration' &&
        Math.abs(this.f.getDerivativeValue(data.a)) > 1) ||
      (this.data.type === 'iteration' &&
        Math.abs(this.f.getDerivativeValue(data.b)) > 1)
    ) {
      const errMessage = `На отрезке [${data.a}, ${data.b}] модуль производной больше единицы`;
      helpers.setErrors({ a: errMessage, b: errMessage });
      this.status = 'error';
      return;
    }

    const Method = map.get(data.type)!;
    const instance = new Method(this.f, data.a, data.b, data.eps);
    this.result = instance.calc();
    if (data.type === 'iteration') {
      this.iterNum = (instance as any).i;
    }
    this.status = 'done';
  }
}
