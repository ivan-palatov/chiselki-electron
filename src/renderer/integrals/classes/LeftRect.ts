import { Func } from '../../common/Func';
import { IQuadParams } from '../makeParams';
import { Base } from './Base';

export class LeftRect extends Base {
  constructor(f: Func, params: IQuadParams) {
    super(f, params);
    this.label = 'Формула левого прямоугольника';
    this.isGraphable = true;
  }

  public calc() {
    return (
      this.h *
      this.xArr.slice(0, -1).reduce((acc, val) => acc + this.f.getValue(val), 0)
    );
  }
}
