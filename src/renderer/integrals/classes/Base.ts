import { Func } from 'common/Func';
import { PlotData } from 'plotly.js';
import { IQuadParams } from '../makeParams';

export class Base {
  public label: string;
  public isGraphable: boolean;
  public needRn: boolean;
  public n: number;
  public readonly a: number;
  public readonly b: number;

  protected readonly xArr: number[];
  protected readonly h: number;

  constructor(protected readonly f: Func, params: IQuadParams) {
    this.n = params.n;
    this.a = params.a;
    this.b = params.b;
    this.h = params.h;
    this.xArr = params.xArr;

    this.label = 'Base class';
    this.isGraphable = false;
    this.needRn = false;
  }

  public calc(): number {
    return 0;
  }

  public calcRn(): number {
    return 0;
  }

  public getPlotData(): Array<Partial<PlotData>> {
    return [];
  }
}
