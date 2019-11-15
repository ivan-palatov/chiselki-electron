import { Func } from '../../common/Func';
import { IQuadParams } from '../makeParams';

export class Base {
  public label: string;
  public isGraphable: boolean;
  public readonly n: number;

  protected readonly xArr: number[];
  protected readonly h: number;
  protected readonly a: number;
  protected readonly b: number;

  constructor(protected readonly f: Func, params: IQuadParams) {
    this.n = params.n;
    this.a = params.a;
    this.b = params.b;
    this.h = params.h;
    this.xArr = params.xArr;

    this.label = 'Base class';
    this.isGraphable = false;
  }

  public calc(): number {
    return 0;
  }

  public calcRn(): number {
    return 0;
  }
}
