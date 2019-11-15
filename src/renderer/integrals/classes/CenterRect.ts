import { Func } from '../../common/Func';
import { IQuadParams } from '../makeParams';
import { Base } from './Base';

export class CenterRect extends Base {
  constructor(f: Func, params: IQuadParams) {
    super(f, params);
    this.label = '';
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
}
