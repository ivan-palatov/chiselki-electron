import React from 'react';
import { IntegralStore } from './IntegralStore';
import { InterpolationStore } from './InterpolationStore';

export const rootContext = React.createContext({
  integralStore: new IntegralStore(),
  interpStore: new InterpolationStore(),
});

export const useStore = () => React.useContext(rootContext);
