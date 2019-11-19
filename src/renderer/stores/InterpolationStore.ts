import { Func } from 'common/Func';
import { ipcRenderer as ipc } from 'electron';
import { action, observable, runInAction } from 'mobx';
import { PlotData } from 'plotly.js';

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
  public f: Func | null = null;

  @observable
  public plotData?: Partial<PlotData>;

  @observable
  public rnData?: Array<Partial<PlotData>>;

  @observable
  public status: 'idle' | 'loading' | 'done' | 'error' = 'idle';

  @action.bound
  public async handleSubmit(data: IData) {
    this.status = 'loading';
    this.data = data;
    this.f = new Func(data.f);
    try {
      const res = await ipc.invoke('interpolation', data);
      runInAction(() => {
        this.status = 'done';
        this.plotData = res.plotData;
        this.rnData = res.rnData;
      });
    } catch (e) {
      this.status = 'error';
      console.error(e);
    }
  }
}
