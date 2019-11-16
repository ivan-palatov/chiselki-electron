import { action, observable } from 'mobx';
import { Func } from '../common/Func';
import { Base } from '../integrals/classes/Base';
import { createQuad } from '../integrals/createQuad';
import { makeParams } from '../integrals/makeParams';

interface IData {
  f: string;
  a: number;
  b: number;
  n: number;
  quad: string[];
}

export class IntegralStore {
  @observable
  public quads: Base[] = [];

  @observable
  public f: Func | null = null;

  @observable
  public range: [number, number] = [0, 0];

  @observable
  public isSubmitted = false;

  @action.bound
  public handleSubmit({ f, n, a, b, quad }: IData) {
    this.quads = [];
    this.isSubmitted = true;
    this.range = [a, b];

    this.f = new Func(f);
    const params = makeParams(n, a, b);

    for (const q of quad) {
      const Quad = createQuad(q);
      this.quads.push(new Quad(this.f, params));
    }
  }
}
