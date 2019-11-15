import { FormikHelpers } from 'formik';
import { Func } from '../common/Func';
import { CenterRect } from './classes/CenterRect';
import { Gauss } from './classes/Gauss';
import { LeftRect } from './classes/LeftRect';
import { RightRect } from './classes/RightRect';
import { Simpson } from './classes/Simpson';
import { ThreeEights } from './classes/ThreeEights';
import { Trapezi } from './classes/Trapezi';
import { makeParams } from './makeParams';

interface IData {
  f: string;
  a: number;
  b: number;
  n: number;
  quad: string[];
}

export function formHandler(
  { f, a, b, n, quad }: IData,
  helpers: FormikHelpers<IData>
) {
  const params = makeParams(n, a, b);
  const func = new Func(f);

  const quadArray: RightRect[] = [];
  for (const q of quad) {
    const Quad = createQuad(q);
    quadArray.push(new Quad(func, params));
  }
}

function createQuad(q: string) {
  switch (q) {
    case 'lrect':
      return LeftRect;
    case 'rrect':
      return RightRect;
    case 'crect':
      return CenterRect;
    case 'trapezi':
      return Trapezi;
    case 'simpson':
      return Simpson;
    case 'te':
      return ThreeEights;
    case 'gauss':
      return Gauss;

    default:
      throw new Error(`Quad with parameter ${q} doesn't exist.`);
  }
}
