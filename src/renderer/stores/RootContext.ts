import React from 'react';
import { EquationStore } from './EquationStore';
import { IntegralStore } from './IntegralStore';
import { InterpolationStore } from './InterpolationStore';

export const rootContext = React.createContext({
  integralStore: new IntegralStore(),
  interpStore: new InterpolationStore(),
  equationStore: new EquationStore(),
});

export const useStore = () => React.useContext(rootContext);
