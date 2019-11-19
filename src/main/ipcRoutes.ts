import { Func } from 'common/Func';
import { ipcMain as ipc } from 'electron';
import { Gauss } from './interpolation/Gauss';
import { Lagrange } from './interpolation/Lagrange';
import { Linear } from './interpolation/Linear';

const interpolationMap = new Map<string, any>([
  ['lagr', Lagrange],
  ['gauss', Gauss],
  ['linear', Linear],
  ['qubic', 0],
]);

export function initIpcRoutes() {
  ipc.handle('interpolation', (e, args) => {
    console.log(args);

    const f = new Func(args.f);
    const Class = interpolationMap.get(args.type);
    const instance = new Class(f, args.a, args.b, args.n);

    return new Promise(resolve => {
      resolve({
        plotData: instance.getPlotData(),
        rnData: instance.getRnData(),
      });
    });
  });

  ipc.handle('integrals', (e, args) => {
    console.log(args);

    return 'Hey, it works!';
  });

  ipc.handle('equations', (e, args) => {
    console.log(args);

    return 'Hey, it works!';
  });

  ipc.handle('koshy', (e, args) => {
    console.log(args);

    return 'Hey, it works!';
  });
}
