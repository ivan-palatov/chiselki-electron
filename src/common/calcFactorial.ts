export function calcFactorial(num: number) {
  let rval = 1;
  for (let i = 2; i <= num; i++) {
    rval = rval * i;
  }
  return rval;
}
