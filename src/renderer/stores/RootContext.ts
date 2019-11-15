import React from 'react';
import { IntegralStore } from './IntegralStore';

export const rootContext = React.createContext({
  integralStore: new IntegralStore(),
});

export const useStore = () => React.useContext(rootContext);
