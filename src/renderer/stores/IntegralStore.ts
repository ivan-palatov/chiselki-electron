import { Func } from 'common/Func';
import { action, observable } from 'mobx';
import { Base } from '../integrals/classes/Base';
import { CenterRect } from '../integrals/classes/CenterRect';
import { Gauss } from '../integrals/classes/Gauss';
import { LeftRect } from '../integrals/classes/LeftRect';
import { RightRect } from '../integrals/classes/RightRect';
import { Simpson } from '../integrals/classes/Simpson';
import { ThreeEights } from '../integrals/classes/ThreeEights';
import { Trapezi } from '../integrals/classes/Trapezi';
import { makeParams } from '../integrals/makeParams';

interface IData {
  f: string;
  a: number;
  b: number;
  n: number;
  quad: string[];
}

const map = new Map<string, typeof Base>([
  ['lrect', LeftRect],
  ['rrect', RightRect],
  ['crect', CenterRect],
  ['trapezi', Trapezi],
  ['simpson', Simpson],
  ['te', ThreeEights],
  ['gauss', Gauss],
]);

export class IntegralStore {
  @observable
  public quads: Base[] = [];

  @observable
  public f: Func | null = null;

  @observable
  public range: [number, number] = [0, 0];

  @observable
  public status: 'idle' | 'done' = 'idle';

  @action.bound
  public handleSubmit({ f, n, a, b, quad }: IData) {
    this.quads = [];
    this.status = 'done';
    this.range = [a, b];

    this.f = new Func(f);
    const params = makeParams(n, a, b);

    for (const q of quad) {
      const Quad = map.get(q)!;
      this.quads.push(new Quad(this.f, params));
    }
  }
}
