import { observer } from 'mobx-react-lite';
import React from 'react';
import { Route, Switch } from 'react-router';
import Equations from './pages/Equations';
import Index from './pages/Index';
import Integrals from './pages/Integrals';
import Interpolation from './pages/Interpolation';
import Koshy from './pages/Koshy';

const Routes = observer(() => {
  return (
    <Switch>
      <Route path="/integrals" component={Integrals} />
      <Route path="/equations" component={Equations} />
      <Route path="/interpolation" component={Interpolation} />
      <Route path="/koshy" component={Koshy} />
      <Route path="/" component={Index} />
    </Switch>
  );
});

export default Routes;
