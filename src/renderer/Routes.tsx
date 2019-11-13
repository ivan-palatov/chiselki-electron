import React from 'react';
import { Route, Switch } from 'react-router';

interface IProps {}

const Routes: React.FC<IProps> = () => {
  return (
    <Switch>
      <Route path="/" strict>
        <div>INDEX PAGE</div>
      </Route>
    </Switch>
  );
};

export default Routes;
