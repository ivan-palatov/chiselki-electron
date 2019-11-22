import { Func } from 'common/Func';
import { action, observable } from 'mobx';
import { PlotData } from 'plotly.js';
import { Base } from '../interpolation/Base';
import { Gauss } from '../interpolation/Gauss';
import { Lagrange } from '../interpolation/Lagrange';
import { Linear } from '../interpolation/Linear';
import { Qubic } from '../interpolation/Qubic';

const map = new Map<string, typeof Base>([
  ['lagr', Lagrange],
  ['gauss', Gauss],
  ['linear', Linear],
  ['qubic', Qubic],
]);

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
  public plotData?: Array<Partial<PlotData>>;

  @observable
  public rnData?: Array<Partial<PlotData>>;

  @observable
  public status: 'idle' | 'done' = 'idle';

  @action.bound
  public async handleSubmit(data: IData) {
    this.data = data;
    const Method = map.get(data.type)!;
    const f = new Func(data.f);
    const inst = new Method(f, data.a, data.b, data.n);
    this.status = 'done';
    this.plotData = [f.getPlotData(data.a, data.b), inst.getPlotData()];
    this.rnData = inst.getRnData();
  }
}
