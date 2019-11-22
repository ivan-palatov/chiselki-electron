import { Func } from 'common/Func';
import { Base } from './Base';

interface IData {
  x: number;
  y: number;
  p: number;
  fi: number;
  q: number;
  c: number;
  d: number;
  b: number;
}

export class Qubic extends Base {
  protected arr: IData[] = [];
  private alpha: number;
  private beta: number;
  private gamma: number;

  constructor(
    public readonly f: Func,
    public readonly a: number,
    public readonly b: number,
    public readonly n: number
  ) {
    super(f, a, b, n);
    this.name = 'Кубический сплайн';

    this.alpha = this.h;
    this.beta = this.h * 4;
    this.gamma = this.h;

    this.generateArr();

    this.calcValues();
  }

  protected calcValues() {
    const step = this.h / 10;
    let k = 0;

    for (let i = 0; i < this.n; i++) {
      for (let j = 0; j < 10; j++) {
        this.points.x[k] = this.a + step * k;
        this.points.y[k] = this.getValue(this.a + step * k, i);
        k++;
      }
    }
    this.points.x[k] = this.a + step * k;
    this.points.y[k] = this.getValue(this.a + step * k, this.n - 1);
  }

  private getValue(xi: number, i: number) {
    const { y, b, c, d, x } = this.arr[i + 1];

    return (
      y +
      b * (x - xi) +
      (c * Math.pow(x - xi, 2)) / 2 +
      (d * Math.pow(x - xi, 3)) / 6
    );
  }

  private generateArr() {
    for (let i = 0; i <= this.n; i++) {
      if (i === 0) {
        this.arr[0] = {
          x: this.a,
          y: this.f.getValue(this.a),
          p: 0,
          fi: 0,
          q: 0,
          b: 0,
          c: 0,
          d: 0,
        };
        continue;
      }

      const { x, y, p, fi, q } = this.arr[i - 1];

      const newX = x + this.h;
      const newY = this.f.getValue(newX);

      const newFi =
        i === 0
          ? 0
          : 6 *
            ((this.f.getValue(this.a + this.h * (i + 1)) - newY) / this.h -
              (newY - y) / this.h);

      this.arr[i] = {
        x: newX,
        y: newY,
        p: i <= 1 ? 0 : this.gamma / (this.beta + this.alpha * p),
        fi: newFi,
        q: i <= 1 ? 0 : (fi - this.alpha * q) / (this.beta + this.alpha * p),
        c: 0,
        b: 0,
        d: 0,
      };
    }

    // Filling Ci
    for (let i = this.n - 1; i > 0; i--) {
      const { p, c, q } = this.arr[i + 1];
      this.arr[i].c = p * c + q;
    }

    // Filling b, d
    for (let i = 1; i <= this.n; i++) {
      this.arr[i].b =
        (this.arr[i - 1].y - this.arr[i].y) / this.h -
        (this.arr[i].c * this.h) / 2 -
        ((this.arr[i - 1].c - this.arr[i].c) * this.h) / 6;

      this.arr[i].d = (this.arr[i - 1].c - this.arr[i].c) / this.h;
    }
  }
}
