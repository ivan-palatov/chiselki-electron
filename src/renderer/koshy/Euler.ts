import { evaluate } from 'mathjs';

export class Euler {
  constructor(
    // y' = f(x)
    private readonly f: string,
    private readonly a: number,
    private readonly b: number,
    private readonly h: number,
    private readonly y0: number
  ) {}

  public calc() {
    const length = Math.round((this.b - this.a) / this.h);
    const arr = [{ x: this.a, y: this.y0 }];

    for (let i = 1; i <= length; i++) {
      const { x, y } = arr[i - 1];
      arr.push({ x: x + this.h, y: y + this.h * evaluate(this.f, { x, y }) });
    }

    return arr;
  }

  public calcBetter(eps: number) {
    const length = Math.round((this.b - this.a) / this.h);
    const arr = [{ x: this.a, y: this.y0 }];

    for (let i = 1; i <= length; i++) {
      const { x, y } = arr[i - 1];
      const newX = x + this.h;

      let y0 = y + this.h * evaluate(this.f, { x, y });
      let y1;
      while (true) {
        y1 =
          y +
          (this.h / 2) *
            (evaluate(this.f, { x, y }) + evaluate(this.f, { x: newX, y: y0 }));
        if (Math.abs(y0 - y1) < eps) {
          break;
        }
        y0 = y1;
      }

      arr.push({ x: newX, y: y1 });
    }

    return arr;
  }
}
