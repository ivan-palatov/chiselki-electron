import React from "react";
import { Route, Switch } from "react-router";
import Index from "./pages/Index";

interface IProps {}

const Routes: React.FC<IProps> = () => {
  return (
    <Switch>
      <Route path="/" component={Index} />
    </Switch>
  );
};

export default Routes;
