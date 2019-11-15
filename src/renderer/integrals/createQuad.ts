import { Base } from './classes/Base';
import { CenterRect } from './classes/CenterRect';
import { Gauss } from './classes/Gauss';
import { LeftRect } from './classes/LeftRect';
import { RightRect } from './classes/RightRect';
import { Simpson } from './classes/Simpson';
import { ThreeEights } from './classes/ThreeEights';
import { Trapezi } from './classes/Trapezi';

export function createQuad(q: string): typeof Base {
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
