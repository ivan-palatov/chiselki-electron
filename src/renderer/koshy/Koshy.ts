import { evaluate } from 'mathjs';

export class Koshy {
  private readonly length: number;

  constructor(
    private readonly f: string,
    private readonly a: number,
    private readonly b: number,
    private readonly h: number,
    private readonly y0: number,
    private readonly eps: number
  ) {
    this.length = Math.round((this.b - this.a) / this.h);
  }

  public makeTableData() {
    const euler = this.calcEuler();
    const runge = this.calcRunge();
    const adams = this.calcAdams();

    return euler.map(({ x, y }, i) => ({
      x: parseFloat(x.toFixed(6)),
      euler: parseFloat(y.toFixed(8)),
      runge: parseFloat(runge[i].y.toFixed(8)),
      adams: parseFloat(adams[i].y.toFixed(8)),
    }));
  }

  public calcAdams() {
    const arr = this.calcRunge(3);
    for (let i = 4; i <= this.length; i++) {
      const { x, y } = arr[i - 1];
      const newX = x + this.h;

      const yp =
        y +
        (this.h *
          (55 * this.fVal(x, y) -
            59 * this.fVal(arr[i - 2].x, arr[i - 2].y) +
            37 * this.fVal(arr[i - 3].x, arr[i - 3].y) -
            9 * this.fVal(arr[i - 4].x, arr[i - 4].y))) /
          24;
      const fp = this.fVal(newX, yp);
      const newY =
        y +
        (this.h *
          (9 * fp +
            19 * this.fVal(x, y) -
            5 * this.fVal(arr[i - 2].x, arr[i - 2].y) +
            this.fVal(arr[i - 3].x, arr[i - 3].y))) /
          24;
      arr.push({ x: newX, y: newY });
    }

    return arr;
  }

  public calcRunge(length = this.length) {
    const arr = [{ x: this.a, y: this.y0 }];

    for (let i = 1; i <= length; i++) {
      const { x, y } = arr[i - 1];
      const newX = x + this.h;

      const k1 = this.h * this.fVal(x, y);
      const k2 = this.h * this.fVal(x + this.h / 2, y + k1 / 2);
      const k3 = this.h * this.fVal(x + this.h / 2, y + k2 / 2);
      const k4 = this.h * this.fVal(newX, y + k3);

      const yNext = y + (k1 + 2 * (k2 + k3) + k4) / 6;

      arr.push({ x: newX, y: yNext });
    }

    return arr;
  }

  public calcEuler() {
    const arr = [{ x: this.a, y: this.y0 }];

    for (let i = 1; i <= this.length; i++) {
      const { x, y } = arr[i - 1];
      const newX = x + this.h;

      let y0 = y + this.h * this.fVal(x, y);
      let y1;
      while (true) {
        y1 = y + (this.h / 2) * (this.fVal(x, y) + this.fVal(newX, y0));
        if (Math.abs(y0 - y1) < this.eps) {
          break;
        }
        y0 = y1;
      }

      arr.push({ x: newX, y: y1 });
    }

    return arr;
  }

  private fVal(x: number, y: number) {
    return evaluate(this.f, { x, y });
  }
}
