import React from 'react';
import { Route, Switch } from 'react-router';
import Index from './pages/Index';
import Integrals from './pages/Integrals';

interface IProps {}

const Routes: React.FC<IProps> = () => {
  return (
    <Switch>
      <Route path="/integrals" component={Integrals} />
      <Route path="/" component={Index} />
    </Switch>
  );
};

export default Routes;
