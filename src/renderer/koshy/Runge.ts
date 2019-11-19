import { evaluate } from 'mathjs';

export class Runge {
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

      const k1 = this.h * evaluate(this.f, { x, y });
      const k2 =
        this.h * evaluate(this.f, { x: x + this.h / 2, y: y + k1 / 2 });
      const k3 =
        this.h * evaluate(this.f, { x: x + this.h / 2, y: y + k2 / 2 });
      const k4 = this.h * evaluate(this.f, { x: x + this.h, y: y + k3 });

      const yNext = y + (k1 + 2 * (k2 + k3) + k4) / 6;

      arr.push({ x: x + this.h, y: yNext });
    }

    return arr;
  }
}
