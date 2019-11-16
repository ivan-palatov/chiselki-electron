import React from 'react';
import { Route, Switch } from 'react-router';
import Equations from './pages/Equations';
import Index from './pages/Index';
import Integrals from './pages/Integrals';
import Interpolation from './pages/Interpolation';

interface IProps {}

const Routes: React.FC<IProps> = () => {
  return (
    <Switch>
      <Route path="/integrals" component={Integrals} />
      <Route path="/equations" component={Equations} />
      <Route path="/interpolation" component={Interpolation} />
      <Route path="/" component={Index} />
    </Switch>
  );
};

export default Routes;
