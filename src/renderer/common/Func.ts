import { derivative, evaluate, simplify } from 'mathjs';

export class Func {
  private derivatives: string[] = [];

  constructor(private readonly f: string) {}

  public get fString() {
    return this.f;
  }

  public LaTeX(f = this.f) {
    return simplify(f).toTex();
  }

  public getValue(x: number, f = this.f) {
    return evaluate(f, { x });
  }

  public getDerivativeValue(x: number, n = 1) {
    return evaluate(this.getDerivative(n), { x });
  }

  public getDerivative(n: number) {
    if (this.derivatives.length >= n) {
      return this.derivatives[n - 1];
    }

    if (this.derivatives.length === 0) {
      this.derivatives.push(simplify(derivative(this.f, 'x')).toString());
    }

    while (this.derivatives.length < n) {
      this.derivatives.push(
        simplify(
          derivative(this.derivatives[this.derivatives.length - 1], 'x')
        ).toString()
      );
    }

    return this.derivatives[n - 1];
  }
}
